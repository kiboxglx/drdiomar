"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const testimonials = [
    {
        name: "Ana Cláudia",
        location: "Brasília de Minas",
        text: "Minha vida mudou depois do protocolo de Reativação. Perdi 8kg em 2 meses e recuperei minha disposição. Dr. Diomar é extremamente atencioso.",
        rating: 5,
        protocol: "Emagrecimento",
        duration: "Paciente há 8 meses",
        highlight: true,
    },
    {
        name: "Carlos Eduardo",
        location: "São Francisco",
        text: "O implante hormonal devolveu minha energia para os treinos. Atendimento de excelência, estrutura impecável. Melhor decisão que tomei.",
        rating: 5,
        protocol: "Implante Hormonal",
        duration: "Paciente há 6 meses",
        highlight: false,
    },
    {
        name: "Patrícia Mendes",
        location: "Montes Claros",
        text: "A agenda é concorrida, mas vale cada minuto de espera. Perdi 12kg em 4 meses e ganhei uma autoestima que não tinha há anos. O acompanhamento pelo WhatsApp faz toda a diferença.",
        rating: 4,
        protocol: "Emagrecimento",
        duration: "Paciente há 5 meses",
        highlight: false,
    },
    {
        name: "Marcos Vinícius",
        location: "Luislândia",
        text: "Com 52 anos, achei que já era tarde pra mudar. O Dr. Diomar mostrou que não. Hoje treino 5x por semana e meus exames nunca estiveram tão bons.",
        rating: 5,
        protocol: "Longevidade",
        duration: "Paciente há 1 ano",
        highlight: false,
    },
];

export default function Testimonials() {
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
        <section id="testimonials" className="py-12 md:py-20 lg:py-28 bg-slate-950 border-t border-slate-800/50">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 mb-4">
                        <span className="w-2 h-2 rounded-full bg-wheat-500 animate-pulse" />
                        <span className="text-xs text-wheat-300 font-medium tracking-wider uppercase">Resultados Reais</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-50 mb-4">
                        Histórias de Quem{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-wheat-400 to-wheat-500">
                            Transformou
                        </span>{" "}
                        a Saúde
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base lg:text-xl max-w-2xl mx-auto">
                        Mais de 2.000 pacientes já confiaram no Dr. Diomar. Veja o que eles têm a dizer.
                    </p>
                </motion.div>

                {/* Mobile: horizontal scroll-snap carousel | Desktop: 2x2 grid */}
                <div
                    ref={scrollRef}
                    className="
                        flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4
                        -webkit-overflow-scrolling-touch scrollbar-hide
                        md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0
                        max-w-5xl mx-auto
                    "
                >
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            ref={(el) => { cardRefs.current[i] = el as HTMLDivElement | null; }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`
                                min-w-[85vw] flex-shrink-0 snap-center
                                md:min-w-0 md:flex-shrink
                                relative p-5 md:p-8 rounded-2xl border group transition-colors
                                ${t.highlight
                                    ? "bg-gradient-to-br from-wheat-500/10 via-slate-900/80 to-slate-900/50 border-wheat-500/30 hover:border-wheat-500/50"
                                    : "bg-slate-900/50 border-slate-800 hover:border-wheat-500/20"
                                }
                            `}
                        >
                            <Quote className="absolute top-4 right-4 w-7 h-7 text-slate-800 group-hover:text-wheat-500/15 transition-colors" />

                            {/* Protocol tag */}
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-wheat-500/10 border border-wheat-500/20 mb-3">
                                <span className="text-xs font-medium text-wheat-400">{t.protocol}</span>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-3">
                                {[...Array(5)].map((_, j) => (
                                    <Star
                                        key={j}
                                        className={`w-4 h-4 ${
                                            j < t.rating
                                                ? "fill-wheat-500 text-wheat-500"
                                                : "fill-slate-700 text-slate-700"
                                        }`}
                                    />
                                ))}
                            </div>

                            <p className="text-slate-300 mb-5 italic leading-relaxed text-sm md:text-base">&ldquo;{t.text}&rdquo;</p>

                            <div className="flex items-center gap-3 border-t border-slate-800/60 pt-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                                    t.highlight
                                        ? "bg-wheat-500/20 text-wheat-400"
                                        : "bg-wheat-500/10 text-wheat-500"
                                }`}>
                                    {t.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-100 text-sm">{t.name}</h4>
                                    <p className="text-xs text-slate-500">{t.location}</p>
                                    <p className="text-xs text-wheat-500/70">{t.duration}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination dots — mobile only */}
                <div className="flex justify-center gap-2 mt-4 md:hidden" aria-label="Indicador de depoimento">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToCard(i)}
                            aria-label={`Ir para depoimento ${i + 1}`}
                            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                                activeIndex === i ? 'bg-wheat-500' : 'bg-slate-700'
                            }`}
                        />
                    ))}
                </div>

                {/* Social proof bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-slate-500"
                >
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5 text-wheat-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                        </div>
                        <span>4.9/5 no Google</span>
                    </div>
                    <div className="h-4 w-px bg-slate-800" />
                    <span>+2.000 pacientes atendidos</span>
                    <div className="h-4 w-px bg-slate-800" />
                    <span>2 unidades no Norte de Minas</span>
                </motion.div>

                {/* CTA final */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-10 md:mt-14 text-center"
                >
                    <p className="text-slate-300 text-lg md:text-xl font-medium mb-4">
                        Quer ser o próximo?
                    </p>
                    <a
                        href="https://wa.me/5538998269295"
                        target="_blank"
                        className="inline-block bg-wheat-600 hover:bg-wheat-500 text-slate-950 font-bold py-4 px-8 rounded-xl text-sm md:text-lg transition-all shadow-lg shadow-wheat-900/20 min-h-[48px]"
                    >
                        Agendar Avaliação
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
