"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Users, MapPin } from "lucide-react";

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
                        MÃ©dico com PÃ³s-GraduaÃ§Ã£o em Nutrologia
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
                        {/* Description */}
                        <div className="space-y-4">
                            <p className="text-lg text-slate-300 leading-relaxed">
                                O Dr. Diomar nÃ£o segue <strong className="text-wheat-400">"receitas de bolo"</strong>. Sua abordagem combina <strong className="text-slate-200">ciÃªncia de dados</strong> (atravÃ©s de exames laboratoriais aprofundados) com <strong className="text-slate-200">tecnologia clÃ­nica</strong> avanÃ§ada.
                            </p>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                ReferÃªncia em <strong className="text-wheat-400">Medicina de PrecisÃ£o</strong> e <strong className="text-wheat-400">Emagrecimento</strong> no Norte de Minas (BrasÃ­lia de Minas, VarzelÃ¢ndia, Montes Claros e regiÃ£o). Seu foco Ã© transformar a saÃºde de pacientes que buscam nÃ£o apenas estÃ©tica, mas <strong className="text-slate-200">performance</strong>, <strong className="text-slate-200">longevidade</strong> e <strong className="text-slate-200">equilÃ­brio hormonal</strong> atravÃ©s de protocolos personalizados e implantes hormonais.
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
                                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-wheat-500/30 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-wheat-500/10 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-wheat-500" />
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
                                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-wheat-500/30 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-wheat-500/10 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-wheat-500" />
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
