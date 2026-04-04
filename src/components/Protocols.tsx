"use client";

import { motion } from "framer-motion";
import { Zap, Heart, ShieldPlus } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";
import { useRef, useState, useEffect, useCallback } from "react";

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
        idealFor: "Quem quer emagrecer de forma saudável e definitiva, sem dietas restritivas.",
        expectedResult: "Resultados visíveis nas primeiras semanas com perda de gordura e ganho de energia.",
        gradient: "from-blue-500 to-indigo-500",
    },
    {
        id: 2,
        title: "Implantes Hormonais",
        subtitle: "Performance & Equilíbrio",
        icon: ShieldPlus,
        features: [
            "Otimização de Testosterona/Hormônios",
            "Ganho de Massa Magra",
            "Melhora da Libido e Disposição",
            "Tecnologia Absorvível (Não é Chip)",
        ],
        idealFor: "Homens e mulheres com fadiga, perda de libido ou dificuldade de ganho muscular.",
        expectedResult: "Equilíbrio hormonal completo em até 30 dias, com melhora na disposição e composição corporal.",
        gradient: "from-wheat-400 to-orange-600",
        highlight: true,
        badge: "Mais Procurado",
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
        idealFor: "Quem busca envelhecer com saúde, disposição e prevenção de doenças crônicas.",
        expectedResult: "Melhora nos marcadores de saúde e vitalidade, com plano preventivo personalizado.",
        gradient: "from-emerald-400 to-teal-600",
    },
];

export default function Protocols() {
    const { track } = useTracking();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // IntersectionObserver to detect active card in mobile carousel
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
                        if (index !== -1) {
                            setActiveIndex(index);
                        }
                    }
                }
            },
            {
                root: container,
                threshold: 0.6,
            }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToCard = useCallback((index: number) => {
        const card = cardRefs.current[index];
        if (card && scrollRef.current) {
            card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
    }, []);

    return (
        <section id="protocols" className="py-12 md:py-20 lg:py-28 bg-slate-900 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-10 md:mb-20">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-50 mb-4 md:mb-6">
                        Nossos Protocolos <span className="text-wheat-500">Exclusivos</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base lg:text-xl">
                        Protocolos médicos exclusivos para <strong className="text-slate-200">Emagrecimento Rápido</strong>, <strong className="text-slate-200">Hipertrofia</strong> e <strong className="text-slate-200">Reposição Hormonal</strong>. Soluções desenhadas para quem busca resultados definitivos e cientificamente comprovados.
                    </p>
                </div>

                {/* Mobile: horizontal scroll-snap carousel | Desktop: 3-col grid */}
                <div
                    ref={scrollRef}
                    className="
                        flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4
                        -webkit-overflow-scrolling-touch scrollbar-hide
                        md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:overflow-visible md:px-0 md:pb-0
                    "
                >
                    {protocols.map((proto, i) => (
                        <motion.div
                            key={proto.id}
                            ref={(el) => { cardRefs.current[i] = el as HTMLDivElement | null; }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className={`
                                min-w-[85vw] flex-shrink-0 snap-center
                                md:min-w-0 md:flex-shrink
                                p-1 rounded-3xl bg-gradient-to-br
                                ${proto.highlight ? 'from-wheat-500 via-orange-500 to-yellow-500' : 'from-slate-800 to-slate-900'}
                                md:hover:scale-[1.02] transition-transform duration-300
                            `}
                        >
                            <div className="bg-slate-950 h-full rounded-[20px] p-5 md:p-8 flex flex-col items-center text-center relative overflow-hidden">

                                {/* Badge */}
                                {proto.badge && (
                                    <div className="absolute top-4 right-4 bg-wheat-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide z-10">
                                        {proto.badge}
                                    </div>
                                )}

                                {/* Icon Background Glow */}
                                <div className={`absolute top-0 w-full h-1/2 bg-gradient-to-b ${proto.highlight ? 'from-wheat-900/20' : 'from-slate-800/50'} to-transparent opacity-50`} />

                                <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-6 md:mb-8 bg-gradient-to-br ${proto.gradient} shadow-lg`}>
                                    <proto.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2 md:mb-3">{proto.title}</h3>
                                <p className="text-sm md:text-base font-medium text-wheat-500 mb-6 md:mb-8 uppercase tracking-wider">{proto.subtitle}</p>

                                <ul className="space-y-3 md:space-y-4 text-left w-full mb-6 md:mb-8">
                                    {proto.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm md:text-base">
                                            <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${proto.highlight ? 'bg-wheat-500' : 'bg-slate-500'}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Enriched content: Ideal para + Resultado esperado */}
                                <div className="w-full border-t border-slate-800 pt-4 mb-6 space-y-3 text-left flex-1">
                                    <div>
                                        <p className="text-xs font-semibold text-wheat-500 uppercase tracking-wider mb-1">Ideal para:</p>
                                        <p className="text-slate-400 text-sm leading-relaxed">{proto.idealFor}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Resultado esperado:</p>
                                        <p className="text-slate-400 text-sm leading-relaxed">{proto.expectedResult}</p>
                                    </div>
                                </div>

                                <a
                                    href="https://wa.me/5538998269295"
                                    target="_blank"
                                    onClick={() => track({ name: 'protocol_interest', params: { protocol_name: proto.title } })}
                                    className={`w-full py-4 rounded-xl font-bold text-sm md:text-lg transition-all min-h-[48px] text-center block ${proto.highlight
                                        ? "bg-wheat-600 hover:bg-wheat-500 text-slate-950 shadow-lg shadow-wheat-900/20"
                                        : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                                        }`}
                                >
                                    Agendar Avaliação
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination dots — mobile only */}
                <div className="flex justify-center gap-2 mt-4 md:hidden" aria-label="Indicador de protocolo">
                    {protocols.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToCard(i)}
                            aria-label={`Ir para protocolo ${i + 1}`}
                            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                                activeIndex === i ? 'bg-wheat-500' : 'bg-slate-700'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
