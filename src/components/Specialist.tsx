"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function Specialist() {
    return (
        <section id="specialist" className="relative py-12 md:py-20 lg:py-28 bg-slate-900 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900 z-0" />

            {/* Glow Effects */}
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-wheat-500/5 rounded-full blur-[128px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 mb-4">
                        <span className="w-2 h-2 rounded-full bg-wheat-500 animate-pulse" />
                        <span className="text-xs text-wheat-400 font-medium tracking-wider uppercase">Sobre o Especialista</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-50 mb-4">
                        Dr. Diomar Cangussu
                    </h2>
                    <p className="text-sm md:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto">
                        Médico com Pós-Graduação em Nutrologia
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[300px] md:h-[600px] rounded-2xl overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                        <picture>
                            <source
                                srcSet="/assets/specialist-640.webp 640w, /assets/specialist-1280.webp 724w"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                type="image/webp"
                            />
                            <Image
                                src="/assets/specialist-1280.webp"
                                alt="Dr. Diomar Cangussu - Especialista em Nutrologia"
                                fill
                                loading="lazy"
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </picture>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Description — 2 compact paragraphs */}
                        <div className="space-y-4">
                            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                                O Dr. Diomar combina <strong className="text-slate-200">exames laboratoriais aprofundados</strong> com{" "}
                                <strong className="text-slate-200">tecnologia clínica avançada</strong> para montar protocolos individuais — nada de receita de bolo.
                            </p>
                            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                                Referência em <strong className="text-wheat-400">Medicina de Precisão</strong> e{" "}
                                <strong className="text-wheat-400">Emagrecimento</strong> no Norte de Minas, atende em Brasília de Minas e Varzelândia com foco em resultados reais.
                            </p>
                        </div>

                        {/* Credentials List */}
                        <ul className="space-y-3">
                            {[
                                "CRM 60.143 — Minas Gerais",
                                "Pós-Graduação em Nutrologia",
                                "Especialista em Implantes Hormonais",
                                "+2.000 pacientes atendidos",
                                "2 unidades — Brasília de Minas e Varzelândia",
                            ].map((cred, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-300">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-wheat-500/15 border border-wheat-500/30 flex items-center justify-center">
                                        <Award className="w-3 h-3 text-wheat-400" />
                                    </span>
                                    <span className="text-sm md:text-base">{cred}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="pt-4"
                        >
                            <a
                                href="https://wa.me/5538998269295?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20Dr.%20Diomar."
                                target="_blank"
                                className="flex items-center justify-center gap-2 bg-wheat-500 hover:bg-wheat-400 text-slate-950 font-bold py-4 px-6 md:px-8 rounded-xl shadow-lg shadow-wheat-900/20 transition-all hover:scale-105 text-center min-h-[48px]"
                            >
                                <Award className="w-5 h-5" />
                                Agendar Consulta
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
