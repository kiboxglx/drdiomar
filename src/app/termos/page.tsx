import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Termos de Uso | Dr. Diomar Cangussu",
  description:
    "Termos de Uso do site drdiomarcangussu.com.br — informações sobre uso do site, limitações e responsabilidades.",
  alternates: { canonical: "https://drdiomarcangussu.com.br/termos" },
  robots: "index, follow",
};

const TERMS_VERSION = "1.0";
const TERMS_DATE = "28 de maio de 2026";

export default function TermosPage() {
  return (
    <main id="main-content" className="bg-slate-950 min-h-screen">
      <Navbar />

      <article className="container mx-auto px-4 md:px-6 max-w-3xl pt-28 md:pt-36 pb-16 md:pb-24 text-slate-300 leading-relaxed">
        <header className="mb-12">
          <p className="text-xs text-wheat-400 font-semibold uppercase tracking-wider mb-3">
            Versão {TERMS_VERSION} · Atualizada em {TERMS_DATE}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-50 mb-4 leading-tight">
            Termos de Uso
          </h1>
          <p className="text-slate-300 text-lg">
            Ao acessar e utilizar o site <strong>drdiomarcangussu.com.br</strong>, você concorda com
            estes Termos de Uso. Se não concordar, recomendamos que não utilize o site.
          </p>
        </header>

        <Section title="1. Sobre o site">
          <p>
            Este site é mantido por <strong>Dr. Diomar Cangussu</strong> (CRM 60.143 MG), com
            consultórios em Brasília de Minas e Varzelândia, e tem caráter exclusivamente informativo e
            de divulgação dos serviços médicos prestados.
          </p>
        </Section>

        <Section title="2. Aviso médico importante">
          <p>
            O conteúdo deste site, incluindo textos, imagens e descrições de avaliações, tem
            <strong> finalidade informativa</strong> e não substitui consulta médica presencial, exame
            clínico, diagnóstico ou tratamento prescrito por médico habilitado.
          </p>
          <p>
            Nenhuma informação deste site deve ser interpretada como promessa de resultado terapêutico,
            diagnóstico clínico ou indicação medicamentosa para um caso específico. Cada paciente exige
            avaliação individual.
          </p>
          <p>
            Em caso de urgência ou emergência médica, procure imediatamente o serviço de saúde mais
            próximo ou ligue para o SAMU 192.
          </p>
        </Section>

        <Section title="3. Agendamento da consulta">
          <p>
            O agendamento solicitado por meio do formulário ou WhatsApp não está confirmado até que
            nossa equipe entre em contato e formalize horário, local e condições. O Dr. Diomar reserva-se
            o direito de remarcar ou recusar agendamento por motivos clínicos, logísticos ou éticos.
          </p>
        </Section>

        <Section title="4. Limitação de responsabilidade">
          <p>
            Empregamos esforços razoáveis para manter o site operacional e com informações atualizadas,
            mas não garantimos disponibilidade ininterrupta, ausência de erros ou exatidão absoluta do
            conteúdo. Não nos responsabilizamos por:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Interrupções ou falhas técnicas alheias ao nosso controle</li>
            <li>Conteúdo de sites de terceiros eventualmente referenciados</li>
            <li>Decisões tomadas pelo usuário com base exclusivamente no conteúdo do site</li>
            <li>Uso indevido das informações por terceiros</li>
          </ul>
        </Section>

        <Section title="5. Propriedade intelectual">
          <p>
            Todo o conteúdo do site (textos, imagens, vídeos, layout, logotipo, marca) é de propriedade
            do Dr. Diomar Cangussu ou utilizado mediante licença. É vedada a reprodução, cópia,
            modificação ou distribuição sem autorização expressa, exceto para uso pessoal e
            não-comercial.
          </p>
        </Section>

        <Section title="6. Coleta e tratamento de dados">
          <p>
            Os dados pessoais coletados são tratados conforme nossa{" "}
            <Link href="/privacidade" className="text-wheat-400 underline">
              Política de Privacidade
            </Link>
            , em conformidade com a LGPD (Lei nº 13.709/2018).
          </p>
        </Section>

        <Section title="7. Cookies">
          <p>
            O site utiliza cookies essenciais, de análise e de marketing, conforme descrito na Política
            de Privacidade. Você pode aceitar, recusar ou personalizar suas preferências pelo banner de
            cookies.
          </p>
        </Section>

        <Section title="8. Conduta do usuário">
          <p>Ao utilizar o site, você se compromete a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fornecer informações verdadeiras nos formulários</li>
            <li>Não utilizar o site para fins ilícitos ou abusivos</li>
            <li>Respeitar a privacidade e os direitos do Dr. Diomar e de outros usuários</li>
            <li>Não tentar comprometer a segurança ou a integridade do site</li>
          </ul>
        </Section>

        <Section title="9. Alterações dos Termos">
          <p>
            Estes Termos podem ser atualizados a qualquer momento. A versão vigente é sempre a publicada
            nesta página, com a data e versão de atualização indicadas no topo.
          </p>
        </Section>

        <Section title="10. Lei aplicável e foro">
          <p>
            Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da Comarca de
            Brasília de Minas/MG para dirimir eventuais controvérsias relacionadas ao site.
          </p>
        </Section>

        <Section title="11. Contato">
          <p>
            Dúvidas sobre estes Termos podem ser enviadas para{" "}
            <a href="mailto:contato@drdiomarcangussu.com.br" className="text-wheat-400 underline">
              contato@drdiomarcangussu.com.br
            </a>{" "}
            ou pelo WhatsApp{" "}
            <a
              href="https://wa.me/5538998269290"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wheat-400 underline"
            >
              (38) 99826-9290
            </a>
            .
          </p>
        </Section>

        <div className="mt-16 pt-8 border-t border-slate-800 text-sm text-slate-400">
          <p>
            <strong>Última atualização:</strong> {TERMS_DATE} (versão {TERMS_VERSION})
          </p>
          <p className="mt-2">
            <Link href="/privacidade" className="text-wheat-400 underline">
              Política de Privacidade
            </Link>{" "}
            ·{" "}
            <Link href="/" className="text-wheat-400 underline">
              Voltar ao início
            </Link>
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-slate-50 mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
