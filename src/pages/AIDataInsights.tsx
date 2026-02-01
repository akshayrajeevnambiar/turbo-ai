import { Container, Section } from "../components/Container";
import { useReveal } from "../hooks/useReveal";
import { SectionLink } from "../components/SectionLink";
import { SEO } from "../components/SEO";
import { FAQ } from "../components/FAQ";
import heroImage from "../assets/ai-data-insights-hero.png";

export function AIDataInsights() {
    const { addElement } = useReveal(40);

    return (
        <main className="bg-charcoal" role="main">
            <SEO pageKey="aiDataInsights" />
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-charcoalDeep">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="AI & Data Insights Background"
                        className="w-full h-full object-cover opacity-40 "
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
                            AI & Data Insights <span className="text-emeraldNeon block mt-2">Canada</span>
                        </h1>
                        <p
                            ref={addElement}
                            className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl leading-relaxed"
                        >
                            Turning everyday data into clear insight that supports better decisions.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Intro Section - Your Data Is Talking */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <h2
                            ref={addElement}
                            className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white mb-12"
                        >
                            Your Data Is Talking - <span className="text-emeraldNeon">The Question Is, Are You Hearing It?</span>
                        </h2>
                        <div className="space-y-8 text-lg md:text-xl text-white/80 leading-relaxed font-body">
                            <p ref={addElement}>
                                Across Canada, organizations are collecting more data than ever before, but much of it never makes it into day-to-day decisions or long-term planning. Sales numbers, customer interactions, operational metrics, supply chain signals, it’s all there. Yet many teams still rely on gut feel, outdated reports, or spreadsheets that arrive too late to matter.
                            </p>
                            <p ref={addElement} className="font-semibold text-white text-2xl border-l-4 border-emeraldNeon pl-6 py-2 bg-emeraldNeon/5 rounded-r-lg">
                                AI & Data Insights change that.
                            </p>
                            <p ref={addElement}>
                                At Turbo AI, we help teams make sense of the data they already have, turning it into insight that shows up at the right time and actually supports better decisions, not just nicer-looking reports.
                            </p>
                            <p ref={addElement}>
                                It's not about giving people too many charts or trying to keep up with the latest analytics terms. It's about being clear, knowing when to act, and knowing what to do next. It's about knowing what's going on now, what might happen next, and what you should do about it.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* The Current Significance */}
            <Section className="bg-navy/30 border-y border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2
                                ref={addElement}
                                className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8"
                            >
                                The Current Significance of AI and Data Insights in <span className="text-red-500">Canada</span>
                            </h2>
                            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                                <p ref={addElement}>
                                    Across Canada, businesses are being asked to move faster with fewer resources. Costs are rising, hiring is harder, customer expectations keep shifting, and competition isn’t just local anymore. Relying on instinct or slow reports simply isn’t enough in this environment.
                                </p>
                                <p ref={addElement}>
                                    AI & Data Insights help teams see what’s coming, not just what already happened and act before small issues turn into expensive ones.
                                </p>
                                <p ref={addElement}>
                                    At the same time, decision-making cycles are getting shorter. When insight comes in real time, decisions don’t have to wait. Teams can see shifts as they’re happening, course-correct early, and avoid finding out too late that something’s gone off track. That kind of visibility builds confidence and saves a lot of unnecessary scrambling.
                                </p>
                                <p ref={addElement}>
                                    From retail and logistics to energy, healthcare, and financial services, insight has become a competitive advantage, not a nice-to-have.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-emeraldNeon/20 blur-3xl opacity-20 rounded-full" />
                            <div className="relative bg-charcoal p-8 md:p-10 border border-white/10 rounded-2xl shadow-2xl">
                                <p className="text-xl md:text-2xl text-white font-medium mb-6 leading-relaxed">
                                    "It's more important to move forward than to have 'perfect' data."
                                </p>
                                <div className="h-0.5 w-16 bg-emeraldNeon mb-6" />
                                <p className="text-white/70">
                                    We focus on clarity, relevance, and real-world use. Insight is only useful when it makes people do things differently.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* What We Mean & How We Turn Data Into Insight */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto mb-16 text-center">
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-6">
                            What We Mean by AI & Data Insights
                        </h2>
                        <p ref={addElement} className="text-xl text-white/70">
                            AI & Data Insights aren’t about replacing people or automating every decision. They’re about giving teams better visibility and support.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-24">
                        <div ref={addElement} className="col-span-full md:col-span-1 p-8 rounded-xl bg-charcoalDeep border border-white/5">
                            <h3 className="text-xl font-semibold text-emeraldNeon mb-4">We help answer practical questions:</h3>
                            <ul className="space-y-3">
                                {[
                                    "Where are we losing time, money, or opportunity?",
                                    "What’s driving changes in customer behaviour?",
                                    "Which risks are emerging before they show up on reports?",
                                    "What actions are most likely to improve outcomes?"
                                ].map((q, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-emeraldNeon mt-1.5">•</span>
                                        <span className="text-white/80 text-lg">{q}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div ref={addElement} className="col-span-full md:col-span-1 flex items-center justify-center p-8">
                            <p className="text-2xl text-white/90 italic font-medium">
                                "The focus is always on clarity, relevance, and real-world use."
                            </p>
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-6">
                            How We Turn Data Into Insight
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Start With the Questions That Matter",
                                body: "We don’t begin with tools or models. We start with your business questions. What decisions are hard today? Where is uncertainty slowing you down? This keeps the work focused and avoids building insights no one uses."
                            },
                            {
                                title: "Make Sense of the Data You Already Have",
                                body: "Most businesses already have useful data; it's just not organized or used enough. We put together data that is spread out, shape it into something useful, and make it reliable, all without tearing everything apart or starting over."
                            },
                            {
                                title: "Apply AI Where It Adds Real Value",
                                body: "We only use AI when it really helps us. It helps bring to light patterns that are easy to miss every day, like slow changes, early signs, and connections that point to what's coming next."
                            },
                            {
                                title: "Deliver Insights People Actually Use",
                                body: "Because insight is only useful when it makes people do things differently. We don't build noise. We focus on useful results, like clear views, easy-to-understand explanations, and decision support. No black boxes."
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

            {/* What You Can Acquire */}
            <Section className="bg-charcoalDeep/50 border-t border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div className="order-1 lg:order-1">
                            <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8">
                                What You Can Acquire Through <span className="text-emeraldNeon">AI and Data Insights</span>
                            </h2>
                            <p ref={addElement} className="text-xl text-white/80 mb-8 leading-relaxed">
                                Organizations using AI-driven insights often experience:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Faster, more confident decision-making",
                                    "Better visibility into performance and risk",
                                    "Improved forecasting and planning",
                                    "Less time spent pulling reports manually",
                                    "Teams aligned around the same version of the truth"
                                ].map((item, idx) => (
                                    <li key={idx} ref={addElement} className="flex items-start gap-4">
                                        <span className="text-emeraldNeon mt-1">✦</span>
                                        <span className="text-white/80 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <p ref={addElement} className="text-lg text-white/90 font-medium italic">
                                    Most importantly, data stops being something you look at after the fact and starts being something you use to change what happens next.
                                </p>
                            </div>
                        </div>

                        <div className="order-2 lg:order-2">
                            <div ref={addElement} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <h3 className="text-2xl font-semibold text-white mb-4">Designed for Canadian Business Realities</h3>
                                <div className="space-y-4 text-white/70">
                                    <p>Our method is based on the real-life problems that Canadian teams face every day. We create insights that respect privacy, encourage responsibility, and work within the limits of the real world, not ideal situations.</p>
                                    <p>We help businesses in Toronto, Calgary, Vancouver, and Edmonton with insights that are specific to their situation, not templates that have been copied from other places. This is true whether you're expanding nationally or making small changes to your operations.</p>
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
                        q: "How are AI & Data Insights different from traditional reporting?",
                        a: "Reports that are more traditional tell you what has already happened. AI and Data Insights help you figure out why something happened and what will probably happen next. This lets you make decisions sooner and with more confidence."
                    },
                    {
                        q: "Can AI & Data Insights support day-to-day operations, not just leadership?",
                        a: "Yes. Insights can help frontline teams, managers, and operators make better calls in real time, not just support high-level planning."
                    },
                    {
                        q: "How do you make sure the insights are trustworthy?",
                        a: "We focus on clean data, clear logic, and simple explanations. If people can’t understand or trust the insight, it doesn’t get used and we don’t build it."
                    },
                    {
                        q: "How do you handle data privacy and responsibility?",
                        a: "Privacy and accountability are considered from the start. We design insights that respect data boundaries and support responsible use."
                    }
                ]}
            />

            {/* CTA */}
            <Section className="bg-emeraldNeon/10 py-24 text-center">
                <Container>
                    <h2 ref={addElement} className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
                        Let’s Turn Insight Into Action
                    </h2>
                    <p ref={addElement} className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
                        If your data feels underused, hard to trust, or slow to support decisions, it may be time for a different approach.
                        <br /><br />
                        Turbo AI's AI and Data Insights help you see things more clearly, with more confidence, and with a real effect.
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
