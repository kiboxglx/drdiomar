"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Users, MapPin } from "lucide-react";

export default function Specialist() {
    return (
        <section id="specialist" className="relative py-24 md:py-32 bg-slate-900 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900 z-0" />

            {/* Glow Effects */}
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-stone-400/5 rounded-full blur-[128px] pointer-events-none" />

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
                        <span className="w-2 h-2 rounded-full bg-stone-400 animate-pulse" />
                        <span className="text-xs text-stone-300 font-medium tracking-wider uppercase">Sobre o Especialista</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-50 mb-4">
                        Dr. Diomar Cangussu
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
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
                        className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                        <Image
                            src="/assets/diomarsentado.png
                            "
                            alt="Dr. Diomar Cangussu - Especialista em Nutrologia"
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Description */}
                        <div className="space-y-4">
                            <p className="text-lg text-slate-300 leading-relaxed">
                                O Dr. Diomar não segue <strong className="text-stone-300">"receitas de bolo"</strong>. Sua abordagem combina <strong className="text-slate-200">ciência de dados</strong> (através de exames laboratoriais aprofundados) com <strong className="text-slate-200">tecnologia clínica</strong>.
                            </p>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                Referência no <strong className="text-stone-300">Norte de Minas</strong>, seu foco é transformar a saúde de pacientes que buscam não apenas estética, mas <strong className="text-slate-200">performance</strong>, <strong className="text-slate-200">longevidade</strong> e <strong className="text-slate-200">equilíbrio hormonal</strong>.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6 pt-6">
                            {/* Stat 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-stone-400/30 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-stone-400/10 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-stone-400" />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-slate-50 mb-1">+2.000</div>
                                <div className="text-sm text-slate-400">Vidas Transformadas</div>
                            </motion.div>

                            {/* Stat 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-stone-400/30 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-stone-400/10 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-stone-400" />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-slate-50 mb-1">2 Unidades</div>
                                <div className="text-sm text-slate-400">Hubs Regionais</div>
                            </motion.div>
                        </div>

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
                                className="flex items-center justify-center gap-2 bg-stone-300 hover:bg-stone-200 text-slate-950 font-bold py-4 px-8 rounded-lg shadow-lg shadow-stone-900/20 transition-all hover:scale-105 text-center"
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
