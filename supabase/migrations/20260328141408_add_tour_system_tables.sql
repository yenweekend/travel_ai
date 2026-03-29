-- 0. EXTENSIONS
-- ========================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search

-- 1. ENUM TYPES
-- ========================
CREATE TYPE review_target_type AS ENUM ('destination', 'hotel', 'tour');
CREATE TYPE wishlist_target_type AS ENUM ('destination', 'hotel');
CREATE TYPE report_status AS ENUM ('pending', 'reviewed', 'dismissed');
CREATE TYPE destination_type AS ENUM ('beach', 'mountain', 'culture', 'city', 'countryside', 'island');

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  region TEXT,                        -- Khu vực: Bắc, Trung, Nam
  province TEXT,                      -- Tỉnh/Thành phố
  destination_type destination_type,  -- Loại hình: biển, núi, văn hóa...
  cover_image TEXT,                   -- URL ảnh bìa (Supabase Storage)
  avg_rating NUMERIC(2,1) DEFAULT 0,
  review_count INT DEFAULT 0,
  min_price NUMERIC(12,0) DEFAULT 0,  -- Giá tham khảo tối thiểu (VNĐ)
  suggested_days INT DEFAULT 1,       -- Số ngày gợi ý
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_destinations_slug ON destinations(slug);
CREATE INDEX idx_destinations_region ON destinations(region);
CREATE INDEX idx_destinations_type ON destinations(destination_type);
CREATE INDEX idx_destinations_name_trgm ON destinations USING gin(name gin_trgm_ops);

CREATE TABLE destination_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_dest_images_destination ON destination_images(destination_id);

CREATE TABLE destination_tags (
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (destination_id, tag_id)
);

CREATE TABLE attractions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  entry_fee NUMERIC(12,0) DEFAULT 0,  -- Phí vào cửa (VNĐ)
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_attractions_destination ON attractions(destination_id);

CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  duration_days INT NOT NULL,
  price NUMERIC(12,0) NOT NULL,    -- Giá tour (VNĐ)
  max_group_size INT DEFAULT 20,
  cover_image TEXT,
  avg_rating NUMERIC(2,1) DEFAULT 0,
  review_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);



CREATE INDEX idx_tours_slug ON tours(slug);
CREATE INDEX idx_tours_destination ON tours(destination_id);

-- ========================
-- 16. TOUR ITINERARIES (Lịch trình mẫu từng ngày)
-- ========================
CREATE TABLE tour_itineraries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  day_number INT NOT NULL,
  title TEXT NOT NULL,             -- Ví dụ: "Ngày 1: Khám phá Phố Cổ Hội An"
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tour_itineraries_tour ON tour_itineraries(tour_id);

-- ========================
-- 17. REVIEWS (Đánh giá cho Destination, Hotel, Tour)
-- ========================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_type review_target_type NOT NULL,
  target_id UUID NOT NULL,         -- ID của destination/hotel/tour
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  like_count INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE, -- Admin có thể ẩn review vi phạm
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_target ON reviews(target_type, target_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);

-- ========================
-- 18. REVIEW LIKES
-- ========================
CREATE TABLE review_likes (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, review_id)
);

-- ========================
-- 19. REVIEW REPORTS (Báo cáo review vi phạm)
-- ========================
CREATE TABLE review_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT,
  status report_status DEFAULT 'pending',
  admin_note TEXT,
  resolved_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

CREATE INDEX idx_review_reports_status ON review_reports(status);
CREATE INDEX idx_review_reports_review ON review_reports(review_id);

-- ========================
-- 20. WISHLISTS (Danh sách yêu thích)
-- ========================
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_type wishlist_target_type NOT NULL,
  target_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, target_type, target_id)
);

CREATE INDEX idx_wishlists_user ON wishlists(user_id);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_timestamp BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_destinations_timestamp BEFORE UPDATE ON destinations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_tours_timestamp BEFORE UPDATE ON tours
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_attractions_timestamp BEFORE UPDATE ON attractions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_reviews_timestamp BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- -------------------------------------------------------
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags viewable by everyone"
  ON tags FOR SELECT USING (true);

CREATE POLICY "Admin can manage tags"
  ON tags FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- DESTINATIONS
-- -------------------------------------------------------
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Destinations viewable by everyone"
  ON destinations FOR SELECT USING (true);

CREATE POLICY "Admin can manage destinations"
  ON destinations FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- DESTINATION IMAGES
-- -------------------------------------------------------
ALTER TABLE destination_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Destination images viewable by everyone"
  ON destination_images FOR SELECT USING (true);

CREATE POLICY "Admin can manage destination images"
  ON destination_images FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- DESTINATION TAGS
-- -------------------------------------------------------
ALTER TABLE destination_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Destination tags viewable by everyone"
  ON destination_tags FOR SELECT USING (true);

CREATE POLICY "Admin can manage destination tags"
  ON destination_tags FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- ATTRACTIONS
-- -------------------------------------------------------
ALTER TABLE attractions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Attractions viewable by everyone"
  ON attractions FOR SELECT USING (true);

CREATE POLICY "Admin can manage attractions"
  ON attractions FOR ALL USING (is_admin());

  -- -------------------------------------------------------
-- TOURS
-- -------------------------------------------------------
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tours viewable by everyone"
  ON tours FOR SELECT USING (true);

CREATE POLICY "Admin can manage tours"
  ON tours FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- TOUR ITINERARIES
-- -------------------------------------------------------
ALTER TABLE tour_itineraries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tour itineraries viewable by everyone"
  ON tour_itineraries FOR SELECT USING (true);

CREATE POLICY "Admin can manage tour itineraries"
  ON tour_itineraries FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- REVIEWS
-- -------------------------------------------------------
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visible reviews viewable by everyone"
  ON reviews FOR SELECT USING (is_visible = TRUE OR auth.uid() = user_id OR is_admin());

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage all reviews"
  ON reviews FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- REVIEW LIKES
-- -------------------------------------------------------
ALTER TABLE review_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Review likes viewable by everyone"
  ON review_likes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can like"
  ON review_likes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own likes"
  ON review_likes FOR DELETE USING (auth.uid() = user_id);

-- -------------------------------------------------------
-- REVIEW REPORTS
-- -------------------------------------------------------
ALTER TABLE review_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reports"
  ON review_reports FOR SELECT USING (auth.uid() = reporter_id OR is_admin());

CREATE POLICY "Authenticated users can report"
  ON review_reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Admin can manage reports"
  ON review_reports FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- WISHLISTS
-- -------------------------------------------------------
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own wishlists"
  ON wishlists FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to wishlist"
  ON wishlists FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from wishlist"
  ON wishlists FOR DELETE USING (auth.uid() = user_id);