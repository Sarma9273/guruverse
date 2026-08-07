# 📂 Guruverse Project Structure

> **Version:** 1.0.0
>
> **Project:** Guruverse
>
> **Document Type:** Repository Structure Guide
>
> **Status:** Active
>
> **Audience:** Developers, Contributors, AI Coding Assistants

---

# 1. Purpose

This document describes the repository organization of Guruverse.

Its purpose is to explain the responsibility of every major directory and establish clear ownership rules for files and folders.

Rather than simply listing folders, this guide explains **why each directory exists**, **what belongs inside it**, and **what should never be placed there**.

This document should be used together with:

- README.md
- ARCHITECTURE.md
- CODING_STANDARDS.md
- AGENTS.md
- CLAUDE.md

---

# 2. Repository Philosophy

Guruverse follows a **feature-oriented repository structure**.

Instead of organizing code only by technical type (such as components, styles, or data), the repository groups files by business capability.

This provides:

- Clear ownership
- Better maintainability
- Reduced coupling
- Improved scalability
- Easier onboarding

Every folder has a defined responsibility.

Every file has a clear owner.

---

# 3. High-Level Repository Structure

```
guruverse/

├── docs/
├── public/
├── src/
│
├── config/
├── constants/
├── features/
├── layouts/
├── pages/
├── shared/
├── styles/
│
├── README.md
├── ARCHITECTURE.md
├── AGENTS.md
├── CLAUDE.md
├── CODING_STANDARDS.md
├── PROJECT_STRUCTURE.md
├── DESIGN_SYSTEM.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
└── LICENSE
```

---

# 4. Repository Design Principles

The repository follows five guiding principles.

## Explicit Ownership

Every file belongs to one logical owner.

Ownership should never be ambiguous.

---

## Feature Independence

Features should remain isolated.

Each feature owns its implementation.

---

## Predictable Organization

Developers should know where new files belong without needing to ask.

Folder names should communicate responsibility.

---

## Minimal Duplication

Avoid duplicate components, styles, or data.

Reuse should occur only when it improves maintainability.

---

## Incremental Evolution

Repository organization should evolve gradually.

Large-scale restructuring should be avoided unless clearly justified.

---

# End of Part 1

The next sections explain every directory in detail, including ownership rules, responsibilities, examples, and future evolution.

---

# 5. Root Directory

The root directory contains project-level configuration, documentation, and metadata.

It should remain clean and contain only files that affect the repository as a whole.

Examples include:

- README.md
- ARCHITECTURE.md
- AGENTS.md
- CLAUDE.md
- CODING_STANDARDS.md
- PROJECT_STRUCTURE.md
- DESIGN_SYSTEM.md
- LICENSE
- CHANGELOG.md
- package.json
- astro.config.mjs
- tsconfig.json

Feature-specific implementation must never be placed in the root directory.

---

# 6. Source Directory (src)

## Purpose

The `src` directory contains all application source code.

Everything required to build the application belongs inside this directory.

No documentation, screenshots, or generated artifacts should be stored here.

---

## Expected Structure

```
src/

config/
constants/
features/
layouts/
pages/
shared/
styles/
```

Each directory has a specific responsibility.

---

# 7. Features Directory

The `features` directory is the heart of Guruverse.

Each feature represents one independent business capability.

Examples:

- hero
- about
- timeline
- research
- experience
- projects
- contact
- footer

Each feature owns:

- Components
- Styles
- Data
- Assets (if required)

No feature should depend directly on another feature.

---

# 8. Layouts Directory

Layouts define the shared page structure.

Responsibilities:

- Global page layout
- Metadata
- Shared wrappers
- Application shell

Layouts should never contain feature-specific business logic.

---

# 9. Pages Directory

Pages define application routes.

Responsibilities:

- Routing
- Page composition

Pages should remain lightweight.

Business logic belongs inside features.

---

# 10. Shared Directory

The shared directory contains reusable functionality.

Examples:

- UI components
- Utilities
- Types
- Hooks (future)

Version 1 intentionally keeps this directory small.

Only functionality with proven reuse should be promoted here.

