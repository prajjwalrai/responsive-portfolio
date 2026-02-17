console.log("Portfolio website loaded successfully!");

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing Effect
const typingTextElement = document.querySelector('.typing-text');
const words = ["Stack MERN Developer", "UI/UX Designer", "Full Stack Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Initialize Typing Effect
document.addEventListener('DOMContentLoaded', typeEffect);

// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animation');
            
            // Animate Progress Bars when they come into view
            if (entry.target.classList.contains('skills-progress')) {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-item, .skill-card, .section-title, .profile-img-container, .skills-progress').forEach(el => {
    el.classList.add('hidden-animation');
    observer.observe(el);
});

// Contact Form Validation & EmailJS
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    // These IDs from your EmailJS dashboard
    const serviceID = 'service_kv4ohnm'; 
    const templateID = 'template_qe9677i';

    // Parameters must match variables in your EmailJS template
    const templateParams = {
        subject: 'New Portfolio Contact', // Matches {{subject}}
        from_name: document.getElementById('name').value, // Matches {{from_name}}
        from_email: document.getElementById('email').value, // Matches {{from_email}}
        message: document.getElementById('message').value // Matches {{message}}
    };

    console.log('Sending EmailJS with params:', templateParams);

    emailjs.send(serviceID, templateID, templateParams)
        .then(() => {
            alert(`Thank you, ${templateParams.name}! Your message has been sent successfully.`);
            contactForm.reset();
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }, (err) => {
            alert('Failed to send message. Please check your internet connection or try again later.');
            console.error('EmailJS Error:', err);
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

