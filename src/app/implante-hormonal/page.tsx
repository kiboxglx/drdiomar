import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicePageContent from "@/components/ServicePageContent";

export const metadata: Metadata = {
  title: "Implante Hormonal | Dr. Diomar Cangussu — Brasília de Minas e Varzelândia",
  description:
    "Implantes hormonais biodegradáveis para equilíbrio hormonal, ganho de massa muscular e melhora da libido. Procedimento rápido com anestesia local. Agende avaliação em Brasília de Minas ou Varzelândia.",
  keywords: [
    "implante hormonal", "chip hormonal", "reposição hormonal",
    "implante hormonal brasília de minas", "implante testosterona",
    "reposição hormonal norte de minas", "equilíbrio hormonal",
  ],
  alternates: { canonical: "https://drdiomarcangussu.com.br/implante-hormonal" },
  openGraph: {
    title: "Implante Hormonal | Dr. Diomar Cangussu",
    description: "Implantes hormonais biodegradáveis com acompanhamento médico contínuo. Resultados em até 30 dias.",
    url: "https://drdiomarcangussu.com.br/implante-hormonal",
    type: "website",
  },
};

const steps = [
  {
    number: "01",
    title: "Avaliação Clínica e Laboratorial",
    description:
      "Exames hormonais completos, histórico clínico e análise dos seus objetivos. Verificamos se o implante é indicado para o seu caso.",
  },
  {
    number: "02",
    title: "Plano Hormonal Personalizado",
    description:
      "Dosagem calculada individualmente. Usamos tecnologia absorvível (não é chip permanente) — implantes biodegradáveis com liberação controlada.",
  },
  {
    number: "03",
    title: "Procedimento Rápido",
    description:
      "Aplicação em consultório com anestesia local. Dura aproximadamente 10 minutos. A maioria dos pacientes volta à rotina no mesmo dia.",
  },
  {
    number: "04",
    title: "Acompanhamento Contínuo",
    description:
      "Retornos regulares com exames de controle. Suporte por WhatsApp para dúvidas. Equilíbrio hormonal completo em até 30 dias.",
  },
];

const faqs = [
  {
    question: "O implante hormonal dói?",
    answer:
      "O procedimento é feito com anestesia local — você sente apenas uma leve pressão. A aplicação dura cerca de 10 minutos. Pode haver leve desconforto nas primeiras 48h, controlado com orientações simples.",
  },
  {
    question: "É seguro fazer implante hormonal?",
    answer:
      "Sim. Os implantes são biodegradáveis e aprovados para uso médico. Fazemos avaliação clínica e laboratorial completa antes do procedimento. O acompanhamento é contínuo.",
  },
  {
    question: "Quanto tempo dura o implante?",
    answer:
      "Os implantes têm duração média de 6 meses. Após esse período, é necessário reavaliar e, se indicado, renovar. O implante é totalmente absorvido pelo organismo.",
  },
  {
    question: "Quem pode fazer implante hormonal?",
    answer:
      "Homens e mulheres com sintomas de desequilíbrio hormonal: fadiga, perda de libido, dificuldade de ganho muscular, alterações de humor. A indicação é sempre baseada em exames.",
  },
];

export default function ImplanteHormonalPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <ServicePageContent
        badge="Implantes Hormonais"
        title="Recupere Sua Energia e Disposição com Equilíbrio Hormonal"
        subtitle="Implantes hormonais biodegradáveis com acompanhamento médico contínuo. Procedimento rápido, resultados em até 30 dias."
        heroGradient="from-wheat-400 to-orange-600"
        steps={steps}
        results={[
          "Mais energia e disposição desde as primeiras semanas",
          "Melhora da libido e do humor",
          "Ganho de massa muscular e redução de gordura",
          "Procedimento rápido — volta à rotina no mesmo dia",
          "Tecnologia absorvível — não é chip permanente",
        ]}
        faqs={faqs}
        ctaText="Agendar Avaliação Hormonal"
        relatedLinks={[
          { href: "/emagrecimento", label: "Protocolo de Emagrecimento" },
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
