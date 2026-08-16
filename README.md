# Faulty Todo List

A deliberately broken React + TypeScript todo app built with Vite, Tailwind CSS, and shadcn-style components.  
The app contains **5 intentional bugs** meant as a debugging exercise.

---

## Requirements

| Tool | Version |
|------|---------|
| Node.js | **v19.x** (use `nvm use 19`) |
| npm | >= 9 |

---

## Getting Started

```bash
nvm use 19
npm install
npm run dev
```

Open http://localhost:5173

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** (bundler)
- **Tailwind CSS 3** (utility styles)
- **Radix UI** (`@radix-ui/react-checkbox`) – accessible checkbox primitive
- **shadcn/ui**-style components (Button, Checkbox, Input hand-crafted in `src/components/ui/`)
- **lucide-react** (icons)
- **clsx** + **tailwind-merge** (class utilities)

---

## Gradient Border Theme

Buttons and Checkboxes use a gradient border driven by a **CSS custom property** defined in `src/index.css`:

```css
:root {
  --border-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
}
```

The technique used is:
```css
border: 2px solid transparent;
background: linear-gradient(white, white) padding-box,
            var(--border-gradient) border-box;
```

---

## The 5 Bugs

### Bug #1 — Wrong filter condition in `handleDelete` (`src/App.tsx`)

**File:** `src/App.tsx` — `handleDelete` function  
**Symptom:** Clicking the delete button removes *all other* todos and keeps only the one you tried to delete.  
**Cause:** The filter uses `===` instead of `!==`.

```ts
// ❌ Faulty
setTodos(todos.filter((t) => t.id === id));

// ✅ Fix
setTodos(todos.filter((t) => t.id !== id));
```

---

### Bug #2 — Toggle does nothing (`src/App.tsx`)

**File:** `src/App.tsx` — `handleToggle` function  
**Symptom:** Clicking a checkbox has no visible effect.  
**Cause:** The completed state is set to its current value instead of being negated.

```ts
// ❌ Faulty
{ ...todo, completed: todo.completed }

// ✅ Fix
{ ...todo, completed: !todo.completed }
```

---

### Bug #3 — Input not cleared after adding a todo (`src/App.tsx`)

**File:** `src/App.tsx` — `handleAdd` function  
**Symptom:** After adding a new todo the text remains in the input field.  
**Cause:** The `setInput("")` reset call is missing.

```ts
// ❌ Faulty — nothing after setTodos(...)
setTodos([...todos, newTodo]);

// ✅ Fix
setTodos([...todos, newTodo]);
setInput("");
```

---

### Bug #4 — Completed count always equals total count (`src/App.tsx`)

**File:** `src/App.tsx` — `completedCount` variable  
**Symptom:** The "X / Y completed" counter always shows the total number of todos as completed.  
**Cause:** `todos.length` is used instead of filtering for completed items.

```ts
// ❌ Faulty
const completedCount = todos.length;

// ✅ Fix
const completedCount = todos.filter((t) => t.completed).length;
```

---

### Bug #5 — Gradient border invisible on Button, Checkbox, and Input

**Files:** `src/components/ui/button.tsx`, `src/components/ui/checkbox.tsx`, `src/components/ui/input.tsx`  
**Symptom:** Buttons, Checkboxes, and the Input field show no gradient border — they appear borderless/plain.  
**Cause:** The components reference `var(--gradient-border)` but the CSS theme defines it as `--border-gradient`.

```ts
// ❌ Faulty (in button.tsx, checkbox.tsx, input.tsx)
background: "... var(--gradient-border) border-box"

// ✅ Fix — match the name defined in src/index.css
background: "... var(--border-gradient) border-box"
```

---

## Project Structure

```
src/
├── App.tsx                  # Main app — contains bugs #1 #2 #3 #4
├── App.css                  # Empty (styles handled by Tailwind)
├── index.css                # Tailwind directives + CSS theme variables (bug #5 variable defined here)
├── main.tsx                 # Entry point
├── types/
│   └── todo.ts              # Todo interface
├── lib/
│   └── utils.ts             # cn() utility (clsx + tailwind-merge)
└── components/
    └── ui/
        ├── button.tsx       # Button — contains bug #5
        ├── checkbox.tsx     # Checkbox — contains bug #5
        └── input.tsx        # Input (no bugs)
```
