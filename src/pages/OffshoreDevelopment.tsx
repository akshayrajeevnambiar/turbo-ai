import { Container, Section } from "../components/Container";
import { useReveal } from "../hooks/useReveal";
import { SectionLink } from "../components/SectionLink";
import { SEO } from "../components/SEO";
import { FAQ } from "../components/FAQ";
import heroImage from "../assets/offshore-development-hero.png";

export function OffshoreDevelopment() {
    const { addElement } = useReveal(40);

    return (
        <main className="bg-charcoal" role="main">
            <SEO pageKey="offshoreDevelopment" />
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-charcoalDeep">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Offshore Development Background"
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
                            Offshore Development <span className="text-emeraldNeon block mt-2">Canada</span>
                        </h1>
                        <p
                            ref={addElement}
                            className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl leading-relaxed"
                        >
                            Distributed engineering teams delivering scalable software solutions with rigorous quality standards.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Intro Section - Build Faster */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <h2
                            ref={addElement}
                            className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white mb-12"
                        >
                            Build Faster Without <span className="text-emeraldNeon">Burning Out Your Team</span>
                        </h2>
                        <div className="space-y-8 text-lg md:text-xl text-white/80 leading-relaxed font-body">
                            <p ref={addElement}>
                                Companies in Canada are under a lot of pressure to ship more, move faster, and keep quality high, all while dealing with tight hiring markets and rising costs. It's not easy to find the right technical talent at the right time, whether you're expanding in Toronto, scaling operations in Calgary, building platforms in Vancouver, or supporting projects out of Edmonton.
                            </p>
                            <p ref={addElement}>
                                Offshore development isn’t about cutting corners. When done right, it is all about getting the extension of your team in a smart, sustainable manner.
                            </p>
                            <p ref={addElement} className="font-semibold text-white text-2xl border-l-4 border-emeraldNeon pl-6 py-2 bg-emeraldNeon/5 rounded-r-lg">
                                We help Canadian businesses build reliable offshore development teams at Turbo AI that feel like a natural part of their own team. These teams are coordinated, responsible and result oriented.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Why Offshore Development Is Gaining Momentum */}
            <Section className="bg-navy/30 border-y border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2
                                ref={addElement}
                                className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8"
                            >
                                Why Offshore Development Is Gaining Momentum in <span className="text-red-500">Canada</span>
                            </h2>
                            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                                <p ref={addElement}>
                                    Canadian companies spend much money on digital products, automation, and on customer-facing platforms. At the same time, local talent shortages and rising salaries are making it harder to scale internal teams quickly.
                                </p>
                                <p ref={addElement}>
                                    When trust, communication, and quality are at the heart of it, offshore development can work.
                                </p>
                                <p ref={addElement}>
                                    Instead of rushing to hire under pressure, companies can get skilled engineers who can step in, help with delivery, and help teams move forward without lowering standards.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-emeraldNeon/20 blur-3xl opacity-20 rounded-full" />
                            <div className="relative bg-charcoal p-8 md:p-10 border border-white/10 rounded-2xl shadow-2xl">
                                <p className="text-xl md:text-2xl text-white font-medium mb-6 leading-relaxed">
                                    "Offshore development provides you with space and means of continuing with made progress without straining your local staff too much."
                                </p>
                                <div className="h-0.5 w-16 bg-emeraldNeon mb-6" />
                                <p className="text-white/70">
                                    We bridge the gap between ambition and capacity, allowing you to scale without compromise.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* What Offshore Development Looks Like When It’s Done Right */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto mb-16 text-center">
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-6">
                            What Offshore Development Looks Like When It’s Done Right
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                        {[
                            {
                                title: "Teams That Work Like Your Own",
                                body: "We do not simply allocate resources. We create special teams that know what you want to achieve, how you do your working process, and how you manage your business. They work with your internal leads, follow your priorities, and are part of the same delivery rhythm, not a separate third party."
                            },
                            {
                                title: "Clear Communication, No Guesswork",
                                body: "You can't negotiate strong communication. We make it clear what we expect in terms of availability, updates, and feedback so that work goes smoothly and there are no misunderstandings or constant follow-ups. You are always aware of what is being worked on and why."
                            },
                            {
                                title: "Quality Built In, Not Checked Later",
                                body: "In the end, we don't check for quality. It's part of how people do their jobs every day, with shared standards, regular reviews, and constant testing. That means fewer surprises, less rework, and more confidence in what gets delivered."
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

                    <div className="text-center mb-12">
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-6">
                            How We Support Your Teams With Offshore Development
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                title: "Flexible Engagement Models",
                                body: "A few extra hands are needed by some groups. Some people want a whole offshore team to help with long-term delivery. We can work with you on a short-term basis or as a long-term partner, depending on what you need."
                            },
                            {
                                title: "Alignment With Canadian Business Hours",
                                body: "We structure teams to overlap with Canadian working hours, making collaboration easier for teams in Toronto, Calgary, Vancouver, and Edmonton. This keeps momentum high and communication simple."
                            },
                            {
                                title: "Built for Scale",
                                body: "The team can expand or modify without the delays of conventional recruiting as the priorities vary. This is particularly useful in cases where product roadmaps change or new opportunities arise."
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                ref={addElement}
                                className="p-8 border border-white/10 rounded-xl bg-charcoalDeep hover:border-emeraldNeon/50 transition-colors duration-300"
                            >
                                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-white/70 leading-relaxed text-sm">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Where Offshore Development Makes the Biggest Impact */}
            <Section className="bg-charcoalDeep/50 border-t border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div className="order-1 lg:order-1">
                            <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8">
                                Where Offshore Development Makes the <span className="text-emeraldNeon">Biggest Impact</span>
                            </h2>
                            <p ref={addElement} className="text-xl text-white/80 mb-8 leading-relaxed">
                                Offshore teams often help most with:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Accelerating product development",
                                    "Supporting platform modernization",
                                    "Handling ongoing feature development",
                                    "Reducing pressure on internal teams",
                                    "Maintaining delivery pace during growth"
                                ].map((item, idx) => (
                                    <li key={idx} ref={addElement} className="flex items-start gap-4">
                                        <span className="text-emeraldNeon mt-1">✦</span>
                                        <span className="text-white/80 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="order-2 lg:order-2 flex items-center justify-center">
                            <div ref={addElement} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-lg w-full">
                                <h3 className="text-2xl font-semibold text-white mb-6">A Partnership, Not a Handoff</h3>
                                <div className="space-y-4 text-white/70">
                                    <p>The whole time we remain involved. That is to visit frequently, to be responsible collectively and to continually improve. It is not an automatic set it and forget it model.</p>
                                    <div className="w-full h-px bg-white/10" />
                                    <p>It is our job to ensure that offshore development becomes simple, dependable and manageable, not dangerous or complex.</p>
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
                        q: "How is offshore development different from outsourcing?",
                        a: "When you do offshore development, you're not just giving work to a vendor you don't know; you're building a dedicated extension of your team. The team doesn't work alone; they work with your processes, your priorities, and your people."
                    },
                    {
                        q: "Will we lose visibility or control over the work?",
                        a: "No. You stay fully involved. You set priorities, review progress, and stay connected through regular updates and check-ins."
                    },
                    {
                        q: "Is offshore development secure?",
                        a: "Yes. We carefully set up access, permissions, and ways of working to keep your systems, data, and intellectual property safe."
                    },
                    {
                        q: "How long does it take to get an offshore team up and running?",
                        a: "Initial setup can happen quickly. Once roles and expectations are clear, teams can begin contributing within weeks."
                    }
                ]}
            />

            {/* CTA */}
            <Section className="bg-emeraldNeon/10 py-24 text-center">
                <Container>
                    <h2 ref={addElement} className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
                        Let’s Extend Your Team - The Right Way
                    </h2>
                    <p ref={addElement} className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
                        If growth is being held back by hiring challenges, delivery pressure, or limited capacity, offshore development can be a smart next step.
                        <br /><br />
                        Let’s talk about how to extend your team without losing control or clarity.
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
