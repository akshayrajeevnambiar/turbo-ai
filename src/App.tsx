import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import CredentialsGrid from "./components/CredentialsGrid";
import { Expertise } from "./components/Expertise";
import { Impact } from "./components/Impact.tsx";
import { Perspectives } from "./components/Perspectives";
import { Connect } from "./components/Connect";
import { Footer } from "./components/Footer";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";

type PageType = 'home' | 'privacy-policy';

// Simple page context
export const PageContext = {
  navigateTo: (page: PageType) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  }
};

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  useEffect(() => {
    // Listen for navigation events
    const handleNavigate = (event: CustomEvent<PageType>) => {
      setCurrentPage(event.detail);
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    
    // Handle browser back/forward
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/privacy-policy') {
        setCurrentPage('privacy-policy');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Check initial URL
    handlePopState();

    return () => {
      window.removeEventListener('navigate', handleNavigate as EventListener);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateToHome = () => {
    setCurrentPage('home');
    window.history.pushState({}, '', '/');
  };

  if (currentPage === 'privacy-policy') {
    return (
      <>
        <Header />
        <main id="main" role="main">
          <PrivacyPolicyPage />
          <div className="text-center py-8">
            <button
              onClick={navigateToHome}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              ← Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main" role="main">
        <Hero />
        <About />
        <CredentialsGrid />
        <Expertise />
        <Impact />
        <Perspectives />
        <Connect />
      </main>
      <Footer />
    </>
  );
}

export default App;
