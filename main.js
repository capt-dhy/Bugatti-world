// Main Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Secondary Navbar Visibility
const secondaryNav = document.getElementById('secondary-navbar');
const servicesSection = document.getElementById('services');
const footer = document.querySelector('footer');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Show secondary nav when services section enters, hide when it leaves
        // Or hide when footer enters
        if (entry.target.id === 'services') {
            if (entry.isIntersecting || window.scrollY > entry.target.offsetTop) {
                secondaryNav.classList.add('visible');
            } else {
                secondaryNav.classList.remove('visible');
            }
        }
    });
}, { threshold: 0.1 });

navObserver.observe(servicesSection);

// Intersection Observer for Active Links
const serviceSections = document.querySelectorAll('.service-detail');
const secondaryLinks = document.querySelectorAll('.secondary-navbar a');

const activeObserverOptions = {
    threshold: 0.6
};

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            secondaryLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, activeObserverOptions);

serviceSections.forEach(section => {
    activeObserver.observe(section);
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'white';
        navLinks.style.padding = '2rem';
        navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
        
        navLinks.querySelectorAll('li').forEach(li => {
            li.style.margin = '1rem 0';
            li.querySelector('a').style.color = '#121212';
        });
        
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
});

// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            // Adjust offset for sticky navbars
            const mainNavHeight = 70;
            const secondaryNavHeight = secondaryNav.classList.contains('visible') ? 60 : 0;
            const extraOffset = targetId.startsWith('#services') ? 0 : 60;

            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - mainNavHeight - extraOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});
