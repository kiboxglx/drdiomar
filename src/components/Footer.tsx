import Image from "next/image";
import Link from "next/link";
import ManageCookiesButton from "./ManageCookiesButton";

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
                            Consulta de avaliação clínica aprofundada com o Dr. Diomar Cangussu.
                            Atendimento no Norte de Minas.
                        </p>
                        <p className="text-slate-500 text-sm">
                            CRM 60.143 MG
                        </p>
                    </div>

                    <div>
                        <h3 className="text-slate-50 font-bold mb-4 uppercase text-sm tracking-wider">Avaliação por perfil</h3>
                        <ul className="space-y-2.5 text-slate-400 text-sm">
                            <li><Link href="/emagrecimento" className="hover:text-wheat-400 transition-colors">Para quem busca emagrecer</Link></li>
                            <li><Link href="/implante-hormonal" className="hover:text-wheat-400 transition-colors">Para sintomas hormonais</Link></li>
                            <li><Link href="/longevidade" className="hover:text-wheat-400 transition-colors">Para check-up preventivo</Link></li>
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
                                <a href="tel:+5538998269290" className="hover:text-wheat-400 transition-colors">(38) 99826-9290</a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/5538998269290"
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

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs gap-4">
                    <p>&copy; {new Date().getFullYear()} Dr. Diomar Cangussu. Todos os direitos reservados.</p>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                        <Link href="/privacidade" className="hover:text-wheat-400 transition-colors">
                            Política de Privacidade
                        </Link>
                        <span className="text-slate-700">·</span>
                        <Link href="/termos" className="hover:text-wheat-400 transition-colors">
                            Termos de Uso
                        </Link>
                        <span className="text-slate-700">·</span>
                        <a
                            href="mailto:encarregado@drdiomarcangussu.com.br"
                            className="hover:text-wheat-400 transition-colors"
                        >
                            Encarregado (DPO)
                        </a>
                        <span className="text-slate-700">·</span>
                        <ManageCookiesButton />
                    </div>
                </div>
            </div>
        </footer>
    );
}
