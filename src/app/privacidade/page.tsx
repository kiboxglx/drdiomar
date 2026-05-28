import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DataRequestForm from "@/components/DataRequestForm";

export const metadata: Metadata = {
  title: "Política de Privacidade | Dr. Diomar Cangussu",
  description:
    "Política de Privacidade e tratamento de dados pessoais do site drdiomarcangussu.com.br, em conformidade com a LGPD (Lei nº 13.709/2018).",
  alternates: { canonical: "https://drdiomarcangussu.com.br/privacidade" },
  robots: "index, follow",
};

const POLICY_VERSION = "1.0";
const POLICY_DATE = "28 de maio de 2026";

export default function PrivacidadePage() {
  return (
    <main id="main-content" className="bg-slate-950 min-h-screen">
      <Navbar />

      <article className="container mx-auto px-4 md:px-6 max-w-3xl pt-28 md:pt-36 pb-16 md:pb-24 text-slate-300 leading-relaxed">
        <header className="mb-12">
          <p className="text-xs text-wheat-400 font-semibold uppercase tracking-wider mb-3">
            Versão {POLICY_VERSION} · Atualizada em {POLICY_DATE}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-50 mb-4 leading-tight">
            Política de Privacidade
          </h1>
          <p className="text-slate-300 text-lg">
            Esta política explica como coletamos, usamos, armazenamos e protegemos seus dados pessoais
            quando você utiliza o site <strong>drdiomarcangussu.com.br</strong>, em conformidade com a
            Lei Geral de Proteção de Dados — <strong>Lei nº 13.709/2018 (LGPD)</strong>.
          </p>
        </header>

        <Section title="1. Controlador dos dados">
          <p>
            O controlador dos dados pessoais coletados neste site é <strong>Dr. Diomar Cangussu</strong>,
            médico inscrito no CRM 60.143 — Minas Gerais, com consultórios em Brasília de Minas/MG (Avenida
            Rui Barbosa, 365, Centro) e Varzelândia/MG (Rua Lucas Alkimin, 190, Centro).
          </p>
        </Section>

        <Section title="2. Encarregado de Tratamento de Dados (DPO)">
          <p>
            <strong>Equipe Dr. Diomar Cangussu</strong> — Encarregada pelo tratamento de dados.
          </p>
          <p>
            Contato:{" "}
            <a href="mailto:encarregado@drdiomarcangussu.com.br" className="text-wheat-400 underline">
              encarregado@drdiomarcangussu.com.br
            </a>
          </p>
          <p>
            Pelo WhatsApp:{" "}
            <a
              href="https://wa.me/5538998269290?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20meus%20dados%20pessoais%20(LGPD)."
              target="_blank"
              rel="noopener noreferrer"
              className="text-wheat-400 underline"
            >
              (38) 99826-9290
            </a>
          </p>
        </Section>

        <Section title="3. Dados coletados">
          <p>O site coleta as seguintes categorias de dados pessoais:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Dados de identificação e contato (fornecidos por você no formulário):</strong>{" "}
              nome, número de WhatsApp, motivo principal da avaliação.
            </li>
            <li>
              <strong>Dados de saúde (dado sensível — Art. 11 LGPD):</strong> ao informar motivos como
              &ldquo;Ganho de peso / dificuldade para emagrecer&rdquo;,
              &ldquo;Fadiga / queda de libido / sintomas hormonais&rdquo; ou &ldquo;Check-up e
              prevenção&rdquo;, você fornece informações que podem revelar condição de saúde. Esses dados
              recebem proteção reforçada e só são tratados com seu consentimento específico e destacado.
            </li>
            <li>
              <strong>Dados técnicos (coletados automaticamente):</strong> endereço IP, tipo de
              dispositivo, navegador, páginas visitadas e tempo de permanência. Coletados apenas se você
              consentir com cookies de análise e marketing.
            </li>
          </ul>
        </Section>

        <Section title="4. Finalidades do tratamento">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Agendamento da consulta de avaliação clínica com o Dr. Diomar e comunicação relacionada
              (confirmação, alteração, cancelamento).
            </li>
            <li>Resposta a dúvidas enviadas pelo formulário ou WhatsApp.</li>
            <li>
              Análise estatística de uso do site para melhorar a experiência (apenas com seu
              consentimento — cookies de análise).
            </li>
            <li>
              Otimização e mensuração de campanhas publicitárias do Google Ads e Meta (Facebook/Instagram)
              — apenas com seu consentimento (cookies de marketing).
            </li>
            <li>
              Cumprimento de obrigações legais e regulatórias aplicáveis ao exercício da Medicina.
            </li>
          </ul>
        </Section>

        <Section title="5. Bases legais (Art. 7º e Art. 11 LGPD)">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Consentimento</strong> (Art. 7º, I e Art. 11, I) — para dados de saúde, cookies de
              análise e cookies de marketing.
            </li>
            <li>
              <strong>Execução de procedimentos preliminares de contrato</strong> (Art. 7º, V) — para
              dados de contato necessários ao agendamento da consulta.
            </li>
            <li>
              <strong>Cumprimento de obrigação legal</strong> (Art. 7º, II) — quando aplicável a
              registros médicos.
            </li>
          </ul>
        </Section>

        <Section title="6. Compartilhamento com terceiros">
          <p>
            Seus dados podem ser compartilhados com os seguintes operadores, todos com salvaguardas
            contratuais e técnicas:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Supabase</strong> (banco de dados — armazenamento dos leads em servidores no Brasil
              e/ou União Europeia).
            </li>
            <li>
              <strong>WhatsApp / Meta</strong> (comunicação direta com você via aplicativo, mediante o
              clique nos botões do site).
            </li>
            <li>
              <strong>Google Analytics, Google Ads</strong> (análise de uso e medição de campanhas —
              apenas com consentimento de cookies analíticos/marketing).
            </li>
            <li>
              <strong>Meta Pixel (Facebook/Instagram Ads)</strong> (medição de campanhas — apenas com
              consentimento de cookies de marketing).
            </li>
            <li>
              <strong>Netlify</strong> (hospedagem do site).
            </li>
          </ul>
          <p>
            Não vendemos nem alugamos seus dados a terceiros para fins comerciais externos.
          </p>
        </Section>

        <Section title="7. Transferência internacional de dados">
          <p>
            Alguns operadores (Google, Meta, Netlify) processam dados em servidores localizados fora do
            Brasil, principalmente nos Estados Unidos e União Europeia. Essas transferências ocorrem com
            base nas cláusulas-padrão internacionais e medidas técnicas adequadas (criptografia em
            trânsito e em repouso), conforme Art. 33 e seguintes da LGPD.
          </p>
        </Section>

        <Section title="8. Retenção e descarte">
          <p>
            <strong>Leads (dados de contato e de saúde):</strong> mantidos por até <strong>2 anos</strong>{" "}
            após o último contato. Após esse prazo, os dados pessoais identificáveis são anonimizados
            (nome, WhatsApp e IP zerados), mantendo apenas dados estatísticos não-identificáveis.
          </p>
          <p>
            <strong>Logs de consentimento:</strong> mantidos por até 5 anos como prova de cumprimento
            legal, conforme orientação da ANPD.
          </p>
          <p>
            <strong>Dados de cookies:</strong> conforme expiração configurada no seu navegador. Você pode
            limpá-los a qualquer momento.
          </p>
        </Section>

        <Section title="9. Cookies">
          <p>Utilizamos três categorias de cookies:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Essenciais</strong> — necessários para o funcionamento básico (sessão, segurança).
              Não exigem consentimento.
            </li>
            <li>
              <strong>Análise (analytics)</strong> — Google Analytics 4. Ajuda-nos a entender como o
              site é usado. Exige consentimento.
            </li>
            <li>
              <strong>Marketing</strong> — Meta Pixel e Google Ads. Mensuração e otimização de
              campanhas. Exige consentimento.
            </li>
          </ul>
          <p>
            Você pode revogar ou ajustar seu consentimento a qualquer momento pelo banner de cookies ou
            limpando o armazenamento local do navegador.
          </p>
        </Section>

        <Section title="10. Seus direitos como titular (Art. 18 LGPD)">
          <p>Você tem direito a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Confirmar a existência de tratamento dos seus dados</li>
            <li>Acessar seus dados</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
            <li>Anonimizar, bloquear ou eliminar dados desnecessários ou tratados em desconformidade</li>
            <li>Portar seus dados a outro fornecedor de serviço</li>
            <li>Eliminar os dados tratados com base em consentimento</li>
            <li>Informações sobre entidades com quem compartilhamos seus dados</li>
            <li>Revogar o consentimento a qualquer momento</li>
          </ul>
          <p>
            Para exercer qualquer desses direitos, envie um e-mail para{" "}
            <a href="mailto:encarregado@drdiomarcangussu.com.br" className="text-wheat-400 underline">
              encarregado@drdiomarcangussu.com.br
            </a>{" "}
            ou utilize o formulário abaixo. Atenderemos no prazo legal de <strong>15 dias</strong>{" "}
            (Art. 19 LGPD).
          </p>
          <div className="mt-6">
            <DataRequestForm />
          </div>
        </Section>

        <Section title="11. Segurança">
          <p>
            Adotamos medidas técnicas e organizacionais compatíveis com o nível de risco do tratamento,
            incluindo: criptografia em trânsito (HTTPS/TLS), criptografia em repouso no banco de dados,
            controle de acesso por chaves separadas (anônima vs. service role), Row-Level Security
            habilitado no banco, rate limiting em endpoints públicos e revisão periódica das
            permissões.
          </p>
        </Section>

        <Section title="12. Incidentes de segurança">
          <p>
            Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos titulares,
            comunicaremos a Autoridade Nacional de Proteção de Dados (ANPD) e os titulares afetados, em
            prazo razoável (Art. 48 LGPD).
          </p>
        </Section>

        <Section title="13. Tratamento de dados de menores">
          <p>
            O site não se destina a menores de 18 anos. Se você é responsável legal por um menor cujos
            dados foram coletados sem consentimento parental, entre em contato pelo e-mail do
            Encarregado para que possamos providenciar a exclusão imediata.
          </p>
        </Section>

        <Section title="14. Autoridade Nacional de Proteção de Dados (ANPD)">
          <p>
            Você tem o direito de apresentar reclamação à ANPD a qualquer momento:{" "}
            <a
              href="https://www.gov.br/anpd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wheat-400 underline"
            >
              www.gov.br/anpd
            </a>
            .
          </p>
        </Section>

        <Section title="15. Alterações desta política">
          <p>
            Esta política pode ser atualizada periodicamente. A versão e a data de atualização sempre
            constarão no topo deste documento. Mudanças substanciais serão comunicadas no banner do
            site.
          </p>
        </Section>

        <Section title="16. Lei aplicável">
          <p>
            Esta política é regida pela legislação brasileira, em especial pela Lei nº 13.709/2018
            (LGPD). Fica eleito o foro da Comarca de Brasília de Minas/MG para dirimir eventuais
            controvérsias.
          </p>
        </Section>

        <div className="mt-16 pt-8 border-t border-slate-800 text-sm text-slate-400">
          <p>
            <strong>Última atualização:</strong> {POLICY_DATE} (versão {POLICY_VERSION})
          </p>
          <p className="mt-2">
            <Link href="/termos" className="text-wheat-400 underline">
              Termos de Uso
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
