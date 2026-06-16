# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js, http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run test     # Run Jest tests
```

## Architecture

**Next.js App Router** (migrated from CRA). Second-hand product platform (二手交易平台). UI text is in Chinese.

### Page structure
```
app/<feature-name>/
├── page.tsx           # Page component (must be "use client" for hooks/state/antd-mobile)
└── <feature-name>.sass # Styles (indented SASS syntax)
```

Pages are wrapped with `<Shell title="...">` (src/components/Shell.tsx) which provides NavBar + Footer with TabBar.

### API layer
- **Route handlers**: `app/api/<endpoint>/route.ts` — Next.js route handlers returning `NextResponse.json({ code: 200, data: ... })`
- **API client**: `src/lib/api.ts` — unified client with `apiCall<T>(endpoint, body)` helper. All calls go to same-origin `/api/<endpoint>`.

### UI & styling
- **antd-mobile** for all UI components (NavBar, Card, Button, Input, SearchBar, etc.)
- **Indented SASS** (`.sass` files, NOT `.scss`): no braces `{}`, no semicolons `;`, nesting via indentation
- **AMap** (高德地图) loaded via CDN in root layout

### Key conventions
- Route redirects: `redirect()` from `next/navigation`, not react-router
- Pagination: `GET /api/products?page=N&pageSize=M` returns `{ data, hasMore }`
- Scroll-to-top: `IntersectionObserver` sentinel pattern for infinite scroll (see `app/product-list/page.tsx`)
- Types in `src/lib/types.ts` (Product, Comment)

### Legacy CRA code (excluded from tsconfig)
- `src/modules/` — old page components from the Create React App era
- `src/routes.ts` — old react-router config
- Do NOT use these as reference for new code; add new pages under `app/`
