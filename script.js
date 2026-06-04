document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const icon = mobileToggle.querySelector('i');
    
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle icon between bars and times (close)
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            icon.style.color = 'var(--primary-color)';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            // Revert icon color based on scroll position
            icon.style.color = window.scrollY > 50 ? 'var(--primary-color)' : 'var(--white)';
        }
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            icon.style.color = window.scrollY > 50 ? 'var(--primary-color)' : 'var(--white)';
        });
    });

    // 3. Stats Counter Animation
    const statsContainer = document.getElementById('stats-container');
    const statNumbers = document.querySelectorAll('.stat-number');
    let started = false;

    function startCounters() {
        statNumbers.forEach(number => {
            const target = parseFloat(number.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS approx
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    // Check if it's a decimal number (like 4.8)
                    if (target % 1 !== 0) {
                        number.innerText = current.toFixed(1);
                    } else {
                        number.innerText = Math.ceil(current);
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    number.innerText = target;
                }
            };
            
            updateCounter();
        });
    }

    // Use Intersection Observer to trigger counter animation when scrolled into view
    if (statsContainer) {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !started) {
                startCounters();
                started = true; // Prevent running again
            }
        }, { threshold: 0.5 });

        observer.observe(statsContainer);
    }

    // 4. Form Submission WhatsApp & Email
    const btnWhatsapp = document.getElementById('btn-whatsapp');
    const btnEmail = document.getElementById('btn-email');
    const formMessage = document.getElementById('form-message');

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const course = document.getElementById('course').value;

        if (!name || !phone || !course) {
            if (formMessage) {
                formMessage.textContent = "Please fill all required details (Name, Mobile, Course).";
                formMessage.className = "form-message error";
            }
            return false;
        }
        if (formMessage) formMessage.style.display = "none";
        return true;
    }

    function getFormDetails() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim() || 'N/A';
        const course = document.getElementById('course').value;
        const date = document.getElementById('demo-date').value || 'N/A';
        const msg = document.getElementById('message').value.trim() || 'N/A';

        return `Hello THE ENGLISH TOWN, I want to book a free demo class.

Student Name: ${name}
Course: ${course}
Mobile Number: ${phone}
Email: ${email}
Preferred Demo Date: ${date}
Message: ${msg}`;
    }

    if (btnWhatsapp && btnEmail) {
        btnWhatsapp.addEventListener('click', () => {
            if (validateForm()) {
                const details = getFormDetails();
                const whatsappUrl = `https://wa.me/918369760438?text=${encodeURIComponent(details)}`;
                window.open(whatsappUrl, '_blank');
            }
        });

        btnEmail.addEventListener('click', () => {
            if (validateForm()) {
                const details = getFormDetails();
                const emailUrl = `mailto:tezansantosh@gmail.com?subject=${encodeURIComponent('Free Demo Class Booking - THE ENGLISH TOWN')}&body=${encodeURIComponent(details)}`;
                window.location.href = emailUrl;
            }
        });
    }

    // 5. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    // 5. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
