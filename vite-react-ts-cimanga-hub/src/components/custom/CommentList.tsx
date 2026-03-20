import { IMAGE_DEFAULT } from "@/constants";
import { supabase } from "@/libs/supabase";
import { useAuthStore } from "@/stores/authStore";
import type { CommentResponse, MediaType } from "@/types";
import { memo, useEffect, useState } from "react";
import CommentForm from "../form/CommentForm";

interface CommentListProps {
  slug: string;
  type: MediaType;
}

const CommentList = ({ slug, type }: CommentListProps) => {
  const { profile: currentUser } = useAuthStore();
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Fetch danh sách bình luận dựa trên slug và type
  useEffect(() => {
    // 1. Hàm fetch dữ liệu (giữ nguyên logic của bro)
    const fetchComments = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("comments")
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
          .eq("slug", slug)
          .eq("type", type)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setComments(data as unknown as CommentResponse[]);
      } catch (error) {
        console.error("Lỗi tải bình luận:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();

    // 2. Thiết lập Real-time Channel
    const channel = supabase
      .channel(`comments_room_${slug}_${type}`) // Đặt tên channel duy nhất cho room này
      .on(
        "postgres_changes",
        {
          event: "INSERT", // Lắng nghe khi có bình luận mới
          schema: "public",
          table: "comments",
          filter: `slug=eq.${slug}`, // Quan trọng: Lọc đúng slug đang xem
        },
        async (payload) => {
          // Khi có comment mới, ta fetch lại hoặc fetch đúng dòng vừa insert
          // Cách nhanh nhất để có đủ cả data profiles (username, avatar) là fetch lại record đó:
          const { data, error } = await supabase
            .from("comments")
            .select(
              `id, content, created_at, slug, type, profiles (username, avatar_url)`
            )
            .eq("id", payload.new.id)
            .single();

          if (data && !error) {
            setComments((prev) => {
              // KIỂM TRA TRÙNG: Nếu ID này đã có trong danh sách rồi thì trả về danh sách cũ
              const isExisted = prev.some((c) => c.id === data.id);
              if (isExisted) return prev;

              // Nếu chưa có (do Real-time nhận trước hoặc chưa kịp add từ form) thì mới add
              return [data as unknown as CommentResponse, ...prev];
            });
          }
        }
      )
      .subscribe();

    // 3. Cleanup: Hủy channel khi component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug, type]); // Khi đổi phim, useEffect này chạy lại, hủy channel cũ và tạo channel mới

  // 2. Xử lý khi thêm comment thành công từ Form
  const handleCommentSuccess = (newComment: CommentResponse) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div id="comment-section" className="space-y-6">
      <div className="space-y-2">
        <h6 className="text-lg font-bold">Bình luận ({comments.length})</h6>
        {!currentUser && (
          <p className="text-sm text-muted-foreground">
            Vui lòng đăng nhập để tham gia bình luận.
          </p>
        )}
      </div>

      {/* Truyền các props cần thiết vào Form */}
      <CommentForm
        slug={slug}
        type={type}
        onCommentSuccess={handleCommentSuccess}
      />

      <ul className="mt-8 space-y-8">
        {loading ? (
          <li className="text-muted-foreground animate-pulse text-sm">
            Đang tải bình luận...
          </li>
        ) : comments.length === 0 ? (
          <li className="text-muted-foreground italic text-sm">
            Chưa có bình luận nào
          </li>
        ) : (
          comments.map((comment) => (
            <li key={comment.id} className="flex items-start gap-3 group">
              <img
                src={comment.profiles?.avatar_url || IMAGE_DEFAULT.AVATAR}
                alt="avatar"
                loading="lazy"
                className="w-10 aspect-square border border-border rounded-full overflow-hidden object-center object-cover shrink-0"
              />
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm">
                    {comment.profiles?.username || "Người dùng ẩn danh"}
                  </span>
                  <span className="text-10 text-muted-foreground">
                    {new Date(comment.created_at).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                {/* Hiển thị nội dung comment */}
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap wrap-break-word">
                  {comment.content}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default memo(CommentList);
