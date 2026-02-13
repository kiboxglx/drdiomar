import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Specialist from "@/components/Specialist";
import Locations from "@/components/Locations";
import Protocols from "@/components/Protocols";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <Hero />
      <Specialist />
      <Locations />
      <Protocols />
      <Testimonials />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
