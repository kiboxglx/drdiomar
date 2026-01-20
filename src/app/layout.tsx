import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Diomar Cangussu | Medicina de Precisão",
  description: "Protocolos de emagrecimento e implantes hormonais avançados no Norte de Minas.",
  icons: {
    icon: '/app/icon.png',
    apple: '/app/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased bg-slate-950 text-slate-50 font-sans selection:bg-wheat-500/30 selection:text-wheat-200`}
      >
        {children}
      </body>
    </html>
  );
}
