import "./App.css";
import Header from "./layouts/Header";
import ButtonNav from "./layouts/ButtonNav";
import About from "./components/About";
import Home from "./components/Home";
import Portfolio from "./components/Portfolio";
import Skills from "./components/Skills";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import Footer from "./layouts/Footer";

function App() {
  return (
    <>
      <Header />
      <ButtonNav />
      <Home />
      <About />
      <Skills />
      <Portfolio />
      <Testimonial />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
