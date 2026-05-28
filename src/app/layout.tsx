import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ConsentGatedScripts from "@/components/ConsentGatedScripts";
import CookieConsent from "@/components/CookieConsent";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drdiomarcangussu.com.br"),
  title: "Dr. Diomar Cangussu | Avaliação Clínica Aprofundada — Brasília de Minas e Varzelândia",
  description: "Médico nutrologista no Norte de Minas. Consulta de avaliação clínica aprofundada para investigar o que está por trás do ganho de peso, da fadiga ou do desequilíbrio hormonal. +2.000 pacientes atendidos em Brasília de Minas e Varzelândia. Agende sua avaliação.",
  keywords: ["Nutrologia", "Nutrólogo", "Brasília de Minas", "Varzelândia", "Norte de Minas", "Dr. Diomar Cangussu", "Avaliação clínica", "Consulta nutrologia", "Médico nutrologista", "Investigação clínica", "CRM 60.143 MG"],
  authors: [{ name: "Dr. Diomar Cangussu" }],
  creator: "Dr. Diomar Cangussu",
  publisher: "Dr. Diomar Cangussu",
  robots: "index, follow",
  alternates: {
    canonical: "https://drdiomarcangussu.com.br",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://drdiomarcangussu.com.br",
    title: "Dr. Diomar Cangussu | Avaliação Clínica Aprofundada — Norte de Minas",
    description: "Consulta de avaliação clínica aprofundada com o Dr. Diomar Cangussu. Anamnese, exames e leitura clínica do seu caso antes de qualquer recomendação. +2.000 pacientes em Brasília de Minas e Varzelândia.",
    siteName: "Dr. Diomar Cangussu",
    images: [
      {
        url: "/assets/dr-specialist.png",
        width: 1200,
        height: 630,
        alt: "Dr. Diomar Cangussu - Avaliação Clínica Aprofundada em Brasília de Minas e Varzelândia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Diomar Cangussu | Avaliação Clínica Aprofundada",
    description: "Consulta de avaliação clínica com o Dr. Diomar Cangussu — investigação séria do seu caso. +2.000 pacientes em Brasília de Minas e Varzelândia.",
    images: ["/assets/dr-specialist.png"],
  },
  other: {
    "facebook-domain-verification": "dsp4uoei7ha8djr8gdrlf9k1tympez",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Hero images use next/image with priority + fetchPriority="high" — no manual preload needed */}
      </head>
      <body
        className={`${montserrat.variable} ${jakarta.variable} antialiased bg-slate-950 text-slate-50 font-sans selection:bg-wheat-500/30 selection:text-wheat-200`}
      >
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-wheat-500 focus:text-slate-950 focus:rounded-lg focus:font-bold"
        >
          Pular para o conteúdo
        </a>
        {/* GA4 / Google Ads / Meta Pixel: carregados apenas após consentimento (LGPD) */}
        <ConsentGatedScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Physician",
              "name": "Dr. Diomar Cangussu",
              "description": "Médico nutrologista. Consulta de avaliação clínica aprofundada em Brasília de Minas e Varzelândia, Norte de Minas Gerais.",
              "image": "https://drdiomarcangussu.com.br/assets/dr-specialist.png",
              "@id": "https://drdiomarcangussu.com.br",
              "url": "https://drdiomarcangussu.com.br",
              "telephone": "+5538998269290",
              "priceRange": "$$$",
              "medicalSpecialty": ["Nutrology"],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "CRM",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Conselho Regional de Medicina de Minas Gerais"
                },
                "identifier": "60.143 MG"
              },
              "availableService": [
                {
                  "@type": "MedicalProcedure",
                  "name": "Consulta de Avaliação Clínica Aprofundada",
                  "description": "Avaliação clínica com anamnese aprofundada, bioimpedância de alta precisão, solicitação de exames específicos e leitura clínica individual do caso do paciente."
                }
              ],
              "areaServed": [
                "Brasília de Minas", "Varzelândia", "São Francisco", "Mirabela",
                "Ubaí", "Luislândia", "São João da Ponte", "Ibiracatu", "Lontra"
              ],
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Avenida Rui Barbosa, 365, Centro",
                  "addressLocality": "Brasília de Minas",
                  "addressRegion": "MG",
                  "postalCode": "39330-000",
                  "addressCountry": "BR"
                },
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Rua Lucas Alkimin 190, Centro",
                  "addressLocality": "Varzelândia",
                  "addressRegion": "MG",
                  "postalCode": "39335-000",
                  "addressCountry": "BR"
                }
              ],
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -16.208154,
                "longitude": -44.428623
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.instagram.com/drdiomarcangussu"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "O que acontece na consulta com o Dr. Diomar?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A consulta é uma avaliação clínica aprofundada. O Dr. Diomar dedica tempo para anamnese, faz bioimpedância de alta precisão e solicita exames específicos quando necessário. No retorno, apresenta a leitura clínica do caso e, se fizer sentido, recomenda o caminho técnico para o quadro do paciente."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quanto tempo dura a consulta?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "O tempo necessário para olhar o caso com profundidade. O Dr. Diomar reserva uma janela ampla para investigar o histórico clínico, ouvir os sintomas, fazer a bioimpedância e construir a leitura inicial do quadro com o paciente."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Preciso levar exames anteriores?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sim, sempre que possível. Exames recentes ajudam a montar uma leitura mais completa do quadro já na primeira consulta. Se o paciente não tem exames, o Dr. Diomar solicita os necessários durante o atendimento."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Saio da consulta com tratamento prescrito?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Depende do caso. A consulta é uma avaliação clínica — o foco é entender o que está por trás do quadro antes de qualquer decisão. Quando há exames suficientes, o Dr. Diomar já apresenta a recomendação clínica. Em casos que pedem mais investigação, novos exames são solicitados antes de qualquer prescrição."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Já tentei de tudo e nada funciona. Por que seria diferente?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Porque o ponto de partida é outro. A consulta começa pela investigação — anamnese cuidadosa, exames específicos e leitura clínica do caso antes de qualquer recomendação. É comum pacientes que já tentaram de tudo descobrirem na avaliação algo que tinha passado batido em outras consultas."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Qual o valor da consulta?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A consulta de avaliação tem valor particular. A equipe apresenta o valor e as condições durante o agendamento, junto com a disponibilidade de horários."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Posso parcelar?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sim. As formas de pagamento e condições de parcelamento são apresentadas no momento do agendamento, junto com o valor da consulta."
                  }
                },
                {
                  "@type": "Question",
                  "name": "O Dr. Diomar atende por convênio?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Não. A avaliação clínica aprofundada exige tempo e dedicação em cada caso. O atendimento é particular, com emissão de nota fiscal para que o paciente possa solicitar reembolso junto ao plano de saúde quando previsto em contrato."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Onde ficam os consultórios?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Dois hubs regionais no Norte de Minas: Brasília de Minas (atendendo São Francisco, Mirabela, Ubaí, Luislândia e região) e Varzelândia (atendendo São João da Ponte, Ibiracatu, Lontra e cidades vizinhas)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Como faço para agendar?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Pelo WhatsApp da equipe. Basta preencher o formulário do site ou clicar em qualquer botão de agendamento. A recepção responde com a disponibilidade da agenda do Dr. Diomar."
                  }
                }
              ]
            })
          }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>

  );
}
