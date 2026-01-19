"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-slate-950 pt-20 md:pt-0">
            {/* Background Gradient / Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0" />

            {/* Glow Effect */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center h-full">

                {/* Text Content */}
                <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left space-y-8">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 mb-6">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-xs text-amber-200 font-medium tracking-wider uppercase">Medicina de Alta Performance</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-50 leading-tight mb-4 tracking-tight">
                            Emagrecimento e Medicina de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Precisão</span> <br className="hidden md:block" />
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
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <a
                            href="https://wa.me/5538998269295?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20Dr.%20Diomar."
                            target="_blank"
                            className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-4 px-8 rounded-lg shadow-lg shadow-amber-900/20 transition-all hover:scale-105"
                        >
                            Agendar Agora
                            <ChevronRight className="w-5 h-5" />
                        </a>

                        <button
                            onClick={() => document.getElementById('protocols')?.scrollIntoView({ behavior: 'smooth' })}
                            className="flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-medium py-4 px-8 rounded-lg border border-slate-700 hover:border-slate-600 transition-all"
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
                            <CheckCircle2 className="w-4 h-4 text-amber-500" /> CRM 60.143 MG
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <CheckCircle2 className="w-4 h-4 text-amber-500" /> Especialista
                        </div>
                    </motion.div>

                </div>

                {/* Hero Image */}
                <motion.div
                    className="order-1 md:order-2 relative h-[50vh] md:h-[80vh] w-full flex items-end justify-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Main Image Mask/Glow */}
                    <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />

                    <div className="relative w-full h-full max-w-lg mx-auto">
                        {/* Using standard img for quick check, or Next/Image */}
                        <Image
                            src="/assets/diomar-1.jpg"
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
