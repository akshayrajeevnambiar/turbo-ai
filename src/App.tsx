import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import CredentialsGrid from "./components/CredentialsGrid";
import { Expertise } from "./components/Expertise";
import { Impact } from "./components/Impact.tsx";
import { Clientele } from "./components/Clientele";
import { Partners } from "./components/Partners";
import { Perspectives } from "./components/Perspectives";
import { Blog } from "./components/Blog";
import { Connect } from "./components/Connect";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main id="main" role="main">
        <Hero />
        <About />
        <CredentialsGrid />
        <Expertise />
        <Impact />
        <Clientele />
        <Partners />
        <Perspectives />
        <Blog />
        <Connect />
      </main>
      <Footer />
    </>
  );
}

export default App;
