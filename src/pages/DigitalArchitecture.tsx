import { SEO } from "../components/SEO";
import { Container } from "../components/Container";
import { SectionLink } from "../components/SectionLink";
import { useReveal } from "../hooks/useReveal";
import heroImage from "../assets/digital-architecture-hero.png";

export function DigitalArchitecture() {
    const { addElement } = useReveal();

    return (
        <>
            <SEO pageKey="digitalArchitecture" />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-charcoalDeep">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={heroImage}
                            alt="Digital Architecture Visualization"
                            className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-charcoalDeep/90 via-charcoalDeep/50 to-charcoalDeep" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-charcoal pointer-events-none z-0" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_60%)] opacity-70" />

                    <Container className="relative z-10 w-full">
                        <div className="max-w-5xl mx-auto text-center md:text-left">
                            <div ref={addElement} className="inline-block px-4 py-1.5 rounded-full border border-emeraldNeon/30 bg-emeraldNeon/10 text-emeraldNeon text-sm font-medium mb-8">
                                Service Overview
                            </div>
                            <h1 ref={addElement} className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-none">
                                Digital Architecture <span className="text-emeraldNeon block mt-2">Canada</span>
                            </h1>
                            <p ref={addElement} className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl leading-relaxed">
                                Modern platforms and engineering practices that scale with your business, without slowing you down.
                            </p>
                            <div ref={addElement} className="pt-10">
                                <SectionLink
                                    href="#connect"
                                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-charcoal bg-emeraldNeon rounded-full hover:bg-emeraldTint transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                                >
                                    Start a Conversation
                                </SectionLink>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Intro / Build for What’s Next */}
                <section className="py-20 bg-charcoalDeep/50">
                    <Container>
                        <div className="max-w-4xl mx-auto">
                            <h2 ref={addElement} className="text-3xl md:text-4xl font-bold mb-8 text-white">Build for What’s Next, Not Just What Works Today</h2>
                            <div className="prose prose-lg prose-invert text-white/80 space-y-6">
                                <p ref={addElement}>
                                    Across Canada, organizations are under pressure to move faster, whether it’s financial services modernizing legacy systems, manufacturers digitizing operations, or public sector teams improving service delivery with limited budgets.
                                </p>
                                <p ref={addElement} className="text-white font-semibold">
                                    The problem?
                                </p>
                                <p ref={addElement}>
                                    Many digital foundations weren’t built for today’s pace of change. Systems are tightly coupled, upgrades feel risky, and every new feature takes longer than it should.
                                </p>
                                <p ref={addElement}>
                                    Digital architecture is what helps with that. It's not about tearing everything down and starting over; it's about building a foundation that can grow, change easily, and let teams work together without any problems.
                                </p>
                                <p ref={addElement} className="text-xl font-medium text-emeraldNeon">
                                    At Turbo AI, we help organizations modernize their digital backbone so technology becomes an enabler, not a constraint.
                                </p>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Definition / What it Means */}
                <section className="py-20 bg-charcoal">
                    <Container>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 ref={addElement} className="text-3xl md:text-4xl font-bold mb-6 text-white">What Digital Architecture Really Means</h2>
                                <div className="space-y-6 text-white/80">
                                    <p ref={addElement}>
                                        Digital architecture isn’t just diagrams and frameworks. It's about how your systems are set up, how they communicate with each other, and how easy it is for teams to build on, change, and grow what's already there.
                                    </p>
                                    <p ref={addElement}>
                                        Poor architecture slows teams down and costs more over time. We are here to help you move from systems that are weak and hard to change to ones that are strong, flexible, and made for real-world use.
                                    </p>
                                </div>
                            </div>
                            <div className="delay-100">
                                <div ref={addElement} className="bg-charcoalDeep p-8 rounded-xl border border-white/10">
                                    <h3 className="text-2xl font-bold text-white mb-6">Good Architecture:</h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Reduces delivery risk",
                                            "Supports growth without constant rework",
                                            "Makes systems easier to maintain",
                                            "Helps teams move faster with confidence"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center space-x-3 text-white/80">
                                                <span className="text-emeraldNeon">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Why it Matters */}
                <section className="py-20 bg-charcoalDeep">
                    <Container>
                        <div ref={addElement} className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Why It Matters for Canadian Organisations</h2>
                            <p className="text-lg text-white/80">
                                Canada’s industries are evolving quickly. Cloud adoption is accelerating, customer expectations are rising, and regulatory requirements continue to shift. At the same time, skilled technical talent is in high demand, which means systems need to be easier to work with, not harder.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "Faster Service Rollout", desc: "Roll out new services faster to stay competitive." },
                                { title: "Seamless Integration", desc: "Integrate emerging technologies without disruption." },
                                { title: "Reduced Risk", desc: "Reduce operational risk tied to legacy systems." },
                                { title: "Scalable Growth", desc: "Scale without ballooning technical debt." }
                            ].map((item, idx) => (
                                <div key={idx} ref={addElement} className="bg-charcoal p-6 rounded-lg border border-white/5 hover:border-emeraldNeon/30 transition-colors duration-300">
                                    <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div ref={addElement} className="mt-12 text-center text-white/70 italic max-w-2xl mx-auto">
                            "Digital architecture isn't about following the latest fashion. It’s about creating stability in an environment that keeps changing."
                        </div>
                    </Container>
                </section>

                {/* How We Approach (Process) */}
                <section className="py-20 bg-charcoal">
                    <Container>
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">How We Approach Digital Architecture</h2>
                        <div className="max-w-4xl mx-auto space-y-16 relative">
                            <div className="hidden lg:block absolute left-12 top-4 bottom-4 w-px bg-white/10" />

                            {[
                                {
                                    title: "1. Assess What You Have (Honestly)",
                                    desc: "We begin to know what is already in place before deciding to change something. It involves looking at systems that you are operating, the way they are interrelated, where they are likely to slow down and where dangerous issues are peeking. It is not a step of finger pointing or seeking perfection. It is concerned with having a clear picture of what is working, what is not working and what is worth repairing."
                                },
                                {
                                    title: "2. Design for Scale, Not Complexity",
                                    desc: "It is there we create systems that will be capable of expanding with you without turning into a pain. We ensure that we make things simple when we can and flexible when we must such that change does not always seem risky and costly whenever your business changes. This practically translates to designing systems in a manner that will allow you to make modifications to one component without the rest collapsing."
                                },
                                {
                                    title: "3. Modernization Without Disruption",
                                    desc: "Modernizing doesn’t have to mean tearing everything down and starting from scratch. More frequently, it is all about constant enhancements with time. We assist in sorting out older systems, flattening the flow of information between teams and tools, and providing improved techniques of building and updating software, bit by bit. This ensures that day to day operations continue and in the background the foundation is becoming stronger."
                                },
                                {
                                    title: "4. Engineering Practices That Support Delivery",
                                    desc: "Good architecture is relevant only when individuals are able to work with it. We concentrate on the rough, mundane methods of developing and bringing software into the world that facilitates day-to-day work. That encompasses creating clear expectations on how things are built, reducing repetitive manual work, and making releases a routine, rather than something risky."
                                }
                            ].map((step, i) => (
                                <div key={i} ref={addElement} className="relative flex gap-8">
                                    <div className="hidden lg:flex w-24 h-24 rounded-full bg-charcoal border-2 border-emeraldNeon items-center justify-center flex-shrink-0 z-10">
                                        <span className="text-2xl font-bold text-emeraldNeon">{i + 1}</span>
                                    </div>
                                    <div className="lg:hidden w-12 h-12 rounded-full bg-emeraldNeon flex items-center justify-center flex-shrink-0 text-charcoal font-bold">
                                        {i + 1}
                                    </div>
                                    <div className="bg-charcoalDeep p-8 rounded-xl border border-white/10 flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                        <p className="text-white/70 leading-relaxed space-y-4 whitespace-pre-line">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Benefits */}
                <section className="py-20 bg-charcoalDeep/30">
                    <Container>
                        <div className="relative bg-gradient-to-br from-navy to-charcoal p-8 md:p-12 rounded-2xl border border-white/10 overflow-hidden">
                            <div className="absolute inset-0 bg-emeraldNeon/5 mix-blend-overlay" />
                            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                                <div ref={addElement}>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">What You Get Out of Digital Architecture</h2>
                                    <p className="text-lg text-white/80">
                                        When your digital foundation is solid, the benefits show up quickly. Most importantly, technology starts pulling its weight, supporting the business instead of slowing it down.
                                    </p>
                                </div>
                                <div ref={addElement} className="space-y-4">
                                    {[
                                        "Updates and new features roll out more smoothly",
                                        "Less time and money is spent keeping systems running",
                                        "Growth doesn’t mean constant rework behind the scenes",
                                        "Teams feel more confident making changes and improvements"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center space-x-4 bg-charcoal/50 p-4 rounded-lg border border-white/5">
                                            <div className="w-2 h-2 rounded-full bg-emeraldNeon flex-shrink-0" />
                                            <span className="text-white">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* CTA */}
                <section className="py-20 bg-charcoal">
                    <Container className="text-center">
                        <div className="max-w-3xl mx-auto">
                            <h2 ref={addElement} className="text-3xl md:text-4xl font-bold mb-6 text-white">Let’s Build a Digital Foundation That Actually Works</h2>
                            <p ref={addElement} className="text-lg text-white/80 mb-8">
                                If making changes feels harder than it should, or every new initiative comes with more risk than confidence, it’s a sign the foundation needs attention. At Turbo AI, we help organizations build digital foundations that are easier to work with today, and ready for whatever comes next.
                            </p>
                            <div ref={addElement}>
                                <SectionLink href="#connect" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-charcoal bg-emeraldNeon rounded-full hover:bg-emeraldTint transition-all duration-300">
                                    Start a Conversation
                                </SectionLink>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-charcoalDeep">
                    <Container>
                        <h2 ref={addElement} className="text-3xl font-bold mb-12 text-center text-white">Frequently Asked Questions</h2>
                        <div className="max-w-3xl mx-auto space-y-6">
                            {[
                                {
                                    q: "Do we need to replace all our existing systems?",
                                    a: "No. In most cases, we work with what you already have. Modernization is usually incremental, focused on reducing risk and improving flexibility over time."
                                },
                                {
                                    q: "Is this digital architecture only relevant for large enterprises?",
                                    a: "Not at all. Mid-sized organizations often get the biggest payoff. Small improvements can make it much easier to move faster and grow, without needing a huge budget or major rebuild."
                                },
                                {
                                    q: "How long does a digital architecture engagement take?",
                                    a: "It really depends on what’s needed. A review and plan can take a few weeks. Bigger improvements are usually rolled out gradually over a few months, so day-to-day operations aren’t disrupted."
                                },
                                {
                                    q: "How does this support AI and automation initiatives?",
                                    a: "When your digital foundation is solid, adding AI or automation stops being a headache. You’re not ripping things apart or starting from scratch, you’re building on something that’s already ready for it."
                                },
                                {
                                    q: "Will this disrupt day-to-day operations?",
                                    a: "No. The goal is the opposite. Changes are rolled out in steps, with plenty of care taken to keep things running smoothly while improvements happen in the background."
                                }
                            ].map((faq, i) => (
                                <div key={i} ref={addElement} className="pb-8 border-b border-white/10 last:border-0 last:pb-0">
                                    <h3 className="text-xl font-semibold text-white mb-3">{faq.q}</h3>
                                    <p className="text-white/70 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>
            </main>
        </>
    );
}
