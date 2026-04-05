"use client";

import { motion } from "framer-motion";
import { MapPin, MessageCircle, ArrowRight, Clock, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/lib/tracking";

interface Service {
  title: string;
  description: string;
  href: string;
}

interface LocationPageContentProps {
  city: string;
  state: string;
  address: string;
  gmapsUrl: string;
  description: string;
  cities: string[];
  services: Service[];
  relatedLocation: { city: string; href: string };
}

export default function LocationPageContent({
  city,
  state,
  address,
  gmapsUrl,
  description,
  cities,
  services,
  relatedLocation,
}: LocationPageContentProps) {
  const handleCta = () => {
    trackEvent({ name: "whatsapp_click", params: { location: `location-${city.toLowerCase().replace(/\s+/g, "-")}` } });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-slate-950 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-wheat-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wheat-500/10 border border-wheat-500/25 mb-6">
              <MapPin className="w-4 h-4 text-wheat-400" />
              <span className="text-sm text-wheat-300 font-semibold">{city}, {state}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-50 mb-6 leading-tight">
              Dr. Diomar Cangussu em{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wheat-400 to-wheat-500">
                {city}
              </span>
            </h1>
            <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* Address card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-xl mx-auto">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-wheat-500/10 p-3 rounded-xl shrink-0">
                <MapPin className="w-6 h-6 text-wheat-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-50 mb-1">{city}</h2>
                <p className="text-slate-400">{address}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                <MapPin className="w-4 h-4" />
                Abrir no Maps
              </a>
              <a
                href="https://wa.me/5538998269295?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCta}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Agendar Consulta
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-8 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-wheat-500" />
              <span>CRM 60.143 MG</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-wheat-500" />
              <span>+2.000 Pacientes</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-wheat-500" />
              <span>Seg-Sex 8h-18h</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cities served */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-50 text-center mb-4">
            Atendemos Toda a <span className="text-wheat-500">Região</span>
          </h2>
          <p className="text-slate-400 text-center mb-10 max-w-xl mx-auto">
            Além de {city}, atendemos pacientes das cidades vizinhas:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((c) => (
              <span
                key={c}
                className="px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-medium text-slate-300"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-50 text-center mb-12">
            Nossos <span className="text-wheat-500">Serviços</span> em {city}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="block bg-slate-950 border border-slate-800 hover:border-wheat-500/30 rounded-2xl p-6 md:p-8 transition-colors h-full group"
                >
                  <h3 className="text-lg font-bold text-slate-50 mb-3 group-hover:text-wheat-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-wheat-500 font-semibold group-hover:gap-2 transition-all">
                    Saiba mais <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-50 mb-6">
            Agende Sua Consulta em <span className="text-wheat-500">{city}</span>
          </h2>
          <p className="text-slate-400 mb-8">
            Avaliação gratuita com protocolo personalizado. Resposta em até 2 horas pelo WhatsApp.
          </p>
          <a
            href="https://wa.me/5538998269295?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCta}
            className="inline-flex items-center gap-2 bg-wheat-500 hover:bg-wheat-400 text-slate-950 font-bold py-4 px-8 rounded-xl shadow-lg shadow-wheat-900/20 transition-all hover:scale-105 min-h-[48px] text-base md:text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Agendar pelo WhatsApp
          </a>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h3 className="text-lg font-semibold text-slate-400 mb-6 text-center">Conheça também</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={relatedLocation.href}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 hover:text-wheat-400 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              {relatedLocation.city}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 hover:text-wheat-400 transition-colors"
              >
                {s.title}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
