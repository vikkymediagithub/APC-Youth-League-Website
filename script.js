document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Loader functionality
    setTimeout(() => {
        loader.style.opacity = '0';
        mainContent.classList.remove('hidden');

        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);

    // Mobile menu functionality
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;

            mobileMenuBtn.setAttribute('aria-expanded', !expanded);
            navLinks.style.display = expanded ? 'none' : 'flex';

            // Animate menu button
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));

            // Reset dropdowns when closing menu
            if (navLinks.style.display === 'none') {
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            }
        });
    }

    // Dropdown functionality
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768 && navLinks.style.display === 'flex' && !e.target.closest('.nav')) {
            navLinks.style.display = 'none';
            mobileMenuBtn.setAttribute('aria-expanded', false);
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));

        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.visibility = 'hidden';
        observer.observe(element);
    });
});
