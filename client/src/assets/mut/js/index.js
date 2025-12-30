document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll) library
    AOS.init({
        duration: 1000, // animation duration
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
    });

    // Add 'scrolled' class to navbar on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adjust scroll threshold as needed
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links and buttons
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
            // If it's an external page link (e.g., about.html), let default behavior happen
        });
    });

    // Handle Prayer Request Form Submission
    const prayerForm = document.getElementById('prayerForm');
    if (prayerForm) {
        prayerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const prayerRequestInput = document.getElementById('prayerRequest');
            const modalMessage = document.getElementById('modalMessage');
            const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

            // Basic client-side validation
            if (prayerRequestInput.value.trim() === '') {
                prayerRequestInput.classList.add('is-invalid');
                return; // Stop if validation fails
            } else {
                prayerRequestInput.classList.remove('is-invalid');
            }

            // Simulate form submission (e.g., to a server or a Google Sheet)
            console.log('Prayer Request Submitted:', {
                name: document.getElementById('prayerName').value,
                request: prayerRequestInput.value
            });

            // Update modal message and show it
            modalMessage.innerHTML = '<p>Thank you for your prayer request! Our Prayer Ministry will intercede for you.</p>';
            confirmationModal.show();

            // Clear the form
            prayerForm.reset();
        });
    }

    // Handle Newsletter Signup Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const newsletterEmailInput = document.getElementById('newsletterEmail');
            const modalMessage = document.getElementById('modalMessage');
            const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

            // Basic client-side validation for email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(newsletterEmailInput.value.trim())) {
                newsletterEmailInput.classList.add('is-invalid');
                return; // Stop if validation fails
            } else {
                newsletterEmailInput.classList.remove('is-invalid');
            }

            // Simulate form submission
            console.log('Newsletter Signup Email:', newsletterEmailInput.value);

            // Update modal message and show it
            modalMessage.innerHTML = '<p>Thank you for subscribing to our newsletter! You\'ll receive our latest updates directly in your inbox.</p>';
            confirmationModal.show();

            // Clear the form
            newsletterForm.reset();
        });
    }

    // Fallback for Bootstrap (removed as Bootstrap is loaded via CDN in HTML)
    // if (typeof bootstrap === 'undefined') {
    //     console.warn('Bootstrap not loaded, attempting local fallback.');
    //     document.write('<script src="/js/bootstrap.bundle.min.js"><\/script>');
    // }

    // Fallback for AOS (removed as AOS is loaded via CDN in HTML)
    // if (typeof AOS === 'undefined') {
    //     console.warn('AOS not loaded, attempting local fallback.');
    //     document.write('<script src="/js/aos.js"><\/script>');
    // }
});
