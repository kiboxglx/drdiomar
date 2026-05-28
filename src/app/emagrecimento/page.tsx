import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageContent from "@/components/ServicePageContent";

export const metadata: Metadata = {
  title: "Avaliação Clínica para Emagrecimento | Dr. Diomar Cangussu — Brasília de Minas e Varzelândia",
  description:
    "Consulta de avaliação clínica aprofundada para quem busca emagrecer com critério. Anamnese, exames específicos e bioimpedância para investigar a causa real do ganho de peso. Atendimento em Brasília de Minas e Varzelândia.",
  keywords: [
    "médico para emagrecer", "consulta nutrólogo emagrecimento", "avaliação emagrecimento",
    "nutrólogo brasília de minas", "investigação clínica ganho de peso",
    "consulta emagrecimento norte de minas", "avaliação clínica peso",
  ],
  alternates: { canonical: "https://drdiomarcangussu.com.br/emagrecimento" },
  openGraph: {
    title: "Avaliação Clínica para Emagrecimento | Dr. Diomar Cangussu",
    description: "Consulta de avaliação aprofundada com o Dr. Diomar para quem busca emagrecer com critério. Investigação clínica antes de qualquer recomendação.",
    url: "https://drdiomarcangussu.com.br/emagrecimento",
    type: "website",
  },
};

const steps = [
  {
    number: "01",
    title: "Anamnese aprofundada",
    description:
      "Histórico de tentativas, sintomas, rotina, exames anteriores. Tempo dedicado para entender por que o seu corpo não está respondendo às tentativas anteriores.",
  },
  {
    number: "02",
    title: "Bioimpedância de alta precisão",
    description:
      "Análise da composição corporal — gordura, massa magra, água, taxa metabólica. Dados objetivos para construir a leitura clínica do seu quadro.",
  },
  {
    number: "03",
    title: "Investigação laboratorial",
    description:
      "Exames específicos para entender o que está por trás do ganho de peso — hormônios, metabolismo, marcadores inflamatórios. Sem chutar diagnóstico.",
  },
  {
    number: "04",
    title: "Leitura clínica do seu caso",
    description:
      "Você sai da consulta entendendo o que está acontecendo no seu corpo. Só então, se fizer sentido para o seu caso, o Dr. Diomar apresenta o caminho clínico recomendado.",
  },
];

const faqs = [
  {
    question: "A consulta é específica para quem quer emagrecer?",
    answer:
      "Não. A consulta é uma avaliação clínica aprofundada. O foco maior em emagrecimento aparece quando o paciente chega com essa dor específica — a investigação se direciona para os marcadores que explicam o ganho de peso. Mas o produto é o mesmo: uma leitura clínica séria do seu caso.",
  },
  {
    question: "Saio da consulta com a dieta prescrita?",
    answer:
      "Depende. A consulta é uma avaliação — o foco é entender o que está por trás do quadro antes de qualquer prescrição. Quando há exames suficientes, o Dr. Diomar já apresenta o caminho clínico. Em casos que pedem mais investigação, exames são solicitados antes de qualquer recomendação.",
  },
  {
    question: "Preciso levar exames anteriores?",
    answer:
      "Sim, sempre que possível. Ajuda a montar uma leitura mais completa do seu quadro já na primeira consulta. Se você não tem exames, o Dr. Diomar solicita os necessários no atendimento.",
  },
  {
    question: "Qual o valor da consulta?",
    answer:
      "A consulta de avaliação tem valor particular. A equipe apresenta o valor e as condições durante o agendamento.",
  },
];

export default function EmagrecimentoPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <ServicePageContent
        badge="Avaliação para quem busca emagrecer"
        title="Antes da dieta, uma leitura clínica séria do seu caso."
        subtitle="Consulta de avaliação aprofundada com o Dr. Diomar para investigar o que está por trás do ganho de peso. Anamnese, exames e bioimpedância — antes de qualquer recomendação."
        heroGradient="from-blue-500 to-indigo-500"
        steps={steps}
        results={[
          "Entendimento real de por que o seu corpo não responde às tentativas anteriores",
          "Leitura objetiva da composição corporal e do metabolismo",
          "Identificação de marcadores hormonais e inflamatórios envolvidos no quadro",
          "Direção clínica para decidir os próximos passos com critério",
          "Diagnóstico construído com exames, não com palpite",
        ]}
        faqs={faqs}
        ctaText="Agendar minha avaliação"
        relatedLinks={[
          { href: "/implante-hormonal", label: "Sintomas hormonais" },
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
