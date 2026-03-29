INSERT INTO amenities (name, icon, category) VALUES
  ('Wifi miễn phí', 'wifi', 'general'),
  ('Hồ bơi', 'waves', 'hotel'),
  ('Bãi đỗ xe', 'car', 'hotel'),
  ('Nhà hàng', 'utensils', 'hotel'),
  ('Phòng gym', 'dumbbell', 'hotel'),
  ('Spa', 'sparkles', 'hotel'),
  ('Điều hòa', 'thermometer', 'room'),
  ('Minibar', 'wine', 'room'),
  ('Ban công', 'door-open', 'room'),
  ('Bồn tắm', 'bath', 'room'),
  ('TV', 'tv', 'room'),
  ('Két sắt', 'lock', 'room'),
  ('Máy sấy tóc', 'wind', 'room'),
  ('Dịch vụ phòng 24h', 'clock', 'hotel'),
  ('Đưa đón sân bay', 'plane', 'hotel'),
  ('Quầy bar', 'glass-water', 'hotel')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- SEED DATA: Default tags
-- ============================================================
INSERT INTO tags (name, slug) VALUES
  ('Biển', 'bien'),
  ('Núi', 'nui'),
  ('Nghỉ dưỡng', 'nghi-duong'),
  ('Văn hóa', 'van-hoa'),
  ('Phiêu lưu', 'phieu-luu'),
  ('Ẩm thực', 'am-thuc'),
  ('Gia đình', 'gia-dinh'),
  ('Lãng mạn', 'lang-man'),
  ('Thành phố', 'thanh-pho'),
  ('Làng quê', 'lang-que'),
  ('Di sản', 'di-san'),
  ('Sinh thái', 'sinh-thai')
ON CONFLICT (name) DO NOTHING;

