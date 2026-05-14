/* ── DARK / LIGHT MODE ── */
const html       = document.documentElement;
const toggleBtn  = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');

function applyTheme(isDark) {
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  toggleBtn.setAttribute('aria-pressed', isDark);
  themeLabel.textContent = isDark ? 'Dark' : 'Light';
}

// Respect OS preference on first load
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(prefersDark);

toggleBtn.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  applyTheme(!isDark);
});


/* ── SHOW / HIDE PASSWORD ── */
const passwordInput  = document.getElementById('password');
const togglePassword = document.getElementById('toggle-password');

const EYE_OPEN = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const EYE_CLOSED = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

// Set initial icon
togglePassword.innerHTML = EYE_OPEN;

togglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePassword.innerHTML = isPassword ? EYE_CLOSED : EYE_OPEN;
  togglePassword.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
});


/* ── FORM VALIDATION + LOADING + SHAKE ── */
const form          = document.getElementById('login-form');
const emailInput    = document.getElementById('email');
const loginBtn      = document.getElementById('login-btn');
const loginCard     = document.getElementById('login-card');
const emailError    = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

function showError(input, errorEl, message) {
  input.classList.add('input-error');
  errorEl.textContent = message;
  errorEl.classList.add('visible');
}

function clearError(input, errorEl) {
  input.classList.remove('input-error');
  errorEl.classList.remove('visible');
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function triggerShake() {
  loginCard.classList.remove('shake');
  void loginCard.offsetWidth; // force reflow to restart animation
  loginCard.classList.add('shake');
  loginCard.addEventListener('animationend', () => {
    loginCard.classList.remove('shake');
  }, { once: true });
}

// Live validation — clear errors as the user fixes input
emailInput.addEventListener('input', () => {
  if (validateEmail(emailInput.value)) clearError(emailInput, emailError);
});

passwordInput.addEventListener('input', () => {
  if (passwordInput.value.length >= 6) clearError(passwordInput, passwordError);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let valid = true;

  if (!validateEmail(emailInput.value)) {
    showError(emailInput, emailError, 'Please enter a valid email address.');
    valid = false;
  } else {
    clearError(emailInput, emailError);
  }

  if (passwordInput.value.length < 6) {
    showError(passwordInput, passwordError, 'Password must be at least 6 characters.');
    valid = false;
  } else {
    clearError(passwordInput, passwordError);
  }

  if (!valid) {
    triggerShake();
    return;
  }

  // Show loading state
  loginBtn.classList.add('loading');
  loginBtn.disabled = true;
  loginBtn.querySelector('.btn-text').textContent = 'Logging in…';

  // Simulated API call — replace with your real auth logic e.g. fetch('/api/login', {...})
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Success state
    loginBtn.querySelector('.btn-text').textContent = '✓ Success!';
    setTimeout(() => {
      loginBtn.classList.remove('loading');
      loginBtn.disabled = false;
      loginBtn.querySelector('.btn-text').textContent = 'Login';
    }, 1500);

  } catch (err) {
    // Failed API call — shake and reset
    loginBtn.classList.remove('loading');
    loginBtn.disabled = false;
    loginBtn.querySelector('.btn-text').textContent = 'Login';
    triggerShake();
  }
});