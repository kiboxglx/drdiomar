"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20 md:pt-0">
            {/* Background Video - Mobile */}
            <div className="absolute inset-0 w-full h-full z-0 md:hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-30"
                >
                    <source src="/assets/0120(1).mp4" type="video/mp4" />
                </video>
            </div>

            {/* Background Video - Desktop */}
            <div className="absolute inset-0 w-full h-full z-0 hidden md:block">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-30"
                >
                    <source src="/assets/0120(2).mp4" type="video/mp4" />
                </video>
            </div>

            {/* Background Gradient / Overlay - Escurece o vídeo para manter legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 z-[1]" />

            {/* Glow Effect */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-stone-400/10 rounded-full blur-[128px] pointer-events-none z-[2]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center h-full">

                {/* Text Content */}
                <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left space-y-8">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 mb-6">
                            <span className="w-2 h-2 rounded-full bg-stone-400 animate-pulse" />
                            <span className="text-xs text-stone-300 font-medium tracking-wider uppercase">Medicina de Alta Performance</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-50 leading-tight mb-4 tracking-tight">
                            Emagrecimento e Medicina de <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-300 to-stone-400">Precisão</span> <br className="hidden md:block" />
                            Perto de Você.
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
                            Protocolos avançados de emagrecimento e implantes hormonais em <strong className="text-slate-200 font-semibold">Brasília de Minas</strong> e <strong className="text-slate-200 font-semibold">Varzelândia</strong>.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-4 w-full items-center md:items-start"
                    >
                        <a
                            href="https://wa.me/5538998269295?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20Dr.%20Diomar."
                            target="_blank"
                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-stone-300 hover:bg-stone-200 text-slate-950 font-bold py-4 px-8 rounded-lg shadow-lg shadow-stone-900/20 transition-all hover:scale-105"
                        >
                            Agendar Agora
                            <ChevronRight className="w-5 h-5" />
                        </a>

                        <button
                            onClick={() => document.getElementById('protocols')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-medium py-4 px-8 rounded-lg border border-slate-700 hover:border-slate-600 transition-all"
                        >
                            Conhecer Protocolos
                        </button>
                    </motion.div>

                    {/* Trust Badges - Optional */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="pt-4 flex items-center gap-6 opacity-80"
                    >
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <CheckCircle2 className="w-4 h-4 text-stone-400" /> CRM 60.143 MG
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <CheckCircle2 className="w-4 h-4 text-stone-400" /> Especialista
                        </div>
                    </motion.div>

                </div>

                {/* Hero Image */}
                <motion.div
                    className="order-1 md:order-2 relative h-[65vh] md:h-[95vh] w-full flex items-end justify-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >

                    <div className="relative w-full h-full max-w-xl md:max-w-2xl mx-auto">
                        {/* Using standard img for quick check, or Next/Image */}
                        <Image
                            src="/assets/889993.png"
                            alt="Dr. Diomar Cangussu"
                            fill
                            priority
                            className="object-cover object-top md:object-contain rounded-2xl md:rounded-none mask-image-gradient"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
