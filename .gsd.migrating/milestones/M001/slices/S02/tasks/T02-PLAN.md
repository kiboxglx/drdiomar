---
estimated_steps: 1
estimated_files: 1
skills_used: []
---

# T02: Criar API Route /api/lead — Processar Leads

Criar API route Next.js que: 1) Valida dados (nome, whatsapp, interesse), 2) Salva em arquivo JSON local (ou Google Sheets futuro), 3) Retorna success/error. Incluir rate limiting básico e sanitização.

## Inputs

- `src/components/LeadForm.tsx (consumer)`

## Expected Output

- `src/app/api/lead/route.ts`

## Verification

npx next build && echo 'API route created'
