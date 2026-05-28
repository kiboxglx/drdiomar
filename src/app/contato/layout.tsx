import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | Dr. Diomar Cangussu — Agende sua avaliação",
  description:
    "Entre em contato com a equipe do Dr. Diomar Cangussu. Agende sua consulta de avaliação clínica aprofundada em Brasília de Minas ou Varzelândia pelo WhatsApp (38) 99826-9290.",
  robots: "index, follow",
  alternates: {
    canonical: "https://drdiomarcangussu.com.br/contato",
  },
  openGraph: {
    title: "Contato | Dr. Diomar Cangussu — Agende sua avaliação",
    description: "Agende sua consulta de avaliação com o Dr. Diomar Cangussu pelo WhatsApp.",
    url: "https://drdiomarcangussu.com.br/contato",
    type: "website",
    images: [{ url: "/assets/dr-specialist.png", width: 1200, height: 630, alt: "Dr. Diomar Cangussu — Contato" }],
  },
};

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
