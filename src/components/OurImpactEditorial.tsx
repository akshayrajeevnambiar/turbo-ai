import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type Outcome = {
  label: string;
  delta?: string;
  value?: string;
};

type CaseStudy = {
  id: string;
  title: string;
  kicker?: string;
  deck: string;
  image?: string;
  date?: string;
  industry?: string;
  challenge: string;
  solution: string;
  outcomes: Outcome[];
};

const DEFAULT_HERO: CaseStudy = {
  id: "fraud-detection",
  title: "Fraud Detection Transformation",
  kicker: "Risk & AML",
  deck: "Fewer false positives, higher accuracy, faster reviews — legacy alert rules reimagined with intelligent risk scoring.",
  date: "Q1 2024",
  industry: "FinTech",
  challenge:
    "Legacy rules produced 70% false positives, overwhelming analysts and slowing legitimate transactions.",
  solution:
    "Deployed hybrid ML + rules architecture with a central feature store and reviewer feedback loop using MLOps pipelines.",
  outcomes: [
    { label: "False positives", delta: "↓70%" },
    { label: "Catch-rate", delta: "↑28%" },
    { label: "Decision time", delta: "↓65%" },
    { label: "Ops cost / case", delta: "↓34%" },
  ],
};

const DEFAULT_SUPPORTING: CaseStudy[] = [
  {
    id: "claims-automation",
    title: "Claims Triage With LLM Routing",
    kicker: "Automation",
    deck: "Routing, redaction, and retrieval powered by LLMs compressed multi-day claims into minutes.",
    date: "Q3 2024",
    industry: "Insurance",
    challenge:
      "Manual triage introduced delays and inconsistent QA across claim types.",
    solution:
      "Integrated RAG models for policy retrieval, PII redaction, and auto-routing with audit logging and reviewer assist.",
    outcomes: [
      { label: "Cycle time", delta: "↓82%" },
      { label: "Backlog", delta: "↓55%" },
      { label: "CSAT", delta: "↑+11 pts" },
    ],
  },
  {
    id: "platform-modernization",
    title: "Event-Driven Platform Modernization",
    kicker: "Architecture",
    deck: "Migrated legacy monoliths into event-driven microservices, achieving 3× faster releases and resilient uptime.",
    date: "Q4 2024",
    industry: "Retail",
    challenge:
      "Monolithic architecture slowed releases and incident resolution.",
    solution:
      "Applied domain-driven design, introduced event streams, and automated SRE playbooks with IaC + observability pipelines.",
    outcomes: [
      { label: "Release frequency", delta: "↑3×" },
      { label: "MTTR", value: "18m" },
      { label: "Infra cost", delta: "↓27%" },
    ],
  },
];

interface OurImpactEditorialProps {
  hero?: CaseStudy;
  supporting?: CaseStudy[];
}

