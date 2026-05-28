import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageContent from "@/components/ServicePageContent";

export const metadata: Metadata = {
  title: "Avaliação Clínica Preventiva | Dr. Diomar Cangussu — Check-up Aprofundado",
  description:
    "Consulta de avaliação clínica aprofundada para quem quer um check-up sério. Anamnese, bioimpedância e painel laboratorial extenso para entender o seu estado atual antes de qualquer recomendação. Brasília de Minas e Varzelândia.",
  keywords: [
    "check-up médico", "consulta preventiva", "avaliação clínica preventiva",
    "nutrólogo brasília de minas", "medicina preventiva norte de minas",
    "check-up metabólico", "consulta nutrologia preventiva",
  ],
  alternates: { canonical: "https://drdiomarcangussu.com.br/longevidade" },
  openGraph: {
    title: "Avaliação Clínica Preventiva | Dr. Diomar Cangussu",
    description: "Consulta de avaliação aprofundada para um check-up sério antes de qualquer decisão sobre suplementação ou tratamento preventivo.",
    url: "https://drdiomarcangussu.com.br/longevidade",
    type: "website",
    images: [{ url: "/assets/dr-specialist.png", width: 1200, height: 630, alt: "Dr. Diomar Cangussu — Avaliação clínica preventiva" }],
  },
};

const steps = [
  {
    number: "01",
    title: "Anamnese preventiva",
    description:
      "Histórico clínico, hábitos, sono, alimentação, performance física e mental, contexto familiar. Tempo para mapear o seu estado atual por inteiro.",
  },
  {
    number: "02",
    title: "Bioimpedância de alta precisão",
    description:
      "Análise da composição corporal e taxa metabólica. Dados objetivos sobre o estado físico atual.",
  },
  {
    number: "03",
    title: "Painel laboratorial extenso",
    description:
      "Solicitação de exames de hormônios, vitaminas, minerais, marcadores inflamatórios, lipídicos e metabólicos. Visão completa antes de qualquer recomendação.",
  },
  {
    number: "04",
    title: "Leitura clínica do seu estado atual",
    description:
      "Você sai entendendo onde estão os pontos fortes e onde estão os marcadores que merecem atenção. Só então, se fizer sentido, o Dr. Diomar apresenta o caminho preventivo recomendado.",
  },
];

const faqs = [
  {
    question: "A partir de que idade faz sentido essa avaliação?",
    answer:
      "Não há idade mínima. A consulta preventiva é especialmente recomendada a partir dos 30 anos, mas pessoas mais jovens com sintomas (fadiga, queda de imunidade, performance baixa) também se beneficiam de uma leitura clínica séria.",
  },
  {
    question: "Saio da consulta com suplementação prescrita?",
    answer:
      "Depende. A consulta é uma avaliação — o foco é entender o seu estado atual antes de qualquer prescrição. Quando há exames suficientes, o Dr. Diomar já apresenta o caminho preventivo. Em casos que pedem mais investigação, exames são solicitados antes de qualquer recomendação.",
  },
  {
    question: "Preciso levar exames anteriores?",
    answer:
      "Sim, sempre que possível. Ajuda a comparar evolução e a construir uma leitura mais completa. Se não tiver, o Dr. Diomar solicita os necessários durante a consulta.",
  },
  {
    question: "Atende por convênio?",
    answer:
      "Não. O atendimento é particular, com tempo dedicado e profundidade que o modelo de convênio não comporta. Emitimos nota fiscal para reembolso quando previsto em contrato.",
  },
];

export default function LongevidadePage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <ServicePageContent
        badge="Avaliação clínica preventiva"
        title="Antes de qualquer suplementação, uma leitura clínica séria do seu estado atual."
        subtitle="Consulta de avaliação aprofundada com o Dr. Diomar para um check-up sério. Anamnese, bioimpedância e painel laboratorial extenso antes de qualquer recomendação preventiva."
        heroGradient="from-emerald-400 to-teal-600"
        steps={steps}
        results={[
          "Mapeamento completo do seu estado clínico atual",
          "Identificação objetiva de marcadores que merecem atenção",
          "Leitura laboratorial extensa para visão preventiva real",
          "Direção clínica construída com base em dados, não em palpite",
          "Decisão sobre suplementação ou tratamento preventivo com critério",
        ]}
        faqs={faqs}
        ctaText="Agendar minha avaliação"
        relatedLinks={[
          { href: "/emagrecimento", label: "Quem busca emagrecer" },
          { href: "/implante-hormonal", label: "Sintomas hormonais" },
          { href: "/brasilia-de-minas", label: "Brasília de Minas" },
          { href: "/varzelandia", label: "Varzelândia" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
