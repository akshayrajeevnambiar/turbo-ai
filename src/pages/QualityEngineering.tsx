import { Container, Section } from "../components/Container";
import { useReveal } from "../hooks/useReveal";
import { SectionLink } from "../components/SectionLink";
import { SEO } from "../components/SEO";
import { FAQ } from "../components/FAQ";
import heroImage from "../assets/quality-engineering-hero.png";

export function QualityEngineering() {
    const { addElement } = useReveal(40);

    return (
        <main className="bg-charcoal" role="main">
            <SEO pageKey="qualityEngineering" />
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-charcoalDeep">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Quality Engineering Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoalDeep/80 via-charcoalDeep/60 to-charcoalDeep" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-emerald/10 to-charcoal pointer-events-none z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] opacity-60" />

                <Container className="relative z-10 w-full">
                    <div className="max-w-5xl mx-auto text-center md:text-left">
                        <div ref={addElement} className="inline-block px-4 py-1.5 rounded-full border border-emeraldNeon/30 bg-emeraldNeon/10 text-emeraldNeon text-sm font-medium mb-8">
                            Service Overview
                        </div>
                        <h1
                            ref={addElement}
                            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-none"
                        >
                            Quality Engineering <span className="text-emeraldNeon block mt-2">Canada</span>
                        </h1>
                        <p
                            ref={addElement}
                            className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl leading-relaxed"
                        >
                            Building software that works the way people actually use it.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Intro Section - Making Quality Part of How Software Gets Built */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <h2
                            ref={addElement}
                            className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white mb-12"
                        >
                            Making Quality Part of <span className="text-emeraldNeon">How Software Gets Built</span>
                        </h2>
                        <div className="space-y-8 text-lg md:text-xl text-white/80 leading-relaxed font-body">
                            <p ref={addElement}>
                                The speed at which software ships doesn't make it great. It is defined by how well it works when real people use it, under stress, on a large scale, and over time.
                            </p>
                            <p ref={addElement}>
                                Across Canada, businesses are releasing digital products faster than ever. From financial platforms in Toronto to energy systems in Calgary, SaaS teams in Vancouver, and public-sector technology in Edmonton, the stakes are high. A small problem can lead to customer anger, downtime, or a loss of trust.
                            </p>
                            <p ref={addElement} className="font-semibold text-white text-2xl border-l-4 border-emeraldNeon pl-6 py-2 bg-emeraldNeon/5 rounded-r-lg">
                                That's where Quality Engineering comes in: it's not just a last-minute check, it's part of how software is made from the beginning.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Quality Built In, Not Tacked On */}
            <Section className="bg-navy/30 border-y border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2
                                ref={addElement}
                                className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8"
                            >
                                Quality Built In, <span className="text-red-500">Not Tacked On</span>
                            </h2>
                            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                                <p ref={addElement}>
                                    Traditional testing waits until the end. Quality Engineering doesn’t.
                                </p>
                                <p ref={addElement}>
                                    We build quality into every step of development so that problems are found early, before they become costly, disruptive, or affect customers. Teams don't have to rush before the release; they gain confidence throughout the process.
                                </p>
                                <p ref={addElement}>
                                    This method allows for faster releases without sacrificing stability. It also makes the development cycle calmer, where quality isn't a big deal; it's just how things are.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-emeraldNeon/20 blur-3xl opacity-20 rounded-full" />
                            <div className="relative bg-charcoal p-8 md:p-10 border border-white/10 rounded-2xl shadow-2xl">
                                <p className="text-xl md:text-2xl text-white font-medium mb-6 leading-relaxed">
                                    "Quality Engineering isn't about being perfect. It's about software that works the way people expect it to."
                                </p>
                                <div className="h-0.5 w-16 bg-emeraldNeon mb-6" />
                                <p className="text-white/70">
                                    Reliability builds trust. When systems work consistently, teams move faster and leadership stops worrying.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Automation and Continuous Quality */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto mb-16 text-center">
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-6">
                            Automation That Supports Speed
                        </h2>
                        <p ref={addElement} className="text-xl text-white/70">
                            Automation should make teams more effective, not more frustrated. We design automated testing frameworks that fit how your teams actually build and deploy software.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
                        <div ref={addElement} className="col-span-1 p-8 rounded-xl bg-charcoalDeep border border-white/5">
                            <h3 className="text-xl font-semibold text-emeraldNeon mb-4">The Result</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="text-emeraldNeon mt-1">•</span>
                                    <span className="text-white/80">Faster feedback while developing</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emeraldNeon mt-1">•</span>
                                    <span className="text-white/80">Less last-minute surprises</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emeraldNeon mt-1">•</span>
                                    <span className="text-white/80">More consistent releases in different environments</span>
                                </li>
                            </ul>
                        </div>
                        <div ref={addElement} className="col-span-1 p-8 rounded-xl bg-charcoalDeep border border-white/5 flex items-center justify-center">
                            <p className="text-white/80 leading-relaxed italic text-lg text-center">
                                "It's not about testing everything when you automate. It's about testing the right things at the right time."
                            </p>
                        </div>
                    </div>


                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Continuous Quality in Modern Delivery Pipelines",
                                body: "Quality has to keep up with faster release cycles. We make sure that testing and validation are part of the CI/CD workflows, so quality checks happen automatically. Problems come up quickly, when they are still easy to fix."
                            },
                            {
                                title: "Testing That Reflects Real Users and Real Conditions",
                                body: "Software rarely fails in perfect conditions. We focus on testing that is like how your customers really use your product, on all the devices, platforms, and situations that are important to them. That’s how quality becomes meaningful."
                            },
                            {
                                title: "Supporting Teams Across Canada",
                                body: "We work with teams in Toronto, Calgary, Vancouver, and Edmonton, changing quality practices to fit the needs of the industry, the structure of the team, and the rules that govern the work. Just processes that work well in your situation."
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                ref={addElement}
                                className="p-6 border border-white/10 rounded-xl bg-charcoalDeep hover:border-emeraldNeon/50 transition-colors duration-300"
                            >
                                <h3 className="text-lg font-bold text-emeraldNeon mb-3">{item.title}</h3>
                                <p className="text-white/70 leading-relaxed text-sm">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Reliable Software Builds Trust */}
            <Section className="bg-charcoalDeep/50 border-t border-white/5">
                <Container>
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8">
                            Reliable Software Builds <span className="text-emeraldNeon">Trust</span>
                        </h2>
                        <p ref={addElement} className="text-xl text-white/80 mb-8 leading-relaxed">
                            When systems work consistently, teams move faster. Customers stay confident. Leadership stops worrying about what might break next.
                        </p>
                        <p ref={addElement} className="text-lg text-white/90 font-medium italic">
                            Quality Engineering isn't about being perfect. It's about reliability, or software that works the way people expect it to, even when it grows and changes.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* FAQ */}
            <FAQ
                items={[
                    {
                        q: "What sets quality engineering apart from regular QA?",
                        a: "A lot of the time, traditional QA focuses on testing at the end. Quality Engineering builds quality into the whole development process, which helps teams avoid problems instead of just finding them."
                    },
                    {
                        q: "Do we need to use automation to start quality engineering?",
                        a: "Not right away. Automation is useful, but good engineering begins with better processes and smarter testing. You can slowly add automation where it will be most useful."
                    },
                    {
                        q: "Is quality engineering only for large teams?",
                        a: "No. Smaller teams often benefit the most, since early quality practices prevent growing pains as products scale."
                    },
                    {
                        q: "Can quality engineering support regulated industries in Canada?",
                        a: "Yes. Processes can be aligned with compliance, reporting, and governance requirements without slowing delivery."
                    },
                    {
                        q: "Will this help cut down on problems and outages in production?",
                        a: "That's one of the main goals. Better testing and validation before release means that there will be fewer surprises when the software goes live."
                    }
                ]}
            />

            {/* CTA */}
            <Section className="bg-emeraldNeon/10 py-24 text-center">
                <Container>
                    <h2 ref={addElement} className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
                        Build with Confidence
                    </h2>
                    <p ref={addElement} className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
                        Let's discuss how to integrate quality engineering into your development process for faster, more reliable software delivery.
                    </p>
                    <div ref={addElement}>
                        <SectionLink
                            href="#connect"
                            className="inline-block bg-emeraldNeon text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald transition-all duration-300 shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-1"
                        >
                            Start a Conversation
                        </SectionLink>
                    </div>
                </Container>
            </Section>
        </main>
    );
}
