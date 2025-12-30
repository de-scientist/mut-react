document.addEventListener('DOMContentLoaded', function () {
    try {
        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 800, once: true });
        } else {
            console.warn('AOS library not loaded. Animations disabled.');
        }

        // Initialize Bootstrap components
        if (typeof bootstrap !== 'undefined') {
            // Initialize modals
            const joinMinistryModal = new bootstrap.Modal(document.getElementById('joinMinistryModal'));
            
            // Handle form submission
            const joinForm = document.getElementById('creativeMinistryJoinForm');
            if (joinForm) {
                joinForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    if (this.checkValidity()) {
                        // This is where you would handle the form submission, e.g., send data to a server.
                        // For this example, we'll just show a confirmation message.
                        console.log('Form submitted successfully. Simulating server response.');

                        // Hide the form and show the confirmation message
                        this.style.display = 'none';
                        const confirmationMessage = document.getElementById('modalConfirmationMessage');
                        if (confirmationMessage) {
                            confirmationMessage.classList.remove('d-none');
                        }
                    } else {
                        // Form is invalid, show validation feedback
                        this.classList.add('was-validated');
                    }
                });
            }
        } else {
            console.warn('Bootstrap library not loaded. Modals and form validation may not function.');
        }
        
    } catch (error) {
        console.error('Error in DOMContentLoaded handler:', error);
    }
});
