import "./App.css";
import Header from "./layouts/Header";
import ButtonNav from "./layouts/ButtonNav";
import About from "./components/About";
import Home from "./components/Home";
import Portfolio from "./components/Portfolio";
import Skills from "./components/Skills";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./layouts/Footer";

function App() {
  const location = useLocation();
  return (
    <motion.div key={location.hash}>
      <Header />
      <ButtonNav />
      <Home />
      <About />
      <Skills />
      <Portfolio />
      <Testimonial />
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default App;
