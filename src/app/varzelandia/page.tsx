import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LocationPageContent from "@/components/LocationPageContent";

export const metadata: Metadata = {
  title: "Nutrólogo em Varzelândia | Dr. Diomar Cangussu — Avaliação Clínica Aprofundada",
  description:
    "Dr. Diomar Cangussu atende em Varzelândia, MG. Consulta de avaliação clínica aprofundada com nutrólogo. Atendemos pacientes de São João da Ponte, Ibiracatu, Lontra, Verdelândia e região. Agende sua avaliação.",
  keywords: [
    "nutrólogo varzelândia", "médico varzelândia",
    "consulta nutrólogo varzelândia", "avaliação clínica varzelândia",
    "clínica médica varzelândia", "médico são joão da ponte",
    "consulta nutrologia norte de minas",
  ],
  alternates: { canonical: "https://drdiomarcangussu.com.br/varzelandia" },
  openGraph: {
    title: "Nutrólogo em Varzelândia | Dr. Diomar Cangussu",
    description: "Consulta de avaliação clínica aprofundada com o Dr. Diomar Cangussu em Varzelândia. +2.000 pacientes atendidos.",
    url: "https://drdiomarcangussu.com.br/varzelandia",
    type: "website",
    images: [{ url: "/assets/dr-specialist.png", width: 1200, height: 630, alt: "Dr. Diomar Cangussu — Nutrólogo em Varzelândia" }],
  },
};

export default function VarzelandiaPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <LocationPageContent
        city="Varzelândia"
        state="MG"
        address="Rua Lucas Alkimin 190, Centro"
        gmapsUrl="https://www.google.com/maps/search/?api=1&query=Rua+Lucas+Alkimin+190+Centro+Varzelandia"
        description="Hub regional de avaliação clínica aprofundada. Consulta com anamnese cuidadosa, exames específicos e leitura clínica do seu caso para Varzelândia e toda a região."
        cities={[
          "São João da Ponte", "Ibiracatu", "Lontra", "Verdelândia",
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
        relatedLocation={{ city: "Brasília de Minas", href: "/brasilia-de-minas" }}
      />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
