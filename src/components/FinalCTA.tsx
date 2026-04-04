"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import LeadForm from "./LeadForm";

export default function FinalCTA() {
    return (
        <section id="final-cta" className="relative py-12 md:py-20 lg:py-28 bg-slate-900 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-wheat-500/[0.03] rounded-full blur-[180px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    {/* Urgency badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wheat-500/10 border border-wheat-500/25 mb-8">
                        <Clock className="w-4 h-4 text-wheat-400" />
                        <span className="text-sm text-wheat-300 font-semibold">Vagas Limitadas para Este Mês</span>
                    </div>

                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-50 mb-6 leading-tight">
                        Dê o Primeiro Passo<br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-wheat-300 to-wheat-500"> Para sua Transformação</span>
                    </h2>

                    <p className="text-sm md:text-base lg:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Agende sua avaliação personalizada e descubra o protocolo ideal para o <strong className="text-slate-200">seu corpo</strong> e os <strong className="text-slate-200">seus objetivos</strong>.
                    </p>

                    {/* Main CTA Card */}
                    <div className="bg-gradient-to-br from-wheat-500/10 via-slate-900 to-slate-900 border border-wheat-500/20 rounded-3xl p-8 md:p-12 mb-10 shadow-2xl shadow-wheat-900/5">
                        {/* Trust points */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-wheat-500" />
                                <span>Consulta particular com nota fiscal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-wheat-500" />
                                <span>CRM 60.143 MG</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-wheat-500" />
                                <span>Retorno em até 2h</span>
                            </div>
                        </div>

                        {/* Lead Capture Form */}
                        <div className="max-w-md mx-auto mb-8">
                            <LeadForm source="final-cta" />
                        </div>

                        {/* Risk reversal */}
                        <div className="border-t border-slate-800 pt-6">
                            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                                <strong className="text-slate-400">Sem compromisso:</strong> Na avaliação, você entenderá exatamente o que está acontecendo com seu corpo e qual o melhor caminho. A decisão é sempre sua.
                            </p>
                        </div>
                    </div>

                    {/* Social proof micro */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-3 text-sm text-slate-500"
                    >
                        <div className="flex -space-x-2">
                            {["A", "C", "M", "R", "L"].map((letter, i) => (
                                <div
                                    key={letter}
                                    className="w-7 h-7 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs text-slate-400 font-medium"
                                >
                                    {letter}
                                </div>
                            ))}
                        </div>
                        <span>+2.000 pacientes já fizeram essa escolha</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
