# 💻 Guruverse Coding Standards

> **Version:** 1.0.0
>
> **Project:** Guruverse
>
> **Document Type:** Engineering Coding Standards
>
> **Status:** Active
>
> **Audience:** Developers, AI Coding Assistants, Contributors

---

# 1. Purpose

This document defines the official coding standards for Guruverse.

Its purpose is to ensure that every contribution follows consistent engineering practices regardless of whether the code is written by a human developer or an AI coding assistant.

These standards exist to improve:

- Maintainability
- Readability
- Scalability
- Consistency
- Developer Experience
- Long-term project quality

Whenever implementation decisions are uncertain, these standards should be followed before introducing new patterns.

---

# Relationship with Other Documents

This document complements the following project documentation.

| Document | Purpose |
|----------|---------|
| README.md | Project overview |
| ARCHITECTURE.md | Software architecture |
| AGENTS.md | AI development rules |
| CLAUDE.md | Claude workflow |
| PROJECT_STRUCTURE.md | Repository organization |
| DESIGN_SYSTEM.md | UI and visual standards |

---

# Scope

These standards apply to:

- Astro Components
- TypeScript
- CSS
- Feature Development
- Repository Organization
- Documentation
- Git Workflow

They should be followed throughout the project.

---

# 2. Core Engineering Principles

The coding standards of Guruverse are built upon a small set of engineering principles.

Every implementation should support these principles.

---

## 2.1 Readability First

Code is read significantly more often than it is written.

Readable code should always take priority over clever implementations.

Future maintainers should understand the code without requiring extensive explanation.

---

## 2.2 Maintainability

Code should be easy to modify without introducing unnecessary side effects.

Implementation should remain understandable as the project grows.

---

## 2.3 Consistency

Consistency is preferred over individual coding style.

Developers should follow existing project conventions rather than introducing new patterns.

---

## 2.4 Simplicity

Choose the simplest implementation that satisfies project requirements.

Avoid unnecessary complexity.

---

## 2.5 Incremental Improvement

Improve existing code gradually.

Large rewrites should only occur when they provide clear long-term engineering benefits.

---

## 2.6 Documentation

Code and documentation should evolve together.

Whenever architecture or engineering workflow changes, update the corresponding documentation.

---

## 2.7 Feature Ownership

Every feature owns:

- Components
- Styles
- Data
- Assets (when required)

Ownership should remain explicit throughout the repository.

---

## 2.8 Composition Over Complexity

Prefer composing small components instead of creating large monolithic implementations.

Single-purpose components are easier to understand and maintain.

---

# End of Part 1

The next section defines naming conventions, folder standards, and Astro development guidelines.

---

# 3. Naming Conventions

Consistent naming improves readability and reduces cognitive load.

Every identifier should communicate its purpose.

---

## Components

Use PascalCase.

Examples:

```
HeroSection

HeroContent

ResearchCard

ExperienceCard

TimelineItem
```

Avoid:

```
Component

Card1

Test

Section
```

Names should describe responsibility.

---

## Files

Use descriptive names.

Examples:

```
hero.css

experience.ts

ResearchCard.astro

timeline.ts
```

Avoid abbreviations unless widely understood.

---

## Variables

Use camelCase.

Examples:

```
project

researchItem

experienceList

navigationLinks
```

Variable names should clearly communicate meaning.

---

## Interfaces

Use PascalCase.

Examples:

```
Project

Research

Experience

TimelineEvent
```

Avoid prefixes such as:

```
IProject

IResearch
```

---

## Constants

Use descriptive camelCase or UPPER_SNAKE_CASE where appropriate.

Examples:

```
defaultTheme

navigationItems

MAX_PROJECTS
```

---

# 4. Folder Standards

Repository organization should reflect architectural intent.

Folders should remain predictable.

---

## Features

Every feature owns:

- Components
- Styles
- Data
- Assets (optional)

Example:

```
projects/

components/

styles/

data/
```

---

## Components

Components belong to the feature that owns them.

Avoid creating unrelated global component directories.

---

## Styles

Feature-specific CSS belongs inside the owning feature.

Global styling belongs only in:

```
src/styles/
```

---

## Data

Data should remain close to the feature that owns it.

Avoid centralized application data unless multiple features genuinely share it.

---

## Shared

Shared functionality should only be introduced after repeated implementation demonstrates clear reuse.

