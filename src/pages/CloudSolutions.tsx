import { Container, Section } from "../components/Container";
import { useReveal } from "../hooks/useReveal";
import { SectionLink } from "../components/SectionLink";
import { SEO } from "../components/SEO";
import { FAQ } from "../components/FAQ";
import heroImage from "../assets/cloud-solutions-hero.png";

export function CloudSolutions() {
    const { addElement } = useReveal(40);

    return (
        <main className="bg-charcoal" role="main">
            <SEO pageKey="cloudSolutions" />
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-charcoalDeep">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Cloud Solutions Background"
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
                            Cloud Solutions <span className="text-emeraldNeon block mt-2">Canada</span>
                        </h1>
                        <p
                            ref={addElement}
                            className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl leading-relaxed"
                        >
                            Flexible, secure cloud foundations that help Canadian organizations move faster.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Intro Section - Cloud isn't new */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <h2
                            ref={addElement}
                            className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white mb-12"
                        >
                            The Cloud Isn’t New Anymore. <span className="text-emeraldNeon">What’s New Is the Pressure to Actually Make It Work.</span>
                        </h2>
                        <div className="space-y-8 text-lg md:text-xl text-white/80 leading-relaxed font-body">
                            <p ref={addElement}>
                                Organizations in Canada are trying to balance growth, keeping costs down, meeting security expectations, and meeting rising customer demands all at the same time. From fast-scaling tech firms in Toronto to energy and industrial players in Calgary, and from public sector teams in Edmonton to digital-first businesses in Vancouver, the question isn’t if you use the cloud. It’s whether your cloud setup is helping or quietly holding you back.
                            </p>
                            <p ref={addElement} className="font-semibold text-white text-2xl border-l-4 border-emeraldNeon pl-6 py-2 bg-emeraldNeon/5 rounded-r-lg">
                                Our Cloud Solutions focus on clarity, confidence, and momentum. No hype. No overcomplication. Just cloud environments that fit how your business really operates.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Why Cloud Decisions Matter More Right Now */}
            <Section className="bg-navy/30 border-y border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2
                                ref={addElement}
                                className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8"
                            >
                                Why Cloud Decisions Matter More Right Now in <span className="text-red-500">Canada</span>
                            </h2>
                            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                                <p ref={addElement}>
                                    Canadian industries are in a real moment of change. Labour shortages, rising operating costs, climate commitments, and tighter regulations are reshaping how organizations run. At the same time, customers expect faster service, better digital experiences, and zero downtime.
                                </p>
                                <p ref={addElement}>
                                    The cloud can do all of that, but only if you set it up with a purpose.
                                </p>
                                <p ref={addElement}>
                                    Too often, organizations end up with scattered cloud services, rising bills, and unclear ownership. What started as “moving fast” becomes hard to manage and expensive to maintain.
                                </p>
                                <p ref={addElement}>
                                    We help teams step back, make sense of what they already have, and move forward with a cloud approach that supports growth instead of creating new headaches.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-emeraldNeon/20 blur-3xl opacity-20 rounded-full" />
                            <div className="relative bg-charcoal p-8 md:p-10 border border-white/10 rounded-2xl shadow-2xl">
                                <p className="text-xl md:text-2xl text-white font-medium mb-6 leading-relaxed">
                                    "It’s not enough to be in the cloud. You need a cloud strategy that actually supports your business goals."
                                </p>
                                <div className="h-0.5 w-16 bg-emeraldNeon mb-6" />
                                <p className="text-white/70">
                                    Focus on clarity and purpose to avoid the "accidental complexity" that slows many teams down.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Start With What You Have */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto mb-16 text-center">
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-6">
                            Start With What You Have - Not What’s Trendy
                        </h2>
                        <p ref={addElement} className="text-xl text-white/70">
                            Every cloud journey should begin with an honest look at today. We take time to understand your existing systems, data, and workloads, along with the business goals driving change.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
                        <div ref={addElement} className="col-span-1 p-8 rounded-xl bg-charcoalDeep border border-white/5">
                            <h3 className="text-xl font-semibold text-emeraldNeon mb-4">Our Approach</h3>
                            <p className="text-white/80 leading-relaxed mb-4">
                                This isn’t about pushing everything into the cloud overnight. It’s about deciding what belongs there, what doesn’t, and what needs to change first.
                            </p>
                            <p className="text-white/80 leading-relaxed">
                                After that, we help you figure out a clear way to move forward that works for your business, your team, and your level of risk.
                            </p>
                        </div>
                        <div ref={addElement} className="col-span-1 p-8 rounded-xl bg-charcoalDeep border border-white/5">
                            <h3 className="text-xl font-semibold text-emeraldNeon mb-4">Key Features</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="text-emeraldNeon mt-1">•</span>
                                    <span className="text-white/80">Support for digital products</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emeraldNeon mt-1">•</span>
                                    <span className="text-white/80">Improved reliability & uptime</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emeraldNeon mt-1">•</span>
                                    <span className="text-white/80">Cost reduction strategies</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emeraldNeon mt-1">•</span>
                                    <span className="text-white/80">Meeting security expectations</span>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Multi-Cloud Without the Mess",
                                body: "A lot of Canadian businesses already use more than one cloud platform. We help bring structure to that reality. We create cloud environments that are both simple and flexible. Workloads go where they make the most sense. Costs are clear and easy to handle."
                            },
                            {
                                title: "Migrate Without Disrupting the Business",
                                body: "Cloud migration doesn’t have to feel like a gamble. We plan migrations in steps, with stability as our top priority. We deal with risks early on and keep teams up to date throughout the process. The business keeps going, and the foundation underneath keeps getting better."
                            },
                            {
                                title: "Cloud System That’s Built to Perform and Stay Affordable",
                                body: "Performance and cost are closely linked. We help organizations right-size what they’re using, remove waste that drives up monthly spend, and improve reliability. The goal isn’t just saving money, it’s knowing where your cloud dollars are going and why."
                            },
                            {
                                title: "Security That’s Part of the Design",
                                body: "Security shouldn’t feel bolted on or reactive. From day one, we design cloud environments with clear access controls, monitoring, and accountability. This supports both internal governance and external requirements, without slowing teams down."
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

            {/* What You Get From Our Cloud Solutions */}
            <Section className="bg-charcoalDeep/50 border-t border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-1 lg:order-1">
                            <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8">
                                What You Get From <span className="text-emeraldNeon">Our Cloud Solutions</span>
                            </h2>
                            <p ref={addElement} className="text-xl text-white/80 mb-8 leading-relaxed">
                                Organizations that work with us typically see:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Clearer cloud costs and fewer surprises",
                                    "More stable and reliable systems",
                                    "Faster delivery of new digital initiatives",
                                    "Teams that feel more confident making changes"
                                ].map((item, idx) => (
                                    <li key={idx} ref={addElement} className="flex items-start gap-4">
                                        <span className="text-emeraldNeon mt-1">✦</span>
                                        <span className="text-white/80 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <p ref={addElement} className="text-lg text-white/90 font-medium italic">
                                    Most importantly, the cloud starts supporting the business instead of adding stress.
                                </p>
                            </div>
                        </div>

                        <div className="order-2 lg:order-2 flex items-center justify-center">
                            <div ref={addElement} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-lg w-full">
                                <h3 className="text-2xl font-semibold text-white mb-6">Let’s Build a Cloud Setup That Actually Helps</h3>
                                <div className="space-y-4 text-white/70">
                                    <p>If your cloud environment feels confusing, expensive, or harder to manage than it should be, it’s probably time for a reset.</p>
                                    <div className="w-full h-px bg-white/10" />
                                    <p>Let's talk about where you are, where you want to go, and how to get there in a clear, calm, and simple way.</p>
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
                        q: "How do I know if my business is actually ready for the cloud?",
                        a: "You probably need to make the switch, even if things aren't \"perfect\" yet, if you're dealing with slow systems, rising IT costs, remote teams, or tools that don't work together. Cloud adoption doesn’t require a clean slate. We meet you where you are and build from there."
                    },
                    {
                        q: "Will moving to the cloud disrupt day-to-day operations?",
                        a: "It doesn’t have to. A well-planned migration is staged and controlled, so teams can keep working while systems transition behind the scenes. Most clients have less trouble than they thought they would and more stability afterward."
                    },
                    {
                        q: "What’s the difference between single-cloud and multi-cloud setups?",
                        a: "Single-cloud means everything runs on one provider. Multi-cloud spreads workloads across more than one. Not trends, but your level of risk tolerance, compliance needs, performance goals, and ability to control costs will help you make the right choice. We help you figure out what makes the most sense for your business."
                    }
                ]}
            />

            {/* CTA */}
            <Section className="bg-emeraldNeon/10 py-24 text-center">
                <Container>
                    <h2 ref={addElement} className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
                        Ready to Make the Cloud Work for You?
                    </h2>
                    <p ref={addElement} className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
                        Let's discuss how to create a cloud environment that supports your growth, security, and performance goals.
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
