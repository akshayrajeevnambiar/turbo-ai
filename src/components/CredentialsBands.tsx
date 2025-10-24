// Import logos from assets
import nottinghamLogo from "../assets/university-of-nottingham_logo.png";
import iitbLogo from "../assets/iit-b_logo.png";
import oxfordLogo from "../assets/oxford_logo.png";

type Logo = { src: string; alt: string; href?: string; className?: string };
type Band = {
  id: string;
  label: string;
  logos: Logo[];
  size?: "lg" | "md" | "sm";
  marquee?: boolean; // true = auto-scroll (only for row 1)
};

const BANDS: Band[] = [
  {
    id: "endorsed",
    label: "Endorsed by",
    size: "lg",
    marquee: true,
    logos: [
      { src: nottinghamLogo, alt: "University of Nottingham" },
      { src: oxfordLogo, alt: "University of Oxford" },
      { src: nottinghamLogo, alt: "University of Nottingham" }, // Duplicate for scrolling effect
      { src: oxfordLogo, alt: "University of Oxford" }, // Duplicate for scrolling effect
    ],
  },
  {
    id: "core-team",
    label: "With core team members from",
    size: "md",
    logos: [{ src: iitbLogo, alt: "IIT Bombay" }],
  },
  {
    id: "working-at",
    label: "With people working at",
    size: "sm",
    logos: [
      { src: iitbLogo, alt: "IIT Bombay" },
      { src: nottinghamLogo, alt: "University of Nottingham" },
      { src: oxfordLogo, alt: "University of Oxford" },
    ],
  },
];

function LogoItem({ logo, h }: { logo: Logo; h: string }) {
  const Img = (
    <img
      src={logo.src}
      alt={logo.alt}
      className={`${h} w-auto opacity-80 hover:opacity-100 transition`}
      loading="lazy"
      decoding="async"
    />
  );
  return logo.href ? (
    <a
      href={logo.href}
      target="_blank"
      rel="noreferrer"
      aria-label={logo.alt}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
    >
      {Img}
    </a>
  ) : (
    <div aria-label={logo.alt}>{Img}</div>
  );
}

function BandRow({ label, logos, size = "md", marquee = false }: Band) {
  const h =
    size === "lg"
      ? "h-11 md:h-12"
      : size === "sm"
      ? "h-7 md:h-8"
      : "h-9 md:h-10";

  return (
    <div className="grid grid-cols-[64px_1fr] md:grid-cols-[88px_1fr] border border-white/10 bg-neutral-900/40">
      {/* Left rail label — vertical on md+, horizontal on mobile */}
      <div className="relative flex items-center justify-center border-r border-white/10">
        <span className="md:[writing-mode:vertical-rl] md:rotate-180 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/60 px-1 py-3 md:px-0 md:py-5 text-center">
          {label}
        </span>
      </div>

      {/* Logo lane */}
      <div className="relative overflow-hidden">
        {/* grid dots */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] [background-size:10px_10px]"></div>

        {/* content */}
        {marquee ? (
          // Duplicate list for seamless loop
          <div className="relative isolate py-4 md:py-5">
            <div className="flex gap-10 md:gap-12 animate-marquee will-change-transform">
              {[...logos, ...logos].map((l, i) => (
                <LogoItem key={`${l.alt}-${i}`} logo={l} h={h} />
              ))}
            </div>
            {/* soft gradient masks left/right */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-neutral-900/40 to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-neutral-900/40 to-transparent"></div>
          </div>
        ) : (
          <div className="relative flex flex-wrap items-center gap-x-10 md:gap-x-12 gap-y-4 px-4 md:px-6 py-4 md:py-5">
            {logos.map((l) => (
              <LogoItem key={l.alt} logo={l} h={h} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CredentialsBands({
  bands = BANDS,
}: {
  bands?: Band[];
}) {
  return (
    <section
      aria-labelledby="cred-heading"
      className="w-full bg-neutral-950 text-white py-8 md:py-10"
    >
      <h2 id="cred-heading" className="sr-only">
        Credentials & Endorsements
      </h2>

      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 space-y-3 md:space-y-4">
        {bands.map((band) => (
          <BandRow key={band.id} {...band} />
        ))}
      </div>
    </section>
  );
}
