"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
    const handleClick = () => {
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", "ads_conversion_Reservar_hor_rio_1", {});
        }
    };

    return (
        <motion.a
            onClick={handleClick}
            href="https://wa.me/5538998269295?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar consulta via WhatsApp com Dr. Diomar"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg shadow-green-500/30 transition-all group"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
        >
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75 duration-1000" />
            <MessageCircle className="w-8 h-8 text-white relative z-10" />
        </motion.a>
    );
}
