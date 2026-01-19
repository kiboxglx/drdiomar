"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "O Dr. Diomar atende por convênio?",
        answer: "Trabalhamos focados na medicina personalizada de alto nível. Para garantir o tempo e qualidade necessários, as consultas são particulares. No entanto, emitimos nota fiscal para que você possa solicitar o reembolso junto ao seu plano de saúde.",
    },
    {
        question: "Qual o valor do investimento nos protocolos?",
        answer: "Os protocolos são personalizados após avaliação médica e variam conforme a necessidade (emagrecimento, implantes, etc). Agende uma avaliação para receber um plano sob medida.",
    },
    {
        question: "Onde ficam os consultórios?",
        answer: "Temos hubs em Brasília de Minas (atendendo São Francisco, Mirabela, Ubaí, Luislândia, e região) e Varzelândia (atendendo São João da Ponte, Ibiracatu, Lontra).",
    },
    {
        question: "Quanto tempo dura o efeito do implante hormonal?",
        answer: "A duração varia conforme o tipo de hormônio e metabolismo do paciente, geralmente entre 6 a 12 meses. O implante é biodegradável e não precisa ser retirado.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-20 bg-slate-950">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-50 mb-6">
                        Dúvidas <span className="text-amber-500">Frequentes</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl">
                        Tudo o que você precisa saber antes de agendar.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="border border-slate-800 rounded-lg bg-slate-900/50 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="flex items-center justify-between w-full p-6 md:p-8 text-left"
                            >
                                <span className="text-lg md:text-xl font-medium text-slate-200">{faq.question}</span>
                                {openIndex === idx ? (
                                    <Minus className="w-6 h-6 text-amber-500 flex-shrink-0 ml-4" />
                                ) : (
                                    <Plus className="w-6 h-6 text-slate-500 flex-shrink-0 ml-4" />
                                )}
                            </button>

                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 md:p-8 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/50 text-base md:text-lg">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
