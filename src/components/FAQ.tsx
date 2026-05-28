"use client";

import { useState } from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTracking } from "@/hooks/useTracking";

const faqs = [
    {
        question: "O que acontece na consulta com o Dr. Diomar?",
        answer: "A consulta é uma avaliação clínica aprofundada. O Dr. Diomar dedica tempo para a anamnese — histórico, sintomas, rotina, exames anteriores — faz bioimpedância de alta precisão e solicita exames específicos quando necessário. No retorno, apresenta a leitura clínica do seu caso e, se fizer sentido, recomenda o caminho técnico para o seu quadro. A consulta não é um atendimento de 10 minutos.",
    },
    {
        question: "Quanto tempo dura a consulta?",
        answer: "O tempo necessário para olhar o seu caso com profundidade. Não trabalhamos com encaixes apressados — o Dr. Diomar reserva uma janela ampla para conseguir investigar o histórico clínico, ouvir os sintomas, fazer a bioimpedância e construir a leitura inicial do quadro com você.",
    },
    {
        question: "Preciso levar exames anteriores?",
        answer: "Sim, sempre que possível. Exames recentes ajudam a montar uma leitura mais completa do seu quadro logo na primeira consulta. Se você não tem exames, sem problema — o Dr. Diomar solicita os necessários durante o atendimento.",
    },
    {
        question: "Saio da consulta com tratamento prescrito?",
        answer: "Depende do caso. A consulta é uma avaliação clínica — o foco é entender o que está por trás do quadro antes de qualquer decisão. Quando há exames suficientes e o caso permite, o Dr. Diomar já apresenta a recomendação clínica. Em casos que pedem mais investigação, novos exames são solicitados antes de qualquer prescrição. Decisão construída com critério, não pressa.",
    },
    {
        question: "Já tentei de tudo e nada funciona. Por que seria diferente?",
        answer: "Porque o ponto de partida é outro. A maioria das tentativas começa pela receita — dieta, medicação, suplementação — sem que ninguém tenha investigado o que está acontecendo no seu corpo. Aqui, a consulta começa pela investigação. Anamnese cuidadosa, exames específicos e leitura clínica do seu caso antes de qualquer recomendação. É comum pacientes que 'já tentaram de tudo' descobrirem na avaliação algo que tinha passado batido em outras consultas.",
    },
    {
        question: "Qual o valor da consulta?",
        answer: "A consulta de avaliação tem valor particular. A equipe apresenta o valor e as condições durante o agendamento, junto com a disponibilidade de horários. Trabalhamos com tempo e profundidade em cada atendimento — por isso o atendimento não é por convênio.",
    },
    {
        question: "Posso parcelar?",
        answer: "Sim. As formas de pagamento e condições de parcelamento são apresentadas no momento do agendamento, junto com o valor da consulta. O objetivo é que o investimento na avaliação caiba no seu planejamento.",
    },
    {
        question: "O Dr. Diomar atende por convênio?",
        answer: "Não. A avaliação clínica aprofundada exige tempo e dedicação em cada caso — algo que o modelo de convênio não comporta. O atendimento é particular, com emissão de nota fiscal para que você possa solicitar reembolso junto ao seu plano de saúde quando previsto em contrato.",
    },
    {
        question: "Onde ficam os consultórios?",
        answer: "Temos dois hubs regionais no Norte de Minas: Brasília de Minas (atendendo São Francisco, Mirabela, Ubaí, Luislândia e região) e Varzelândia (atendendo São João da Ponte, Ibiracatu, Lontra e cidades vizinhas).",
    },
    {
        question: "Como faço para agendar?",
        answer: "Pelo WhatsApp da equipe. Você preenche o formulário do site ou clica em qualquer botão de agendamento, conversa com a recepção, e o horário é marcado conforme a disponibilidade da agenda do Dr. Diomar.",
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
                                className="flex items-center justify-between w-full p-5 md:p-8 text-left"
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
                                        <div className="px-5 md:px-8 pb-5 md:pb-8 text-slate-400 leading-relaxed text-base md:text-lg border-t border-slate-800/50 pt-4">
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
                        Ainda tem dúvidas sobre a consulta? Fale diretamente com a equipe.
                    </p>
                    <a
                        href="https://wa.me/5538998269290?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20a%20consulta%20de%20avalia%C3%A7%C3%A3o%20com%20Dr.%20Diomar."
                        target="_blank"
                        rel="noopener noreferrer"
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
