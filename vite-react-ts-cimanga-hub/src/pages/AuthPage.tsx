import { supabase } from "@/libs/supabase";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { useLocation } from "react-router-dom";

export const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleGoogleLogin = async () => {
    setLoading(true);

    const originUrl = location.state?.from?.pathname || "/profile";
    const searchParams = location.state?.from?.search || "";
    const redirectTo = `${window.location.origin}${originUrl}${searchParams}`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectTo,

        queryParams: {
          access_type: "offline",
          prompt: "select_account",
        },
      },
    });

    if (error) {
      alert("Lỗi đăng nhập: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <h1 className="text-4xl font-black tracking-tighter text-red-600 mb-2">
          CIMANGA HUB
        </h1>
        <p className="text-gray-500 text-sm mb-10">
          Đăng nhập để lưu phim và đồng bộ lịch sử xem
        </p>

        {/* Nút Google duy nhất */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-button py-4 rounded-2xl font-bold hover:bg-button/50 transition-all active:scale-95 disabled:opacity-50 shadow-lg"
        >
          {loading ? (
            <FiLoader className="animate-spin" size={20} />
          ) : (
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-6 h-6"
              alt="google"
            />
          )}
          Tiếp tục với Google
        </button>

        <p className="mt-8 text-10 text-muted-foreground uppercase tracking-widest px-4">
          Bằng cách đăng nhập, bạn đồng ý với các điều khoản dịch vụ của chúng
          tôi.
        </p>
      </div>
    </div>
  );
};
