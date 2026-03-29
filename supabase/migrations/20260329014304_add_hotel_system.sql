CREATE TABLE hotels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  address TEXT,
  province TEXT,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  star_rating INT CHECK (star_rating BETWEEN 1 AND 5),
  cover_image TEXT,
  avg_rating NUMERIC(2,1) DEFAULT 0,
  review_count INT DEFAULT 0,
  min_price NUMERIC(12,0) DEFAULT 0,  -- Giá phòng rẻ nhất
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE INDEX idx_hotels_slug ON hotels(slug);
CREATE INDEX idx_hotels_province ON hotels(province);
CREATE INDEX idx_hotels_destination ON hotels(destination_id);
CREATE INDEX idx_hotels_star ON hotels(star_rating);
CREATE INDEX idx_hotels_name_trgm ON hotels USING gin(name gin_trgm_ops);

CREATE TABLE hotel_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hotel_images_hotel ON hotel_images(hotel_id);

CREATE TABLE hotel_tags (
  hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (hotel_id, tag_id)
);

CREATE TABLE amenities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT,  -- Tên icon (Lucide icon name)
  category TEXT DEFAULT 'general', -- general, room, hotel
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE hotel_amenities (
  hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  amenity_id UUID NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (hotel_id, amenity_id)
);

CREATE TABLE room_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,              -- Ví dụ: Deluxe Double, Superior Twin
  description TEXT,
  price_per_night NUMERIC(12,0) NOT NULL,
  max_guests INT DEFAULT 2,
  bed_type TEXT,                   -- Single, Double, Twin, King...
  room_size NUMERIC(6,1),         -- m²
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_room_types_hotel ON room_types(hotel_id);

CREATE TABLE room_amenities (
  room_type_id UUID NOT NULL REFERENCES room_types(id) ON DELETE CASCADE,
  amenity_id UUID NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (room_type_id, amenity_id)
);

CREATE TRIGGER update_room_types_timestamp BEFORE UPDATE ON room_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_hotels_timestamp BEFORE UPDATE ON hotels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE FUNCTION update_avg_rating()
RETURNS TRIGGER AS $$
DECLARE
  _avg NUMERIC(2,1);
  _count INT;
BEGIN
  -- Calculate for the affected target
  IF TG_OP = 'DELETE' THEN
    SELECT COALESCE(AVG(rating), 0), COUNT(*) INTO _avg, _count
      FROM reviews WHERE target_type = OLD.target_type AND target_id = OLD.target_id AND is_visible = TRUE;

    IF OLD.target_type = 'destination' THEN
      UPDATE destinations SET avg_rating = _avg, review_count = _count WHERE id = OLD.target_id;
    ELSIF OLD.target_type = 'hotel' THEN
      UPDATE hotels SET avg_rating = _avg, review_count = _count WHERE id = OLD.target_id;
    ELSIF OLD.target_type = 'tour' THEN
      UPDATE tours SET avg_rating = _avg, review_count = _count WHERE id = OLD.target_id;
    END IF;
  ELSE
    SELECT COALESCE(AVG(rating), 0), COUNT(*) INTO _avg, _count
      FROM reviews WHERE target_type = NEW.target_type AND target_id = NEW.target_id AND is_visible = TRUE;

    IF NEW.target_type = 'destination' THEN
      UPDATE destinations SET avg_rating = _avg, review_count = _count WHERE id = NEW.target_id;
    ELSIF NEW.target_type = 'hotel' THEN
      UPDATE hotels SET avg_rating = _avg, review_count = _count WHERE id = NEW.target_id;
    ELSIF NEW.target_type = 'tour' THEN
      UPDATE tours SET avg_rating = _avg, review_count = _count WHERE id = NEW.target_id;
    END IF;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_review_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE reviews SET like_count = like_count + 1 WHERE id = NEW.review_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE reviews SET like_count = like_count - 1 WHERE id = OLD.review_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_like_change
  AFTER INSERT OR DELETE ON review_likes
  FOR EACH ROW EXECUTE FUNCTION update_review_like_count();

ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hotels viewable by everyone"
  ON hotels FOR SELECT USING (true);

CREATE POLICY "Admin can manage hotels"
  ON hotels FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- HOTEL IMAGES
-- -------------------------------------------------------
ALTER TABLE hotel_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hotel images viewable by everyone"
  ON hotel_images FOR SELECT USING (true);

CREATE POLICY "Admin can manage hotel images"
  ON hotel_images FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- HOTEL TAGS
-- -------------------------------------------------------
ALTER TABLE hotel_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hotel tags viewable by everyone"
  ON hotel_tags FOR SELECT USING (true);

CREATE POLICY "Admin can manage hotel tags"
  ON hotel_tags FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- AMENITIES
-- -------------------------------------------------------
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Amenities viewable by everyone"
  ON amenities FOR SELECT USING (true);

CREATE POLICY "Admin can manage amenities"
  ON amenities FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- HOTEL AMENITIES
-- -------------------------------------------------------
ALTER TABLE hotel_amenities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hotel amenities viewable by everyone"
  ON hotel_amenities FOR SELECT USING (true);

CREATE POLICY "Admin can manage hotel amenities"
  ON hotel_amenities FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- ROOM TYPES
-- -------------------------------------------------------
ALTER TABLE room_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Room types viewable by everyone"
  ON room_types FOR SELECT USING (true);

CREATE POLICY "Admin can manage room types"
  ON room_types FOR ALL USING (is_admin());

-- -------------------------------------------------------
-- ROOM AMENITIES
-- -------------------------------------------------------
ALTER TABLE room_amenities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Room amenities viewable by everyone"
  ON room_amenities FOR SELECT USING (true);

CREATE POLICY "Admin can manage room amenities"
  ON room_amenities FOR ALL USING (is_admin());

