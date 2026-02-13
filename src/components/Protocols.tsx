"use client";

import { motion } from "framer-motion";
import { Zap, Heart, ShieldPlus } from "lucide-react";

const protocols = [
    {
        id: 1,
        title: "Reativação Metabólica",
        subtitle: "Emagrecimento com Saúde",
        icon: Zap,
        features: [
            "Protocolo de Emagrecimento Científico",
            "Bioimpedância de Alta Precisão",
            "Acompanhamento via WhatsApp",
            "Estratégias Nutricionais Personalizadas",
        ],
        gradient: "from-blue-500 to-indigo-500",
    },
    {
        id: 2,
        title: "Implantes Hormonais",
        subtitle: "Performance & Equilíbrio",
        icon: ShieldPlus, // Or another icon
        features: [
            "Otimização de Testosterona/Hormônios",
            "Ganho de Massa Magra",
            "Melhora da Libido e Disposição",
            "Tecnologia Absorvível (Não é Chip)",
        ],
        gradient: "from-wheat-400 to-orange-600",
        highlight: true,
    },
    {
        id: 3,
        title: "Longevidade Premium",
        subtitle: "Prevenção Avançada",
        icon: Heart,
        features: [
            "Check-up Metabólico Completo",
            "Prevenção de Doenças Crônicas",
            "Suplementação Injetável (Soroterapia)",
            "Gestão do Envelhecimento",
        ],
        gradient: "from-emerald-400 to-teal-600",
    },
];

export default function Protocols() {
    return (
        <section id="protocols" className="py-24 bg-slate-900 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-50 mb-6">
                        Nossos Protocolos <span className="text-wheat-500">Exclusivos</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl">
                        Protocolos médicos exclusivos para <strong className="text-slate-200">Emagrecimento Rápido</strong>, <strong className="text-slate-200">Hipertrofia</strong> e <strong className="text-slate-200">Reposição Hormonal</strong>. Soluções desenhadas para quem busca resultados definitivos e cientificamente comprovados.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {protocols.map((proto, i) => (
                        <motion.div
                            key={proto.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className={`p-1 rounded-3xl bg-gradient-to-br ${proto.highlight ? 'from-wheat-500 via-orange-500 to-yellow-500' : 'from-slate-800 to-slate-900'} hover:scale-105 transition-transform duration-300`}
                        >
                            <div className="bg-slate-950 h-full rounded-[20px] p-8 flex flex-col items-center text-center relative overflow-hidden">

                                {/* Icon Background Glow */}
                                <div className={`absolute top-0 w-full h-1/2 bg-gradient-to-b ${proto.highlight ? 'from-wheat-900/20' : 'from-slate-800/50'} to-transparent opacity-50`} />

                                <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${proto.gradient} shadow-lg`}>
                                    <proto.icon className="w-10 h-10 text-white" />
                                </div>

                                <h3 className="text-3xl font-bold text-slate-50 mb-3">{proto.title}</h3>
                                <p className="text-base font-medium text-wheat-500 mb-8 uppercase tracking-wider">{proto.subtitle}</p>

                                <ul className="space-y-4 text-left w-full mb-8 flex-1">
                                    {proto.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-300 text-base">
                                            <span className={`mt-1.5 w-2 h-2 rounded-full ${proto.highlight ? 'bg-wheat-500' : 'bg-slate-500'}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="https://wa.me/5538998269295"
                                    target="_blank"
                                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${proto.highlight
                                        ? "bg-wheat-600 hover:bg-wheat-500 text-slate-950 shadow-lg shadow-wheat-900/20"
                                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                                        }`}
                                >
                                    Saiba Mais
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
