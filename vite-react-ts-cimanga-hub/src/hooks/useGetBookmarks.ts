import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/libs/supabase";
import type { MovieData } from "@/components/custom/ButtonMediaAuth";

export const useGetBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return setBookmarks([]);

      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeBookmark = async (slug: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    setBookmarks((prev) => prev.filter((item) => item.slug !== slug));

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", user.id)
      .eq("slug", slug);

    if (error) {
      fetchBookmarks();
      alert("Lỗi khi xóa rồi bro!");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return { bookmarks, loading, removeBookmark, refresh: fetchBookmarks };
};
