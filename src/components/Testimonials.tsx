"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Ana Cláudia",
        location: "Brasília de Minas",
        text: "Minha vida mudou depois do protocolo de Reativação. Perdi 8kg em 2 meses e recuperei minha disposição. Dr. Diomar é extremamente atencioso.",
        rating: 5,
        protocol: "Emagrecimento",
        highlight: true,
    },
    {
        name: "Carlos Eduardo",
        location: "São Francisco",
        text: "O implante hormonal devolveu minha energia para os treinos. Atendimento de excelência, estrutura impecável. Melhor decisão que tomei.",
        rating: 5,
        protocol: "Implante Hormonal",
        highlight: false,
    },
    {
        name: "Mariana Silva",
        location: "Varzelândia",
        text: "Comecei com a bioimpedância e me surpreendi com o profissionalismo. O acompanhamento no WhatsApp faz toda a diferença no dia a dia.",
        rating: 5,
        protocol: "Emagrecimento",
        highlight: false,
    },
    {
        name: "Roberto Almeida",
        location: "Mirabela",
        text: "Depois de anos tentando dietas sem resultado, o protocolo do Dr. Diomar foi o único que realmente funcionou. Perdi 15kg e mantive o peso por mais de um ano.",
        rating: 5,
        protocol: "Emagrecimento",
        highlight: true,
    },
    {
        name: "Fernanda Souza",
        location: "Ubaí",
        text: "Minha disposição mudou completamente após a reposição hormonal. Durmo melhor, treino melhor e minha família notou a diferença.",
        rating: 5,
        protocol: "Implante Hormonal",
        highlight: false,
    },
    {
        name: "João Victor",
        location: "São João da Ponte",
        text: "Consultei vários médicos antes. Dr. Diomar foi o primeiro que realmente pediu exames completos e explicou tudo com clareza. Me senti seguro desde a primeira consulta.",
        rating: 5,
        protocol: "Longevidade",
        highlight: false,
    },
    {
        name: "Patrícia Mendes",
        location: "Montes Claros",
        text: "Eu tinha vergonha de ir à praia. Em 4 meses de protocolo, perdi 12kg e ganhei uma autoestima que não tinha há anos. Obrigada, doutor!",
        rating: 5,
        protocol: "Emagrecimento",
        highlight: true,
    },
    {
        name: "Marcos Vinícius",
        location: "Luislândia",
        text: "Com 52 anos, achei que já era tarde pra mudar. O Dr. Diomar mostrou que não. Hoje treino 5x por semana e meus exames nunca estiveram tão bons.",
        rating: 5,
        protocol: "Longevidade",
        highlight: false,
    },
    {
        name: "Luciana Oliveira",
        location: "Ibiracatu",
        text: "Fiz o implante hormonal e a diferença foi absurda. Líbido, disposição, humor — tudo melhorou. O atendimento é humanizado e muito profissional.",
        rating: 5,
        protocol: "Implante Hormonal",
        highlight: false,
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-20 md:py-28 bg-slate-950 border-t border-slate-800/50">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 mb-4">
                        <span className="w-2 h-2 rounded-full bg-wheat-500 animate-pulse" />
                        <span className="text-xs text-wheat-300 font-medium tracking-wider uppercase">Resultados Reais</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-50 mb-4">
                        Histórias de Quem{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-wheat-400 to-wheat-500">
                            Transformou
                        </span>{" "}
                        a Saúde
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Mais de 2.000 pacientes já confiaram no Dr. Diomar. Veja o que eles têm a dizer.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`relative p-7 md:p-8 rounded-2xl border group transition-colors ${
                                t.highlight
                                    ? "bg-gradient-to-br from-wheat-500/10 via-slate-900/80 to-slate-900/50 border-wheat-500/30 hover:border-wheat-500/50"
                                    : "bg-slate-900/50 border-slate-800 hover:border-wheat-500/20"
                            }`}
                        >
                            <Quote className="absolute top-5 right-5 w-8 h-8 text-slate-800 group-hover:text-wheat-500/15 transition-colors" />

                            {/* Protocol tag */}
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-wheat-500/10 border border-wheat-500/20 mb-4">
                                <span className="text-xs font-medium text-wheat-400">{t.protocol}</span>
                            </div>

                            <div className="flex gap-0.5 mb-4 text-wheat-500">
                                {[...Array(t.rating)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-slate-300 mb-6 italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>

                            <div className="flex items-center gap-3 border-t border-slate-800/60 pt-5">
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
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Social proof bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500"
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
            </div>
        </section>
    );
}
