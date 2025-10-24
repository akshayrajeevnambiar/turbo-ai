// Import logos
import nottinghamLogo from "../assets/university-of-nottingham_logo.png";
import iitbLogo from "../assets/iit-b_logo.png";
import oxfordLogo from "../assets/oxford_logo.png";

export function CredentialsSection() {
  return (
    <section
      aria-labelledby="credentials-heading"
      className="relative w-full py-16 bg-neutral-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
        <h2
          id="credentials-heading"
          className="text-sm uppercase tracking-widest text-white/60"
        >
          Credentials & Endorsements
        </h2>

        {/* Grid container */}
        <div className="mt-10 grid grid-rows-3 gap-8">
          {/* Row 1 — Endorsed By (logos/icons) */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-white/70 uppercase tracking-wide">
              Endorsed By
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-8 md:gap-12">
              <img
                src={nottinghamLogo}
                alt="University of Nottingham"
                className="h-10 w-auto opacity-80 hover:opacity-100 transition"
              />
              <img
                src={oxfordLogo}
                alt="University of Oxford"
                className="h-10 w-auto opacity-80 hover:opacity-100 transition"
              />
              {/* British Embassy - Text Badge */}
              <div className="flex items-center h-10 px-4 bg-white/5 border border-white/10 rounded-lg opacity-80 hover:opacity-100 transition">
                <span className="text-xs uppercase tracking-wider text-white/90 font-medium">
                  British Embassy
                </span>
              </div>
            </div>
          </div>

          {/* Row 2 — With People Working At */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-white/70 uppercase tracking-wide">
              With People Working At
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <img
                src={iitbLogo}
                alt="IIT Bombay"
                className="h-8 w-auto opacity-80 hover:opacity-100 transition"
              />
              <div className="flex items-center h-8 px-3 bg-white/5 border border-white/10 rounded opacity-80 hover:opacity-100 transition">
                <span className="text-xs uppercase tracking-wider text-white/90 font-medium">
                  Tech Leaders
                </span>
              </div>
              <div className="flex items-center h-8 px-3 bg-white/5 border border-white/10 rounded opacity-80 hover:opacity-100 transition">
                <span className="text-xs uppercase tracking-wider text-white/90 font-medium">
                  Fortune 500
                </span>
              </div>
            </div>
          </div>

          {/* Row 3 — Trusted By / Associated With */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-white/70 uppercase tracking-wide">
              Trusted By
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="flex items-center h-9 px-4 bg-white/5 border border-white/10 rounded-lg opacity-80 hover:opacity-100 transition">
                <span className="text-xs uppercase tracking-wider text-white/90 font-medium">
                  Financial Institutions
                </span>
              </div>
              <div className="flex items-center h-9 px-4 bg-white/5 border border-white/10 rounded-lg opacity-80 hover:opacity-100 transition">
                <span className="text-xs uppercase tracking-wider text-white/90 font-medium">
                  Enterprise Clients
                </span>
              </div>
              <div className="flex items-center h-9 px-4 bg-white/5 border border-white/10 rounded-lg opacity-80 hover:opacity-100 transition">
                <span className="text-xs uppercase tracking-wider text-white/90 font-medium">
                  87% Retention Rate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
