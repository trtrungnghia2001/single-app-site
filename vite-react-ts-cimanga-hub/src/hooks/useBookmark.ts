import type { MovieData } from "@/components/custom/ButtonMediaAuth";
import { supabase } from "@/libs/supabase";
import { useState, useEffect } from "react";

export const useBookmark = (movieData: MovieData) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkStatus = async (userId: string | undefined) => {
      if (!userId) {
        setIsBookmarked(false);
        return;
      }
      const { data } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", userId)
        .eq("slug", movieData.slug) // Dùng slug ở đây
        .maybeSingle();

      setIsBookmarked(!!data);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") setIsBookmarked(false);
      else if (session?.user) checkStatus(session.user.id);
    });

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) checkStatus(user.id);
    });

    return () => subscription.unsubscribe();
  }, [movieData.slug]);

  const toggleBookmark = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Đăng nhập để sử dụng tính năng này bro!");
      return;
    }

    setLoading(true);
    const previousState = isBookmarked;
    setIsBookmarked(!previousState);

    try {
      if (previousState) {
        await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("slug", movieData.slug);
      } else {
        await supabase.from("bookmarks").insert({
          user_id: user.id,
          slug: movieData.slug,
          name: movieData.name,
          thumb_url: movieData.thumb_url,
          type: movieData.type,
        });
      }
    } catch (error) {
      setIsBookmarked(previousState);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { isBookmarked, toggleBookmark, loading };
};
