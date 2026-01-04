// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.portfolio-item, .skill-category, .stat-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For now, we'll just show an alert
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
});

// Add Project Button Handler
const addProjectBtn = document.getElementById('addProjectBtn');
const portfolioGrid = document.getElementById('portfolioGrid');

addProjectBtn.addEventListener('click', () => {
    const projectTitle = prompt('Enter project title:');
    if (!projectTitle) return;
    
    const projectDescription = prompt('Enter project description:');
    if (!projectDescription) return;
    
    const projectTags = prompt('Enter technologies (comma-separated):');
    
    // Create new portfolio item
    const newProject = document.createElement('div');
    newProject.className = 'portfolio-item';
    newProject.style.opacity = '0';
    newProject.style.transform = 'translateY(20px)';
    
    const tagsArray = projectTags ? projectTags.split(',').map(tag => tag.trim()) : [];
    const tagsHTML = tagsArray.map(tag => `<span>${tag}</span>`).join('');
    
    newProject.innerHTML = `
        <div class="portfolio-image">
            <div class="portfolio-placeholder">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
            </div>
        </div>
        <div class="portfolio-content">
            <h3>${projectTitle}</h3>
            <p>${projectDescription}</p>
            ${tagsHTML ? `<div class="portfolio-tags">${tagsHTML}</div>` : ''}
            <div class="portfolio-links">
                <a href="#" class="link-btn">View Project</a>
                <a href="#" class="link-btn">GitHub</a>
            </div>
        </div>
    `;
    
    // Insert before the add button
    portfolioGrid.appendChild(newProject);
    
    // Animate in
    setTimeout(() => {
        newProject.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        newProject.style.opacity = '1';
        newProject.style.transform = 'translateY(0)';
    }, 10);
    
    // Scroll to new project
    setTimeout(() => {
        newProject.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const orbs = hero.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            orb.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.5}px)`;
        });
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

