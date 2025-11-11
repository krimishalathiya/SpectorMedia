document.addEventListener('DOMContentLoaded', function() {
            
    // --- Mobile Menu Toggle ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        // Toggle ARIA expanded state
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuButton.setAttribute('aria-expanded', 'false');
        });
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const modal = document.getElementById('form-modal');
    const modalContent = document.getElementById('modal-content-box');
    const closeModalButton = document.getElementById('modal-close-button');

    // Check if all elements exist before adding listeners
    if (contactForm && modal && modalContent && closeModalButton) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission
            
            // Show the modal with animation
            modal.style.display = 'block';
            setTimeout(() => {
                modal.style.opacity = '1';
                modalContent.style.transform = 'scale(1)';
            }, 10); // Short delay to allow display:block to register

            // Clear the form (optional)
            contactForm.reset();
        });

        // --- Modal Close Logic ---
        const closeModal = () => {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.9)';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // Wait for animation to finish
        }

        closeModalButton.addEventListener('click', closeModal);

        // Close modal if user clicks outside the content
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // --- Update Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth scrolling for all anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Don't prevent default for mobile links that also need to close menu
            if (!this.classList.contains('mobile-link')) {
                e.preventDefault();
            }

            const targetId = this.getAttribute('href');
            
            // Check if targetId is just "#" (like the logo)
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return; // Stop here
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get header height
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;

                // Calculate target position
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;


                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll-reveal Animation ---
    // Using IntersectionObserver for better performance
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check for data-delay attribute
                const delay = entry.target.dataset.delay;
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');

                    }, parseInt(delay));
                } else {
                    entry.target.classList.add('visible');
                }
                // Stop observing once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });

});