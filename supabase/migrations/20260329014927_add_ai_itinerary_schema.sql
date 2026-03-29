CREATE TABLE ai_itineraries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,                       -- Ví dụ: "Đà Nẵng 3N2Đ - 10 triệu"
  prompt TEXT NOT NULL,             -- Prompt gốc của user
  result JSONB NOT NULL,            -- Kết quả lịch trình từ AI (structured JSON)
  destination_name TEXT,            -- Tên địa điểm chính
  duration_days INT,
  budget NUMERIC(12,0),
  num_people INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_itineraries_user ON ai_itineraries(user_id);

--  AI PROMPT LOGS (Log cho Admin thống kê)


CREATE TABLE ai_prompt_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  prompt TEXT NOT NULL,
  tokens_used INT,
  model TEXT DEFAULT 'gpt-4o-mini',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_logs_created ON ai_prompt_logs(created_at);

ALTER TABLE ai_itineraries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own itineraries"
  ON ai_itineraries FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save itineraries"
  ON ai_itineraries FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own itineraries"
  ON ai_itineraries FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all itineraries"
  ON ai_itineraries FOR SELECT USING (is_admin());

-- -------------------------------------------------------
-- AI PROMPT LOGS
-- -------------------------------------------------------
ALTER TABLE ai_prompt_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view prompt logs"
  ON ai_prompt_logs FOR SELECT USING (is_admin());

CREATE POLICY "Authenticated users can create logs"
  ON ai_prompt_logs FOR INSERT WITH CHECK (auth.uid() = user_id);