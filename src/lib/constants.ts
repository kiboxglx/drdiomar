/**
 * Centralized constants for the project.
 * Keep all hardcoded phone numbers, URLs and messages here.
 */

export const PHONE_DIGITS = "5538998269290";
export const PHONE_DISPLAY = "(38) 99826-9290";

const WA_BASE = `https://wa.me/${PHONE_DIGITS}`;

const wa = (message: string) =>
  `${WA_BASE}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_URLS = {
  /** Default CTA from the site */
  default: wa("Olá, vim pelo site e gostaria de agendar uma avaliação com Dr. Diomar."),
  /** Navbar / Hero / generic CTAs */
  schedule: wa("Olá, vim pelo site e gostaria de agendar uma avaliação com Dr. Diomar."),
  /** FAQ — has a question */
  faqQuestion: wa("Olá, tenho uma dúvida sobre a consulta de avaliação com Dr. Diomar."),
  /** /obrigado thank-you confirmation */
  postFormConfirm: wa("Olá, acabei de preencher o formulário no site e gostaria de confirmar meu agendamento."),
  /** Specialist section */
  specialist: wa("Olá, gostaria de agendar uma avaliação com Dr. Diomar."),
} as const;

export const PHONE_TEL_LINK = `tel:+${PHONE_DIGITS}`;
