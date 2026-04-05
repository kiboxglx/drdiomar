import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | Dr. Diomar Cangussu — Agende sua Consulta",
  description:
    "Entre em contato com Dr. Diomar Cangussu. Agende sua avaliação em Brasília de Minas ou Varzelândia. WhatsApp (38) 99826-9290.",
  robots: "index, follow",
  alternates: {
    canonical: "https://drdiomarcangussu.com.br/contato",
  },
};

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
