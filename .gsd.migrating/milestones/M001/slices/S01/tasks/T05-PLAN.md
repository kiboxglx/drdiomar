---
estimated_steps: 1
estimated_files: 4
skills_used: []
---

# T05: Reestruturar page.tsx + melhorar Hero e Depoimentos

1) Reordenar page.tsx: Hero → ProblemSection → MethodSection → Protocols → ResultsSection → Specialist → Testimonials → FinalCTA → FAQ → Footer. 2) Melhorar Hero com headline mais emocional e trust badges. 3) Expandir Testimonials com mais depoimentos e formato melhorado. 4) Melhorar FAQ com perguntas que quebram objeções reais.

## Inputs

- `src/app/page.tsx`
- `Todos os novos componentes criados em T01-T04`

## Expected Output

- `src/app/page.tsx (reestruturado)`
- `src/components/Hero.tsx (melhorado)`
- `src/components/Testimonials.tsx (expandido)`
- `src/components/FAQ.tsx (objeções reais)`

## Verification

npx next build && echo 'Page restructured'
