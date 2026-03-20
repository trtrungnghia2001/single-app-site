import { useAuthStore } from "@/stores/authStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  // Khi đang kiểm tra session từ Supabase, cho hiện màn hình chờ
  // if (loading) {
  //   return (
  //     <div className="flex h-screen w-full items-center justify-center bg-black">
  //       <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
  //     </div>
  //   );
  // }

  if (loading) return null;

  // Nếu không có user, đá về trang Auth
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Nếu có user, cho phép vào (Outlet đại diện cho các con bên trong)
  return <Outlet />;
};
