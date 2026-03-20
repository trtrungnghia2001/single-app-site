import { useLocation, useRoutes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import MangaDetailPage from "./pages/MangaDetailPage";
import MangaChapterPage from "./pages/MangaChapterPage";
import { useEffect } from "react";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import { useAuthStore } from "./stores/authStore";
import { AuthPage } from "./pages/AuthPage";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { ProfilePage } from "./pages/ProfilePage";
import AuthLayout from "./components/layout/AuthLayout";
import FavoritePage from "./pages/FavoritePage";
import HistoryPage from "./pages/HistoryPage";

const App = () => {
  const routes = useRoutes([
    {
      path: `signin`,
      element: <AuthPage />,
    },
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: `search`,
      element: <SearchPage />,
    },
    {
      path: `movie`,
      element: <SearchPage />,
    },
    {
      path: `manga`,
      element: <SearchPage />,
    },
    {
      path: `anime`,
      element: <SearchPage />,
    },
    {
      path: `data-book`,
      element: <SearchPage />,
    },
    {
      path: `movie/:slug`,
      element: <MovieDetailPage />,
    },
    {
      path: `manga/:slug`,
      element: <MangaDetailPage />,
    },
    {
      path: `manga/:slug/chapter/:id`,
      element: <MangaChapterPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
    {
      element: (
        <AuthLayout>
          <ProtectedRoute />
        </AuthLayout>
      ),
      children: [
        {
          path: `/profile`,
          element: <ProfilePage />,
        },
        {
          path: `/bookmark`,
          element: <FavoritePage />,
        },
        {
          path: `/history`,
          element: <HistoryPage />,
        },
      ],
    },
  ]);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);
  return (
    <div>
      <Header />
      <main>{routes}</main>
      <Footer />
    </div>
  );
};

export default App;