INSERT INTO destinations (id, name, slug, description, region, province, destination_type, cover_image, avg_rating, review_count, min_price, suggested_days, is_featured, view_count) VALUES
  ('d1000000-0000-0000-0000-000000000001', 'Vịnh Hạ Long', 'vinh-ha-long',
   'Vịnh Hạ Long là Di sản Thiên nhiên Thế giới được UNESCO công nhận, nổi tiếng với hàng nghìn hòn đảo đá vôi và hang động kỳ vĩ. Du khách có thể tham gia du thuyền qua đêm, chèo kayak khám phá hang động, và tắm biển tại các bãi cát trắng.',
   'Bắc', 'Quảng Ninh', 'beach',
   'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
   4.8, 156, 1500000, 3, true, 12500),

  ('d1000000-0000-0000-0000-000000000002', 'Phố Cổ Hội An', 'pho-co-hoi-an',
   'Hội An là thành phố cổ được UNESCO công nhận, nổi tiếng với kiến trúc cổ kính, đèn lồng rực rỡ và ẩm thực đường phố tuyệt vời. Đêm rằm hàng tháng, phố cổ thắp sáng bằng đèn lồng tạo nên khung cảnh mê hoặc.',
   'Trung', 'Quảng Nam', 'culture',
   'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
   4.9, 203, 800000, 3, true, 15800),

  ('d1000000-0000-0000-0000-000000000003', 'Sa Pa', 'sa-pa',
   'Sa Pa nằm ở độ cao 1.500m so với mực nước biển, nổi tiếng với ruộng bậc thang tuyệt đẹp, đỉnh Fansipan - nóc nhà Đông Dương và văn hóa độc đáo của các dân tộc thiểu số H''Mông, Dao, Tày.',
   'Bắc', 'Lào Cai', 'mountain',
   'https://images.unsplash.com/photo-1570366583862-f91883984fde?w=800',
   4.7, 189, 1200000, 4, true, 11200),

  ('d1000000-0000-0000-0000-000000000004', 'Đà Nẵng', 'da-nang',
   'Đà Nẵng là thành phố đáng sống bên bờ biển miền Trung, sở hữu bãi biển Mỹ Khê nổi tiếng thế giới, Bà Nà Hills với Cầu Vàng biểu tượng, và ẩm thực phong phú từ mì Quảng đến bánh tráng cuốn thịt heo.',
   'Trung', 'Đà Nẵng', 'city',
   'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
   4.6, 234, 1000000, 4, true, 18900),

  ('d1000000-0000-0000-0000-000000000005', 'Phú Quốc', 'phu-quoc',
   'Phú Quốc là đảo ngọc phía Nam Việt Nam, thiên đường nghỉ dưỡng với bãi biển hoang sơ, nước biển trong xanh, và hệ sinh thái san hô phong phú. Đừng bỏ lỡ nước mắm Phú Quốc và hồ tiêu nổi tiếng.',
   'Nam', 'Kiên Giang', 'island',
   'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
   4.5, 178, 2000000, 4, false, 9800),

  ('d1000000-0000-0000-0000-000000000006', 'Ninh Bình', 'ninh-binh',
   'Ninh Bình được mệnh danh là "Hạ Long trên cạn" với quần thể danh thắng Tràng An, cố đô Hoa Lư, và chùa Bái Đính - ngôi chùa lớn nhất Đông Nam Á. Cảnh quan núi non hùng vĩ giữa đồng bằng.',
   'Bắc', 'Ninh Bình', 'culture',
   'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800',
   4.6, 98, 600000, 2, false, 7500),

  ('d1000000-0000-0000-0000-000000000007', 'Đà Lạt', 'da-lat',
   'Đà Lạt - thành phố ngàn hoa trên cao nguyên Lâm Viên, khí hậu mát mẻ quanh năm. Nổi tiếng với kiến trúc Pháp cổ, vườn hoa, đồi chè, thác nước và café view đẹp. Điểm đến lãng mạn hàng đầu Việt Nam.',
   'Nam', 'Lâm Đồng', 'mountain',
   'https://images.unsplash.com/photo-1555921015-5532091f6026?w=800',
   4.7, 167, 900000, 3, false, 13400),

  ('d1000000-0000-0000-0000-000000000008', 'Huế', 'hue',
   'Huế - cố đô của triều Nguyễn, nổi tiếng với Đại Nội, lăng tẩm vua chúa, chùa Thiên Mụ và sông Hương thơ mộng. Ẩm thực cung đình Huế tinh tế với bún bò Huế, bánh bèo, nem lụi là trải nghiệm không thể bỏ qua.',
   'Trung', 'Thừa Thiên Huế', 'culture',
   'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
   4.5, 145, 700000, 3, false, 8900)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO destination_images (destination_id, image_url, caption, sort_order) VALUES
  -- Hạ Long
  ('d1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800', 'Toàn cảnh Vịnh Hạ Long', 1),
  ('d1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800', 'Du thuyền trên vịnh', 2),
  ('d1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800', 'Hang động kỳ vĩ', 3),
  -- Hội An
  ('d1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800', 'Phố cổ đèn lồng', 1),
  ('d1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800', 'Chùa Cầu Hội An', 2),
  ('d1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=800', 'Đêm rằm Hội An', 3),
  -- Sa Pa  
  ('d1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1570366583862-f91883984fde?w=800', 'Ruộng bậc thang Sa Pa', 1),
  ('d1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800', 'Đỉnh Fansipan', 2),
  -- Đà Nẵng
  ('d1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800', 'Cầu Vàng Bà Nà Hills', 1),
  ('d1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800', 'Bãi biển Mỹ Khê', 2),
  -- Phú Quốc
  ('d1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800', 'Hoàng hôn Phú Quốc', 1),
  ('d1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800', 'Bãi Sao', 2);

INSERT INTO destination_tags (destination_id, tag_id)

SELECT 'd1000000-0000-0000-0000-000000000001'::uuid, id FROM tags WHERE slug = 'bien'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000001'::uuid, id FROM tags WHERE slug = 'nghi-duong'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000002'::uuid, id FROM tags WHERE slug = 'van-hoa'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000002'::uuid, id FROM tags WHERE slug = 'am-thuc'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000002'::uuid, id FROM tags WHERE slug = 'di-san'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000003'::uuid, id FROM tags WHERE slug = 'nui'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000003'::uuid, id FROM tags WHERE slug = 'phieu-luu'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000004'::uuid, id FROM tags WHERE slug = 'bien'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000004'::uuid, id FROM tags WHERE slug = 'thanh-pho'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000005'::uuid, id FROM tags WHERE slug = 'bien'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000005'::uuid, id FROM tags WHERE slug = 'nghi-duong'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000006'::uuid, id FROM tags WHERE slug = 'van-hoa'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000006'::uuid, id FROM tags WHERE slug = 'di-san'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000007'::uuid, id FROM tags WHERE slug = 'nui'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000007'::uuid, id FROM tags WHERE slug = 'lang-man'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000008'::uuid, id FROM tags WHERE slug = 'van-hoa'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000008'::uuid, id FROM tags WHERE slug = 'di-san'

