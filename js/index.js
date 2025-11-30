// Modern theme toggle with persistence
(function() {
    const body = document.body;
    const toggleBtn = document.getElementById('theme-toggle');
    const menuBtn = document.getElementById('menu-toggle');
    const drawer = document.getElementById('mobile-drawer');

    // Initialize: default to dark unless user preference saved
    const saved = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (saved === 'light' || (!saved && prefersLight)) {
        body.classList.add('theme-light');
        setIcon('light');
    } else {
        body.classList.remove('theme-light');
        setIcon('dark');
    }

    function setIcon(mode) {
        if (!toggleBtn) return;
        toggleBtn.innerHTML = mode === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isLight = body.classList.toggle('theme-light');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            setIcon(isLight ? 'light' : 'dark');
            // Body transitions are handled in CSS; ensure reflow for smoother animation
            void body.offsetWidth;
        });
    }

    // Mobile drawer toggle
    if (menuBtn && drawer) {
        menuBtn.addEventListener('click', () => {
            drawer.classList.toggle('open');
        });
        // Close on link click
        drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));
    }

    // Footer flyout toggle for small screens
    const footerToggle = document.getElementById('footer-toggle');
    const footerFlyout = document.getElementById('footer-flyout');
    if (footerToggle && footerFlyout) {
        footerToggle.addEventListener('click', () => {
            const isHidden = getComputedStyle(footerFlyout).display === 'none';
            footerFlyout.style.display = isHidden ? 'block' : 'none';
        });
    }

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Staggered hero role entrance
    const roles = document.querySelectorAll('.hero-inline .role');
    if (roles.length) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        roles.forEach((el, idx) => {
            if (prefersReducedMotion) {
                // Respect reduced motion: no animation, set final state
                el.style.opacity = '1';
                el.style.transform = 'none';
                el.style.color = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#9aa0aa';
            } else {
                setTimeout(() => { el.classList.add('enter'); }, 150 * idx);
            }
        });
    }
})();