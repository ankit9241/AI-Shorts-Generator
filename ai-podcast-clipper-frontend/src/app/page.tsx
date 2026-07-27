import { Navigation } from "~/components/navigation";
import { HeroSection } from "~/components/hero-section";
import { FeaturesSection } from "~/components/features-section";
import { HowItWorksSection } from "~/components/how-it-works-section";
import { InfrastructureSection } from "~/components/infrastructure-section";
import { MetricsSection } from "~/components/metrics-section";
import { IntegrationsSection } from "~/components/integrations-section";
import { SecuritySection } from "~/components/security-section";
import { DevelopersSection } from "~/components/developers-section";
import { TestimonialsSection } from "~/components/testimonials-section";
import { PricingSection } from "~/components/pricing-section";
import { CtaSection } from "~/components/cta-section";
import { FooterSection } from "~/components/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      {/* <InfrastructureSection /> */}
      {/* <MetricsSection /> */}
      {/* <IntegrationsSection /> */}
      {/* <SecuritySection /> */}
      {/* <DevelopersSection /> */}
      {/* <TestimonialsSection /> */}
      <PricingSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
