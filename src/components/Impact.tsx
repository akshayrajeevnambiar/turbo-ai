import { Container, Section } from "./Container";
import { useReveal } from "../hooks/useReveal";
import { copy } from "../content/turboai";
import OurImpactEditorial from "./OurImpactEditorial";

export function Impact() {
  const { addElement } = useReveal(60);

  return (
    <Section id={copy.impact.id} className="bg-charcoalDeep/30">
      <Container>
        <div ref={addElement}>
          <OurImpactEditorial />
        </div>
      </Container>
    </Section>
  );
}
