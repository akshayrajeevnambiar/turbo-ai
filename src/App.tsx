import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { AITransformation } from "./pages/AITransformation";
import { tokens } from "./content/turboai";

function App() {
  const { pathname, hash } = useLocation();

  // Handle scroll to hash on route change
  useEffect(() => {
    // If there is a hash, scroll to it
    if (hash) {
      const sectionId = hash.replace("#", "");
      // slight delay to ensure content is rendered
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = tokens.layout.headerH;
          const targetY = element.offsetTop - headerHeight;

          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      // If no hash and path changed, scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-transformation" element={<AITransformation />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
