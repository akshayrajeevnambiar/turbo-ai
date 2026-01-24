import { Hero } from "../components/Hero";
import { About } from "../components/About";
import CredentialsGrid from "../components/CredentialsGrid";
import { Expertise } from "../components/Expertise";
import { Impact } from "../components/Impact.tsx";
import { Partners } from "../components/PartnersMarquee";
import { PartnersMarqueeMobile } from "../components/PartnersMarqueeMobile";
import { Perspectives } from "../components/Perspectives";
import { Connect } from "../components/Connect";
import { SEO } from "../components/SEO";

export function Home() {
    return (
        <>
            <SEO pageKey="home" />
            <main id="main" role="main">
                <Hero />
                <About />
                <CredentialsGrid />
                <Expertise />
                <Impact />
                <div className="hidden md:block">
                    <Partners />
                </div>
                <div className="block md:hidden">
                    <PartnersMarqueeMobile />
                </div>
                <Perspectives />
                <Connect />
            </main>
        </>
    );
}
