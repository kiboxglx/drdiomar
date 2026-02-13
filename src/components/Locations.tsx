"use client";

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const locations = [
    {
        hub: "Brasília de Minas",
        description: "Atendimento especializado para toda a região.",
        cities: [
            "São Francisco",
            "Mirabela",
            "Ubaí",
            "Luislândia",
            "Icaraí",
            "Japonvar",
            "Coração de Jesus",
        ],
        address: "Avenida Rui Barbosa, 365, Centro",
        gmaps: "https://www.google.com/maps/search/?api=1&query=Avenida+Rui+Barbosa+365+Centro+Brasilia+de+Minas",
    },
    {
        hub: "Varzelândia",
        description: "Referência em saúde e performance.",
        cities: [
            "São João da Ponte",
            "Ibiracatu",
            "Lontra",
            "Verdelândia",
        ],
        address: "Rua Lucas Alkimin 190, Centro",
        gmaps: "https://www.google.com/maps/search/?api=1&query=Rua+Lucas+Alkimin+190+Centro+Varzelandia",
    },
];

export default function Locations() {
    return (
        <section id="hubs" className="py-20 bg-slate-950 border-t border-slate-800">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-50 mb-6">
                        Nossa Presença <span className="text-wheat-500">Regional</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl">
                        Atendendo em dois hubs estratégicos para levar a medicina de performance até você.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {locations.map((loc, index) => (
                        <motion.div
                            key={loc.hub}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-slate-950 p-10 rounded-2xl border border-slate-800 hover:border-wheat-500/50 transition-colors shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <MapPin className="w-24 h-24 text-wheat-500" />
                            </div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-wheat-500/10 p-3 rounded-full">
                                    <MapPin className="w-8 h-8 text-wheat-500" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-50">{loc.hub}</h3>
                            </div>

                            <p className="text-slate-400 mb-8 border-b border-slate-800 pb-6 text-lg">
                                {loc.description}
                            </p>

                            <div className="mb-6">
                                <span className="block text-base text-wheat-500 font-semibold mb-4 uppercase tracking-wider">
                                    Municípios Atendidos:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {loc.cities.map((city) => (
                                        <span
                                            key={city}
                                            className="px-4 py-2 bg-slate-900 rounded-full text-sm font-medium text-slate-300 border border-slate-800"
                                        >
                                            {city}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-800">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Endereço</span>
                                    <p className="text-slate-300">{loc.address}</p>
                                </div>
                                <a
                                    href={loc.gmaps}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-wheat-500 hover:text-wheat-400 transition-colors text-sm font-semibold group-hover:translate-x-1 duration-300"
                                >
                                    Abrir no Google Maps &rarr;
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
