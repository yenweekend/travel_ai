"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, MapPin, CalendarDays, Users, Wallet, Send,
  Loader2, Clock, Utensils, Camera, Hotel, ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface Activity {
  time: string;
  activity: string;
  icon: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  activities: Activity[];
}

interface ItineraryResult {
  title: string;
  summary: string;
  estimated_budget: string;
  days: ItineraryDay[];
}

const activityIcons: Record<string, typeof Camera> = {
  hotel: Hotel,
  camera: Camera,
  food: Utensils,
};

export default function AiPlannerPage() {
  const [formData, setFormData] = useState({
    destination: "",
    days: "3",
    people: "2",
    budget: "",
    interests: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ItineraryResult | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("/api/ai/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Đã xảy ra lỗi");
        return;
      }

      setResult(data.itinerary);
      setExpandedDay(1);
    } catch {
      setError("Không thể kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary/10 to-accent/10 text-primary font-medium text-sm mb-4"
        >
          <Sparkles className="w-4 h-4" />
          Công nghệ AI tiên tiến
        </motion.div>
        <h1 className="text-3xl lg:text-5xl font-bold mb-3">
          Lên kế hoạch với <span className="text-gradient">AI Planner</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Chỉ cần nhập địa điểm và sở thích, AI sẽ tạo lịch trình chi tiết cho chuyến đi hoàn hảo của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border p-6 bg-white space-y-5 sticky top-24"
          >
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Thông tin chuyến đi
            </h2>

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Điểm đến
              </Label>
              <Input
                placeholder="VD: Đà Nẵng, Phú Quốc..."
                value={formData.destination}
                onChange={(e) => setFormData((p) => ({ ...p, destination: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" /> Số ngày
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="14"
                  value={formData.days}
                  onChange={(e) => setFormData((p) => ({ ...p, days: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> Số người
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.people}
                  onChange={(e) => setFormData((p) => ({ ...p, people: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Wallet className="w-4 h-4" /> Ngân sách (VNĐ)
              </Label>
              <Input
                placeholder="VD: 10000000"
                value={formData.budget}
                onChange={(e) => setFormData((p) => ({ ...p, budget: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Sở thích & Yêu cầu</Label>
              <Textarea
                placeholder="VD: Thích ẩm thực địa phương, muốn tắm biển, không leo núi nhiều..."
                rows={3}
                value={formData.interests}
                onChange={(e) => setFormData((p) => ({ ...p, interests: e.target.value }))}
              />
            </div>

            <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  AI đang tạo lịch trình...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Tạo lịch trình
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Result */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                  <Sparkles className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="mt-6 font-medium text-lg">AI đang lên kế hoạch...</p>
                <p className="text-sm text-muted-foreground">Phân tích điểm đến, thời tiết, ẩm thực và lối đi tối ưu</p>
              </motion.div>
            )}

            {!loading && !result && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sẵn sàng lên đường!</h3>
                <p className="text-muted-foreground max-w-sm">
                  Nhập thông tin chuyến đi bên trái và để AI tạo lịch trình hoàn hảo cho bạn
                </p>
                {error && (
                  <p className="text-destructive mt-4 text-sm">{error}</p>
                )}
              </motion.div>
            )}

            {!loading && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Summary */}
                <div className="rounded-2xl border border-border p-6 bg-linear-to-br from-primary/5 to-accent/5">
                  <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
                  <p className="text-muted-foreground mb-4">{result.summary}</p>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default" className="gap-1">
                      <CalendarDays className="w-3 h-3" /> {result.days.length} ngày
                    </Badge>
                    <Badge variant="warning" className="gap-1">
                      <Wallet className="w-3 h-3" /> {result.estimated_budget}
                    </Badge>
                  </div>
                </div>

                {/* Day by day */}
                {result.days.map((day) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: day.day * 0.08 }}
                    className="rounded-2xl border border-border bg-white overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedDay(expandedDay === day.day ? null : day.day)
                      }
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                          {day.day}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold">Ngày {day.day}: {day.title}</p>
                          <p className="text-xs text-muted-foreground">{day.activities.length} hoạt động</p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform ${
                          expandedDay === day.day ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedDay === day.day && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 space-y-3">
                            {day.activities.map((act, idx) => {
                              const Icon = activityIcons[act.icon] || Camera;
                              return (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/50"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> {act.time}
                                    </p>
                                    <p className="text-sm font-medium">{act.activity}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => { setResult(null); setExpandedDay(null); }}
                  >
                    Tạo lại
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
