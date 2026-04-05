import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageContent from "@/components/ServicePageContent";

export const metadata: Metadata = {
  title: "Protocolo de Emagrecimento Médico | Dr. Diomar Cangussu — Brasília de Minas e Varzelândia",
  description:
    "Emagrecimento com acompanhamento médico personalizado. Protocolo científico com bioimpedância, exames e suporte por WhatsApp. Resultados em 30 dias. Agende avaliação gratuita em Brasília de Minas ou Varzelândia.",
  keywords: [
    "emagrecimento médico", "protocolo de emagrecimento", "médico para emagrecer",
    "emagrecer com acompanhamento", "nutrólogo emagrecimento", "emagrecer brasília de minas",
    "clínica emagrecimento norte de minas", "emagrecer sem efeito sanfona",
  ],
  alternates: { canonical: "https://drdiomarcangussu.com.br/emagrecimento" },
  openGraph: {
    title: "Protocolo de Emagrecimento Médico | Dr. Diomar Cangussu",
    description: "Emagrecimento científico com resultados em 30 dias. +2.000 pacientes em Brasília de Minas e Varzelândia.",
    url: "https://drdiomarcangussu.com.br/emagrecimento",
    type: "website",
  },
};

const steps = [
  {
    number: "01",
    title: "Avaliação Completa",
    description:
      "Exames laboratoriais, bioimpedância de alta precisão e análise do histórico. Entendemos sua biologia individual — hormônios, metabolismo, inflamação.",
  },
  {
    number: "02",
    title: "Protocolo Personalizado",
    description:
      "Plano montado para o SEU corpo: nutrição, suplementação e, quando necessário, suporte medicamentoso. Nada genérico — cada protocolo é único.",
  },
  {
    number: "03",
    title: "Acompanhamento Contínuo",
    description:
      "Suporte por WhatsApp, retornos regulares e ajustes no protocolo. Você nunca fica sem orientação — estamos junto em cada etapa.",
  },
  {
    number: "04",
    title: "Resultados Sustentáveis",
    description:
      "Resultados visíveis nas primeiras semanas. O foco é emagrecer de verdade, sem efeito sanfona, tratando a causa e não os sintomas.",
  },
];

const faqs = [
  {
    question: "Preciso fazer dieta muito restritiva?",
    answer:
      "Não. Trabalhamos com reeducação alimentar prática que funciona para sua rotina, não contra ela. Quando necessário, usamos suporte medicamentoso que reduz compulsão e acelera resultados — sem sofrimento.",
  },
  {
    question: "Quanto tempo até ver resultados?",
    answer:
      "A maioria dos pacientes relata melhora na disposição em 2-4 semanas. Resultados visíveis de emagrecimento aparecem a partir de 30 dias. Cada caso é avaliado individualmente.",
  },
  {
    question: "O tratamento é seguro?",
    answer:
      "Sim. Todo protocolo começa com exames laboratoriais completos. Usamos apenas tratamentos com evidência científica e acompanhamento médico contínuo.",
  },
  {
    question: "Qual o valor do tratamento?",
    answer:
      "Os protocolos são personalizados — o investimento varia conforme exames e necessidades. Agende uma avaliação gratuita para receber seu plano com valores transparentes. Parcelamento disponível.",
  },
];

export default function EmagrecimentoPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <ServicePageContent
        badge="Protocolo de Emagrecimento"
        title="Emagreça de Verdade — Sem Dietas Malucas, Sem Efeito Sanfona"
        subtitle="Protocolo médico personalizado com exames, nutrição e acompanhamento por WhatsApp. Resultados reais a partir de 30 dias."
        heroGradient="from-blue-500 to-indigo-500"
        steps={steps}
        results={[
          "Perda de gordura real (não apenas peso na balança)",
          "Mais energia e disposição desde as primeiras semanas",
          "Sem efeito sanfona — tratamos a causa, não os sintomas",
          "Plano alimentar que funciona para sua rotina",
          "Acompanhamento contínuo por WhatsApp",
        ]}
        faqs={faqs}
        ctaText="Agendar Avaliação de Emagrecimento"
        relatedLinks={[
          { href: "/implante-hormonal", label: "Implantes Hormonais" },
          { href: "/longevidade", label: "Longevidade Premium" },
          { href: "/brasilia-de-minas", label: "Brasília de Minas" },
          { href: "/varzelandia", label: "Varzelândia" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
