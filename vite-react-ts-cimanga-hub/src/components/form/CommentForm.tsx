import { supabase } from "@/libs/supabase";
import { useAuthStore } from "@/stores/authStore";
import type { CommentResponse, MediaType } from "@/types";
import { memo, useState, type ChangeEvent, type FormEvent } from "react";
import { MdSend } from "react-icons/md";

interface CommentFormProps {
  slug: string;
  type: MediaType;
  onCommentSuccess?: (newComment: CommentResponse) => void;
}

const CommentForm = ({ slug, type, onCommentSuccess }: CommentFormProps) => {
  const { profile: currentUser } = useAuthStore();
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) return alert("Bro đăng nhập đã nhé!");
    if (!text.trim() || loading) return;

    setLoading(true);

    try {
      // Gửi lên bảng comments với type tương ứng
      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            content: text.trim(),
            slug: slug,
            type: type, // Sẽ lưu là 'manga' hoặc 'movie'
            user_id: currentUser.id,
          },
        ])
        .select(
          `
          id, 
          content, 
          created_at, 
          slug,
          type,
          profiles (username, avatar_url)
        `
        )
        .single();

      if (error) throw error;

      if (data) {
        setText("");
        if (onCommentSuccess)
          onCommentSuccess(data as unknown as CommentResponse);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Đã có lỗi xảy ra!";

      console.error("Lỗi gửi bình luận:", errorMessage);

      alert(`Lỗi: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-lg p-2 bg-input border border-white/5"
    >
      <span className="text-muted-foreground text-10 absolute top-2 right-6">
        {text.length}/1000
      </span>

      <textarea
        value={text}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          if (e.target.value.length <= 1000) setText(e.target.value);
        }}
        className="w-full rounded-lg p-4 bg-background outline-none transition-all focus:ring-1 focus:ring-yellow-500/30 text-sm custom-scrollbar"
        placeholder={`Bình luận về ${
          type === "manga" ? "bộ truyện" : "phim"
        } này...`}
        rows={5}
        disabled={!currentUser || loading}
      />

      <div className="flex items-center justify-between py-2 px-1">
        <div className="text-[11px] text-muted-foreground">
          {!currentUser
            ? "Bạn cần đăng nhập để bình luận"
            : "Đóng góp ý kiến văn minh"}
        </div>

        <button
          type="submit"
          disabled={!text.trim() || loading || !currentUser}
          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-600 disabled:opacity-30 transition-all cursor-pointer"
        >
          <span className="font-bold text-sm uppercase">
            {loading ? "Đang gửi" : "Gửi"}
          </span>
          <MdSend size={18} />
        </button>
      </div>
    </form>
  );
};

export default memo(CommentForm);
