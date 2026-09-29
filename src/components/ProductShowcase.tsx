import { CircleStackIcon, ServerStackIcon, ShieldCheckIcon, SignalIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "./Container";
import { cmsPublicEnabled } from "../cms/client";
import { usePublishedEntries } from "../cms/hooks";

const products = [
  { name: "Seismic AI", href: "https://seismicai.ca", icon: SignalIcon, color: "text-cyan-300" },
  { name: "DCI 360", href: "/products/dci-360", icon: ServerStackIcon, color: "text-blue-300" },
  { name: "i-Lakehouse", href: "/products/i-lakehouse", icon: CircleStackIcon, color: "text-amber-300" },
  { name: "ADRS", href: "/products/adrs", icon: ShieldCheckIcon, color: "text-violet-300" },
];

export function ProductShowcase() {
  const { entries } = usePublishedEntries("product");
  const visibleProducts = cmsPublicEnabled
    ? [products[0], ...entries.map((entry) => ({
        name: entry.title, href: `/products/${entry.slug}`,
        icon: entry.slug === "dci-360" ? ServerStackIcon : entry.slug === "adrs" ? ShieldCheckIcon : CircleStackIcon,
        color: entry.slug === "dci-360" ? "text-blue-300" : entry.slug === "adrs" ? "text-violet-300" : "text-amber-300",
      })).sort((a, b) => {
        const order = ["Seismic AI", "DCI 360", "i-Lakehouse", "ADRS"];
        const rank = (name: string) => { const index = order.indexOf(name); return index < 0 ? order.length : index; };
        return rank(a.name) - rank(b.name) || a.name.localeCompare(b.name);
      })]
    : products;
  return (
    <Section id="our-products" className="border-y border-white/5 bg-charcoalDeep/40">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="our-products-heading" className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Products</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {visibleProducts.map(({ name, href, icon: Icon, color }) => (
            <a
              key={name}
              href={href}
              className="group flex min-h-36 flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-5 text-center transition duration-300 hover:-translate-y-1 hover:border-emeraldTint/60 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emeraldTint"
            >
              <Icon className={`h-11 w-11 transition duration-300 group-hover:scale-105 ${color}`} aria-hidden="true" />
              <span className="text-sm font-semibold leading-tight text-white sm:text-base">{name}</span>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
