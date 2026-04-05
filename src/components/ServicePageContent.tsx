"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/tracking";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedLink {
  href: string;
  label: string;
}

interface ServicePageContentProps {
  badge: string;
  title: string;
  subtitle: string;
  heroGradient: string;
  steps: Step[];
  results: string[];
  faqs: FAQ[];
  ctaText: string;
  relatedLinks: RelatedLink[];
}

export default function ServicePageContent({
  badge,
  title,
  subtitle,
  heroGradient,
  steps,
  results,
  faqs,
  ctaText,
  relatedLinks,
}: ServicePageContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCta = () => {
    trackEvent({ name: "whatsapp_click", params: { location: `service-${badge.toLowerCase().replace(/\s+/g, "-")}` } });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-slate-950 overflow-hidden">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br ${heroGradient} opacity-[0.06] rounded-full blur-[120px] pointer-events-none`} />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wheat-500/10 border border-wheat-500/25 mb-6">
            <span className="w-2 h-2 rounded-full bg-wheat-500 animate-pulse" />
            <span className="text-sm text-wheat-300 font-semibold">{badge}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-50 mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {subtitle}
          </p>
          <a
            href="https://wa.me/5538998269295?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCta}
            className="inline-flex items-center gap-2 bg-wheat-500 hover:bg-wheat-400 text-slate-950 font-bold py-4 px-8 rounded-xl shadow-lg shadow-wheat-900/20 transition-all hover:scale-105 min-h-[48px] text-base md:text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            {ctaText}
          </a>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-50 text-center mb-12 md:mb-16">
            Como <span className="text-wheat-500">Funciona</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-wheat-500/30 transition-colors"
              >
                <span className="text-4xl font-bold text-wheat-500/20 mb-3 block">{step.number}</span>
                <h3 className="text-xl font-bold text-slate-50 mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-50 text-center mb-12">
            O Que Você Pode <span className="text-wheat-500">Esperar</span>
          </h2>
          <div className="space-y-4">
            {results.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 bg-slate-900/50 border border-slate-800 rounded-xl p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-wheat-500 mt-0.5 shrink-0" />
                <span className="text-slate-300">{result}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-50 text-center mb-12">
            Perguntas <span className="text-wheat-500">Frequentes</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`border rounded-xl overflow-hidden transition-colors ${openFaq === i ? "border-wheat-500/30 bg-slate-900/80" : "border-slate-800 bg-slate-950/50"}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex items-center justify-between w-full p-5 text-left">
                  <span className={`text-base md:text-lg font-medium ${openFaq === i ? "text-wheat-300" : "text-slate-200"}`}>{faq.question}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-wheat-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-50 mb-6">
            Pronto para <span className="text-wheat-500">Começar</span>?
          </h2>
          <p className="text-slate-400 mb-8">
            Agende sua avaliação gratuita pelo WhatsApp. Resposta em até 2 horas.
          </p>
          <a
            href="https://wa.me/5538998269295?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCta}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-green-900/30 transition-all min-h-[48px] text-base md:text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            {ctaText}
          </a>
        </div>
      </section>

      {/* Related links — internal linking */}
      <section className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h3 className="text-lg font-semibold text-slate-400 mb-6 text-center">Conheça também</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 hover:text-wheat-400 transition-colors"
              >
                {link.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
