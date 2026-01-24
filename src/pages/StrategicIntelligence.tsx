import { Container, Section } from "../components/Container";
import { useReveal } from "../hooks/useReveal";
import { SectionLink } from "../components/SectionLink";
import heroBg from "../assets/Hero Background.jpg";
import insightImg from "../assets/Insight Visualization.jpg";
import mapImg from "../assets/Canadian Context Map.jpg";
import { SEO } from "../components/SEO";

export function StrategicIntelligence() {
    const { addElement } = useReveal(40);

    return (
        <main className="bg-charcoal" role="main">
            <SEO pageKey="strategicIntelligence" />
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-charcoalDeep">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroBg}
                        alt="Background"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoalDeep/90 via-charcoalDeep/50 to-charcoalDeep" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-charcoal pointer-events-none z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_60%)] opacity-70" />

                <Container className="relative z-10 w-full">
                    <div className="max-w-5xl mx-auto text-center md:text-left">
                        <div ref={addElement} className="inline-block px-4 py-1.5 rounded-full border border-emeraldNeon/30 bg-emeraldNeon/10 text-emeraldNeon text-sm font-medium mb-8">
                            Strategic Insight
                        </div>
                        <h1
                            ref={addElement}
                            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-none"
                        >
                            Strategic <span className="text-emeraldNeon block mt-2">Intelligence</span>
                        </h1>
                        <p
                            ref={addElement}
                            className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl leading-relaxed"
                        >
                            Due diligence that blends technology research, data modelling, and market insight, so you make smarter moves, faster.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Intro - Insight That Matters */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <h2 ref={addElement} className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white mb-12">
                            Insight That <span className="text-emeraldNeon">Actually Matters</span>
                        </h2>
                        <div className="space-y-8 text-lg md:text-xl text-white/80 leading-relaxed">
                            <p ref={addElement}>
                                Business leaders in Canada, whether in clean tech in Vancouver, FinTech in Toronto, manufacturing in Ontario or energy in Alberta are being asked to make decisions with less certainty and more at stake than ever before. Markets shift fast, new competitors appear overnight, and technology changes the rules before lunch.
                            </p>
                            <div ref={addElement} className="pl-6 border-l-4 border-emeraldNeon italic text-white text-2xl font-medium">
                                So the real question isn’t “What’s happening out there?”<br />
                                It’s “What should we do about it?”
                            </div>
                            <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src={insightImg}
                                    alt="Data Visualization"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <p ref={addElement}>
                                That’s where Strategic Intelligence comes in. It’s more than a stack of reports. It’s a way to see around corners to cut through cluttered data, understand what’s changing in your industry, and make confident decisions based on real insight.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* What It Is - Not Just Due Diligence */}
            <Section className="bg-navy/20 border-y border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8">
                                What Strategic Intelligence <span className="text-emeraldTint">Actually Is</span>
                            </h2>
                            <p ref={addElement} className="text-lg text-white/80 mb-8 leading-relaxed">
                                Too often, organisations treat research and due diligence as an obligation, a box to tick before a deal or product launch. But real strategic insight is different. It’s:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { label: "Practical", desc: "Built for decisions you actually face" },
                                    { label: "Rooted in Data", desc: "Sharp analysis, not just surface trends" },
                                    { label: "Timely", desc: "Because slow insight loses value" },
                                    { label: "Action-Oriented", desc: "Not buried in dense reports" }
                                ].map((item, i) => (
                                    <div key={i} ref={addElement} className="bg-charcoalDeep p-6 rounded-lg border border-white/10">
                                        <h3 className="text-emeraldNeon font-bold mb-2">{item.label}</h3>
                                        <p className="text-white/70 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div ref={addElement} className="flex flex-col justify-center">
                            <div className="p-8 md:p-12 bg-gradient-to-br from-charcoalDeep to-charcoal border border-white/10 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-emeraldNeon/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <p className="text-lg text-white/90 leading-relaxed relative z-10">
                                    "A Strategic Intelligence service helps you understand your landscape at a deeper level: competitor moves, technology shifts, customer behaviour, regulatory headwinds, and future opportunity signals. It’s about connecting dots others miss and giving you the confidence to act."
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Why Now - Canadian Context */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8 text-center">
                            Why <span className="text-red-500">Canadian</span> Organizations Need This Now
                        </h2>
                        <div className="mb-12 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                            <img
                                src={mapImg}
                                alt="Canadian Business Context Map"
                                className="w-full h-auto object-cover opacity-80"
                            />
                        </div>
                        <p ref={addElement} className="text-xl text-white/80 text-center mb-12 leading-relaxed">
                            Canada’s business landscape is shifting fast. Climate goals, new tech scale-ups, and global trade pressures mean gut instinct alone isn't enough anymore.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div ref={addElement} className="bg-charcoalDeep p-8 rounded-xl border border-white/5 hover:border-emeraldNeon/30 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-4">Spot Threats Early</h3>
                                <p className="text-white/70">Identify risks before they wreck budgets or derail timelines.</p>
                            </div>
                            <div ref={addElement} className="bg-charcoalDeep p-8 rounded-xl border border-white/5 hover:border-emeraldNeon/30 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-4">New Revenue Streams</h3>
                                <p className="text-white/70">Identify new customers and market opportunities with precision.</p>
                            </div>
                            <div ref={addElement} className="bg-charcoalDeep p-8 rounded-xl border border-white/5 hover:border-emeraldNeon/30 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-4">Tech Adoption Curves</h3>
                                <p className="text-white/70">Understand when to move so you don’t over- or under-invest.</p>
                            </div>
                            <div ref={addElement} className="bg-charcoalDeep p-8 rounded-xl border border-white/5 hover:border-emeraldNeon/30 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-4">Competitor Mapping</h3>
                                <p className="text-white/70">Map competitor strategies clearly instead of just guessing at them.</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Our Approach */}
            <Section className="bg-charcoalDeep/50 border-t border-white/5">
                <Container>
                    <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-16 text-center">
                        How We Approach Strategic Intelligence
                    </h2>
                    <div className="space-y-16">
                        {[
                            {
                                num: "01",
                                title: "Deep Market & Tech Research",
                                desc: "We focus on what’s actually changing in your space. Not surface-level trend watching, but research meant to answer the questions keeping you up at night."
                            },
                            {
                                num: "02",
                                title: "Data Modelling That Speaks to Decisions",
                                desc: "Raw data without context isn’t useful. We build models that turn data points into direction—forecasting adoption, estimating market size, or stress-testing assumptions."
                            },
                            {
                                num: "03",
                                title: "Insight With a Roadmap",
                                desc: "You get insight you can actually act on. We sketch out scenarios, outline risks, and map paths forward so strategy becomes action, not just awareness."
                            }
                        ].map((step, i) => (
                            <div key={i} ref={addElement} className="flex flex-col md:flex-row gap-8 items-start md:items-center max-w-5xl mx-auto">
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-navy border border-emeraldNeon flex items-center justify-center text-2xl font-mono text-emeraldNeon font-bold">
                                    {step.num}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-white/80 text-lg leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* What You Get */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="bg-gradient-to-r from-navy to-charcoalDeep rounded-2xl p-8 md:p-12 border border-white/10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 ref={addElement} className="text-3xl font-heading font-semibold text-white mb-6">
                                    What You Walk Away With
                                </h2>
                                <ul className="space-y-4">
                                    {[
                                        "A clear view of your competitive landscape",
                                        "Validated data to back big decisions",
                                        "Scenarios that help you anticipate change",
                                        "Actionable recommendations tied to business goals"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emeraldNeon" />
                                            <span className="text-white/90 text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-emeraldNeon/10 blur-3xl rounded-full" />
                                <blockquote className="relative p-6 border-l-4 border-emeraldNeon bg-charcoal/50 backdrop-blur-sm">
                                    <p className="text-xl text-white italic mb-4">
                                        "This is more than talking about 'disruption', it’s about navigating it."
                                    </p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* FAQ */}
            <Section className="bg-charcoalDeep border-t border-white/5">
                <Container>
                    <h2 ref={addElement} className="text-3xl font-heading font-semibold text-white mb-12 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-8">
                        {[
                            {
                                q: "What’s the difference between Strategic Intelligence and market research?",
                                a: "Market research often focuses on broad trends. Strategic Intelligence digs deeper, blending data, tech, and context to tell you what it specifically means for your decision-making."
                            },
                            {
                                q: "Do you need a lot of data to get value from this service?",
                                a: "No. We work with what you have and augment it with public sources and custom research. The goal is insight, not data hoarding."
                            },
                            {
                                q: "Is this only useful for big companies?",
                                a: "Not at all. Mid-sized and scale-up organisations often benefit most because they need sharp insight quickly to outmaneuver larger competitors."
                            },
                            {
                                q: "How long does the process take?",
                                a: "It depends on scope. Some engagements deliver actionable insight in a few weeks; others evolve into ongoing intelligence support."
                            },
                            {
                                q: "Can Strategic Intelligence support M&A or investment decisions?",
                                a: "Absolutely. We help clients do informed due diligence, seeing not just the numbers, but the context and implications around them."
                            }
                        ].map((faq, i) => (
                            <div key={i} ref={addElement} className="pb-8 border-b border-white/10 last:border-0 last:pb-0">
                                <h3 className="text-xl font-semibold text-white mb-3">{faq.q}</h3>
                                <p className="text-white/70 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section className="bg-emeraldNeon/10 py-24 text-center">
                <Container>
                    <h2 ref={addElement} className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
                        Start with really good questions.
                    </h2>
                    <p ref={addElement} className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
                        What tech trends will impact you? Where are customers moving? Let's find the answers.
                    </p>
                    <div ref={addElement}>
                        <SectionLink
                            href="#connect"
                            className="inline-block bg-emeraldNeon text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald transition-all duration-300 shadow-lg hover:-translate-y-1"
                        >
                            Start a Conversation
                        </SectionLink>
                    </div>
                </Container>
            </Section>
        </main>
    );
}
