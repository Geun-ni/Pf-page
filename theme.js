const themeSwitch = document.querySelector('.theme');
const themeLabel = document.querySelector('.theme-label');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
const preferenceKey = 'geun-ni-pf-page-theme';
let preference;

try {
  preference = localStorage.getItem(preferenceKey);
} catch {
  // The switch still works when the browser blocks storage.
}

function applyTheme() {
  const dark = (preference ?? (systemTheme.matches ? 'dark' : 'light')) === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  themeSwitch.setAttribute('aria-checked', String(dark));
  themeLabel.textContent = dark ? '다크 모드' : '라이트 모드';
}

themeSwitch.addEventListener('click', () => {
  preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
  try {
    localStorage.setItem(preferenceKey, preference);
  } catch {
    // Keep the selected theme for this visit.
  }
});

systemTheme.addEventListener('change', applyTheme);
applyTheme();
themeSwitch.hidden = false;
