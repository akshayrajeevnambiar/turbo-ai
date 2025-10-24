import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import CredentialsGrid from "./components/CredentialsGrid";
import { Expertise } from "./components/Expertise";
import { Impact } from "./components/Impact.tsx";
import { Perspectives } from "./components/Perspectives";
import { Connect } from "./components/Connect";
import { Footer } from "./components/Footer";
import { useScrollJacker } from "./lib/scrollJacker";

function App() {
  // Initialize scroll jacking system
  useScrollJacker();

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
