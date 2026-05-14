# # Griff-Tech Login Page

A clean, responsive login page for the Griff-Tech platform

## Features

- **Form validation** — inline error messages on invalid email or short password, clearing as the user fixes their input
- **Show / hide password** — SVG eye icon toggles password visibility
- **Loading state** — the login button shows a spinner and disables itself during submission
- **Shake animation** — the login card shakes on failed validation or a failed API call
- **Light / dark mode** — toggle in the header; defaults to the user's OS preference

---

## File Structure

```
├── index.html   # Markup and page structure
├── index.css    # Styles and theme variables
├── index.js     # All interactivity and logic
├── Griffin logo.png
└── Griffin card.png
```

---

## Getting Started

No build tools or dependencies required. Just open `index.html` in a browser.

```bash
# Or serve locally with any static server, e.g.
npx serve .
```

---

## Connecting a Backend

The login form submission is handled in `index.js`. Look for this comment:

```js
// Simulated API call — replace with your real auth logic
await new Promise(resolve => setTimeout(resolve, 2000));
```

Replace it with your actual `fetch` call, for example:

```js
const res = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: emailInput.value,
    password: passwordInput.value,
  }),
});

if (!res.ok) throw new Error('Login failed');
// redirect or update UI on success
```

---

## Customisation

| What | Where |
|---|---|
| Brand colours | `:root` and `[data-theme="dark"]` in `index.css` |
| Validation rules | `validateEmail()` and password length check in `index.js` |
| Logo / card image | `src` attributes in `index.html` |

---

*Built with plain HTML, CSS, and JavaScript — no frameworks.*
