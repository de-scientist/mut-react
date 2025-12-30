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

    // Handle Ministry Join Form Submission (Modal)
    const musicMinistryJoinForm = document.getElementById('musicMinistryJoinForm');
    if (musicMinistryJoinForm) {
        musicMinistryJoinForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Validate form fields
            if (!this.checkValidity()) {
                event.stopPropagation(); // Stop propagation if validation fails
                this.classList.add('was-validated'); // Add Bootstrap's validation styles
                return;
            }

            // Get form data
            const formData = {
                name: document.getElementById('joinName').value,
                email: document.getElementById('joinEmail').value,
                interest: document.getElementById('joinInterest').value,
                message: document.getElementById('joinMessage').value
            };

            // Simulate form submission (e.g., to a server or a Google Sheet)
            console.log('Music Ministry Join Request Submitted:', formData);

            // Hide the form and show the confirmation message
            this.classList.add('d-none'); // Hide the form
            document.getElementById('modalConfirmationMessage').classList.remove('d-none'); // Show confirmation

            // Optional: Close modal after a few seconds or allow user to close manually
            // setTimeout(() => {
            //     const modalElement = document.getElementById('joinMinistryModal');
            //     const modal = bootstrap.Modal.getInstance(modalElement);
            //     if (modal) modal.hide();
            // }, 3000); // Close after 3 seconds
        });

        // Reset form and message when modal is hidden
        const joinMinistryModal = document.getElementById('joinMinistryModal');
        joinMinistryModal.addEventListener('hidden.bs.modal', function () {
            musicMinistryJoinForm.reset(); // Reset form fields
            musicMinistryJoinForm.classList.remove('was-validated'); // Remove validation styles
            musicMinistryJoinForm.classList.remove('d-none'); // Show the form again
            document.getElementById('modalConfirmationMessage').classList.add('d-none'); // Hide confirmation
        });
    }
});
