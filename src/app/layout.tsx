import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Diomar Cangussu | Emagrecimento, Implantes Hormonais e Nutrologia",
  description: "Especialista em Emagrecimento, Implantes Hormonais e Medicina de Precisão. Atendimento em Brasília de Minas, Varzelândia e região. Agende sua consulta!",
  keywords: ["Emagrecimento", "Implantes Hormonais", "Nutrologia", "Medicina Esportiva", "Brasília de Minas", "Varzelândia", "Norte de Minas", "Dr. Diomar Cangussu", "Reposição Hormonal", "Saúde"],
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
    title: "Dr. Diomar Cangussu | Emagrecimento e Performance",
    description: "Protocolos avançados de emagrecimento e implantes hormonais no Norte de Minas.",
    siteName: "Dr. Diomar Cangussu",
    images: [
      {
        url: "/assets/dr-specialist.png",
        width: 1200,
        height: 630,
        alt: "Dr. Diomar Cangussu - Especialista em Emagrecimento",
      },
    ],
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
        <link
          rel="preload"
          href="/assets/bg-hero.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/assets/hero-640.webp"
          as="image"
          type="image/webp"
          media="(max-width: 768px)"
        />
        <link
          rel="preload"
          href="/assets/hero-1280.webp"
          as="image"
          type="image/webp"
          media="(min-width: 769px)"
        />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased bg-slate-950 text-slate-50 font-sans selection:bg-wheat-500/30 selection:text-wheat-200`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CN78RTJQKZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CN78RTJQKZ');
            gtag('config', 'AW-17885917270');
          `}
        </Script>
        {/* Meta Pixel */}
        {FB_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Physician",
              "name": "Dr. Diomar Cangussu",
              "image": "https://drdiomarcangussu.com.br/assets/dr-specialist.png",
              "@id": "https://drdiomarcangussu.com.br",
              "url": "https://drdiomarcangussu.com.br",
              "telephone": "+5538998269295",
              "priceRange": "$$$",
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
                  "name": "Já tentei de tudo e nada funciona. Por que seria diferente?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Porque nossos protocolos não são dietas genéricas. Começamos com exames laboratoriais completos para entender sua biologia individual — hormônios, metabolismo, inflamação. A partir daí, montamos um plano personalizado que ataca a causa real, não apenas os sintomas."
                  }
                },
                {
                  "@type": "Question",
                  "name": "É seguro fazer implante hormonal?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sim. Os implantes são biodegradáveis e aprovados para uso médico. Antes de qualquer procedimento, fazemos uma avaliação clínica e laboratorial completa para garantir que é indicado para você. O acompanhamento é contínuo."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quanto tempo até eu ver resultados?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A maioria dos pacientes relata melhora significativa na disposição e energia nas primeiras 2-4 semanas. Resultados visíveis de emagrecimento geralmente aparecem a partir de 30 dias."
                  }
                },
                {
                  "@type": "Question",
                  "name": "O Dr. Diomar atende por convênio?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Trabalhamos com medicina personalizada de alto nível, o que exige tempo e dedicação em cada consulta. Por isso, os atendimentos são particulares. Emitimos nota fiscal para que você possa solicitar reembolso junto ao seu plano de saúde."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Qual o valor do investimento?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Os protocolos são 100% personalizados — o investimento varia conforme seus exames, objetivos e necessidades. Agende uma avaliação gratuita para receber seu plano sob medida com valores transparentes."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Onde ficam os consultórios?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Temos dois hubs regionais: Brasília de Minas (atendendo São Francisco, Mirabela, Ubaí, Luislândia e região) e Varzelândia (atendendo São João da Ponte, Ibiracatu, Lontra e cidades vizinhas)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Tenho medo de efeito sanfona. Como vocês evitam isso?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "O efeito sanfona acontece quando você faz dietas restritivas sem tratar a causa. Nosso protocolo ajusta hormônios, metabolismo e hábitos de forma sustentável. Além disso, o acompanhamento contínuo garante que você mantenha os resultados a longo prazo."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Preciso fazer dieta muito restritiva?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Não. Nosso objetivo é criar um plano alimentar que funcione para sua rotina, não contra ela. Trabalhamos com reeducação alimentar prática e, quando necessário, com suporte medicamentoso que reduz a compulsão e acelera resultados."
                  }
                }
              ]
            })
          }}
        />
        {children}
      </body>
    </html>

  );
}
