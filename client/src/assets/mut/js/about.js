document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll) library
    AOS.init({
        duration: 1000, // animation duration
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
    });

    // Add 'scrolled' class to navbar on scroll (consistent with homepage)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adjust scroll threshold as needed
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links (consistent with homepage)
    document.querySelectorAll('a.nav-link[href^="#"], .btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the href is a section ID on the current page
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);
                const navbarHeight = document.querySelector('.navbar').offsetHeight;

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - navbarHeight,
                        behavior: 'smooth'
                    });

                    // Close navbar on mobile after clicking a link
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: false
                        });
                        bsCollapse.hide();
                    }
                }
            }
            // If it's an external page link (e.g., index.html, ministries.html), let default behavior happen
        });
    });

    // No specific forms or complex interactions on this page, but keeping the structure for future additions.
});
