# 🎨 Component Library

> Biblioteca personal de componentes UI premium para Next.js y Laravel

## Stack Soportado

- **Next.js 15+** (App Router) + TypeScript + Tailwind CSS
- **Laravel** (Inertia + React o Livewire + Blade + Tailwind)

## Estructura

```
components/
├── ui/              # Componentes base (shadcn style)
│   ├── button.tsx       # 8 variants + animated + loading
│   ├── card.tsx         # Base, Animated, Glass, Gradient, Spotlight
│   └── input.tsx        # Base, Password, Search, Floating, Animated
│
├── fancy/           # Componentes animados premium
│   ├── animated-gradient-text.tsx  # Gradient, Typewriter, TextReveal, BlurText, ShinyText, Counter
│   ├── orbiting-circles.tsx        # OrbitingCircles, FloatingElement, RotatingBorder, Particles, PulseRing
│   └── glowing-button.tsx          # GlowingButton, ShimmerButton, MagneticButton, RippleButton
│
├── effects/         # Animaciones reutilizables
│   ├── scroll-reveal.tsx  # ScrollReveal, StaggerReveal, ScaleReveal, BlurReveal, Parallax, ScrollProgress
│   └── hover-effect.tsx   # TiltCard, Magnetic, Spotlight, HoverBorderGradient, GlowHover, UnderlineHover, IconRotate
│
├── layouts/         # Bloques grandes
│   ├── hero.tsx           # Hero (full), MinimalHero, VideoHero
│   └── pricing-table.tsx  # PricingTable (with toggle), SimplePricingCard
│
└── sections/        # Secciones de página completas (Efferd-inspired)
    ├── auth/
    │   ├── auth-1.tsx         # Social login (Google/GitHub) + email
    │   └── auth-2.tsx         # Split-screen: testimonial sidebar + form
    ├── contact/
    │   ├── contact-1.tsx      # Info cards (email/office/phone) + social links
    │   └── contact-2.tsx      # Split: info sidebar + contact form
    ├── faq/
    │   ├── faq-1.tsx          # Single column accordion
    │   └── faq-2.tsx          # Two-column bordered cards accordion
    ├── gallery/
    │   └── gallery-1.tsx      # Responsive image grid with hover effects
    └── not-found/
        ├── not-found-1.tsx    # Clean 404 with go-home button
        └── not-found-2.tsx    # 404 with quick navigation links
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
- ✅ Secciones completas inspiradas en Efferd (auth, contact, FAQ, gallery, 404)

## Fuentes de Inspiración

- [shadcn/ui](https://ui.shadcn.com)
- [Efferd](https://efferd.com) — Bloques de sección
- [Aceternity UI](https://ui.aceternity.com)
- [Magic UI](https://magicui.design)
- [HyperUI](https://hyperui.dev)
- [DaisyUI](https://daisyui.com)
- [Flowbite](https://flowbite.com)
- [Uiverse](https://uiverse.io)
- [TailGrids](https://tailgrids.com)

## Uso

```tsx
// UI Components
import { Button } from '@/components/ui/button';
import { GlowingButton } from '@/components/fancy/glowing-button';
import { ScrollReveal } from '@/components/effects/scroll-reveal';

// Section Blocks
import { Auth1 } from '@/components/sections/auth/auth-1';
import { FAQ1 } from '@/components/sections/faq/faq-1';
import { Contact2 } from '@/components/sections/contact/contact-2';
import { NotFound1 } from '@/components/sections/not-found/not-found-1';

export default function Page() {
  return (
    <ScrollReveal>
      <Button variant="primary">Normal Button</Button>
      <GlowingButton>Premium Button</GlowingButton>
    </ScrollReveal>
  );
}
```
