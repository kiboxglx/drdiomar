import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obrigado! | Dr. Diomar Cangussu",
  description: "Seus dados foram recebidos. Entraremos em contato em até 2 horas.",
  robots: "noindex, nofollow",
};

export default function ObrigadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