Version 1 intentionally keeps this directory small.

---

# 5. Astro Standards

Guruverse follows Astro best practices.

---

## Keep Pages Thin

Pages are responsible for routing only.

Avoid placing feature implementation directly inside pages.

Example:

```
pages/index.astro

↓

Home

↓

Features
```

---

## Use Layouts

Layouts define global application structure.

Avoid duplicating layout logic across pages.

---

## Component Composition

Large sections should be assembled using smaller components.

Example:

```
HeroSection

↓

HeroContent

HeroCTA

HeroStats
```

---

## Static First

Prefer Astro's static rendering capabilities.

Introduce client-side hydration only when interactivity requires it.

---

## Avoid Business Logic

Business logic should remain inside features rather than pages or layouts.

---

# End of Part 2

The next section defines component, TypeScript, CSS, and data standards.

---

# 6. Component Standards

Components are the primary building blocks of Guruverse.

---

## Single Responsibility

Each component should solve one problem.

Good:

```
ResearchCard
```

Displays one research item.

Poor:

```
ResearchSection
```

Loads data, filters content, renders layout, controls animations, and manages state.

---

## Component Size

Components should remain focused.

If a component grows beyond approximately 200–300 lines while handling multiple responsibilities, consider splitting it into smaller components.

---

## Component Communication

Data flows from parent to child through props.

Avoid hidden dependencies between components.

---

## Reuse

Reuse existing components whenever possible.

Do not duplicate functionality.

---

# 7. TypeScript Standards

Guruverse uses TypeScript to improve maintainability and reliability.

---

## Prefer Interfaces

Use interfaces for structured data.

Example:

```ts
interface Project {
  title: string;
  description: string;
  technologies: string[];
}
```

---

## Avoid `any`

Prefer explicit typing.

If flexibility is required, document the reason rather than defaulting to `any`.

---

## Strong Typing

Type all component props, function parameters, and return values whenever practical.

Strong typing improves editor support and reduces runtime errors.

---

# 8. CSS Standards

Guruverse follows a feature-owned CSS architecture.

---

## Feature Ownership

Each feature maintains its own stylesheet.

Example:

```
hero/

styles/

hero.css
```

---

## Design Tokens

Always use design tokens.

Examples:

```
var(--color-primary)

var(--space-6)

var(--radius-xl)

var(--shadow-md)
```

Avoid hardcoded visual values.

---

## Naming

Use structured class names.

Example:

```
.hero

.hero__content

.hero__buttons
```

Keep selectors predictable and descriptive.

---

## Responsive Design

Each feature is responsible for its own responsive behavior.

Avoid centralized responsive logic.

---

# 9. Data Standards

Data belongs to the feature that owns it.

---

## Feature-Owned Data

Examples:

```
projects/data/projects.ts

research/data/research.ts

experience/data/experience.ts
```

---

## Data Flow

Data should follow this path:

```
Data

↓

Feature

↓

Component

↓

User Interface
```

Avoid components accessing unrelated feature data directly.

---

## Configuration

Application configuration should remain separate from feature data.

Examples:

```
config/

site.ts

navigation.ts

seo.ts
```

---

# End of Part 3

The next sections define:

- Import Standards
- Git Standards
- Documentation Standards
- Performance Standards
- Accessibility Standards
- Code Review Checklist
- Practical Examples
- Future Evolution

---

# 10. Import Standards

## Purpose

Imports should be organized consistently throughout the repository.

Consistent imports improve readability and simplify maintenance.

---

## Import Order

Imports should follow this order:

1. External libraries
2. Internal project modules
3. Relative imports
4. Stylesheets

Example:

```ts
import { defineCollection } from "astro:content";

import type { Project } from "../types/project";

import ProjectCard from "./components/ProjectCard.astro";

import "./styles/projects.css";
```

---

## Relative Imports

Prefer relative imports within a feature.

Correct:

```
components/

↓

../data/projects
```

Avoid unnecessary cross-feature imports.

---

## Type Imports

Use `import type` whenever importing interfaces or types.

Example:

```ts
import type { Experience } from "../data/experience";
```

This improves readability and allows TypeScript to optimize imports.

---

## Barrel Files

Avoid creating barrel (`index.ts`) files unless they clearly improve developer experience.

Version 1 intentionally favors explicit imports.

---

# 11. Git Standards

## Commit Messages

