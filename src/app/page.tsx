import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import MethodSection from "@/components/MethodSection";
import Protocols from "@/components/Protocols";
import ResultsSection from "@/components/ResultsSection";
import Specialist from "@/components/Specialist";
import Testimonials from "@/components/Testimonials";
import Locations from "@/components/Locations";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ExitIntent from "@/components/ExitIntent";
import StickyCTA from "@/components/StickyCTA";

/* Thin gradient line between major page sections */
function SectionSeparator() {
  return (
    <div
      aria-hidden="true"
      className="h-px bg-gradient-to-r from-transparent via-wheat-500/20 to-transparent"
    />
  );
}

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <Hero />
      <SectionSeparator />
      <ProblemSection />
      {/* InlineCTA placeholder — future slice */}
      <SectionSeparator />
      <MethodSection />
      <SectionSeparator />
      <ResultsSection />
      <SectionSeparator />
      <Protocols />
      {/* Transform placeholder — future slice */}
      <SectionSeparator />
      <Specialist />
      <SectionSeparator />
      <Testimonials />
      <SectionSeparator />
      <Locations />
      <SectionSeparator />
      <FAQ />
      <SectionSeparator />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
      <ExitIntent />
      <StickyCTA />
    </main>
  );
}
