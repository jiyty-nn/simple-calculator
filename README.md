# Simple Calculator

A clean, responsive calculator web app built with vanilla HTML, CSS, and JavaScript.

## Features

- Basic arithmetic: addition, subtraction, multiplication, division
- Decimal number support
- Live expression display — see the full equation as you build it
- Clear (`C`) — resets everything
- Delete (`DEL`) — removes the last entered character
- Division by zero protection — shows `Error` and recovers gracefully
- No `NaN` or `undefined` ever shown
- Responsive layout — works on mobile and desktop

## Tech Stack

- HTML
- CSS
- JavaScript

No frameworks, no libraries, no build tools.

## File Structure

```
calculator/
├── index.html   — markup and button layout
├── style.css    — dark theme, grid layout, hover effects
├── script.js    — calculator logic and state
├── README.md
└── context/
    └── features-specs/   — feature specification files
```

## Usage

Open `index.html` in any browser. No installation or server required.

## How It Works

The display has two lines:

- **Top (dim)** — shows the expression being built, e.g. `5 × 3 =`
- **Bottom (large)** — shows the current value or result

### Example flows

| Input | Expression | Result |
|-------|-----------|--------|
| `5` `+` `3` `=` | `5 + 3 =` | `8` |
| `1.5` `+` `2.5` `=` | `1.5 + 2.5 =` | `4` |
| `5` `/` `0` `=` | — | `Error` |
| `C` | — | `0` |
