import { Suspense } from "react";
import ObrigadoContent from "./ObrigadoContent";

export default function ObrigadoPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-wheat-500 border-t-transparent rounded-full animate-spin" />
        </main>
      }
    >
      <ObrigadoContent />
    </Suspense>
  );
}
