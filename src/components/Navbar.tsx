"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

// Actually, I should create a reusable Button component since it's "High-End".
// For now, I'll put standard button classes.

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                isScrolled
                    ? "bg-slate-950/80 backdrop-blur-md border-slate-800 py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-montserrat font-bold text-lg md:text-xl text-slate-50 tracking-wide uppercase">
                    Dr. Diomar <span className="text-amber-500">Cangussu</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <button onClick={() => scrollToSection("hubs")} className="text-base font-medium text-slate-300 hover:text-amber-400 transition-colors">
                        Locais
                    </button>
                    <button onClick={() => scrollToSection("protocols")} className="text-base font-medium text-slate-300 hover:text-amber-400 transition-colors">
                        Protocolos
                    </button>
                    <button onClick={() => scrollToSection("testimonials")} className="text-base font-medium text-slate-300 hover:text-amber-400 transition-colors">
                        Resultados
                    </button>
                </nav>

                {/* CTA Button */}
                <a
                    href="https://wa.me/5538998269295"
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                        "bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-3 px-7 rounded-full transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] text-sm md:text-base"
                    )}
                >
                    Agendar Consulta
                </a>
            </div>
        </header>
    );
}
