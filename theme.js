// Theme persistence and toggle handling
(function () {
  // Apply saved theme immediately to prevent Flash of Unstyled Content (FOUC)
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(activeTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function updateIcon(isDark) {
    if (!themeIcon) return;
    if (isDark) {
      themeIcon.className = 'fas fa-sun';
      if (toggleBtn) toggleBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      themeIcon.className = 'fas fa-moon';
      if (toggleBtn) toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  // Set initial icon state based on current class
  const isDark = document.documentElement.classList.contains('dark');
  updateIcon(isDark);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentlyDark = document.documentElement.classList.contains('dark');
      const newTheme = currentlyDark ? 'light' : 'dark';

      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);

      updateIcon(newTheme === 'dark');
    });
  }
});
