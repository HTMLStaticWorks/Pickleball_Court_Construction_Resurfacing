/**
 * PicklePro - Premium JS Logic
 * Handles: Theme Toggle, RTL Toggle, Scroll Effects, Mobile Menu
 */

document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    
    // --- Theme Management ---
    const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle-mobile');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    html.setAttribute('data-bs-theme', currentTheme);
    updateThemeUI(currentTheme);

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = html.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
            html.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);
        });
    });

    function updateThemeUI(theme) {
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
            }
        });
    }

    // --- RTL Management ---
    const rtlToggles = document.querySelectorAll('#rtl-toggle, .rtl-toggle-mobile');
    const currentDir = localStorage.getItem('dir') || 'ltr';
    
    html.setAttribute('dir', currentDir);

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const newDir = html.getAttribute('dir') === 'ltr' ? 'rtl' : 'ltr';
            html.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    });

    // --- Navbar Scroll Effect ---
    const header = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg');
            header.style.height = '70px';
        } else {
            header.classList.remove('shadow-lg');
            header.style.height = 'var(--header-height)';
        }
    });

    // --- Back to Top ---
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.style.display = 'flex';
                backToTop.style.opacity = '1';
            } else {
                backToTop.style.opacity = '0';
                setTimeout(() => {
                    if (backToTop.style.opacity === '0') backToTop.style.display = 'none';
                }, 300);
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Mobile Menu Behavior ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const offcanvasEl = document.getElementById('offcanvasNavbar');
    if (offcanvasEl) {
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                bsOffcanvas.hide();
            });
        });
    }

    // --- Password Toggle ---
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (input) {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.className = type === 'password' ? 'bi bi-eye-slash' : 'bi bi-eye';
                }
            }
        });
    });
});
