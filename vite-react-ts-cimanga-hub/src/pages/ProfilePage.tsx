import { useState } from "react";
import { supabase } from "@/libs/supabase";
import { useMutation } from "@tanstack/react-query";
import { HiOutlineCamera, HiOutlineUser } from "react-icons/hi2";
import { IoReloadOutline } from "react-icons/io5";
import { useAuthStore } from "@/stores/authStore";
import clsx from "clsx";
import { HiOutlineMail } from "react-icons/hi";

// 1. Định nghĩa Type cho payload để không dùng 'any'
interface ProfileUpdatePayload {
  username?: string;
  avatar_url?: string;
  updated_at?: string;
}

export const ProfilePage = () => {
  const { profile, updateProfile } = useAuthStore();

  const [form, setForm] = useState({
    username: profile?.username || "",
    isUploading: false,
    showSuccess: false,
  });

  // 2. Fix Type cho mutation: nhận vào ProfileUpdatePayload
  const mutation = useMutation({
    mutationFn: async (newUpdates: ProfileUpdatePayload) => {
      const result = await updateProfile(newUpdates);
      if (!result.success) throw new Error(result.error as string);
      return result;
    },
    onSuccess: () => {
      setForm((prev) => ({ ...prev, showSuccess: true }));
      setTimeout(
        () => setForm((prev) => ({ ...prev, showSuccess: false })),
        3000
      );
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    try {
      setForm((prev) => ({ ...prev, isUploading: true }));
      const fileExt = file.name.split(".").pop();
      const filePath = `${profile.id}/${Date.now()}.${fileExt}`;

      const { error: upError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (upError) throw upError;

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      await mutation.mutateAsync({ avatar_url: urlData.publicUrl });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      alert("Lỗi: " + msg);
    } finally {
      setForm((prev) => ({ ...prev, isUploading: false }));
    }
  };

  return (
    <div className="">
      <div className="">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-red-600/20 group-hover:border-red-600 transition-all shadow-inner">
              <img
                src={
                  profile?.avatar_url ||
                  `https://ui-avatars.com/api/?name=${profile?.username}`
                }
                className="w-full h-full object-cover"
                alt="Profile"
              />
            </div>
            <label className="absolute -bottom-1 -right-1 bg-red-600 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
              {form.isUploading ? (
                <IoReloadOutline className="animate-spin text-lg" />
              ) : (
                <HiOutlineCamera className="text-lg" />
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleUpload}
                disabled={form.isUploading}
                accept="image/*"
              />
            </label>
          </div>
          <h2 className="mt-4 text-xl font-bold tracking-tight">
            {profile?.username || "Thành viên"}
          </h2>
        </div>

        {/* Form Inputs */}
        <div className="space-y-5">
          <div className="space-y-5">
            <div className="input-group">
              <label className="input-label">Tên hiển thị</label>
              <div className="relative">
                <HiOutlineUser className="input-icon" />
                <input
                  type="text"
                  className="input-field"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  placeholder="Nhập tên của bạn..."
                />
              </div>
            </div>

            <div className="input-group opacity-60">
              <label className="input-label">Email</label>
              <div className="relative">
                <HiOutlineMail className="input-icon" />
                <input
                  type="text"
                  className="input-field"
                  value={profile?.email || ""}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Button giữ nguyên text, chỉ đổi màu khi thành công */}
          <button
            onClick={() => mutation.mutate({ username: form.username })}
            disabled={mutation.isPending || !form.username}
            className={clsx(
              "w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center mt-4 active:scale-95 shadow-lg shadow-red-600/10 text-white",
              form.showSuccess ? "bg-green-600" : "bg-red-600 hover:bg-red-700",
              (mutation.isPending || !form.username) &&
                "opacity-50 cursor-not-allowed"
            )}
          >
            {mutation.isPending ? (
              <IoReloadOutline className="animate-spin text-xl" />
            ) : form.showSuccess ? (
              "ĐÃ CẬP NHẬT"
            ) : (
              "CẬP NHẬT HỒ SƠ"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
