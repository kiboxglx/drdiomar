import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageContent from "@/components/ServicePageContent";

export const metadata: Metadata = {
  title: "Avaliação para Sintomas Hormonais | Dr. Diomar Cangussu — Brasília de Minas e Varzelândia",
  description:
    "Consulta de avaliação clínica aprofundada para quem apresenta sintomas hormonais — fadiga, queda de libido, perda de massa muscular, alterações de humor. Anamnese e exames específicos antes de qualquer recomendação. Brasília de Minas e Varzelândia.",
  keywords: [
    "avaliação hormonal", "consulta sintomas hormonais", "fadiga e libido",
    "nutrólogo brasília de minas", "consulta hormônios norte de minas",
    "investigação hormonal", "queda de libido médico",
  ],
  alternates: { canonical: "https://drdiomarcangussu.com.br/implante-hormonal" },
  openGraph: {
    title: "Avaliação para Sintomas Hormonais | Dr. Diomar Cangussu",
    description: "Consulta de avaliação aprofundada para investigar fadiga, libido e sintomas hormonais antes de qualquer decisão sobre tratamento.",
    url: "https://drdiomarcangussu.com.br/implante-hormonal",
    type: "website",
  },
};

const steps = [
  {
    number: "01",
    title: "Anamnese de sintomas hormonais",
    description:
      "Mapeamento detalhado dos sintomas — fadiga, libido, humor, sono, composição corporal, performance. Tempo dedicado para entender o quadro por inteiro.",
  },
  {
    number: "02",
    title: "Bioimpedância e avaliação física",
    description:
      "Análise da composição corporal e sinais clínicos relacionados ao equilíbrio hormonal. Dados objetivos para construir a leitura inicial do caso.",
  },
  {
    number: "03",
    title: "Painel hormonal específico",
    description:
      "Solicitação de exames laboratoriais direcionados — testosterona, estrogênio, tireoide, marcadores adrenais. O caminho clínico só é decidido depois dos resultados.",
  },
  {
    number: "04",
    title: "Leitura clínica do seu caso",
    description:
      "Você sai entendendo o que está por trás dos sintomas. Só então, se fizer sentido, o Dr. Diomar apresenta o caminho clínico — que pode incluir ou não terapia hormonal, conforme o caso.",
  },
];

const faqs = [
  {
    question: "Já vou sair da consulta com um implante hormonal prescrito?",
    answer:
      "Não. A consulta é uma avaliação clínica aprofundada — anamnese, bioimpedância e solicitação de exames hormonais específicos. Qualquer decisão sobre terapia hormonal só é feita depois da leitura clínica completa, com base em exames e contexto. Sem pressa, sem prescrição empurrada.",
  },
  {
    question: "Quais sintomas justificam essa avaliação?",
    answer:
      "Fadiga persistente, queda de libido, perda de massa muscular, alterações de humor, dificuldade de concentração, sono ruim, ganho de gordura abdominal, baixa performance. Se você sente que algo não está certo, a investigação faz sentido.",
  },
  {
    question: "Preciso levar exames anteriores?",
    answer:
      "Sim, sempre que possível. Exames hormonais recentes ajudam a montar uma leitura mais completa. Se não tiver, o Dr. Diomar solicita os necessários durante a consulta.",
  },
  {
    question: "Qual o valor da consulta?",
    answer:
      "A consulta de avaliação tem valor particular. A equipe apresenta o valor e as condições durante o agendamento.",
  },
];

export default function ImplanteHormonalPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <ServicePageContent
        badge="Avaliação para sintomas hormonais"
        title="Antes da reposição, uma leitura clínica séria do seu caso."
        subtitle="Consulta de avaliação aprofundada com o Dr. Diomar para investigar fadiga, libido, humor e demais sintomas hormonais. Anamnese e exames específicos antes de qualquer decisão."
        heroGradient="from-wheat-400 to-orange-600"
        steps={steps}
        results={[
          "Mapeamento clínico dos sintomas hormonais que você apresenta",
          "Leitura objetiva da composição corporal e sinais relacionados",
          "Painel laboratorial específico solicitado com critério",
          "Entendimento real do que está por trás do seu quadro",
          "Direção clínica construída com base em exames, não em pressa",
        ]}
        faqs={faqs}
        ctaText="Agendar minha avaliação"
        relatedLinks={[
          { href: "/emagrecimento", label: "Quem busca emagrecer" },
          { href: "/longevidade", label: "Check-up preventivo" },
          { href: "/brasilia-de-minas", label: "Brasília de Minas" },
          { href: "/varzelandia", label: "Varzelândia" },
        ]}
      />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
