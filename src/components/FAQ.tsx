"use client";

import { useState } from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTracking } from "@/hooks/useTracking";

const faqs = [
    {
        question: "Já tentei de tudo e nada funciona. Por que seria diferente?",
        answer: "Porque nossos protocolos não são dietas genéricas. Começamos com exames laboratoriais completos para entender sua biologia individual — hormônios, metabolismo, inflamação. A partir daí, montamos um plano personalizado que ataca a causa real, não apenas os sintomas. É por isso que pacientes que 'já tentaram de tudo' conseguem resultados com a gente.",
    },
    {
        question: "É seguro fazer implante hormonal?",
        answer: "Sim. Os implantes são biodegradáveis e aprovados para uso médico. Antes de qualquer procedimento, fazemos uma avaliação clínica e laboratorial completa para garantir que é indicado para você. O acompanhamento é contínuo — você nunca fica sem suporte. Dr. Diomar tem experiência com centenas de implantes realizados com segurança.",
    },
    {
        question: "Quanto tempo até eu ver resultados?",
        answer: "A maioria dos pacientes relata melhora significativa na disposição e energia nas primeiras 2-4 semanas. Resultados visíveis de emagrecimento geralmente aparecem a partir de 30 dias. Cada caso é único, e no seu primeiro retorno já avaliamos os marcadores laboratoriais que comprovam a evolução.",
    },
    {
        question: "O Dr. Diomar atende por convênio?",
        answer: "Trabalhamos com medicina personalizada de alto nível, o que exige tempo e dedicação em cada consulta. Por isso, os atendimentos são particulares. Emitimos nota fiscal para que você possa solicitar reembolso junto ao seu plano de saúde — muitos pacientes conseguem.",
    },
    {
        question: "Qual o valor do investimento?",
        answer: "Os protocolos são 100% personalizados — o investimento varia conforme seus exames, objetivos e necessidades (emagrecimento, implantes, longevidade). Agende uma avaliação gratuita para receber seu plano sob medida com valores transparentes.",
    },
    {
        question: "Onde ficam os consultórios?",
        answer: "Temos dois hubs regionais: Brasília de Minas (atendendo São Francisco, Mirabela, Ubaí, Luislândia e região) e Varzelândia (atendendo São João da Ponte, Ibiracatu, Lontra e cidades vizinhas).",
    },
    {
        question: "Tenho medo de efeito sanfona. Como vocês evitam isso?",
        answer: "O efeito sanfona acontece quando você faz dietas restritivas sem tratar a causa. Nosso protocolo ajusta hormônios, metabolismo e hábitos de forma sustentável. Além disso, o acompanhamento contínuo — com retornos e suporte por WhatsApp — garante que você mantenha os resultados a longo prazo.",
    },
    {
        question: "Preciso fazer dieta muito restritiva?",
        answer: "Não. Nosso objetivo é criar um plano alimentar que funcione para sua rotina, não contra ela. Trabalhamos com reeducação alimentar prática e, quando necessário, com suporte medicamentoso que reduz a compulsão e acelera resultados — sem sofrimento.",
    },
];

export default function FAQ() {
    const { track } = useTracking();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (idx: number, question: string) => {
        const isOpening = openIndex !== idx;
        setOpenIndex(isOpening ? idx : null);
        if (isOpening) {
            track({ name: 'faq_opened', params: { question, index: idx } });
        }
    };

    return (
        <section id="faq" className="py-12 md:py-20 lg:py-28 bg-slate-900">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 mb-4">
                        <span className="w-2 h-2 rounded-full bg-wheat-500 animate-pulse" />
                        <span className="text-xs text-wheat-300 font-medium tracking-wider uppercase">Tire Suas Dúvidas</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-50 mb-6">
                        Perguntas{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-wheat-400 to-wheat-500">
                            Frequentes
                        </span>
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base lg:text-xl">
                        Respondemos as dúvidas mais comuns para que você agende com total segurança.
                    </p>
                </motion.div>

                <div className="space-y-3 md:space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className={`border rounded-xl overflow-hidden transition-colors ${
                                openIndex === idx
                                    ? "border-wheat-500/30 bg-slate-900/80"
                                    : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                            }`}
                        >
                            <button
                                onClick={() => handleToggle(idx, faq.question)}
                                className="flex items-center justify-between w-full p-6 md:p-8 text-left"
                            >
                                <span className={`text-lg md:text-xl font-medium transition-colors ${
                                    openIndex === idx ? "text-wheat-300" : "text-slate-200"
                                }`}>
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                    openIndex === idx
                                        ? "bg-wheat-500/20 text-wheat-500"
                                        : "bg-slate-800 text-slate-500"
                                }`}>
                                    {openIndex === idx ? (
                                        <Minus className="w-4 h-4" />
                                    ) : (
                                        <Plus className="w-4 h-4" />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 md:px-8 pb-6 md:pb-8 text-slate-400 leading-relaxed text-base md:text-lg border-t border-slate-800/50 pt-5">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* CTA below FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-slate-400 mb-6 text-lg">
                        Ainda tem dúvidas? Fale diretamente com nossa equipe.
                    </p>
                    <a
                        href="https://wa.me/5538998269295?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20os%20protocolos%20do%20Dr.%20Diomar."
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-wheat-500 hover:bg-wheat-400 text-slate-950 font-bold py-4 px-6 md:px-8 rounded-xl shadow-lg shadow-wheat-900/20 transition-all hover:scale-105 min-h-[48px]"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Falar no WhatsApp
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
