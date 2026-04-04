"use client";

import { motion } from "framer-motion";
import { FlaskConical, Dna, HeartHandshake, ArrowDown } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: FlaskConical,
        title: "Avaliação Completa",
        description: "Exames laboratoriais aprofundados, bioimpedância de alta precisão e análise metabólica individual. Nada de consulta de 10 minutos.",
        detail: "Entendemos o seu corpo por dentro",
    },
    {
        number: "02",
        icon: Dna,
        title: "Protocolo Personalizado",
        description: "Com base nos seus dados reais, montamos um protocolo único — emagrecimento, reposição hormonal ou longevidade — feito sob medida para você.",
        detail: "Nada de receita de bolo",
    },
    {
        number: "03",
        icon: HeartHandshake,
        title: "Acompanhamento Contínuo",
        description: "Você não fica sozinho. Acompanhamento via WhatsApp, ajustes em tempo real e suporte do início ao resultado final.",
        detail: "Do começo ao resultado",
    },
];

export default function MethodSection() {
    return (
        <section className="relative py-12 md:py-20 lg:py-28 bg-slate-900 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-wheat-500/15 to-transparent" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-wheat-500/[0.03] rounded-full blur-[128px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 mb-6">
                        <span className="w-2 h-2 rounded-full bg-wheat-500 animate-pulse" />
                        <span className="text-xs text-wheat-300 font-medium tracking-wider uppercase">O Método</span>
                    </div>

                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-50 mb-6 leading-tight">
                        Medicina de <span className="text-transparent bg-clip-text bg-gradient-to-r from-wheat-300 to-wheat-500">Precisão</span>,<br className="hidden md:block" />
                        não receita de bolo.
                    </h2>

                    <p className="text-sm md:text-base lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        O Dr. Diomar investiga a <strong className="text-slate-200">causa real</strong> do seu problema com ciência de dados e tecnologia clínica — não com achismo.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical connector line */}
                    <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-wheat-500/30 via-wheat-500/10 to-transparent hidden md:block" />

                    <div className="space-y-6 md:space-y-8">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                className="relative group"
                            >
                                <div className="flex items-start gap-5 md:gap-7 bg-slate-950/50 border border-slate-800/80 rounded-2xl p-6 md:p-8 hover:border-wheat-500/20 transition-all duration-300">
                                    {/* Step number + icon */}
                                    <div className="flex-shrink-0 relative">
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-wheat-500/15 to-wheat-600/5 border border-wheat-500/20 flex items-center justify-center relative z-10">
                                            <step.icon className="w-6 h-6 md:w-7 md:h-7 text-wheat-400" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-wheat-500 text-slate-950 text-xs font-bold flex items-center justify-center">
                                            {step.number}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl md:text-2xl font-bold text-slate-50">{step.title}</h3>
                                        </div>
                                        <p className="text-slate-400 leading-relaxed mb-3 text-base md:text-lg">{step.description}</p>
                                        <span className="inline-flex items-center gap-1.5 text-sm text-wheat-500 font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full bg-wheat-500" />
                                            {step.detail}
                                        </span>
                                    </div>
                                </div>

                                {/* Arrow between steps */}
                                {i < steps.length - 1 && (
                                    <div className="flex justify-center py-2 md:hidden">
                                        <ArrowDown className="w-5 h-5 text-wheat-500/30" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Continuity phrase to protocols */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-14 md:mt-16"
                >
                    <p className="text-lg md:text-xl text-slate-400">
                        Conheça os <strong className="text-wheat-400">protocolos</strong> ↓
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