UNION ALL SELECT 'd1000000-0000-0000-0000-000000000008'::uuid, id FROM tags WHERE slug = 'am-thuc'

ON CONFLICT DO NOTHING;

INSERT INTO attractions (destination_id, name, description, image_url, entry_fee, sort_order) VALUES
  -- Hạ Long
  ('d1000000-0000-0000-0000-000000000001', 'Hang Sửng Sốt', 'Hang động lớn nhất và đẹp nhất Vịnh Hạ Long với hệ thống nhũ đá lung linh', 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600', 200000, 1),
  ('d1000000-0000-0000-0000-000000000001', 'Đảo Ti Tốp', 'Bãi tắm đẹp và đỉnh đảo cao có view toàn cảnh vịnh', 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600', 100000, 2),
  ('d1000000-0000-0000-0000-000000000001', 'Làng chài Cửa Vạn', 'Làng chài nổi cổ kính trên mặt nước, trải nghiệm cuộc sống ngư dân', 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=600', 0, 3),
  -- Hội An
  ('d1000000-0000-0000-0000-000000000002', 'Chùa Cầu', 'Biểu tượng của Hội An, cầu Nhật Bản xây dựng từ thế kỷ 16', 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600', 120000, 1),
  ('d1000000-0000-0000-0000-000000000002', 'Phố đèn lồng', 'Khu phố cổ với hàng trăm đèn lồng rực rỡ vào ban đêm', 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=600', 0, 2),
  ('d1000000-0000-0000-0000-000000000002', 'Bãi biển An Bàng', 'Bãi biển yên bình cách phố cổ 4km, lý tưởng để tắm nắng', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600', 0, 3),
  -- Sa Pa
  ('d1000000-0000-0000-0000-000000000003', 'Đỉnh Fansipan', 'Nóc nhà Đông Dương cao 3.143m, đi cáp treo hoặc trekking', 'https://images.unsplash.com/photo-1570366583862-f91883984fde?w=600', 700000, 1),
  ('d1000000-0000-0000-0000-000000000003', 'Bản Cát Cát', 'Bản làng dân tộc H''Mông với ruộng bậc thang và thác nước', 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600', 100000, 2),
  -- Đà Nẵng
  ('d1000000-0000-0000-0000-000000000004', 'Cầu Vàng - Bà Nà Hills', 'Cây cầu biểu tượng được nâng đỡ bởi đôi bàn tay khổng lồ', 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600', 900000, 1),
  ('d1000000-0000-0000-0000-000000000004', 'Bãi biển Mỹ Khê', 'Top 6 bãi biển đẹp nhất hành tinh do Forbes bình chọn', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600', 0, 2),
  ('d1000000-0000-0000-0000-000000000004', 'Ngũ Hành Sơn', 'Cụm 5 ngọn núi đá cẩm thạch với hang động và chùa cổ', 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=600', 40000, 3),
  -- Đà Lạt
  ('d1000000-0000-0000-0000-000000000007', 'Hồ Xuân Hương', 'Hồ nước thơ mộng giữa trung tâm thành phố Đà Lạt', 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=600', 0, 1),
  ('d1000000-0000-0000-0000-000000000007', 'Thung Lũng Tình Yêu', 'Khu du lịch lãng mạn với vườn hoa và hồ nước tuyệt đẹp', 'https://images.unsplash.com/photo-1570366583862-f91883984fde?w=600', 250000, 2);

  
INSERT INTO hotels (id, name, slug, description, address, province, destination_id, star_rating, cover_image, avg_rating, review_count, min_price, latitude, longitude, is_featured, view_count) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Paradise Luxury Hạ Long', 'paradise-luxury-ha-long',
   'Du thuyền 5 sao sang trọng nhất Vịnh Hạ Long với phòng nghỉ rộng rãi, nhà hàng fine dining và dịch vụ spa trên biển. Trải nghiệm ngắm hoàng hôn trên vịnh không thể quên.',
   'Cảng tàu khách quốc tế Hạ Long', 'Quảng Ninh', 'd1000000-0000-0000-0000-000000000001',
   5, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
   4.8, 89, 4500000, 20.9540, 107.0480, true, 8900),

  ('a1000000-0000-0000-0000-000000000002', 'Anantara Hội An Resort', 'anantara-hoi-an-resort',
   'Resort 5 sao bên bờ sông Thu Bồn, thiết kế hài hòa giữa kiến trúc Việt truyền thống và tiện nghi hiện đại. Có hồ bơi vô cực, spa và nhà hàng ẩm thực xứ Quảng.',
   '01 Phạm Hồng Thái, Hội An', 'Quảng Nam', 'd1000000-0000-0000-0000-000000000002',
   5, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
   4.9, 124, 5200000, 15.8801, 108.3380, true, 12300),

  ('a1000000-0000-0000-0000-000000000003', 'Hotel de la Coupole Sa Pa', 'hotel-de-la-coupole-sapa',
   'Khách sạn phong cách Pháp cổ điển tại trung tâm Sa Pa, sở hữu hồ bơi vô cực nhìn ra thung lũng Mường Hoa. Thiết kế của kiến trúc sư nổi tiếng Bill Bensley.',
   'Trung tâm Sa Pa', 'Lào Cai', 'd1000000-0000-0000-0000-000000000003',
   5, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
   4.7, 76, 3800000, 22.3363, 103.8438, true, 6700),

  ('a1000000-0000-0000-0000-000000000004', 'InterContinental Đà Nẵng', 'intercontinental-da-nang',
   'Resort sang trọng tọa lạc tại bán đảo Sơn Trà với kiến trúc lấy cảm hứng từ văn hóa Việt. Bãi biển riêng, spa cao cấp và nhiều nhà hàng đạt giải thưởng.',
   'Bán đảo Sơn Trà, Đà Nẵng', 'Đà Nẵng', 'd1000000-0000-0000-0000-000000000004',
   5, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
   4.8, 156, 6500000, 16.1186, 108.2772, false, 9200),

  ('a1000000-0000-0000-0000-000000000005', 'Vinpearl Resort Phú Quốc', 'vinpearl-resort-phu-quoc',
   'Khu nghỉ dưỡng 5 sao all-inclusive tại Phú Quốc với công viên nước, sân golf, safari và bãi biển riêng dài 700m. Lựa chọn hoàn hảo cho kỳ nghỉ gia đình.',
   'Bãi Dài, Phú Quốc', 'Kiên Giang', 'd1000000-0000-0000-0000-000000000005',
   5, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
   4.6, 201, 3200000, 10.3456, 103.8590, false, 11500),

  ('a1000000-0000-0000-0000-000000000006', 'Tam Cốc Garden Resort', 'tam-coc-garden-resort',
   'Resort sinh thái giữa cánh đồng lúa Tam Cốc, phòng bungalow mái tranh truyền thống kết hợp nội thất hiện đại. Cho thuê xe đạp miễn phí khám phá vùng quê.',
   'Ninh Hải, Hoa Lư', 'Ninh Bình', 'd1000000-0000-0000-0000-000000000006',
   4, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
   4.5, 67, 1200000, 20.2506, 105.8677, false, 4300),

  ('a1000000-0000-0000-0000-000000000007', 'Ana Mandara Đà Lạt', 'ana-mandara-da-lat',
   'Biệt thự Pháp cổ giữa rừng thông Đà Lạt, không gian yên bình và lãng mạn. Nhà hàng phục vụ ẩm thực Pháp-Việt tinh tế bên lò sưởi.',
   'Le Lai, Phường 5, Đà Lạt', 'Lâm Đồng', 'd1000000-0000-0000-0000-000000000007',
   4, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
   4.6, 93, 1800000, 11.9404, 108.4583, false, 5100),

  ('a1000000-0000-0000-0000-000000000008', 'Pilgrimage Village Huế', 'pilgrimage-village-hue',
   'Resort phong cách làng quê Huế giữa vườn cây xanh mát. Spa sử dụng liệu pháp truyền thống Huế, nhà hàng phục vụ ẩm thực cung đình.',
   '130 Minh Mạng, Huế', 'Thừa Thiên Huế', 'd1000000-0000-0000-0000-000000000008',
   4, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
   4.4, 58, 1500000, 16.4498, 107.5624, false, 3800),

  ('a1000000-0000-0000-0000-000000000009', 'Golden Bay Đà Nẵng', 'golden-bay-da-nang',
   'Khách sạn 4 sao ngay trung tâm Đà Nẵng với hồ bơi vô cực trên tầng thượng, view toàn cảnh sông Hàn và cầu Rồng. Giá cả phải chăng, dịch vụ chu đáo.',
   '01 Lê Văn Duyệt, Đà Nẵng', 'Đà Nẵng', 'd1000000-0000-0000-0000-000000000004',
   4, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
   4.3, 187, 900000, 16.0544, 108.2242, false, 7600),

  ('a1000000-0000-0000-0000-000000000010', 'Mường Thanh Luxury Sa Pa', 'muong-thanh-luxury-sapa',
   'Khách sạn 4 sao tại trung tâm Sa Pa với view thung lũng Mường Hoa. Phòng ấm cúng, nhà hàng buffet phong phú và dịch vụ trekking chuyên nghiệp.',
   'Trung tâm thị trấn Sa Pa', 'Lào Cai', 'd1000000-0000-0000-0000-000000000003',
   4, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
   4.2, 145, 800000, 22.3380, 103.8440, false, 5400)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- 6. HOTEL IMAGES
-- ============================================================
INSERT INTO hotel_images (hotel_id, image_url, caption, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Toàn cảnh du thuyền', 1),
  ('a1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', 'Phòng suite view biển', 2),
  ('a1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', 'View sông Thu Bồn', 1),
  ('a1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', 'Hồ bơi vô cực', 2),
  ('a1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 'Sảnh khách sạn', 1),
  ('a1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'Bãi biển riêng', 1),
  ('a1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', 'Khu nghỉ dưỡng', 1);

-- ============================================================
-- 7. HOTEL TAGS
-- ============================================================
INSERT INTO hotel_tags (hotel_id, tag_id)
SELECT 'a1000000-0000-0000-0000-000000000001'::uuid, id FROM tags WHERE slug = 'nghi-duong'
UNION ALL SELECT 'a1000000-0000-0000-0000-000000000002'::uuid, id FROM tags WHERE slug = 'nghi-duong'
UNION ALL SELECT 'a1000000-0000-0000-0000-000000000002'::uuid, id FROM tags WHERE slug = 'lang-man'
UNION ALL SELECT 'a1000000-0000-0000-0000-000000000003'::uuid, id FROM tags WHERE slug = 'nghi-duong'
UNION ALL SELECT 'a1000000-0000-0000-0000-000000000004'::uuid, id FROM tags WHERE slug = 'bien'
UNION ALL SELECT 'a1000000-0000-0000-0000-000000000005'::uuid, id FROM tags WHERE slug = 'gia-dinh'
UNION ALL SELECT 'a1000000-0000-0000-0000-000000000006'::uuid, id FROM tags WHERE slug = 'sinh-thai'
UNION ALL SELECT 'a1000000-0000-0000-0000-000000000007'::uuid, id FROM tags WHERE slug = 'lang-man'
ON CONFLICT DO NOTHING;

-- ============================================================
-- 8. HOTEL AMENITIES (gắn tiện nghi cho khách sạn)
-- ============================================================
INSERT INTO hotel_amenities (hotel_id, amenity_id)
SELECT h.id, a.id FROM hotels h, amenities a
WHERE h.slug = 'paradise-luxury-ha-long' AND a.name IN ('Wifi miễn phí', 'Nhà hàng', 'Spa', 'Dịch vụ phòng 24h')
UNION ALL
SELECT h.id, a.id FROM hotels h, amenities a
WHERE h.slug = 'anantara-hoi-an-resort' AND a.name IN ('Wifi miễn phí', 'Hồ bơi', 'Spa', 'Nhà hàng', 'Phòng gym', 'Đưa đón sân bay')
UNION ALL
SELECT h.id, a.id FROM hotels h, amenities a
WHERE h.slug = 'hotel-de-la-coupole-sapa' AND a.name IN ('Wifi miễn phí', 'Hồ bơi', 'Spa', 'Nhà hàng', 'Quầy bar')
UNION ALL
SELECT h.id, a.id FROM hotels h, amenities a
WHERE h.slug = 'intercontinental-da-nang' AND a.name IN ('Wifi miễn phí', 'Hồ bơi', 'Spa', 'Nhà hàng', 'Phòng gym', 'Bãi đỗ xe', 'Đưa đón sân bay')
UNION ALL
SELECT h.id, a.id FROM hotels h, amenities a
WHERE h.slug = 'vinpearl-resort-phu-quoc' AND a.name IN ('Wifi miễn phí', 'Hồ bơi', 'Spa', 'Nhà hàng', 'Phòng gym', 'Bãi đỗ xe')
UNION ALL
SELECT h.id, a.id FROM hotels h, amenities a
WHERE h.slug = 'golden-bay-da-nang' AND a.name IN ('Wifi miễn phí', 'Hồ bơi', 'Nhà hàng', 'Phòng gym', 'Bãi đỗ xe')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 9. ROOM TYPES (Loại phòng cho mỗi khách sạn)
-- ============================================================
INSERT INTO room_types (hotel_id, name, description, price_per_night, max_guests, bed_type, room_size, image_url) VALUES
  -- Paradise Luxury Hạ Long
  ('a1000000-0000-0000-0000-000000000001', 'Deluxe Cabin', 'Phòng cabin sang trọng với ban công riêng nhìn ra vịnh', 4500000, 2, 'King', 28, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600'),
  ('a1000000-0000-0000-0000-000000000001', 'Premium Suite', 'Suite rộng rãi với phòng khách riêng và bồn tắm jacuzzi', 8500000, 2, 'King', 45, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'),
  -- Anantara Hội An
  ('a1000000-0000-0000-0000-000000000002', 'Deluxe Garden View', 'Phòng view vườn nhiệt đới xanh mát', 5200000, 2, 'King', 42, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600'),
  ('a1000000-0000-0000-0000-000000000002', 'River View Suite', 'Suite view sông Thu Bồn thơ mộng', 8800000, 3, 'King', 65, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600'),
  -- Hotel de la Coupole Sa Pa
  ('a1000000-0000-0000-0000-000000000003', 'Classic Room', 'Phòng phong cách Pháp cổ điển', 3800000, 2, 'Double', 35, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600'),
  ('a1000000-0000-0000-0000-000000000003', 'Premium Valley View', 'Phòng view thung lũng Mường Hoa', 5500000, 2, 'King', 42, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600'),
  -- InterContinental Đà Nẵng
  ('a1000000-0000-0000-0000-000000000004', 'Classic Room', 'Phòng tiêu chuẩn view vườn', 6500000, 2, 'King', 48, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'),
  ('a1000000-0000-0000-0000-000000000004', 'Ocean View Suite', 'Suite view biển panorama', 12000000, 3, 'King', 80, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600'),
  -- Golden Bay Đà Nẵng
  ('a1000000-0000-0000-0000-000000000009', 'Superior Room', 'Phòng tiêu chuẩn view thành phố', 900000, 2, 'Twin', 28, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600'),
  ('a1000000-0000-0000-0000-000000000009', 'Deluxe River View', 'Phòng view sông Hàn và cầu Rồng', 1500000, 2, 'King', 35, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600'),
  -- Mường Thanh Sa Pa
  ('a1000000-0000-0000-0000-000000000010', 'Standard Room', 'Phòng tiêu chuẩn ấm cúng', 800000, 2, 'Twin', 25, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600'),
  ('a1000000-0000-0000-0000-000000000010', 'Valley View Deluxe', 'Phòng Deluxe view thung lũng', 1200000, 2, 'King', 32, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600');

-- ============================================================
-- 10. TOURS (6 tour mẫu)
-- ============================================================
INSERT INTO tours (id, name, slug, description, destination_id, duration_days, price, max_group_size, cover_image, avg_rating, review_count, is_active) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Hạ Long Bay Cruise 2N1Đ', 'ha-long-bay-cruise-2n1d',
   'Trải nghiệm du thuyền 5 sao khám phá Vịnh Hạ Long trong 2 ngày 1 đêm. Bao gồm: chèo kayak, tham quan hang Sửng Sốt, ngắm hoàng hôn trên vịnh, BBQ hải sản tươi sống.',
   'd1000000-0000-0000-0000-000000000001', 2, 3500000, 20,
   'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
   4.8, 67, true),

  ('b1000000-0000-0000-0000-000000000002', 'Khám phá Hội An - Mỹ Sơn 3N2Đ', 'kham-pha-hoi-an-my-son-3n2d',
   'Tour trọn gói khám phá phố cổ Hội An và thánh địa Mỹ Sơn. Trải nghiệm làm đèn lồng, học nấu ẩm thực xứ Quảng, đạp xe quanh làng rau Trà Quế.',
   'd1000000-0000-0000-0000-000000000002', 3, 2800000, 15,
   'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
   4.9, 89, true),

  ('b1000000-0000-0000-0000-000000000003', 'Chinh phục Fansipan 3N2Đ', 'chinh-phuc-fansipan-3n2d',
   'Tour trekking chinh phục đỉnh Fansipan - nóc nhà Đông Dương. Tham quan bản làng dân tộc, thưởng thức lẩu cá hồi Sa Pa và ngắm mây sea of clouds.',
   'd1000000-0000-0000-0000-000000000003', 3, 3200000, 12,
   'https://images.unsplash.com/photo-1570366583862-f91883984fde?w=800',
   4.7, 45, true),

  ('b1000000-0000-0000-0000-000000000004', 'Đà Nẵng - Bà Nà - Sơn Trà 4N3Đ', 'da-nang-ba-na-son-tra-4n3d',
   'Tour trọn gói Đà Nẵng: tham quan Bà Nà Hills, bán đảo Sơn Trà, phố cổ Hội An, ngũ hành sơn. Thưởng thức mì Quảng, bánh tráng cuốn thịt heo chính gốc.',
   'd1000000-0000-0000-0000-000000000004', 4, 4500000, 20,
   'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
   4.6, 112, true),

  ('b1000000-0000-0000-0000-000000000005', 'Phú Quốc Island Paradise 4N3Đ', 'phu-quoc-island-paradise-4n3d',
   'Thiên đường biển đảo Phú Quốc: lặn ngắm san hô, câu cá, tham quan vườn tiêu, nhà thùng nước mắm. Sunset party tại bãi biển hoang sơ.',
   'd1000000-0000-0000-0000-000000000005', 4, 5200000, 15,
   'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
   4.5, 78, true),

  ('b1000000-0000-0000-0000-000000000006', 'Đà Lạt Mộng Mơ 3N2Đ', 'da-lat-mong-mo-3n2d',
   'Khám phá Đà Lạt thơ mộng: tham quan vườn hoa, đồi chè, thác Datanla, Crazy House. Check-in quán café view đẹp và thưởng thức đặc sản bánh tráng nướng.',
   'd1000000-0000-0000-0000-000000000007', 3, 2500000, 20,
   'https://images.unsplash.com/photo-1555921015-5532091f6026?w=800',
   4.7, 93, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- 11. TOUR ITINERARIES (Lịch trình chi tiết)
-- ============================================================
INSERT INTO tour_itineraries (tour_id, day_number, title, description, sort_order) VALUES
  -- Hạ Long Cruise
  ('b1000000-0000-0000-0000-000000000001', 1, 'Ngày 1: Khởi hành & Khám phá Vịnh',
   'Đón khách tại Hà Nội, di chuyển đến cảng Hạ Long. Lên du thuyền, ăn trưa trên tàu. Chiều tham quan hang Sửng Sốt, chèo kayak khám phá làng chài. Tối: BBQ hải sản, ngắm hoàng hôn.', 1),
  ('b1000000-0000-0000-0000-000000000001', 2, 'Ngày 2: Bình minh & Trở về',
   'Sáng sớm: tập Tai Chi trên boong tàu, ngắm bình minh trên vịnh. Ăn sáng buffet. Tham quan đảo Ti Tốp, tắm biển. Trưa: ăn trưa trên tàu và trở về cảng.', 2),

  -- Hội An - Mỹ Sơn
  ('b1000000-0000-0000-0000-000000000002', 1, 'Ngày 1: Đến Hội An - Phố cổ đêm',
   'Đón khách tại sân bay Đà Nẵng, di chuyển về Hội An. Chiều tự do khám phá phố cổ, mua sắm lụa và đồ thủ công. Tối: thả hoa đăng trên sông Hoài, thưởng thức cao lầu.', 1),
  ('b1000000-0000-0000-0000-000000000002', 2, 'Ngày 2: Thánh địa Mỹ Sơn - Làm đèn lồng',
   'Sáng: tham quan Thánh địa Mỹ Sơn (Di sản UNESCO). Chiều: workshop làm đèn lồng truyền thống. Tối: lớp học nấu ẩm thực Hội An.', 2),
  ('b1000000-0000-0000-0000-000000000002', 3, 'Ngày 3: Bãi biển An Bàng - Tiễn khách',
   'Sáng: đạp xe quanh làng rau Trà Quế. Trưa: tắm biển An Bàng. Chiều: tự do mua sắm, tiễn khách.', 3),

  -- Fansipan
  ('b1000000-0000-0000-0000-000000000003', 1, 'Ngày 1: Đến Sa Pa - Bản Cát Cát',
   'Đón khách tại ga Lào Cai, di chuyển về Sa Pa. Chiều: trekking bản Cát Cát, tìm hiểu văn hóa H''Mông. Tối: lẩu cá hồi Sa Pa.', 1),
  ('b1000000-0000-0000-0000-000000000003', 2, 'Ngày 2: Chinh phục Fansipan',
   'Cả ngày: chinh phục đỉnh Fansipan bằng cáp treo hoặc trekking (tùy chọn). Chụp ảnh tại đỉnh 3.143m. Tối: chợ đêm Sa Pa.', 2),
  ('b1000000-0000-0000-0000-000000000003', 3, 'Ngày 3: Ruộng bậc thang - Trở về',
   'Sáng: ngắm ruộng bậc thang Mường Hoa. Mua đồ thổ cẩm làm quà. Trưa: trở về ga Lào Cai.', 3),

  -- Đà Nẵng
  ('b1000000-0000-0000-0000-000000000004', 1, 'Ngày 1: Đà Nẵng - Bà Nà Hills',
   'Đón khách sân bay. Lên Bà Nà Hills bằng cáp treo, check-in Cầu Vàng, vui chơi Fantasy Park. Tối: ăn tối hải sản Đà Nẵng.', 1),
  ('b1000000-0000-0000-0000-000000000004', 2, 'Ngày 2: Sơn Trà - Mỹ Khê',
   'Sáng: tham quan bán đảo Sơn Trà, chùa Linh Ứng. Chiều: tắm biển Mỹ Khê. Tối: cầu Rồng phun lửa (Cuối tuần).', 2),
  ('b1000000-0000-0000-0000-000000000004', 3, 'Ngày 3: Phố cổ Hội An',
   'Cả ngày khám phá phố cổ Hội An: Chùa Cầu, nhà cổ, may áo dài. Tối: thả hoa đăng.', 3),
  ('b1000000-0000-0000-0000-000000000004', 4, 'Ngày 4: Ngũ Hành Sơn - Tiễn khách',
   'Sáng: tham quan Ngũ Hành Sơn, làng đá Non Nước. Trưa: mì Quảng truyền thống. Chiều: tiễn khách sân bay.', 4),

  -- Đà Lạt
  ('b1000000-0000-0000-0000-000000000006', 1, 'Ngày 1: Đến Đà Lạt - Hồ Xuân Hương',
   'Đón khách sân bay Liên Khương. Check-in khách sạn. Chiều: dạo quanh Hồ Xuân Hương, chợ Đà Lạt. Tối: cafe view đẹp.', 1),
  ('b1000000-0000-0000-0000-000000000006', 2, 'Ngày 2: Thác Datanla - Đồi chè',
   'Sáng: trượt máng thác Datanla. Tham quan đồi chè Cầu Đất. Chiều: Crazy House, vườn hoa thành phố. Tối: bánh tráng nướng phố ẩm thực.', 2),
  ('b1000000-0000-0000-0000-000000000006', 3, 'Ngày 3: Thung Lũng Tình Yêu - Tiễn khách',
   'Sáng: Thung Lũng Tình Yêu, chụp ảnh vườn hoa. Trưa: đặc sản nem nướng Đà Lạt. Chiều: mua đặc sản, tiễn khách.', 3);

