// Mobile menu functionality
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close menu on escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Scroll indicator
window.addEventListener('scroll', () => {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollIndicator.style.width = scrollPercent + '%';
});

// Header condense on scroll (no auto-hide)
(function () {
    const header = document.querySelector('header');
    // Use hysteresis to avoid flicker when hovering around the threshold
    const CONDENSE_AT = 80;  // add condensed at or beyond this
    const EXPAND_AT = 30;    // remove condensed when below this
    let ticking = false;
    let isCondensed = false;

    function update() {
        if (!header) { ticking = false; return; }
        const y = window.scrollY || window.pageYOffset || 0;
        if (!isCondensed && y >= CONDENSE_AT) {
            header.classList.add('condensed');
            isCondensed = true;
        } else if (isCondensed && y <= EXPAND_AT) {
            header.classList.remove('condensed');
            isCondensed = false;
        }
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
})();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animate cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.path-card, .featured-card, .latest-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});