---

# 11. Styles Directory

Contains global styling resources.

Examples:

- Reset styles
- Typography
- Design Tokens
- Utility classes (future)

Feature-specific styles belong inside the corresponding feature.

---

# 12. Public Directory

Contains static assets served directly by Astro.

Examples:

- Images
- Icons
- Favicon
- Resume
- Screenshots

No application logic belongs here.

---

# End of Part 2

The next section defines ownership rules and how new features should be added.

---

# 13. Ownership Rules

Every directory has one responsibility.

Every file has one owner.

Examples:

```
Hero

↓

HeroSection

↓

hero.css

↓

hero.ts
```

Ownership should remain explicit.

Avoid shared ownership whenever possible.

---

# 14. Feature Lifecycle

When introducing a new feature, follow this process.

## Step 1

Create a feature directory.

Example:

```
features/blog/
```

---

## Step 2

Create required subdirectories.

```
components/

styles/

data/
```

Create only what is needed.

---

## Step 3

Implement components.

Keep them:

- Small
- Focused
- Reusable within the feature

---

## Step 4

Add styling.

Feature-specific styling remains inside:

```
styles/
```

---

## Step 5

Add structured data.

Place data inside:

```
data/
```

---

## Step 6

Integrate the feature.

The Home feature assembles all application features.

No feature should import another feature directly.

---

# 15. Repository Growth

New capabilities should be introduced as new features.

Avoid modifying unrelated directories.

Example:

```
Current

Hero
About
Projects

↓

Future

Blog
GuruBot
Cyber Lab
Analytics
```

Growth should occur through expansion rather than restructuring.

---

# End of Part 3

The next section explains repository governance and engineering guidelines.

---

# 16. Repository Governance

Repository organization should evolve only when it improves:

- Maintainability
- Scalability
- Readability
- Developer Experience

Avoid restructuring simply to follow trends.

---

# 17. Engineering Best Practices

Follow these practices throughout the repository.

## Keep Features Independent

Features should not import unrelated features.

---

## Keep Components Small

Prefer several focused components over one large component.

---

## Keep CSS Local

Feature styling belongs inside the owning feature.

---

## Prefer Explicitness

Clear folder names and descriptive file names improve maintainability.

---

## Avoid Duplication

Reuse existing implementation before introducing new files.

---

# 18. Common Mistakes

Avoid:

- Creating unnecessary top-level directories.
- Mixing documentation with source code.
- Storing feature data globally.
- Moving feature CSS into global styles.
- Creating shared utilities before reuse exists.

---

# 19. Repository Review Checklist

Before merging changes, verify:

- Folder ownership preserved.
- Feature boundaries maintained.
- Repository remains predictable.
- No unnecessary duplication.
- Documentation updated.

---

# End of Part 4

The final section covers future evolution and repository roadmap.

---

# 20. Future Repository Evolution

The repository is expected to evolve gradually.

Future additions may include:

```
docs/
services/
testing/
adr/
scripts/
```

These should be introduced only when justified by project growth.

---

# Planned Repository Expansion

## Version 1.1

- Engineering documentation
- ADR directory
- GitHub workflows

---

## Version 2

- Shared Design System
- Services Layer
- AI Modules
- Blog
- GuruBot

---

## Version 3

- Research Explorer
- Cybersecurity Lab
- Knowledge Graph
- Learning Platform

---

# 21. Repository Principles Summary

The Guruverse repository is built upon the following principles.

- Feature Ownership
- Single Responsibility
- Predictable Organization
- Documentation First
- Incremental Evolution
- Composition Over Complexity
- Maintainability
- Scalability

Every future change should reinforce these principles.

---

# 22. Conclusion

The repository structure of Guruverse is designed to support long-term engineering growth.

Rather than optimizing only for the current implementation, the repository emphasizes maintainability, clarity, and scalability.

As Guruverse evolves, this document should evolve alongside it, ensuring that future contributors understand not only where files belong, but why the repository is organized the way it is.

---

**End of Document**

**Guruverse Project Structure Guide**

Version: 1.0.0

Status: Active