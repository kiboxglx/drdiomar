import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageContent from "@/components/ServicePageContent";

export const metadata: Metadata = {
  title: "Longevidade Premium | Dr. Diomar Cangussu — Check-up e Prevenção",
  description:
    "Programa de longevidade com check-up metabólico completo, soroterapia e gestão do envelhecimento. Prevenção avançada de doenças crônicas. Brasília de Minas e Varzelândia.",
  keywords: [
    "longevidade", "check-up metabólico", "soroterapia",
    "medicina preventiva", "anti-aging", "prevenção de doenças",
    "suplementação injetável", "gestão do envelhecimento",
  ],
  alternates: { canonical: "https://drdiomarcangussu.com.br/longevidade" },
  openGraph: {
    title: "Longevidade Premium | Dr. Diomar Cangussu",
    description: "Check-up metabólico completo e prevenção avançada. Envelheça com saúde e vitalidade.",
    url: "https://drdiomarcangussu.com.br/longevidade",
    type: "website",
  },
};

const steps = [
  {
    number: "01",
    title: "Check-up Metabólico Completo",
    description:
      "Painel laboratorial extenso: hormônios, vitaminas, minerais, marcadores inflamatórios, lipídicos e metabólicos. Visão completa da sua saúde atual.",
  },
  {
    number: "02",
    title: "Plano Preventivo Personalizado",
    description:
      "Estratégias individualizadas de suplementação, nutrição e estilo de vida baseadas nos seus marcadores. Prevenção ativa de doenças crônicas.",
  },
  {
    number: "03",
    title: "Soroterapia Injetável",
    description:
      "Suplementação intravenosa de vitaminas e minerais com absorção superior. Protocolos de hidratação, detox e revitalização.",
  },
  {
    number: "04",
    title: "Acompanhamento Contínuo",
    description:
      "Monitoramento regular dos marcadores. Ajustes no protocolo conforme evolução. Objetivo: envelhecer com saúde, disposição e qualidade de vida.",
  },
];

const faqs = [
  {
    question: "A partir de que idade devo começar?",
    answer:
      "Não existe idade mínima para cuidar da saúde. O check-up preventivo é recomendado a partir dos 30 anos, mas pessoas mais jovens com sintomas (fadiga, queda de imunidade) também se beneficiam.",
  },
  {
    question: "O que é soroterapia?",
    answer:
      "É a administração intravenosa de vitaminas, minerais e aminoácidos. Por ser direto na veia, a absorção é muito superior à suplementação oral. Indicada para hidratação, detox e reposição nutricional.",
  },
  {
    question: "Qual a frequência das consultas?",
    answer:
      "O protocolo inicial geralmente envolve avaliação + retorno em 30-60 dias. Depois, acompanhamento trimestral ou semestral conforme os resultados.",
  },
  {
    question: "Atende por convênio?",
    answer:
      "Trabalhamos com medicina personalizada. Atendimento particular com emissão de nota fiscal para reembolso junto ao plano de saúde. Parcelamento disponível.",
  },
];

export default function LongevidadePage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <ServicePageContent
        badge="Longevidade Premium"
        title="Envelheça com Saúde, Disposição e Qualidade de Vida"
        subtitle="Check-up metabólico completo, soroterapia e gestão do envelhecimento. Prevenção avançada para quem quer viver mais e melhor."
        heroGradient="from-emerald-400 to-teal-600"
        steps={steps}
        results={[
          "Melhora nos marcadores de saúde e vitalidade",
          "Prevenção ativa de doenças crônicas",
          "Mais energia e imunidade fortalecida",
          "Plano preventivo personalizado",
          "Suplementação injetável de alta absorção",
        ]}
        faqs={faqs}
        ctaText="Agendar Check-up Preventivo"
        relatedLinks={[
          { href: "/emagrecimento", label: "Protocolo de Emagrecimento" },
          { href: "/implante-hormonal", label: "Implantes Hormonais" },
          { href: "/brasilia-de-minas", label: "Brasília de Minas" },
          { href: "/varzelandia", label: "Varzelândia" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
