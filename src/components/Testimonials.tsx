"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Ana Cláudia",
        location: "Brasília de Minas",
        text: "Minha vida mudou depois do protocolo de Reativação. Perdi 8kg em 2 meses e recuperei minha disposição. Dr. Diomar é extremamente atencioso.",
        rating: 5,
    },
    {
        name: "Carlos Eduardo",
        location: "São Francisco",
        text: "O implante hormonal devolveu minha energia para os treinos. Atendimento de excelência, estrutura impecável.",
        rating: 5,
    },
    {
        name: "Mariana Silva",
        location: "Varzelândia",
        text: "Comecei com a bioimpedância e me surpreendi com o profissionalismo. O acompanhamento no WhatsApp faz toda a diferença.",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-20 bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-50 mb-4">
                        Histórias de <span className="text-amber-500">Transformação</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl">
                        O que nossos pacientes dizem sobre a medicina de precisão.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-slate-950 p-10 rounded-2xl border border-slate-800 relative group hover:border-slate-700 transition-colors"
                        >
                            <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-800 group-hover:text-amber-500/20 transition-colors" />

                            <div className="flex gap-1 mb-6 text-amber-500">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>

                            <p className="text-slate-300 mb-8 italic leading-relaxed text-lg">"{t.text}"</p>

                            <div className="flex items-center gap-4 border-t border-slate-800 pt-6">
                                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-50 font-bold text-lg">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-50 text-base">{t.name}</h4>
                                    <p className="text-sm text-slate-500">{t.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
