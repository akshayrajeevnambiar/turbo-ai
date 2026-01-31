import { Container, Section } from "./Container";
import { useReveal } from "../hooks/useReveal";

interface FAQItem {
    q: string;
    a: string;
}

interface FAQProps {
    items: FAQItem[];
    title?: string;
    className?: string;
}

export function FAQ({ items, title = "Frequently Asked Questions", className = "bg-charcoalDeep border-t border-white/5" }: FAQProps) {
    const { addElement } = useReveal();

    return (
        <Section className={className}>
            <Container>
                <h2 ref={addElement} className="text-3xl md:text-4xl font-heading font-semibold text-white mb-12 text-center">
                    {title}
                </h2>
                <div className="max-w-3xl mx-auto space-y-8">
                    {items.map((faq, i) => (
                        <div key={i} ref={addElement} className="pb-8 border-b border-white/10 last:border-0 last:pb-0">
                            <h3 className="text-xl font-semibold text-white mb-3">{faq.q}</h3>
                            <p className="text-white/70 leading-relaxed text-lg">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
