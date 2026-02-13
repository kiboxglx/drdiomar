"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <main className="bg-slate-950 min-h-screen">
            <Navbar />

            <section className="relative min-h-[80vh] flex items-center justify-center pt-24 md:pt-32 pb-16">
                {/* Background Details */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 z-[1]" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-stone-400/10 rounded-full blur-[128px] pointer-events-none z-[2]" />

                <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-50 mb-6">
                            Agende sua <span className="text-wheat-500">Consulta</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                            Dê o primeiro passo para transformar sua saúde e performance. Entre em contato agora mesmo.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-wheat-500/5 rounded-full blur-[80px]" />

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-slate-50">Atendimento Exclusivo</h3>
                                    <p className="text-slate-400">
                                        Nossa equipe está pronta para tirar suas dúvidas sobre protocolos de emagrecimento e implantes hormonais.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-slate-800 p-3 rounded-lg">
                                            <MapPin className="w-6 h-6 text-wheat-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-200">Brasília de Minas</p>
                                            <p className="text-sm text-slate-400">Av. Rui Barbosa, 365, Centro</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-slate-800 p-3 rounded-lg">
                                            <MapPin className="w-6 h-6 text-wheat-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-200">Varzelândia</p>
                                            <p className="text-sm text-slate-400">Rua Lucas Alkimin 190, Centro</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center space-y-6 md:border-l md:border-slate-800 md:pl-12">
                                <div className="text-center md:text-left w-full">
                                    <p className="text-sm text-wheat-500 font-semibold uppercase tracking-wider mb-2">Canal Preferencial</p>
                                    <h2 className="text-3xl font-bold text-slate-50 mb-6">WhatsApp</h2>
                                </div>

                                <a
                                    href="https://wa.me/5538998269295?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20Dr.%20Diomar."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold py-5 px-8 rounded-xl shadow-lg shadow-green-900/20 transition-all hover:scale-[1.02]"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    <span>Iniciar Conversa Agora</span>

                                    {/* Pulse effect */}
                                    <span className="absolute -inset-1 rounded-xl bg-green-500/30 animate-pulse group-hover:bg-green-400/40 transition-colors" />
                                </a>

                                <p className="text-xs text-slate-500 text-center">
                                    Ao clicar, você será redirecionado para o WhatsApp da clínica.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
