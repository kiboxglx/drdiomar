import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import MethodSection from "@/components/MethodSection";
import Protocols from "@/components/Protocols";
import ResultsSection from "@/components/ResultsSection";
import Specialist from "@/components/Specialist";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <Hero />
      <ProblemSection />
      <MethodSection />
      <Protocols />
      <ResultsSection />
      <Specialist />
      <Testimonials />
      <FinalCTA />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
