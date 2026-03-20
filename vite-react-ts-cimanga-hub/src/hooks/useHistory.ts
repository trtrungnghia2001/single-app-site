import { useState, useCallback } from "react";
import { supabase } from "@/libs/supabase";

// Định nghĩa Interface khớp với DB
export interface HistoryItem {
  slug: string;
  name: string;
  thumb_url: string;
  type: "movie" | "manga";
  episode_name?: string;
  progress?: number;
}

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 1. Hàm lưu hoặc cập nhật lịch sử (UPSERT)
  const saveHistory = async (item: HistoryItem) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const { error } = await supabase.from("history").upsert(
        {
          user_id: user.id,
          slug: item.slug,
          name: item.name,
          thumb_url: item.thumb_url,
          type: item.type,
          episode_name: item.episode_name || "",
          progress: item.progress || 0,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,slug" } // Cực kỳ quan trọng để không bị lặp dòng
      );

      if (error) throw error;
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  // 2. Hàm lấy danh sách lịch sử (FETCH)
  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setHistory([]);
        return;
      }

      const { data, error } = await supabase
        .from("history")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Hàm xóa lịch sử (DELETE)
  const removeHistory = async (slug: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Optimistic UI: Xóa luôn trên giao diện
    setHistory((prev) => prev.filter((item) => item.slug !== slug));

    await supabase
      .from("history")
      .delete()
      .eq("user_id", user.id)
      .eq("slug", slug);
  };

  return { history, loading, saveHistory, fetchHistory, removeHistory };
};
