import { Container, Section } from "../components/Container";
import { Helmet } from "react-helmet-async";
import { useReveal } from "../hooks/useReveal";
import { SectionLink } from "../components/SectionLink";
import networkingImage from "../assets/ai-trans-networkinglines.jpg";
import "./ai-transformation.css";
import { SEO } from "../components/SEO";
import { Connect } from "../components/Connect";
import { EnergyStyleInsights } from "../components/LandingSEOSections";

const transformationFaqs = [
    { question: "What is the difference between AI implementation and AI transformation?", answer: "AI implementation is about putting tools in place. AI transformation goes a step further. It weaves intelligence into how decisions are made, how work flows, and how the business actually runs, day to day." },
    { question: "Do we need advanced data infrastructure to get started?", answer: "Not necessarily. We start by looking at what you already have. From there, we suggest approaches that make sense, whether you're just beginning or already sitting on a lot of data." },
    { question: "Is AI transformation only for large enterprises?", answer: "Not at all. In fact, mid-sized organizations often move faster because there's less red tape and fewer legacy systems to work around." },
    { question: "How do you handle responsible AI and compliance?", answer: "We build AI with care from the start. That means being clear about how it works, keeping an eye on performance, and making sure it fits within the rules your organization needs to follow." },
];

export function AITransformation() {
    const { addElement } = useReveal(40);

    return (
        <main className="bg-charcoal" role="main">
            <SEO pageKey="aiTransformation" />
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-charcoalDeep">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/enterprise/strategy-meeting.jpg"
                        alt="Technology team discussing priorities around a meeting table"
                        className="w-full h-full object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoalDeep/50 via-charcoalDeep/60 to-charcoalDeep" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-emerald/10 to-charcoal pointer-events-none z-0" />

                <Container className="relative z-10 w-full">
                    <div className="max-w-5xl mx-auto text-center md:text-left">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-emeraldNeon/30 bg-emeraldNeon/10 text-emeraldNeon text-sm font-medium mb-8">
                            Service Overview
                        </div>
                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight"
                        >
                            AI Strategy &amp; <span className="text-emeraldNeon block mt-2">Enterprise Transformation</span>
                        </h1>
                        <p
                            className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl leading-relaxed"
                        >
                            From AI Ambition to Enterprise Capability
                        </p>
                        <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
                            We help leadership teams identify valuable AI opportunities, assess readiness, and connect data, software, security, and operations into a practical path to production.
                        </p>
                        <SectionLink href="#connect" className="mt-8 inline-flex min-h-12 items-center rounded-md bg-blue-500 px-6 py-3 font-bold text-white transition hover:bg-blue-400">Schedule a Consultation</SectionLink>
                    </div>
                </Container>
            </section>

            {/* Intro Section - Turning AI Ambition into Impact */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <h2
                            ref={addElement}
                            className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white mb-12"
                        >
                            Turning AI Ambition into <span className="text-emeraldNeon">Real-World Impact</span> Across Canada
                        </h2>
                        <div className="space-y-8 text-lg md:text-xl text-white/80 leading-relaxed font-body">
                            <p ref={addElement}>
                                From energy teams in Alberta to finance leaders in Toronto, logistics operators in Vancouver,
                                and healthcare innovators across the country, many Canadian organisations are facing the same question:
                            </p>
                            <p ref={addElement} className="font-semibold text-white text-2xl border-l-4 border-emeraldNeon pl-6 py-2 bg-emeraldNeon/5 rounded-r-lg">
                                How do we use AI in a way that actually helps, not just in theory, but in day-to-day work?
                            </p>
                            <p ref={addElement}>
                                In Turbo AI, we do not see AI as something to experiment with and forget. When executed successfully,
                                AI becomes a part of how work is done - it assists teams to make better decisions, it diminishes the
                                amount of friction, and it helps teams to concentrate on the things that matter the most.
                            </p>
                            <p ref={addElement}>
                                That is what AI Transformation will be to us. It is practical and real world, based on the real business
                                needs and outcome based, not on hype or buzzwords. We help you move from ideas and pilots to intelligent
                                systems that are used, trusted, and deliver results long after launch.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Value Prop - Not Just Implementation */}
            <Section className="bg-navy/30 border-y border-white/5">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2
                                ref={addElement}
                                className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8"
                            >
                                Why AI Transformation — <br /><span className="text-emeraldTint">Not Just Implementation?</span>
                            </h2>
                            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                                <p ref={addElement}>
                                    Most organizations start AI initiatives with optimism, yet many stall in the “pilot phase” or fail to
                                    deliver meaningful results. The difference between smoke and substance? AI transformation begins with
                                    a change of mindset and implementation of AI where the work is done (not where it appears on a slide).
                                </p>
                                <p ref={addElement}>
                                    It is not about the implementation of one more tool or platform. It is about altering the way things
                                    are done, decisions made as well as the way things are delivered.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-emeraldNeon/20 blur-3xl opacity-20 rounded-full" />
                            <div className="relative bg-charcoal p-8 md:p-10 border border-white/10 rounded-2xl shadow-2xl">
                                <p className="text-xl md:text-2xl text-white font-medium mb-6 leading-relaxed">
                                    "AI makes big promises. But results only come when those promises turn into action."
                                </p>
                                <div className="h-0.5 w-16 bg-emeraldNeon mb-6" />
                                <p className="text-white/70">
                                    We assist our clients in overcoming pilots and proof-of-concepts and into a place where AI is applied in practice.
                                    This is not about the rush to be on the new trend. It is about creating AI that will earn a seat in it.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Definition Section - What It Really Means */}
            <Section className="bg-charcoal">
                <Container>
                    <div className="max-w-4xl mx-auto mb-16 text-center">
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-6">
                            What AI Transformation Really Means
                        </h2>
                        <p ref={addElement} className="text-xl text-white/70">
                            AI transformation isn’t a piece of software you install and forget. It’s a change in how work gets done.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {[
                            { title: "Clear Business Goals", body: "AI built around outcomes, not vague experimentation." },
                            { title: "Real-World Conditions", body: "Systems that work in production, not just controlled demos." },
                            { title: "Trust & Understanding", body: "Teams that actually understand and trust the AI they’re using." },
                            { title: "Trackable Results", body: "Outcomes you can point to, not just models that look good in a presentation." }
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

                    <div className="mt-12 text-center max-w-3xl mx-auto">
                        <p ref={addElement} className="text-lg text-white/60">
                            A lot of AI efforts stall at the proof-of-concept stage. We help you move past that, taking ideas out of the lab and into everyday operations.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Process / Approach Section */}
            <Section className="bg-charcoalDeep/50 border-t border-white/5">
                <Container>
                    <div className="text-center mb-16">
                        <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-6">
                            From Assessment to Transformation
                        </h2>
                        <div ref={addElement} className="ai-transformation-process-frame max-w-4xl mx-auto mb-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-emeraldNeon/10">
                            <img
                                src="/blog/fresh/05-transformation.jpg"
                                alt="Two professionals discussing plans at a table with a laptop"
                                className="ai-transformation-process-photo w-full aspect-[16/9] object-cover"

                            />
                        </div>
                    </div>

                    <div className="space-y-16 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-emeraldNeon/0 via-emeraldNeon/50 to-emeraldNeon/0 -translate-x-1/2" />

                        {[
                            {
                                num: "01",
                                title: "Discover",
                                content: "We examine business objectives, operational challenges, technology, and the decisions where AI may create measurable value."
                            },
                            {
                                num: "02",
                                title: "Assess",
                                content: "We evaluate readiness across data, infrastructure, security, governance, applications, people, and operating processes."
                            },
                            {
                                num: "03",
                                title: "Prioritise",
                                content: "We separate high-value opportunities from experiments with limited operational or commercial benefit."
                            },
                            {
                                num: "04",
                                title: "Architect",
                                content: "We establish the data, AI, application, integration, infrastructure, and security architecture required for the intended outcome."
                            },
                            {
                                num: "05",
                                title: "Implement",
                                content: "We develop, test, integrate, and deploy the selected capabilities with clear ownership and validation."
                            },
                            {
                                num: "06",
                                title: "Evolve",
                                content: "We monitor outcomes and improve AI capabilities as technology and business requirements develop."
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

            <Section className="border-y border-white/10 bg-charcoalDeep">
                <Container>
                    <div className="mb-10 max-w-3xl">
                        <p className="text-sm font-bold uppercase text-blue-300">Enterprise Readiness</p>
                        <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">AI Readiness Assessment</h2>
                        <p className="mt-5 text-lg leading-relaxed text-white/70">Useful AI depends on more than model access. We examine the foundations that determine whether an initiative can be trusted, adopted, and maintained.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ["Data Readiness", "Quality, accessibility, ownership, and lineage of the information AI will use."],
                            ["Technology Readiness", "Applications, integration points, and the condition of existing systems."],
                            ["AI Maturity", "Current use cases, evaluation practices, and capacity to move beyond pilots."],
                            ["Security Readiness", "Identity, access, privacy, and protection against new AI threat surfaces."],
                            ["Governance", "Decision rights, policies, auditability, and human oversight."],
                            ["Infrastructure", "Compute, storage, networking, reliability, and deployment options."],
                            ["Talent & Skills", "The abilities teams need to build, operate, and use AI responsibly."],
                            ["Operating Model", "Ownership, workflows, change management, and measures of success."],
                        ].map(([title, description], index) => (
                            <article key={title} className="border-t-2 border-blue-400 bg-[#07111F] p-6">
                                <p className="text-xs font-bold text-blue-300">0{index + 1}</p>
                                <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-white/70">{description}</p>
                            </article>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section className="bg-charcoal">
                <Container>
                    <p className="text-sm font-bold uppercase text-blue-300">Transformation Use Cases</p>
                    <h2 className="mt-3 max-w-3xl text-3xl font-bold text-white md:text-5xl">Where strategy becomes an operating decision</h2>
                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        {[
                            ["AI readiness and investment planning", "Assess data, technology, security, skills, governance, and operating ownership before committing to a major programme."],
                            ["Opportunity portfolio", "Compare candidate use cases by business value, evidence, feasibility, decision impact, adoption, and delivery risk."],
                            ["Enterprise AI roadmap", "Sequence foundation work, pilots, architecture, governance, capability building, and production releases around realistic dependencies."],
                            ["Transformation governance", "Create decision rights, measures, review forums, and lifecycle controls so initiatives remain aligned after launch."],
                        ].map(([title, body]) => <article key={title} className="border-t border-emeraldNeon/50 pt-5"><h3 className="text-xl font-bold text-white">{title}</h3><p className="mt-3 leading-relaxed text-white/70">{body}</p></article>)}
                    </div>
                </Container>
            </Section>

            {/* Impact Section for Canadians */}
            <Section className="relative overflow-hidden bg-gradient-to-b from-navy to-charcoal">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <img
                        src={networkingImage}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                <Container className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="order-2 lg:order-1">
                            <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-8">
                                Why AI Transformation Matters for <span className="text-red-500">Canadian</span> Organizations
                            </h2>
                            <p ref={addElement} className="text-xl text-white/80 mb-8 leading-relaxed">
                                In a landscape shaped by tight labor markets, complex regulations, and growing expectations,
                                AI isn’t about replacing jobs. It’s about helping people do their work better and making
                                organizations more resilient.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Making decisions faster and with more confidence",
                                    "Reducing operational strain through smart automation",
                                    "Improving experiences for customers, clients, or citizens",
                                    "Spotting risks earlier and supporting compliance efforts",
                                    "Giving teams more time to focus on work that actually needs people"
                                ].map((item, idx) => (
                                    <li key={idx} ref={addElement} className="flex items-start gap-4">
                                        <span className="text-emeraldNeon mt-1">✦</span>
                                        <span className="text-white/80 text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="order-1 lg:order-2 flex items-center justify-center">
                            <div ref={addElement} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-sm">
                                <h3 className="text-2xl font-semibold text-white mb-6">How We Work With You</h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-emeraldNeon font-bold text-sm tracking-wide uppercase mb-1">Advisory & Strategy</h4>
                                        <p className="text-white/70 text-sm">Guidance, orientation, and roadmap preparation.</p>
                                    </div>
                                    <div className="w-full h-px bg-white/10" />
                                    <div>
                                        <h4 className="text-emeraldNeon font-bold text-sm tracking-wide uppercase mb-1">Project-Based Delivery</h4>
                                        <p className="text-white/70 text-sm">Specific scope, schedule, and deliverables.</p>
                                    </div>
                                    <div className="w-full h-px bg-white/10" />
                                    <div>
                                        <h4 className="text-emeraldNeon font-bold text-sm tracking-wide uppercase mb-1">Transformation Partnership</h4>
                                        <p className="text-white/70 text-sm">Long-term integration across functional areas.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Differentiators */}
            <Section className="bg-charcoal">
                <Container>
                    <h2 ref={addElement} className="text-3xl font-heading font-semibold text-white text-center mb-12">
                        What Makes Turbo AI Different
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Results First", body: "We measure outcomes, not just technical success." },
                            { title: "Responsible", body: "Openness, leadership, and ethics baked in from the start." },
                            { title: "Built for Real Use", body: "AI that real people use, not tools left alone once released." },
                            { title: "Canadian Context", body: "Aware of local industries, regulations, and realities." }
                        ].map((item, idx) => (
                            <div key={idx} ref={addElement} className="bg-charcoalDeep p-6 rounded-lg border border-white/5 text-center">
                                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            <Helmet><script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: transformationFaqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) })}</script></Helmet>
            {/* FAQ */}
            <Section className="bg-charcoalDeep border-t border-white/5">
                <Container>
                    <h2 ref={addElement} className="text-3xl font-heading font-semibold text-white mb-12 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-8">
                        {[
                            {
                                q: "What is the difference between AI implementation and AI transformation?",
                                a: "AI implementation is about putting tools in place. AI transformation goes a step further. It weaves intelligence into how decisions are made, how work flows, and how the business actually runs, day to day."
                            },
                            {
                                q: "Do we need advanced data infrastructure to get started?",
                                a: "Not necessarily. We start by looking at what you already have. From there, we suggest approaches that make sense, whether you’re just beginning or already sitting on a lot of data."
                            },
                            {
                                q: "Is AI transformation only for large enterprises?",
                                a: "Not at all. In fact, mid-sized organizations often move faster because there’s less red tape and fewer legacy systems to work around."
                            },
                            {
                                q: "How do you handle responsible AI and compliance?",
                                a: "We build AI with care from the start. That means being clear about how it works, keeping an eye on performance, and making sure it fits within the rules your organization needs to follow."
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

            <Section className="border-y border-white/10 bg-[#07111F]"><Container><p className="text-sm font-bold uppercase text-blue-300">Related Services and Platforms</p><h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">Move from roadmap to enabling capability</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{[
                ["Data Engineering & AI Foundations", "/data-engineering-ai-foundations", "Prepare reliable, governed data for prioritized use cases."],
                ["AI Engineering & Software Development", "/ai-engineering-software-development", "Turn validated concepts into maintained applications."],
                ["AI Governance & Cybersecurity", "/ai-governance-cybersecurity", "Build oversight and security into the transformation lifecycle."],
            ].map(([title, href, body]) => <SectionLink key={href} href={href} className="border-t border-blue-400/50 p-5"><h3 className="text-xl font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-relaxed text-white/70">{body}</p></SectionLink>)}</div></Container></Section>

            <EnergyStyleInsights slugs={["what-is-ai-transformation-in-business", "ai-adoption-in-enterprises-2025", "ai-roi-for-enterprises"]} title="From Our Blog" intro="Explore readiness, adoption, and value decisions before moving from ambition to implementation." />

            {/* CTA */}
            <Section className="bg-emeraldNeon/10 py-24 text-center">
                <Container>
                    <h2 ref={addElement} className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
                        Ready to turn AI promises into action?
                    </h2>
                    <p ref={addElement} className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
                        Let's discuss how AI Transformation can solve real problems for your organization.
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
            <Connect />
        </main>
    );
}
