"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, BatteryLow, Moon, Scale, HeartCrack } from "lucide-react";

const problems = [
    {
        icon: Scale,
        title: "Peso que não sai",
        description: "Dietas que não funcionam, efeito sanfona constante e frustração a cada balança.",
    },
    {
        icon: BatteryLow,
        title: "Cansaço crônico",
        description: "Acordar sem energia, arrastar-se pelo dia e depender de café para funcionar.",
    },
    {
        icon: TrendingDown,
        title: "Hormônios desregulados",
        description: "Libido baixa, perda de massa muscular, irritabilidade e dificuldade para dormir.",
    },
    {
        icon: HeartCrack,
        title: "Saúde estagnada",
        description: "Exames 'normais', mas você sabe que algo não está certo. Ninguém investiga a fundo.",
    },
];

export default function ProblemSection() {
    return (
        <section className="relative py-20 md:py-28 bg-slate-950 overflow-hidden">
            {/* Subtle gradient accent */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-red-900/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/30 border border-red-900/30 mb-6">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-xs text-red-300/80 font-medium tracking-wider uppercase">Você se identifica?</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-50 mb-6 leading-tight">
                        Já tentou de tudo<br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-400/80"> e nada funciona?</span>
                    </h2>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Milhares de pessoas no Norte de Minas vivem com esses sinais todos os dias — e acham que é <strong className="text-slate-300">normal</strong>. Não é.
                    </p>
                </motion.div>

                {/* Problems Grid */}
                <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-16">
                    {problems.map((problem, i) => (
                        <motion.div
                            key={problem.title}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group relative bg-slate-900/60 border border-slate-800/80 rounded-2xl p-7 md:p-8 hover:border-red-900/30 transition-all duration-300"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-2xl bg-red-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative flex items-start gap-5">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-950/40 border border-red-900/20 flex items-center justify-center">
                                    <problem.icon className="w-6 h-6 text-red-400/80" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-100 mb-2">{problem.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{problem.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bridge to solution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <div className="inline-block bg-gradient-to-r from-slate-800/50 via-slate-800 to-slate-800/50 rounded-2xl px-8 py-6 border border-slate-700/50">
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                            Se você se identificou com <strong className="text-wheat-400">pelo menos 1</strong> desses sinais,<br className="hidden md:block" />
                            existe um caminho <strong className="text-wheat-400">diferente</strong> — e ele começa com uma avaliação de verdade.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