Guruverse follows the Conventional Commits specification.

Examples:

```
feat: add experience timeline

fix: correct responsive navbar

docs: update architecture specification

style: improve hero spacing

refactor: simplify research cards

perf: optimize image loading

chore: update dependencies
```

Commit messages should:

- Be concise
- Describe one logical change
- Use the imperative mood

---

## Branch Strategy

Version 1 uses a simple workflow:

```
main

↓

feature branch (optional)

↓

main
```

Future versions may introduce:

- develop
- release/*
- hotfix/*

---

## Atomic Commits

Each commit should represent one logical unit of work.

Avoid combining unrelated changes.

Good:

```
docs: add coding standards
```

Poor:

```
fix everything
```

---

# 12. Documentation Standards

## Documentation as Code

Documentation is considered part of the implementation.

Major engineering changes should update the corresponding documentation.

---

## When to Update Documentation

Update documentation when changing:

- Architecture
- Repository organization
- Folder ownership
- Development workflow
- Engineering standards
- Design system

---

## Markdown Style

Documentation should use:

- Clear headings
- Short paragraphs
- Code blocks where appropriate
- Tables for structured information
- Consistent terminology

---

## Commenting

Code should be self-explanatory whenever possible.

Comments should explain:

**Why**

rather than

**What**

Good:

```ts
// Static rendering improves SEO and loading performance.
```

Poor:

```ts
// Render component.
```

---

# End of Part 4

The next section defines:

- Performance Standards
- Accessibility Standards
- Code Review Checklist
- Engineering Examples
- Future Evolution

---

# 13. Performance Standards

Performance is considered an architectural requirement rather than a later optimization.

---

## Rendering

Prefer Astro's static rendering whenever possible.

Avoid unnecessary client-side JavaScript.

---

## Images

Images should:

- Use modern formats where appropriate
- Include descriptive alt text
- Be optimized before deployment

---

## Components

Avoid unnecessary nesting and duplicated rendering logic.

Small components improve maintainability and rendering efficiency.

---

# 14. Accessibility Standards

Accessibility is a core engineering responsibility.

Every feature should be usable by all users.

---

## Semantic HTML

Use appropriate HTML elements.

Examples:

- header
- nav
- main
- section
- article
- footer

Avoid unnecessary generic containers.

---

## Keyboard Navigation

Interactive elements must be accessible using only the keyboard.

---

## Forms

Every form control should have an associated label.

Provide clear validation messages where applicable.

---

## Images

Every meaningful image should include descriptive alternative text.

Decorative images should use empty alt attributes.

---

## Color Contrast

Ensure sufficient contrast between foreground and background elements.

Avoid conveying information using color alone.

---

# 15. Code Review Checklist

Before merging changes, verify the following.

## Architecture

- Feature ownership preserved
- Layer boundaries respected
- Repository organization maintained

---

## Components

- Single responsibility
- Clear naming
- Appropriate reuse

---

## TypeScript

- Interfaces defined
- Strong typing used
- No unnecessary `any`

---

## CSS

- Design tokens used
- Feature-owned styles maintained
- Responsive behavior verified

---

## Documentation

- Documentation updated
- Architectural decisions recorded

---

## Performance

- Minimal client-side JavaScript
- Optimized rendering
- Efficient component structure

---

## Accessibility

- Semantic HTML
- Keyboard support
- Labels
- Color contrast

---

# 16. Practical Examples

## Good Component

```
ResearchCard

↓

Displays one research item
```

---

## Good Feature

```
research/

components/

styles/

data/
```

---

## Good CSS

```
var(--color-primary)

var(--space-6)

var(--radius-xl)
```

---

## Good Data

```
projects/data/projects.ts
```

---

# 17. Future Evolution

As Guruverse grows, these standards will evolve.

Future versions may introduce:

- Shared Design System
- Services Layer
- Automated Linting
- Automated Formatting
- Testing Standards
- Continuous Integration
- Performance Budgets

Any new standards should extend—not replace—the existing engineering philosophy.

---

# Conclusion

These coding standards define the engineering expectations for Guruverse.

Every contribution should prioritize:

- Readability
- Maintainability
- Scalability
- Consistency
- Performance
- Accessibility

Following these standards ensures Guruverse remains a high-quality engineering project as it evolves.

---

**End of Document**

**Guruverse Coding Standards**

Version: 1.0.0

Status: Active