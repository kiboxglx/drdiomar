"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2, Shield, Clock, Users } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

export default function Hero() {
    const { track } = useTracking();

    const handleCtaClick = () => {
        track({ name: 'cta_click', params: { cta_location: 'hero', cta_text: 'Quero Minha Avaliação Gratuita' } });
    };
    return (
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20 md:pt-0">
            {/* Background - Mobile: static poster only (saves bandwidth) */}
            <div className="absolute inset-0 w-full h-full z-0 md:hidden">
                <Image
                    src="/assets/bg-hero.webp"
                    alt=""
                    fill
                    priority
                    className="object-cover opacity-30"
                    sizes="100vw"
                />
            </div>

            {/* Background Video - Desktop only */}
            <div className="absolute inset-0 w-full h-full z-0 hidden md:block">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/assets/bg-hero.webp"
                    className="w-full h-full object-cover opacity-30"
                >
                    <source src="/assets/hero-bg.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Background Gradient / Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 z-[1]" />

            {/* Glow Effect */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-wheat-500/10 rounded-full blur-[128px] pointer-events-none z-[2]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center h-full">

                {/* Text Content */}
                <div className="order-1 md:order-1 flex flex-col items-center md:items-start text-center md:text-left space-y-8">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 mb-6">
                            <span className="w-2 h-2 rounded-full bg-wheat-500 animate-pulse" />
                            <span className="text-xs text-wheat-300 font-medium tracking-wider uppercase">Medicina de Alta Performance</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-50 leading-tight mb-4 tracking-tight">
                            Emagreça de Verdade —{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wheat-400 to-wheat-500">
                                Sem Dietas Malucas, Sem Efeito Sanfona.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
                            Protocolos médicos personalizados com <strong className="text-slate-200 font-semibold">resultados em semanas</strong> e{" "}
                            <strong className="text-slate-200 font-semibold">acompanhamento via WhatsApp</strong> — em Brasília de Minas e Varzelândia.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-4 w-full items-center md:items-start"
                    >
                        <a
                            onClick={handleCtaClick}
                            href="https://wa.me/5538998269295?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20com%20Dr.%20Diomar."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-wheat-500 hover:bg-wheat-400 text-slate-950 font-bold py-4 px-6 md:px-8 rounded-xl shadow-lg shadow-wheat-900/20 transition-all hover:scale-105 min-h-[48px]"
                        >
                            Quero Minha Avaliação Gratuita
                            <ChevronRight className="w-5 h-5" />
                        </a>
                    </motion.div>

                    {/* Social Proof Bar — compact, inline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xs md:text-sm text-slate-400 tracking-wide"
                    >
                        <span className="text-wheat-400 font-semibold">+2.000 pacientes</span>
                        <span className="mx-1.5 text-slate-600">·</span>
                        <span>2 unidades</span>
                        <span className="mx-1.5 text-slate-600">·</span>
                        <span>CRM 60.143 MG</span>
                    </motion.p>

                    {/* Trust Badges — hidden on mobile for compactness, shown on md+ */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="hidden md:flex pt-2 flex-wrap items-center gap-5"
                    >
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Shield className="w-4 h-4 text-wheat-500" />
                            <span>CRM 60.143 MG</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Users className="w-4 h-4 text-wheat-500" />
                            <span>+2.000 Pacientes</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Clock className="w-4 h-4 text-wheat-500" />
                            <span>Resultados em 30 dias</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <CheckCircle2 className="w-4 h-4 text-wheat-500" />
                            <span>Pós-Graduação em Nutrologia</span>
                        </div>
                    </motion.div>

                </div>

                {/* Hero Image */}
                <motion.div
                    className="order-2 md:order-2 relative h-[40vh] md:h-[95vh] w-full flex items-end justify-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="relative w-full h-full max-w-xl md:max-w-2xl mx-auto">
                        <picture>
                            <source
                                srcSet="/assets/hero-640.webp 640w, /assets/hero-1280.webp 1280w"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                type="image/webp"
                            />
                            <Image
                                src="/assets/hero-1280.webp"
                                alt="Dr. Diomar Cangussu"
                                fill
                                priority
                                fetchPriority="high"
                                className="object-cover object-top md:object-contain rounded-2xl md:rounded-none mask-image-gradient"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </picture>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
