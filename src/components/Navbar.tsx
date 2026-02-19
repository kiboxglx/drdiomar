"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

// Actually, I should create a reusable Button component since it's "High-End".
// For now, I'll put standard button classes.

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    const handleClick = () => {
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", "ads_conversion_Reservar_hor_rio_1", {});
        }
    };

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
                <Link href="/" className="relative h-16 w-64 md:h-20 md:w-80">
                    <Image
                        src="/assets/logo-diomar.png"
                        alt="Dr. Diomar Cangussu - Nutrologia"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <button onClick={() => scrollToSection("hubs")} className="text-base font-medium text-slate-300 hover:text-stone-300 transition-colors">
                        Locais
                    </button>
                    <button onClick={() => scrollToSection("protocols")} className="text-base font-medium text-slate-300 hover:text-stone-300 transition-colors">
                        Protocolos
                    </button>
                    <button onClick={() => scrollToSection("testimonials")} className="text-base font-medium text-slate-300 hover:text-stone-300 transition-colors">
                        Resultados
                    </button>
                </nav>

                {/* CTA Button */}
                {/* CTA Button */}
                <a
                    onClick={handleClick}
                    href="https://wa.me/5538998269295"
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                        "bg-stone-300 hover:bg-stone-200 text-slate-950 font-bold py-3 px-7 rounded-full transition-all shadow-[0_0_15px_rgba(214,211,209,0.3)] hover:shadow-[0_0_20px_rgba(214,211,209,0.5)] text-sm md:text-base text-center"
                    )}
                >
                    Agendar Consulta
                </a>
            </div>
        </header>
    );
}
