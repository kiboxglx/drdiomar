export default function Footer() {
    return (
        <footer className="bg-slate-950 pt-16 pb-8 border-t border-slate-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">

                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-montserrat font-bold text-slate-50 mb-4">
                            Dr. Diomar <span className="text-stone-300">Cangussu</span>
                        </h3>
                        <p className="text-slate-400 max-w-sm mb-6">
                            Medicina de precisão focada em emagrecimento, performance e longevidade.
                            Atendimento exclusivo no Norte de Minas.
                        </p>
                        <div className="text-slate-500 text-sm">
                            <p>CRM 60.143 MG</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-slate-50 font-bold mb-4 uppercase text-sm tracking-wider">Hubs de Atendimento</h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li>Brasília de Minas - MG</li>
                            <li>Varzelândia - MG</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-50 font-bold mb-4 uppercase text-sm tracking-wider">Links Legais</h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-stone-300 transition-colors">Política de Privacidade</a></li>
                            <li><a href="#" className="hover:text-stone-300 transition-colors">Termos de Uso</a></li>
                            <li><a href="#" className="hover:text-stone-300 transition-colors">CNPJ: 00.000.000/0001-00</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-600 text-xs gap-4">
                    <p>&copy; {new Date().getFullYear()} Dr. Diomar Cangussu. Todos os direitos reservados.</p>
                    <p>Desenvolvido com ⚡ por Squad Elite</p>
                </div>
            </div>
        </footer>
    );
}
