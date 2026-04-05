import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LocationPageContent from "@/components/LocationPageContent";

export const metadata: Metadata = {
  title: "Nutrólogo em Brasília de Minas | Dr. Diomar Cangussu — Emagrecimento e Implantes",
  description:
    "Dr. Diomar Cangussu atende em Brasília de Minas, MG. Nutrólogo especialista em emagrecimento, implantes hormonais e longevidade. Atendemos São Francisco, Mirabela, Ubaí e região. Agende avaliação gratuita.",
  keywords: [
    "nutrólogo brasília de minas", "médico brasília de minas",
    "emagrecimento brasília de minas", "clínica médica brasília de minas",
    "implante hormonal brasília de minas", "nutrólogo são francisco mg",
    "médico para emagrecer norte de minas",
  ],
  alternates: { canonical: "https://drdiomarcangussu.com.br/brasilia-de-minas" },
  openGraph: {
    title: "Nutrólogo em Brasília de Minas | Dr. Diomar Cangussu",
    description: "Emagrecimento, implantes hormonais e longevidade em Brasília de Minas. +2.000 pacientes atendidos.",
    url: "https://drdiomarcangussu.com.br/brasilia-de-minas",
    type: "website",
  },
};

export default function BrasiliaDeminasPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <LocationPageContent
        city="Brasília de Minas"
        state="MG"
        address="Avenida Rui Barbosa, 365, Centro"
        gmapsUrl="https://www.google.com/maps/search/?api=1&query=Avenida+Rui+Barbosa+365+Centro+Brasilia+de+Minas"
        description="Referência em nutrologia, emagrecimento e implantes hormonais no Norte de Minas. Atendimento humanizado com protocolos personalizados para cada paciente."
        cities={[
          "São Francisco", "Mirabela", "Ubaí", "Luislândia",
          "Icaraí", "Japonvar", "Coração de Jesus",
        ]}
        services={[
          {
            title: "Protocolo de Emagrecimento",
            description: "Emagrecimento científico com bioimpedância, exames e acompanhamento por WhatsApp.",
            href: "/emagrecimento",
          },
          {
            title: "Implantes Hormonais",
            description: "Implantes biodegradáveis para equilíbrio hormonal, energia e performance.",
            href: "/implante-hormonal",
          },
          {
            title: "Longevidade Premium",
            description: "Check-up metabólico completo, soroterapia e prevenção de doenças crônicas.",
            href: "/longevidade",
          },
        ]}
        relatedLocation={{ city: "Varzelândia", href: "/varzelandia" }}
      />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
