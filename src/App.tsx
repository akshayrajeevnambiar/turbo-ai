import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Credentials } from "./components/Credentials";
import { Expertise } from "./components/Expertise";
import { Impact } from "./components/Impact";
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
        <Credentials />
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
