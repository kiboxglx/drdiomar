import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LocationPageContent from "@/components/LocationPageContent";

export const metadata: Metadata = {
  title: "Nutrólogo em Varzelândia | Dr. Diomar Cangussu — Emagrecimento e Implantes",
  description:
    "Dr. Diomar Cangussu atende em Varzelândia, MG. Nutrólogo especialista em emagrecimento, implantes hormonais e longevidade. Atendemos São João da Ponte, Ibiracatu, Lontra e região. Agende avaliação gratuita.",
  keywords: [
    "nutrólogo varzelândia", "médico varzelândia",
    "emagrecimento varzelândia", "implante hormonal varzelândia",
    "clínica médica varzelândia", "médico são joão da ponte",
    "nutrologia norte de minas",
  ],
  alternates: { canonical: "https://drdiomarcangussu.com.br/varzelandia" },
  openGraph: {
    title: "Nutrólogo em Varzelândia | Dr. Diomar Cangussu",
    description: "Emagrecimento, implantes hormonais e longevidade em Varzelândia. +2.000 pacientes atendidos.",
    url: "https://drdiomarcangussu.com.br/varzelandia",
    type: "website",
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
        description="Hub regional de saúde e performance. Protocolos médicos avançados de emagrecimento, reposição hormonal e longevidade para Varzelândia e toda a região."
        cities={[
          "São João da Ponte", "Ibiracatu", "Lontra", "Verdelândia",
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
        relatedLocation={{ city: "Brasília de Minas", href: "/brasilia-de-minas" }}
      />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
