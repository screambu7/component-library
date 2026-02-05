# 🎨 Component Library

> Biblioteca personal de componentes UI premium para Next.js y Laravel

## Stack Soportado

- **Next.js 15+** (App Router) + TypeScript + Tailwind CSS
- **Laravel** (Inertia + React o Livewire + Blade + Tailwind)

## Estructura

```
components/
├── ui/          # Componentes base (shadcn style)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── fancy/       # Componentes animados premium
│   ├── glowing-button.tsx
│   ├── orbiting-circles.tsx
│   ├── animated-gradient-text.tsx
│   └── ...
├── effects/     # Animaciones reutilizables
│   ├── scroll-reveal.tsx
│   ├── hover-effect.tsx
│   └── ...
└── layouts/     # Bloques grandes
    ├── hero.tsx
    └── pricing-table.tsx
```

## Instalación de Dependencias

```bash
# Base
npm install clsx tailwind-merge class-variance-authority

# Animaciones
npm install framer-motion

# Radix UI (primitives)
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu

# Icons
npm install lucide-react
```

## Características

- ✅ TypeScript con interfaces y tipos
- ✅ Framer Motion para animaciones
- ✅ Accesible (ARIA attributes)
- ✅ Responsive mobile-first
- ✅ Variantes (primary, secondary, outline, ghost, destructive)
- ✅ Dark mode support (dark: prefix)
- ✅ Copy-paste ready

## Fuentes de Inspiración

- [shadcn/ui](https://ui.shadcn.com)
- [Aceternity UI](https://ui.aceternity.com)
- [Magic UI](https://magicui.design)
- [HyperUI](https://hyperui.dev)
- [DaisyUI](https://daisyui.com)
- [Flowbite](https://flowbite.com)
- [Uiverse](https://uiverse.io)
- [TailGrids](https://tailgrids.com)

## Uso

```tsx
import { Button } from '@/components/ui/button';
import { GlowingButton } from '@/components/fancy/glowing-button';
import { ScrollReveal } from '@/components/effects/scroll-reveal';

export default function Page() {
  return (
    <ScrollReveal>
      <Button variant="primary">Normal Button</Button>
      <GlowingButton>Premium Button</GlowingButton>
    </ScrollReveal>
  );
}
```
