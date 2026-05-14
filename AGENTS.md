# Project Guidelines

## Build and Test

- **Dev server**: `npm run dev` (Next.js, defaults to http://localhost:3000)
- **Production build**: `npm run build`
- **Start production**: `npm start`

## Architecture

**Next.js App Router** monolith — frontend pages and backend API routes live in the same project under `app/`:

- `app/layout.tsx` — Root layout with global styles and Amap scripts
- `app/page.tsx` — Redirects `/` → `/login`
- `app/login/`, `app/register/`, `app/reset-password/` — Auth flow pages
- `app/product-list/`, `app/product-detail/` — Product browsing
- `app/community-search/` — Amap (高德地图) location picker
- `app/messages/`, `app/me/` — User messaging and profile
- `app/api/` — API route handlers (login, register, comments, etc.) — no separate backend needed
- `src/components/` — Shared UI: `Shell` (NavBar + scrollable body + TabBar footer), `Footer`
- `src/lib/api.ts` — Unified API client (calls `/api/*` routes)
- `src/lib/types.ts` — Shared TypeScript interfaces

## Conventions

- **UI language**: All user-facing text is Chinese (表单标签、按钮、提示信息)
- **Styling**: SASS with **indented syntax** (`.sass` not `.scss`). Global class names, no CSS modules. Ant Design Mobile CSS variables (`--adm-color-border`) used for theming.
- **Client components**: Pages using hooks (`useState`, `useRouter`, etc.) must have `"use client"` directive at the top.
- **API calls**: Unified client in `src/lib/api.ts` — all calls go to `/api/<endpoint>` (same origin). Responses follow `{ code: number, data?: T }` pattern.
- **Navigation**: Use `next/navigation` (`useRouter`, `redirect`) and `next/link` (`Link`). No React Router.
- **TypeScript**: Strict mode enabled. Shared types in `src/lib/types.ts`.

## Pitfalls

- **SASS indented syntax**: Unlike SCSS, indented `.sass` files use no braces or semicolons — indentation alone defines blocks.
- **Exposed Amap key**: `community-search/page.tsx` and `layout.tsx` contain hardcoded API keys — do not commit changes that expose credentials.
- **Mock product data**: `product-list/page.tsx` uses inline mock data instead of API calls. `product-detail/page.tsx` has hardcoded product text.
- **Client component boundary**: antd-mobile components require `"use client"` — add it to any page or component importing from `antd-mobile`.
- **API routes are in-memory**: User/comments data resets on server restart. Replace with a database for production.
