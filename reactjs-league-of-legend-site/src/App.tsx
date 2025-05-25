import "./App.css";
import { useAppContext } from "app/context";
import Loader from "components/Loader";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "pages/HomePage";
import ChampionListPage from "pages/ChampionListPage";
import ChampionIDPage from "pages/ChampionIDPage";
import ItemListPage from "pages/ItemListPage";
import Header from "components/Header";
import SlideLeft from "components/SlideLeft";
import { useEffect, useState } from "react";
import OtherPage from "pages/OtherPage";
import Footer from "components/Footer";
import AboutPage from "pages/AboutPage";
import NotFoundPage from "pages/NotFoundPage";

function App() {
  const { isLoading } = useAppContext();
  const [isSliderLeft, setIsSliderLeft] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <Header setIsSliderLeft={setIsSliderLeft} />
      {isSliderLeft && <SlideLeft setIsSliderLeft={setIsSliderLeft} />}
      <div>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/champion-list" element={<ChampionListPage />} />
          <Route path="/champion-id/:id" element={<ChampionIDPage />} />
          <Route path="/item-list" element={<ItemListPage />} />
          <Route path="/item-id/:id" element={<ChampionIDPage />} />
          <Route path="/other" element={<OtherPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
      {isLoading && <Loader />}
    </>
  );
}

export default App;
