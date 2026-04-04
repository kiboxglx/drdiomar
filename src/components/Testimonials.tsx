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
    },
    {
        name: "Carlos Eduardo",
        location: "São Francisco",
        text: "O implante hormonal devolveu minha energia para os treinos. Atendimento de excelência, estrutura impecável. Melhor decisão que tomei.",
        rating: 5,
        protocol: "Implante Hormonal",
    },
    {
        name: "Mariana Silva",
        location: "Varzelândia",
        text: "Comecei com a bioimpedância e me surpreendi com o profissionalismo. O acompanhamento no WhatsApp faz toda a diferença no dia a dia.",
        rating: 5,
        protocol: "Emagrecimento",
    },
    {
        name: "Roberto Almeida",
        location: "Mirabela",
        text: "Depois de anos tentando dietas sem resultado, o protocolo do Dr. Diomar foi o único que realmente funcionou. Perdi 15kg e mantive.",
        rating: 5,
        protocol: "Emagrecimento",
    },
    {
        name: "Fernanda Souza",
        location: "Ubaí",
        text: "Minha disposição mudou completamente após a reposição hormonal. Durmo melhor, treino melhor e minha família notou a diferença.",
        rating: 5,
        protocol: "Implante Hormonal",
    },
    {
        name: "João Victor",
        location: "São João da Ponte",
        text: "Consultei vários médicos antes. Dr. Diomar foi o primeiro que realmente pediu exames completos e explicou tudo com clareza.",
        rating: 5,
        protocol: "Longevidade",
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
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-50 mb-4">
                        O que Nossos Pacientes <span className="text-wheat-500">Dizem</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Depoimentos reais de quem decidiu investir na própria saúde com o Dr. Diomar.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-900/50 p-7 md:p-8 rounded-2xl border border-slate-800 relative group hover:border-wheat-500/20 transition-colors"
                        >
                            <Quote className="absolute top-5 right-5 w-8 h-8 text-slate-800 group-hover:text-wheat-500/15 transition-colors" />

                            {/* Protocol tag */}
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-wheat-500/10 border border-wheat-500/20 mb-4">
                                <span className="text-xs font-medium text-wheat-400">{t.protocol}</span>
                            </div>

                            <div className="flex gap-0.5 mb-4 text-wheat-500">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-slate-300 mb-6 italic leading-relaxed">"{t.text}"</p>

                            <div className="flex items-center gap-3 border-t border-slate-800/60 pt-5">
                                <div className="w-10 h-10 rounded-full bg-wheat-500/10 flex items-center justify-center text-wheat-500 font-bold text-sm">
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
            </div>
        </section>
    );
}
