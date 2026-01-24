import { SEO } from "../components/SEO";
import { Container } from "../components/Container";
import { SectionLink } from "../components/SectionLink";
import { useReveal } from "../hooks/useReveal";
import heroImage from "../assets/remote-infrastructure-hero.png";

export function RemoteInfrastructureManagement() {
    const { addElement } = useReveal();

    return (
        <>
            <SEO pageKey="remoteInfrastructureManagement" />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-charcoalDeep">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={heroImage}
                            alt="Remote Infrastructure Management Visualization"
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
                                Remote Infrastructure Management <span className="text-emeraldNeon block mt-2">Canada</span>
                            </h1>
                            <p ref={addElement} className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl leading-relaxed">
                                24/7 monitoring, optimization, and maintenance of distributed systems with proactive issue resolution.
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

                {/* Introduction / Keeping Canada Running */}
                <section className="py-20 bg-charcoalDeep/50">
                    <Container>
                        <div className="max-w-4xl mx-auto">
                            <h2 ref={addElement} className="text-3xl md:text-4xl font-bold mb-8 text-white">Keeping Canada’s Digital Operations Running</h2>
                            <div className="prose prose-lg prose-invert text-white/80 space-y-6">
                                <p ref={addElement}>
                                    Business hours don't stop. In Canada's always-on economy, where teams work from different places,
                                    customers are digital-first, and operations span cities, provinces, and time zones, your infrastructure
                                    needs to be reliable all the time.
                                </p>
                                <p ref={addElement}>
                                    Remote Infrastructure Management is concerned with peace of mind. It is the understanding that there is
                                    one eye on your systems 24/7, identifying your problems early and addressing them before turning into
                                    an outage, missed revenue or unhappy customers.
                                </p>
                                <p ref={addElement} className="text-xl font-medium text-emeraldNeon">
                                    We take care of the behind-the-scenes work so your teams can stay focused on moving the business forward.
                                </p>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Why it Matters */}
                <section className="py-20 bg-charcoal">
                    <Container>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 ref={addElement} className="text-3xl md:text-4xl font-bold mb-6 text-white">Why Remote Management Matters Right Now</h2>
                                <div className="space-y-6 text-white/80">
                                    <p ref={addElement}>
                                        Canadian institutions are grappling with several harsh realities simultaneously: constrained labour markets,
                                        escalating operating expenses, mounting cybersecurity issues, as well as being increasingly dependent on digital platforms.
                                    </p>
                                    <p ref={addElement}>
                                        At the same time, many businesses are operating with lean IT teams or no dedicated team at all.
                                    </p>
                                    <p ref={addElement}>
                                        Remote infrastructure management assists in filling that gap. You do not respond to issues after something has
                                        gone wrong but have an ongoing watch, early notifications, and constant optimization to maintain things in a
                                        constant state of smoothness.
                                    </p>
                                    <div ref={addElement} className="pl-4 border-l-2 border-emeraldNeon mt-8">
                                        <p className="text-lg italic text-white">
                                            "It’s not about adding more tools. It’s about adding peace of mind."
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 delay-100">
                                <div ref={addElement} className="bg-charcoalDeep p-6 rounded-lg border border-white/10">
                                    <div className="text-emeraldNeon text-4xl mb-2">24/7</div>
                                    <div className="text-sm text-white/70">Always-on Monitoring</div>
                                </div>
                                <div ref={addElement} className="bg-charcoalDeep p-6 rounded-lg border border-white/10">
                                    <div className="text-emeraldNeon text-4xl mb-2">35%</div>
                                    <div className="text-sm text-white/70">Avg. Cost Reduction</div>
                                </div>
                                <div ref={addElement} className="bg-charcoalDeep p-6 rounded-lg border border-white/10">
                                    <div className="text-emeraldNeon text-4xl mb-2">&lt;15m</div>
                                    <div className="text-sm text-white/70">Response Time</div>
                                </div>
                                <div ref={addElement} className="bg-charcoalDeep p-6 rounded-lg border border-white/10">
                                    <div className="text-emeraldNeon text-4xl mb-2">100%</div>
                                    <div className="text-sm text-white/70">Peace of Mind</div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* What We Do */}
                <section className="py-20 bg-charcoalDeep">
                    <Container>
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">What We Actually Do</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "Always-On Monitoring",
                                    subtitle: "Without Micromanagement",
                                    desc: "We monitor your systems 24/7 and identify the initial signs of trouble: deceleration, uncharacteristic behaviour or decreased performance. Most problems are handled before your team even notices them."
                                },
                                {
                                    title: "Proactive Issue Resolution",
                                    subtitle: "Fixing it before it breaks",
                                    desc: "When something actually goes wrong we do not wait till a ticket is raised. We intervene promptly, find out what happened and solve it. That translates to few late-night alerts and less unexpectedness."
                                },
                                {
                                    title: "Ongoing Maintenance",
                                    subtitle: "That Doesn’t Get in the Way",
                                    desc: "Systems need regular care to stay healthy. We handle updates, cleanups, and routine maintenance in a way that fits your operations, not disrupts them. Your systems improve quietly in the background."
                                },
                                {
                                    title: "Performance & Cost Optimisation",
                                    subtitle: "Doing more with less",
                                    desc: "Over time, systems can become bloated. We look for ways to streamline, reduce waste, and improve performance without risky overhauls. Small improvements, made consistently, add up."
                                }
                            ].map((item, idx) => (
                                <div key={idx} ref={addElement} className="bg-charcoal p-8 rounded-xl border border-white/5 hover:border-emeraldNeon/30 transition-colors duration-300">
                                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                    <div className="text-emeraldNeon text-sm uppercase tracking-wide mb-4 font-semibold">{item.subtitle}</div>
                                    <p className="text-white/70 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Distributed Operations */}
                <section className="py-20 bg-charcoal text-white">
                    <Container>
                        <div ref={addElement} className="bg-gradient-to-br from-navy to-charcoal p-8 md:p-12 rounded-2xl border border-white/10">
                            <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Designed for Distributed, Canadian Operations</h2>
                                <p className="text-lg text-white/80 mb-8">
                                    Many Canadian organizations operate across provinces, time zones, and regions from head offices in Calgary, Toronto or Vancouver to operations in remote or rural areas.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-8">
                                    {["Hybrid and remote work environments", "Multi-location operations", "Cloud, on-premise, or mixed setups", "Zero-downtime requirements"].map(item => (
                                        <li key={item} className="flex items-center space-x-3">
                                            <span className="text-emeraldNeon">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-white/70 italic">
                                    Whether you’re serving customers nationally or supporting internal teams across the country, we help keep everything connected and reliable.
                                </p>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* How We Work */}
                <section className="py-20 bg-charcoalDeep/30">
                    <Container>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h2 ref={addElement} className="text-3xl md:text-4xl font-bold mb-6 text-white">How We Work With You</h2>
                                <p ref={addElement} className="text-white/80 text-lg mb-6">
                                    We don’t drop in, take over, and disappear. We work as an extension of your team.
                                </p>
                                <div className="space-y-6">
                                    <div ref={addElement} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-emeraldNeon flex items-center justify-center text-charcoal font-bold flex-shrink-0">1</div>
                                        <div>
                                            <h4 className="font-bold text-white">Discovery</h4>
                                            <p className="text-white/70">It starts with knowing how your systems are used, what is most important, and where the risks are.</p>
                                        </div>
                                    </div>
                                    <div ref={addElement} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-emeraldNeon flex items-center justify-center text-charcoal font-bold flex-shrink-0">2</div>
                                        <div>
                                            <h4 className="font-bold text-white">Customization</h4>
                                            <p className="text-white/70">We customize monitoring, support, and maintenance to fit your needs, not a template.</p>
                                        </div>
                                    </div>
                                    <div ref={addElement} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-emeraldNeon flex items-center justify-center text-charcoal font-bold flex-shrink-0">3</div>
                                        <div>
                                            <h4 className="font-bold text-white">Execution</h4>
                                            <p className="text-white/70">You keep up with the news. You stay in charge. We do the hard work.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div ref={addElement} className="bg-charcoal p-8 rounded-xl border border-emeraldNeon/20 delay-100">
                                <h3 className="text-2xl font-bold text-white mb-6">What You Gain</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Less downtime and service interruptions",
                                        "A quicker response when problems do come up",
                                        "Less stress on internal teams when they work",
                                        "Better system performance over time",
                                        "More predictable IT costs"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center space-x-3 text-white/80">
                                            <span className="text-emeraldNeon">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <p className="text-lg font-medium text-emeraldTint text-center">
                                        Stop worrying about technology and start trusting it.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* CTA */}
                <section className="py-20 bg-charcoal">
                    <Container className="text-center">
                        <div className="max-w-3xl mx-auto">
                            <h2 ref={addElement} className="text-3xl md:text-4xl font-bold mb-6 text-white">Let’s Take Infrastructure Worries Off Your Plate</h2>
                            <p ref={addElement} className="text-lg text-white/80 mb-8">
                                If keeping systems running feels harder than it should or if your team is spending too much time reacting instead of improving, it may be time for a different approach.
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
                                    q: "What types of systems can you manage remotely?",
                                    a: "We support a wide range of environments, including cloud-based platforms, on-site systems, and hybrid setups. Whether your systems support internal teams, customer-facing services, or both, they can be managed remotely."
                                },
                                {
                                    q: "Will our team still have control over our systems?",
                                    a: "Yes. You always keep ownership and decision-making control. We work with your team, following agreed-upon processes and escalation paths, so nothing changes without your knowledge or permission."
                                },
                                {
                                    q: "Will this replace our existing IT staff or partners?",
                                    a: "No. We are meant to go along with what you already have. Depending on what works best for you, we can help your internal teams, fill in the gaps, or take full responsibility."
                                },
                                {
                                    q: "Is Remote Infrastructure Management suitable for regulated industries in Canada?",
                                    a: "Yes. Many organizations in regulated or compliance-heavy environments use remote management to maintain stability, visibility, and accountability while keeping systems secure and well-documented."
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
