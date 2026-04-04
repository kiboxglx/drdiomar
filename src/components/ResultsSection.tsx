"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, MapPin, Clock, Star } from "lucide-react";

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);

        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span ref={ref}>
            {prefix}{count.toLocaleString("pt-BR")}{suffix}
        </span>
    );
}

const stats = [
    {
        icon: Users,
        value: 2000,
        prefix: "+",
        suffix: "",
        label: "Pacientes Atendidos",
        description: "Vidas transformadas com protocolos personalizados",
    },
    {
        icon: Star,
        value: 98,
        prefix: "",
        suffix: "%",
        label: "Satisfação",
        description: "Dos pacientes recomendam o tratamento",
    },
    {
        icon: MapPin,
        value: 11,
        prefix: "+",
        suffix: "",
        label: "Municípios",
        description: "Atendidos pelos 2 hubs regionais",
    },
    {
        icon: Clock,
        value: 8,
        prefix: "",
        suffix: " anos",
        label: "De Experiência",
        description: "Em medicina de precisão e nutrologia",
    },
];

const transformations = [
    {
        quote: "Perdi 12kg em 3 meses sem passar fome. O protocolo mudou minha relação com a comida.",
        name: "Paciente R.S.",
        city: "Brasília de Minas",
        result: "-12kg em 3 meses",
    },
    {
        quote: "Depois do implante hormonal, voltei a ter energia para treinar e minha libido voltou ao normal.",
        name: "Paciente M.A.",
        city: "São Francisco",
        result: "Energia restaurada",
    },
    {
        quote: "Meus exames nunca estiveram tão bons. O Dr. Diomar investigou o que nenhum outro médico olhou.",
        name: "Paciente L.C.",
        city: "Varzelândia",
        result: "Saúde otimizada",
    },
];

export default function ResultsSection() {
    return (
        <section className="relative py-20 md:py-28 bg-slate-950 overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-wheat-500/15 to-transparent" />
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-wheat-500/[0.02] rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 mb-6">
                        <TrendingUp className="w-3.5 h-3.5 text-wheat-500" />
                        <span className="text-xs text-wheat-300 font-medium tracking-wider uppercase">Resultados Comprovados</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-50 mb-6">
                        Números que <span className="text-transparent bg-clip-text bg-gradient-to-r from-wheat-300 to-wheat-500">Falam</span>
                    </h2>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                        Resultados reais de pacientes que decidiram investir na própria saúde.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20 max-w-4xl mx-auto">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 md:p-8 hover:border-wheat-500/20 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-xl bg-wheat-500/10 flex items-center justify-center mx-auto mb-4">
                                <stat.icon className="w-5 h-5 text-wheat-500" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-slate-50 mb-1">
                                <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                            </div>
                            <div className="text-sm font-semibold text-wheat-500/80 mb-1">{stat.label}</div>
                            <div className="text-xs text-slate-500 hidden md:block">{stat.description}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Transformation Cards */}
                <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
                    {transformations.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7 relative group hover:border-wheat-500/20 transition-all"
                        >
                            {/* Result badge */}
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wheat-500/10 border border-wheat-500/20 mb-5">
                                <TrendingUp className="w-3.5 h-3.5 text-wheat-500" />
                                <span className="text-xs font-semibold text-wheat-400">{t.result}</span>
                            </div>

                            <p className="text-slate-300 leading-relaxed mb-6 italic">"{t.quote}"</p>

                            <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
                                <div className="w-9 h-9 rounded-full bg-wheat-500/10 flex items-center justify-center text-wheat-500 font-bold text-sm">
                                    {t.name.split(" ")[1]?.[0] || t.name[0]}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-200">{t.name}</div>
                                    <div className="text-xs text-slate-500">{t.city}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
