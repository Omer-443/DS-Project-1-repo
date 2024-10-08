// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form validation for contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();
        let valid = true;

        // Basic validation
        if (name === '') {
            valid = false;
            alert('Please enter your name.');
        } else if (email === '') {
            valid = false;
            alert('Please enter your email.');
        } else if (message === '') {
            valid = false;
            alert('Please enter your message.');
        } else {
            // Optional: Basic email format validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                valid = false;
                alert('Please enter a valid email address.');
            }
        }

        if (!valid) {
            e.preventDefault(); // Prevent form submission if not valid
        } else {
            alert('Message sent successfully!'); // Simulate successful submission
        }
    });
}

// Modal for portfolio item images
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-img');
        showImageModal(imgSrc);
    });
});

// Function to show image modal
function showImageModal(imgSrc) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img src="${imgSrc}" alt="Portfolio Image" class="modal-image">
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal when the close button is clicked
    modal.querySelector('.close-button').addEventListener('click', () => {
        modal.remove();
    });

    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 && rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to reveal service cards with staggered animation
function revealServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        if (isInViewport(card)) {
            setTimeout(() => {
                card.classList.add('visible'); // Add visible class to make it appear
            }, index * 350); // Adjust delay as needed (e.g., 150ms)
        } else {
            card.classList.remove('visible'); // Remove visible class if out of view
        }
    });
}

// Function to reveal portfolio items with staggered animation
function revealPortfolioItems() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        if (isInViewport(item)) {
            setTimeout(() => {
                item.classList.add('visible'); // Add visible class to make it appear
            }, index * 350); // Adjust delay as needed (e.g., 150ms)
        } else {
            item.classList.remove('visible'); // Remove visible class if out of view
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', () => {
    revealServiceCards();
    revealPortfolioItems();
});

// Call the functions once on load to check if any cards are already in view
revealServiceCards();
revealPortfolioItems();

// Scroll to top on reload
window.scrollTo(0, 0);
