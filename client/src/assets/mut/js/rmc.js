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
                }
            }
        });
    });

    // Initialize Bootstrap components and form handling
    if (typeof bootstrap !== 'undefined') {
        const joinForm = document.getElementById('rmcJoinForm');
        const modalConfirmationMessage = document.getElementById('modalConfirmationMessage');
        
        if (joinForm) {
            joinForm.addEventListener('submit', function (e) {
                e.preventDefault();
                if (this.checkValidity()) {
                    // Simulate form submission to a server
                    console.log('RMC Join Request Submitted:', {
                        name: document.getElementById('joinName').value,
                        email: document.getElementById('joinEmail').value,
                        message: document.getElementById('joinMessage').value
                    });

                    // Hide the form and show the confirmation message
                    this.style.display = 'none'; // Hide the form
                    if (modalConfirmationMessage) {
                        modalConfirmationMessage.classList.remove('d-none'); // Show confirmation
                    }
                } else {
                    this.classList.add('was-validated');
                }
            });
        }
        
        // Reset form and message when modal is hidden
        const joinMinistryModal = document.getElementById('joinMinistryModal');
        if (joinMinistryModal) {
            joinMinistryModal.addEventListener('hidden.bs.modal', function () {
                if (joinForm) {
                    joinForm.reset(); // Reset form fields
                    joinForm.classList.remove('was-validated'); // Remove validation styles
                    joinForm.style.display = 'block'; // Show the form again
                }
                if (modalConfirmationMessage) {
                    modalConfirmationMessage.classList.add('d-none'); // Hide confirmation
                }
            });
        }
    } else {
        console.warn('Bootstrap library not loaded. Modals and form validation may not function.');
    }
});