function CaseModal({
  caseStudy,
  isOpen,
  onClose,
}: {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!caseStudy) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden bg-neutral-950 border border-white/10 p-6 md:p-8 text-left align-middle shadow-xl transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {caseStudy.kicker && (
                      <p className="text-[11px] uppercase tracking-wide text-blue-300">
                        {caseStudy.kicker}
                      </p>
                    )}
                    <Dialog.Title
                      as="h3"
                      className="mt-1 font-serif text-2xl md:text-3xl leading-tight text-white"
                    >
                      {caseStudy.title}
                    </Dialog.Title>
                    <p className="mt-2 text-white/80 text-sm md:text-base">
                      {caseStudy.deck}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="ml-4 inline-flex h-8 w-8 items-center justify-center text-white/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <span className="text-xl">×</span>
                  </button>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-blue-400 uppercase">
                      Challenge
                    </h4>
                    <p className="mt-2 text-sm md:text-base text-white/75 leading-relaxed">
                      {caseStudy.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-blue-400 uppercase">
                      Solution
                    </h4>
                    <p className="mt-2 text-sm md:text-base text-white/75 leading-relaxed">
                      {caseStudy.solution}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-blue-400 uppercase">
                      Outcomes
                    </h4>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {caseStudy.outcomes.map((outcome, index) => (
                        <li
                          key={index}
                          className="inline-flex items-center border border-white/15 bg-white/5 px-2 py-0.5 text-xs text-white/85 tabular-nums"
                        >
                          {outcome.label}:&nbsp;
                          <span className="tabular-nums">
                            {outcome.delta || outcome.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function InlineExpansion({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="border-t border-white/10 bg-neutral-950/50 p-5 md:p-6">
      <div className="grid gap-4">
        <div>
          <h4 className="text-xs font-semibold text-blue-400 uppercase">
            Challenge
          </h4>
          <p className="mt-1 text-sm text-white/75 leading-relaxed">
            {caseStudy.challenge}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-blue-400 uppercase">
            Solution
          </h4>
          <p className="mt-1 text-sm text-white/75 leading-relaxed">
            {caseStudy.solution}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-blue-400 uppercase">
            Outcomes
          </h4>
          <ul className="mt-1 flex flex-wrap gap-2">
            {caseStudy.outcomes.map((outcome, index) => (
              <li
                key={index}
                className="inline-flex items-center border border-white/15 bg-white/5 px-2 py-0.5 text-xs text-white/85 tabular-nums"
              >
                {outcome.label}:&nbsp;
                <span className="tabular-nums">
                  {outcome.delta || outcome.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function OurImpactEditorial({
  hero = DEFAULT_HERO,
  supporting = DEFAULT_SUPPORTING,
}: OurImpactEditorialProps) {
  const [active, setActive] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCase = (caseStudy: CaseStudy) => {
    setActive(caseStudy);
    // On desktop, open modal; on mobile, expand inline
    if (window.innerWidth >= 768) {
      setIsModalOpen(true);
    }
  };

  const closeCase = () => {
    setActive(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        aria-labelledby="impact-heading"
        className="mx-auto max-w-7xl px-4 md:px-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              id="impact-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16"
            >
              Our Impact
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Selected programs and outcomes.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* HERO spans 2 cols on md+ */}
          <article className="relative group md:col-span-2 bg-neutral-950 border border-blue-500/20 hover:border-blue-400/40 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/15">
            {hero.image && (
              <img
                src={hero.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-35 transition-transform duration-500 group-hover:scale-[1.02]"
                aria-hidden="true"
              />
            )}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/40"
              aria-hidden="true"
            ></div>

            {/* Neon glow effect on hover */}
            <div
              className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            ></div>

            <div className="relative p-6 md:p-10">
              {hero.kicker && (
                <div className="text-[11px] uppercase tracking-wide text-blue-300">
                  {hero.kicker}
                </div>
              )}
              <h3 className="mt-1 font-serif text-3xl md:text-5xl leading-tight text-white group-hover:text-blue-50 transition-colors duration-300">
                {hero.title}
              </h3>
              <p className="mt-3 text-white/80 text-sm md:text-lg max-w-3xl">
                {hero.deck}
              </p>

              <button
                onClick={() => openCase(hero)}
                className="mt-6 inline-flex items-center text-sm font-medium text-blue-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 transition-colors duration-300"
              >
                Read full story
                <span className="ml-1 inline-block translate-y-[1px] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </div>

            {/* Animated neon underline on hover */}
            <span className="absolute left-6 right-6 bottom-6 h-px bg-gradient-to-r from-blue-400/40 via-blue-300/60 to-blue-400/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
          </article>

          {/* Mobile inline expansion for hero */}
          {active?.id === hero.id && (
            <div className="md:hidden md:col-span-2">
              <InlineExpansion caseStudy={hero} />
            </div>
          )}

          {/* SUPPORTING CARDS */}
          {supporting.map((cs) => (
            <Fragment key={cs.id}>
              <article className="relative group bg-neutral-950 border border-blue-500/20 hover:border-blue-400/40 overflow-hidden transition-all duration-900 hover:shadow-lg hover:shadow-blue-500/10">
                {cs.image && (
                  <img
                    src={cs.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-25 transition-transform duration-900 group-hover:scale-[1.03]"
                    aria-hidden="true"
                  />
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/40"
                  aria-hidden="true"
                ></div>

                {/* Neon glow effect on hover */}
                <div
                  className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-900"
                  aria-hidden="true"
                ></div>

                <div className="relative p-5 md:p-6">
                  <div className="text-[10px] uppercase tracking-wide text-blue-300/80">
                    {cs.industry || cs.kicker}
                  </div>
                  <h3 className="mt-1 font-serif text-xl md:text-2xl leading-snug text-white group-hover:text-blue-100 transition-colors duration-300">
                    {cs.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/75 line-clamp-3">
                    {cs.deck}
                  </p>

                  <button
                    onClick={() => openCase(cs)}
                    className="mt-4 inline-flex items-center text-sm font-medium text-blue-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 transition-colors duration-300"
                  >
                    Read full story
                    <span className="ml-1 inline-block translate-y-[1px] transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>

                  {/* Animated neon underline */}
                  <span className="mt-3 block h-px bg-gradient-to-r from-blue-400/40 via-blue-300/60 to-blue-400/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                </div>
              </article>

              {/* Mobile inline expansion for supporting card */}
              {active?.id === cs.id && (
                <div className="md:hidden">
                  <InlineExpansion caseStudy={cs} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      {/* Desktop Modal */}
      <CaseModal caseStudy={active} isOpen={isModalOpen} onClose={closeCase} />
    </>
  );
}
