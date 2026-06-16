---
name: fix-api-patterns
description: 'Standardize API calls: extract hardcoded backend URL into config, add error handling, loading states, and fix broken Promise patterns. Use when: fixing API files, creating new API endpoints, debugging fetch failures, or refactoring api modules.'
---

# Fix API Patterns

## When to Use

- Creating or updating API calls
- User asks to add error handling or loading states to API calls
- User asks to make backend URL configurable

## Procedure

### 1. Use the unified API client

All API calls should go through the pattern in `src/lib/api.ts` — calls go to `/api/<endpoint>` (same origin, no hardcoded localhost):

```typescript
// ✅ Correct — use shared apiCall helper
async function apiCall<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`/api/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).message || `请求失败 (${res.status})`);
  }
  const json = await res.json();
  return json.data as T;
}
```

### 2. Add proper error handling and loading states

Pages using API calls should implement loading/error state:

```tsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

try {
  setLoading(true);
  setError("");
  const result = await someApiCall(...);
  // handle success
} catch (err: any) {
  setError(err.message || "操作失败");
} finally {
  setLoading(false);
}
```

### 3. Fix broken Promise patterns

Replace `new Promise(() => { ... })` wrappers that never resolve (common in old code) with direct `async/await`.

## Reference

See `src/lib/api.ts` for the canonical API client patterns used in this project.

