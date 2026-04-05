import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 pt-16 pb-8 border-t border-slate-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">

                    <div className="md:col-span-1">
                        <div className="relative h-16 w-64 mb-6">
                            <Image
                                src="/assets/logo.webp"
                                alt="Dr. Diomar Cangussu - Nutrologia"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-slate-400 text-sm max-w-xs mb-4">
                            Medicina de precisão focada em emagrecimento, performance e longevidade.
                            Atendimento exclusivo no Norte de Minas.
                        </p>
                        <p className="text-slate-500 text-sm">
                            CRM 60.143 MG
                        </p>
                    </div>

                    <div>
                        <h3 className="text-slate-50 font-bold mb-4 uppercase text-sm tracking-wider">Serviços</h3>
                        <ul className="space-y-2.5 text-slate-400 text-sm">
                            <li><Link href="/emagrecimento" className="hover:text-wheat-400 transition-colors">Emagrecimento</Link></li>
                            <li><Link href="/implante-hormonal" className="hover:text-wheat-400 transition-colors">Implantes Hormonais</Link></li>
                            <li><Link href="/longevidade" className="hover:text-wheat-400 transition-colors">Longevidade Premium</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-slate-50 font-bold mb-4 uppercase text-sm tracking-wider">Locais</h3>
                        <ul className="space-y-2.5 text-slate-400 text-sm">
                            <li><Link href="/brasilia-de-minas" className="hover:text-wheat-400 transition-colors">Brasília de Minas</Link></li>
                            <li><Link href="/varzelandia" className="hover:text-wheat-400 transition-colors">Varzelândia</Link></li>
                            <li><Link href="/contato" className="hover:text-wheat-400 transition-colors">Contato</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-slate-50 font-bold mb-4 uppercase text-sm tracking-wider">Informações</h3>
                        <ul className="space-y-2.5 text-slate-400 text-sm">
                            <li>Responsável Técnico:</li>
                            <li className="text-slate-300">Dr. Diomar — CRM 60.143 MG</li>
                            <li className="pt-2">
                                <a href="tel:+5538998269295" className="hover:text-wheat-400 transition-colors">(38) 99826-9295</a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/5538998269295"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-wheat-400 transition-colors"
                                >
                                    WhatsApp
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-600 text-xs gap-4">
                    <p>&copy; {new Date().getFullYear()} Dr. Diomar Cangussu. Todos os direitos reservados.</p>
                    <p>Desenvolvido com ⚡ por Squad Elite</p>
                </div>
            </div>
        </footer>
    );
}
