import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LocationPageContent from "@/components/LocationPageContent";

export const metadata: Metadata = {
  title: "Nutrólogo em Brasília de Minas | Dr. Diomar Cangussu — Avaliação Clínica Aprofundada",
  description:
    "Dr. Diomar Cangussu atende em Brasília de Minas, MG. Consulta de avaliação clínica aprofundada com nutrólogo. Atendemos pacientes de São Francisco, Mirabela, Ubaí, Luislândia e região. Agende sua avaliação.",
  keywords: [
    "nutrólogo brasília de minas", "médico brasília de minas",
    "consulta nutrólogo brasília de minas", "clínica médica brasília de minas",
    "avaliação clínica brasília de minas", "nutrólogo são francisco mg",
    "consulta nutrologia norte de minas",
  ],
  alternates: { canonical: "https://drdiomarcangussu.com.br/brasilia-de-minas" },
  openGraph: {
    title: "Nutrólogo em Brasília de Minas | Dr. Diomar Cangussu",
    description: "Consulta de avaliação clínica aprofundada com o Dr. Diomar Cangussu em Brasília de Minas. +2.000 pacientes atendidos.",
    url: "https://drdiomarcangussu.com.br/brasilia-de-minas",
    type: "website",
    images: [{ url: "/assets/dr-specialist.png", width: 1200, height: 630, alt: "Dr. Diomar Cangussu — Nutrólogo em Brasília de Minas" }],
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
        description="Referência em avaliação clínica aprofundada no Norte de Minas. Anamnese cuidadosa, exames específicos e leitura clínica do seu caso antes de qualquer recomendação de tratamento."
        cities={[
          "São Francisco", "Mirabela", "Ubaí", "Luislândia",
          "Icaraí", "Japonvar", "Coração de Jesus",
        ]}
        services={[
          {
            title: "Para quem busca emagrecer",
            description: "Avaliação clínica para investigar o que está por trás do ganho de peso — anamnese, bioimpedância e exames específicos.",
            href: "/emagrecimento",
          },
          {
            title: "Para sintomas hormonais",
            description: "Avaliação para fadiga, queda de libido, alterações de humor e desequilíbrios hormonais — painel laboratorial específico.",
            href: "/implante-hormonal",
          },
          {
            title: "Para check-up preventivo",
            description: "Avaliação clínica preventiva com painel laboratorial extenso e leitura do seu estado atual.",
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
