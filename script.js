document.addEventListener('DOMContentLoaded', function() {
    // Dark/Light Mode Toggle
    const darkModeToggle = document.getElementById('darkmode-toggle');
    const body = document.body;
    
    // Check for saved user preference or use system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    } else {
        body.classList.add('light-mode');
    }
    
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('.glass-section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Animate project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out'
        });
    });
    
    // Animate blog cards
    gsap.utils.toArray('.blog-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Hero text animation
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    gsap.from([heroTitle, heroSubtitle], {
        duration: 1.5,
        opacity: 0,
        y: 50,
        stagger: 0.3,
        ease: 'power3.out'
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            const submitText = submitBtn.querySelector('span');
            
            // Simulate form submission
            submitText.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // In a real implementation, you would use fetch() to send the data to your server
            setTimeout(() => {
                submitText.textContent = 'Message Sent!';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitText.textContent = 'Send Message';
                    submitBtn.disabled = false;
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                    successMessage.style.color = 'var(--accent-color)';
                    successMessage.style.marginTop = '20px';
                    successMessage.style.textAlign = 'center';
                    successMessage.style.fontWeight = '500';
                    
                    contactForm.appendChild(successMessage);
                    
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => successMessage.remove(), 500);
                    }, 3000);
                }, 1000);
            }, 1500);
        });
    }
    
    // Remove or comment out the parallax effect
    /*
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const video = document.getElementById('bgVideo');
        
        if (video) {
            video.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
    */
    
    // Animate nav on scroll
    const nav = document.querySelector('.glass-nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
            nav.style.boxShadow = 'none';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up
            nav.style.transform = 'translateY(0)';
            nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Add liquid effect to glass sections on mouse move
    document.querySelectorAll('.glass-section').forEach(section => {
        section.addEventListener('mousemove', function(e) {
            const x = e.clientX;
            const y = e.clientY;
            const rect = this.getBoundingClientRect();
            const localX = x - rect.left;
            const localY = y - rect.top;
            
            this.style.setProperty('--mouse-x', `${localX}px`);
            this.style.setProperty('--mouse-y', `${localY}px`);
        });
    });
    
    // Add video loading check
    const video = document.getElementById('bgVideo');
    
    if (video) {
        // Handle video loading
        video.addEventListener('loadeddata', function() {
            video.play().catch(function(error) {
                console.log("Video autoplay failed:", error);
                // Add fallback class if autoplay fails
                video.closest('.video-background').classList.add('video-fallback-active');
            });
        });

        // Handle video loading error
        video.addEventListener('error', function(error) {
            console.log("Video loading error:", error);
            video.closest('.video-background').classList.add('video-fallback-active');
        });
    }
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    const heroSection = document.getElementById('hero');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.pageYOffset > heroBottom) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});