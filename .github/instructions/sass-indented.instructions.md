---
description: "SASS indented syntax rules for .sass files. Use when: writing or editing SASS styles, creating .sass files, fixing SASS compilation errors."
applyTo: "**/*.sass"
---

# SASS Indented Syntax

This project uses **indented `.sass` syntax**, NOT `.scss`. The key difference: **no braces `{}` and no semicolons `;`**. Indentation alone defines nesting and blocks.

## Rules

| Rule | `.scss` | `.sass` (this project) |
|------|---------|------------------------|
| Block delimiter | `{ }` braces | Indentation |
| Statement end | `;` semicolons | Newline |
| Mixins | `@mixin` / `@include` | `=` / `+` |
| Property prefix | `:` with value after | `:` with space, value after |

## Correct SASS Syntax

```sass
// ✅ Correct — indented, no braces, no semicolons
.product-list
  width: 100%
  display: flex

  .product-item
    border: solid 1px var(--adm-color-border)
    margin: 5px

    .name
      font-size: 1.5rem
      color: black
```

## Common Mistakes

```sass
// ❌ Wrong — braces from .scss
.product-list {
  width: 100%;
  display: flex;
}

// ❌ Wrong — semicolons
.product-list
  width: 100%;
  display: flex;
```

## Reference

See `src/modules/product-list/product-list.sass` and `src/styles/form.sass` for real examples in this codebase. Ant Design Mobile CSS variables like `var(--adm-color-border)` are available for theming.
