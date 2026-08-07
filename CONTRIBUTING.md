# Contributing to Guruverse

First off, thank you for your interest in contributing to Guruverse.

Guruverse is an engineering portfolio and long-term software ecosystem focused on Artificial Intelligence, Cybersecurity, Software Engineering, and Research.

Every contribution helps improve the project.

---

# Development Philosophy

Guruverse follows these principles:

- Feature-Based Architecture
- Modular Components
- Maintainable Code
- Documentation-Driven Development
- Scalable Engineering Practices

---

# Repository Structure

```
src/
    features/
    shared/
    layouts/
    pages/
    styles/
```

Each feature owns:

- Components
- Styles
- Data

Please maintain this architecture.

---

# Coding Guidelines

## TypeScript

- Use interfaces where appropriate.
- Keep functions focused on a single responsibility.
- Avoid unnecessary abstractions.

---

## Components

- Keep components small.
- One responsibility per component.
- Use descriptive names.

Example:

HeroContent

ResearchCard

ExperienceCard

---

## CSS

Use design tokens whenever possible.

Example:

```css
var(--color-primary)

var(--space-6)

var(--radius-xl)
```

Avoid hardcoded values.

---

# Pull Requests

Before submitting a pull request:

- Test your changes.
- Keep commits focused.
- Update documentation if required.
- Follow the existing project architecture.

---

# Reporting Issues

Please include:

- Description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

---

# Thank You

Thank you for helping improve Guruverse.