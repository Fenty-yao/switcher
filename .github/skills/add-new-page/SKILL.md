---
name: add-new-page
description: 'Scaffold a new Next.js page (page.tsx + SASS + API route + types) following project conventions. Use when: adding a new page, creating a new route, or building a feature from scratch.'
---

# Add New Page

## When to Use

- User asks to add a new page or screen to the app
- Creating a new feature (e.g., settings, order-history, chat)
- Adding a new API endpoint alongside a page

## Procedure

### 1. Create the page directory

```
app/<feature-name>/
├── page.tsx           # Page component
└── <feature-name>.sass # Styles (indented SASS)
```

### 2. Scaffold the page component

```tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "antd-mobile";
import Shell from "@/components/Shell";
import "./<feature-name>.sass";

export default function FeatureNamePage() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API call via src/lib/api.ts or direct fetch to /api/<endpoint>
  };

  return (
    <Shell title="页面标题">
      <form onSubmit={handleSubmit}>
        <Input placeholder="提示文字" value={value} onChange={setValue} />
        <Button type="submit" block color="primary" size="large">
          提交
        </Button>
      </form>
    </Shell>
  );
}
```

### 3. Add API route (if needed)

```
app/api/<endpoint>/route.ts
```

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ code: 200, data: {} });
}
```

### 4. Add to API client (if needed)

Update `src/lib/api.ts` with the new endpoint function following existing patterns.

### 5. Create the SASS file

Use **indented syntax** (no braces, no semicolons):

```sass
.feature-container
  padding: 16px

  .feature-title
    font-size: 1.5rem
    margin-bottom: 1rem
```

## Conventions

- **"use client"**: Required for any page using hooks, state, or antd-mobile components
- **UI text**: All labels, buttons, placeholders in Chinese
- **Layout**: Wrap pages in `<Shell title="...">` for consistent header + TabBar
- **API calls**: Use functions from `src/lib/api.ts` or add new ones there
- **Navigation**: `useRouter` from `next/navigation`, `Link` from `next/link`

