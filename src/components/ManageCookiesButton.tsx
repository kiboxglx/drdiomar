"use client";

export default function ManageCookiesButton() {
  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("drdiomar:open-cookie-settings"));
        }
      }}
      className="hover:text-wheat-400 transition-colors"
    >
      Gerenciar cookies
    </button>
  );
}
