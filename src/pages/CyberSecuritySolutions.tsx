import { Container, Section } from "../components/Container";
import { useReveal } from "../hooks/useReveal";
import { SectionLink } from "../components/SectionLink";
import { SEO } from "../components/SEO";
import { FAQ } from "../components/FAQ";
import heroImage from "../assets/cyber-security-hero.png";

export function CyberSecuritySolutions() {
    const { addElement } = useReveal(40);

    return (
        <main className="bg-charcoal" role="main">
            <SEO pageKey="cyberSecuritySolutions" />
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-charcoalDeep">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Cyber Security Solutions Background"
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
                            Cyber Security <span className="text-emeraldNeon block mt-2">Solutions</span>
                        </h1>
                        <p
                            ref={addElement}
                            className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl leading-relaxed"
                        >
                            Enterprise resilience: Comprehensive security architecture, threat detection and compliance frameworks.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Intro Section - Cyber Threats Don't Wait */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <h2
                            ref={addElement}
                            className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white mb-12"
                        >
                            Cyber Threats Don’t Wait, And <span className="text-emeraldNeon">Neither Should Your Defence</span>
                        </h2>
                        <div className="space-y-8 text-lg md:text-xl text-white/80 leading-relaxed font-body">
                            <p ref={addElement}>
                                In Canada, cyber threats are no longer the problem of large banks and government organizations. Mid-sized businesses, healthcare providers, manufacturers, logistics companies, and tech companies are all being targeted. This is often because attackers know that defenses are weak.
                            </p>
                            <p ref={addElement}>
                                Meanwhile, policies are becoming stricter, internet activities are on the rise, as well as teams are anticipated to remain efficient without having to decelerate because of security inspections.
                            </p>
                            <p ref={addElement} className="font-semibold text-white text-2xl border-l-4 border-emeraldNeon pl-6 py-2 bg-emeraldNeon/5 rounded-r-lg">
                                It is where the current cyber security must develop.
                            </p>
                            <p ref={addElement}>
                                We use AI cybersecurity solutions at Turbo AI to help businesses stay ahead of threats. We do this by building intelligence right into how systems are protected, monitored, and managed, not by adding friction.
                            </p>
                            <p ref={addElement}>
                                Security shouldn’t feel like a barrier. It should feel like confidence.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Why Cyber Security Looks Different in Canada Right Now */}
            <Section className="bg-navy/30 border-y border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2
                                ref={addElement}
                                className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8"
                            >
                                Why Cyber Security Looks Different in <span className="text-red-500">Canada</span> Right Now
                            </h2>
                            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                                <p ref={addElement}>
                                    Canadian organizations face a unique mix of challenges: strict privacy expectations, industry-specific regulations, remote work across provinces, and growing reliance on digital services.
                                </p>
                                <p ref={addElement}>
                                    We offer cyber security services in Toronto, Calgary, Vancouver, and Edmonton. We work with businesses that need protection to keep up with how they really work, not how security looked five years ago.
                                </p>
                                <p ref={addElement}>
                                    Examples of traditional security measures include rule based tools and manual oversight that are sometimes not able to match the pace or the complexity of the current world. Artificial intelligence changes that equation in the area of cyber security.
                                </p>
                                <p ref={addElement}>
                                    By learning patterns, spotting unusual behaviour, and adapting as threats evolve, AI helps security teams move from reacting after the fact to preventing incidents before they escalate.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-emeraldNeon/20 blur-3xl opacity-20 rounded-full" />
                            <div className="relative bg-charcoal p-8 md:p-10 border border-white/10 rounded-2xl shadow-2xl">
                                <p className="text-xl md:text-2xl text-white font-medium mb-6 leading-relaxed">
                                    "Security shouldn’t feel like a barrier. It should feel like confidence."
                                </p>
                                <div className="h-0.5 w-16 bg-emeraldNeon mb-6" />
                                <p className="text-white/70">
                                    We help Canadian businesses move from reactive panic to proactive resilience, using AI to spot threats that traditional tools miss.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* What Our Cyber Security Solutions Actually Deliver */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto mb-16 text-center">
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-6">
                            What Our Cyber Security Solutions Actually Deliver
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {[
                            {
                                title: "Security That Learns and Adapts",
                                body: "AI-driven security doesn't just use fixed rules; it also looks at how people act over time. It learns what is \"normal\" for your business and then points out what isn't. That means faster detection, fewer false alarms, and earlier response when something truly matters."
                            },
                            {
                                title: "Threat Detection Without Constant Noise",
                                body: "Security alerts are only useful if someone can act on them. We create systems that are focused on actual risks and not infinite notifications. The outcome: your team will work on the threats that require to be addressed and not those that do not."
                            },
                            {
                                title: "Built-In Compliance Support",
                                body: "It should not be a hurry to obey the rules at the end. Our approach encompasses security and accountability in all that we do day in day out. This helps us follow Canadian privacy laws, industry standards, and our own rules without slowing down teams. Security becomes part of how work gets done, not a separate checkbox."
                            },
                            {
                                title: "Protection That Fits Your Business",
                                body: "Every organization is different. There is no equal threat to a healthcare provider compared to the logistics company or a company in the financial services industry. We tailor AI cybersecurity solutions to your business, risk profile, and operating environment instead of imposing a generic configuration that does not perfectly match."
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                ref={addElement}
                                className="p-8 border border-white/10 rounded-xl bg-charcoalDeep hover:border-emeraldNeon/50 transition-colors duration-300"
                            >
                                <h3 className="text-xl font-semibold text-emeraldNeon mb-3">{item.title}</h3>
                                <p className="text-white/80 leading-relaxed text-lg">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* How We Approach Cyber Security at Turbo AI */}
            <Section className="bg-charcoalDeep/50 border-t border-white/5">
                <Container>
                    <div className="text-center mb-16">
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-6">
                            How We Approach Cyber Security at Turbo AI
                        </h2>
                    </div>

                    <div className="space-y-16 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-emeraldNeon/0 via-emeraldNeon/50 to-emeraldNeon/0 -translate-x-1/2" />

                        {[
                            {
                                num: "01",
                                title: "Start With Real Risks, Not Assumptions",
                                content: "We start by learning about your business, your systems and the way people work. This assists in determining the actual vulnerabilities not the perceived vulnerabilities as indicated by the tools."
                            },
                            {
                                num: "02",
                                title: "Design Security That Works Behind the Scenes",
                                content: "Security must secure and not interfere. Our solutions are designed to be quiet in the background and facilitate productivity, as opposed to disturbing it."
                            },
                            {
                                num: "03",
                                title: "Use AI Where It Makes Sense",
                                content: "AI is not a constant requirement, but we apply it accordingly where it is of actual benefit. This involves smarter monitoring, faster detection and prioritization of threats."
                            },
                            {
                                num: "04",
                                title: "Make Security Sustainable",
                                content: "Security isn’t a one-time project. We help set up processes, visibility, and ongoing improvement so protection keeps pace as your business grows."
                            }
                        ].map((step, i) => (
                            <div key={i} ref={addElement} className={`relative flex flex-col lg:flex-row gap-8 lg:gap-24 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Number Bubble */}
                                <div className="lg:absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-charcoal border-2 border-emeraldNeon flex items-center justify-center z-10 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                                    <span className="font-mono text-xl text-emeraldNeon font-bold">{step.num}</span>
                                </div>

                                <div className="flex-1 text-center lg:text-right">
                                    <div className={`${i % 2 !== 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                                        <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                        <p className="text-white/70 leading-relaxed text-lg">{step.content}</p>
                                    </div>
                                </div>
                                <div className="flex-1 hidden lg:block" />
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* What Strong Cyber Security Enables */}
            <Section className="relative overflow-hidden bg-gradient-to-b from-navy to-charcoal">
                <Container className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="order-2 lg:order-1">
                            <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8">
                                What Strong Cyber Security <span className="text-emeraldNeon">Enables</span>
                            </h2>
                            <p ref={addElement} className="text-xl text-white/80 mb-8 leading-relaxed">
                                When security is done well, organizations often notice:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Faster response to potential threats",
                                    "Fewer disruptions caused by false alarms",
                                    "Better visibility into risks and system behaviour",
                                    "Stronger trust with customers and partners",
                                    "More confidence rolling out new digital initiatives"
                                ].map((item, idx) => (
                                    <li key={idx} ref={addElement} className="flex items-start gap-4">
                                        <span className="text-emeraldNeon mt-1">✦</span>
                                        <span className="text-white/80 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <p ref={addElement} className="text-lg text-white/90 font-medium italic">
                                    Most importantly, teams stop worrying about "what could go wrong" and start working on making the business better.
                                </p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 flex items-center justify-center">
                            <div ref={addElement} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-sm w-full">
                                <h3 className="text-2xl font-semibold text-white mb-6">Cyber Security That Supports Growth, Not Fear</h3>
                                <div className="space-y-6 text-white/70">
                                    <p>For many Canadian organizations, security conversations are driven by fear: breaches, fines, downtime, or reputational damage.</p>
                                    <div className="w-full h-px bg-white/10" />
                                    <p><strong className="text-white">We shift that mindset.</strong></p>
                                    <p>With the right mix of AI, smart design, and clear ownership, cyber security stops being a constant worry. Instead, it helps businesses grow, makes it easier for teams to use new technology, and gives them peace of mind that the business is safe without slowing down.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* FAQ */}
            <FAQ
                items={[
                    {
                        q: "What are AI cybersecurity solutions?",
                        a: "AI cybersecurity solutions use intelligent systems to detect unusual behaviour, identify threats faster, and adapt as risks change. They help reduce manual monitoring and improve response times."
                    },
                    {
                        q: "How does cyber security artificial intelligence help with compliance?",
                        a: "From day one, security is built in with controls and monitoring that help you follow the rules and meet your own expectations without having to do extra work later."
                    },
                    {
                        q: "Can small or mid-sized businesses use cyber security artificial intelligence?",
                        a: "Absolutely. You don’t need enterprise-scale infrastructure to benefit. Many mid-sized organizations use AI-powered security to gain protection they wouldn’t otherwise have the resources to manage manually."
                    },
                    {
                        q: "Will cyber security artificial intelligence slow down our systems?",
                        a: "No. These solutions run quietly in the background and are designed to protect without interrupting daily work or system performance."
                    }
                ]}
            />

            {/* CTA */}
            <Section className="bg-emeraldNeon/10 py-24 text-center">
                <Container>
                    <h2 ref={addElement} className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
                        Let’s Make Security a Strength - Not a Stress Point
                    </h2>
                    <p ref={addElement} className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
                        If your cyber security feels like it's always reacting, is hard to manage, or doesn't fit with how your business really works, it might be time to try something new.
                        <br /><br />
                        Let's talk about how to keep your systems safe without slowing down your business.
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
