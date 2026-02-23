# Overview

Este proyecto es una **biblioteca de componentes reutilizables** diseñada para el ecosistema del **SrBu Protocol**. Proporciona bloques de sección preconstruidos que pueden ser importados y personalizados rápidamente en aplicaciones Next.js o Laravel.

## Propósito
- Acelerar el desarrollo de interfaces al ofrecer componentes UI listos para usar.
- Garantizar consistencia visual y de accesibilidad en toda la suite de productos SrBu.
- Facilitar la adopción del protocolo mediante una arquitectura modular y extensible.

## Componentes Clave
- **UI Base**: botones, tarjetas, inputs con variantes temáticas.
- **Fancy**: animaciones premium, efectos de interacción avanzados.
- **Layouts**: hero, pricing table, etc.
- **Sections**: bloques de página completos (auth, contacto, FAQ, galería, 404).

## Tecnologías
- **React 18** y **TypeScript** para tipado fuerte.
- **Tailwind CSS v4** con soporte dark mode.
- **Framer Motion** para animaciones suaves.
- **Radix UI** para componentes accesibles.

## Compatibilidad
- Funciona en **Next.js 15+** (App Router) y **Laravel** (Inertia + React o Livewire).
- Exportable como **paquete npm** o copiar directamente el árbol `components/`.

## Cómo usar
1. Instala dependencias (`npm install`).
2. Importa los componentes deseados.
3. Personaliza mediante **props** y **slots**.
4. Añade tu propio tema usando la configuración de Tailwind.

## Licencia
MIT – libre uso y modificación dentro de los proyectos SrBu.
