// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Form submission handler
function setupFormHandler() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to a server
            // For now, we'll just show an alert
            console.log('Form submitted:', formData);
            
            // Show success message in current language
            const t = translations[currentLang];
            alert(t.contact.successMsg);
            
            // Reset form
            contactForm.reset();
        });
    }
}

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
    const animateElements = document.querySelectorAll('.service-card, .advantage-card, .team-member, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add active class to nav links on page load
window.addEventListener('load', () => {
    highlightActiveSection();
});

// Language Translation System
const translations = {
    es: {
        // Navigation
        nav: {
            inicio: "Inicio",
            desafio: "Desafío",
            solucion: "Solución",
            mercado: "Mercado",
            aliados: "Aliados",
            contacto: "Contacto"
        },
        // Hero
        hero: {
            title: "Transformando Residuos Industriales en Ingredientes de Alto Valor",
            subtitle: "Startup de Biotecnología Circular para la Industria Alimentaria",
            btn1: "Contáctanos",
            btn2: "Conoce Nuestra Solución"
        },
        // About/Desafío
        about: {
            title: "Desafío",
            text1: "México (y el mundo) genera miles de toneladas de residuos industriales ricos en nutrientes como el suero lácteo y el agua de almidón. Gran parte de estos residuos proviene de la industria alimentaria.",
            text2: "Estos subproductos se destinan principalmente a compostaje, tratamiento o disposición, sin aprovechar su valor biotecnológico. Al reutilizarlos, la industria puede reducir costos de tratamiento y generar nuevos ingredientes funcionales.",
            text3: "Al mismo tiempo que desperdiciamos recursos útiles, seguimos tomando más de lo que los ecosistemas pueden reponer. La producción tradicional de omega-3 depende de la pesca industrial, que ya está al límite. Según el World Bank, el 90% de los bancos de peces marinos están totalmente explotados o en vías de sobreexplotación. Esto muestra la necesidad de buscar fuentes nuevas y sostenibles."
        },
        // Solution
        solution: {
            title: "Solución",
            mainTitle: "Convertir residuos industriales en aceites de microalga ricos en Omega-3",
            mainText: "Mediante un proceso de fermentación de 3 a 5 días, nuestras algas transforman residuos industriales — como suero, jarabes azucarados y otros subproductos — en aceites de microalga ricos en Omega-3, listos para reintegrarse en la cadena alimentaria.",
            adv1Title: "Producción de Omega-3 sostenible",
            adv1Text: "Sin sobrepesca marina. Las microalgas del género Traustocitrido pueden producir más del 50% de su peso en grasa, a partir de sustancias inorgánicas.",
            adv2Title: "Reducción de costos en gestión de desechos",
            adv2Text: "Mediante un proceso de fermentación de 3 a 5 días, nuestras algas transforman residuos industriales en aceites ricos en Omega-3.",
            adv3Title: "Menor huella ambiental",
            adv3Text: "Hoy, el 80% del Omega-3 humano proviene de la pesca, con 35% de poblaciones marinas sobreexplotadas. El aceite de alga puede reducir significativamente este impacto.",
            adv4Title: "En línea con Net Zero y Zero Waste",
            adv4Text: "Aprovechamos residuos orgánicos de procesos alimentarios para producir Omega-3 con microalgas, reduciendo desechos y emisiones al transformarlos en valor sustentable.",
            footer: "Producción de Omega-3 sostenible y circular sin sobrepesca marina."
        },
        // Market
        market: {
            title: "Mercado",
            introText: "Mientras la demanda global de Omega-3 crece ~8 % anual, la producción de aceite de pescado lleva décadas prácticamente estancada. La brecha sólo puede cubrirse con nuevas fuentes sostenibles, como los Omega-3 de microalgas.",
            subtitle: "Reemplazar aceite de pescado salvaje con aceite de alga: desbloqueando un mercado sostenible de Omega-3 de miles de millones de dólares.",
            box1Title: "Mercado global de Omega-3 $2.4 (2023) → $4.4 mil mill. (2030)",
            box1Text: "Esto implica alrededor de $2 mil millones de dólares en valor creado en los próximos 5 años.",
            box2Title: "Oportunidad de mercado de $41 millones de dolares anuales",
            box2Text: "Lo cual es equivalente a alrededor del 1% del valor del mercado global de Omega-3 en 2030."
        },
        // Allies
        allies: {
            title: "Aliados"
        },
        // Contact
        contact: {
            title: "Contáctanos",
            subtitle: "Construyamos la primera industria circular de Omega-3 en México",
            email: "Email",
            website: "Sitio Web",
            formName: "Tu Nombre",
            formEmail: "Tu Email",
            formSubject: "Asunto",
            formMessage: "Tu Mensaje",
            formSubmit: "Enviar Mensaje",
            quote: "\"Transformar problemas en soluciones: esa es la misión de Algae Cycle Biotech. Si queremos un planeta sano y sostenible, debemos innovar para la vida humana y el resto de la naturaleza. Las microalgas son nuestro gran aliado para lograrlo.\"",
            quoteAuthor: "— José Carlos Pons, CEO y Fundador",
            successMsg: "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto."
        },
        // Footer
        footer: {
            description: "Biotecnología Circular para la Industria Alimentaria",
            quickLinks: "Enlaces Rápidos",
            contactTitle: "Contacto",
            copyright: "© 2025 Algae Cycle Biotech. Todos los derechos reservados."
        }
    },
    en: {
        // Navigation
        nav: {
            inicio: "Home",
            desafio: "Challenge",
            solucion: "Solution",
            mercado: "Market",
            aliados: "Allies",
            contacto: "Contact"
        },
        // Hero
        hero: {
            title: "Transforming Industrial Waste into High-Value Ingredients",
            subtitle: "Circular Biotechnology Startup for the Food Industry",
            btn1: "Contact Us",
            btn2: "Learn About Our Solution"
        },
        // About/Challenge
        about: {
            title: "Challenge",
            text1: "Mexico (and the world) generates thousands of tons of nutrient-rich industrial waste such as dairy whey and starch water. A large portion of this waste comes from the food industry.",
            text2: "These byproducts are primarily destined for composting, treatment, or disposal, without leveraging their biotechnological value. By reusing them, the industry can reduce treatment costs and generate new functional ingredients.",
            text3: "While we waste useful resources, we continue taking more than ecosystems can replenish. Traditional omega-3 production depends on industrial fishing, which is already at its limit. According to the World Bank, 90% of marine fish stocks are fully exploited or overexploited. This shows the need to seek new and sustainable sources."
        },
        // Solution
        solution: {
            title: "Solution",
            mainTitle: "Convert industrial waste into microalgae oils rich in Omega-3",
            mainText: "Through a 3 to 5-day fermentation process, our algae transform industrial waste — such as whey, sugar syrups, and other byproducts — into microalgae oils rich in Omega-3, ready to be reintegrated into the food chain.",
            adv1Title: "Sustainable Omega-3 Production",
            adv1Text: "Without marine overfishing. Microalgae of the Traustocitrido genus can produce more than 50% of their weight in fat, from inorganic substances.",
            adv2Title: "Reduced Waste Management Costs",
            adv2Text: "Through a 3 to 5-day fermentation process, our algae transform industrial waste into Omega-3 rich oils.",
            adv3Title: "Lower Environmental Footprint",
            adv3Text: "Today, 80% of human Omega-3 comes from fishing, with 35% of marine populations overexploited. Algae oil can significantly reduce this impact.",
            adv4Title: "Aligned with Net Zero and Zero Waste",
            adv4Text: "We leverage organic waste from food processes to produce Omega-3 with microalgae, reducing waste and emissions by transforming them into sustainable value.",
            footer: "Sustainable and circular Omega-3 production without marine overfishing."
        },
        // Market
        market: {
            title: "Market",
            introText: "While global Omega-3 demand grows ~8% annually, fish oil production has been practically stagnant for decades. The gap can only be filled with new sustainable sources, such as microalgae Omega-3.",
            subtitle: "Replacing wild fish oil with algae oil: unlocking a sustainable Omega-3 market worth billions of dollars.",
            box1Title: "Global Omega-3 Market $2.4B (2023) → $4.4B (2030)",
            box1Text: "This implies approximately $2 billion dollars in value created over the next 5 years.",
            box2Title: "Market opportunity of $41 million dollars annually",
            box2Text: "Which is equivalent to approximately 1% of the global Omega-3 market value in 2030."
        },
        // Allies
        allies: {
            title: "Allies"
        },
        // Contact
        contact: {
            title: "Contact Us",
            subtitle: "Let's build the first circular Omega-3 industry in Mexico",
            email: "Email",
            website: "Website",
            formName: "Your Name",
            formEmail: "Your Email",
            formSubject: "Subject",
            formMessage: "Your Message",
            formSubmit: "Send Message",
            quote: "\"Transforming problems into solutions: that is the mission of Algae Cycle Biotech. If we want a healthy and sustainable planet, we must innovate for human life and the rest of nature. Microalgae are our great ally to achieve this.\"",
            quoteAuthor: "— José Carlos Pons, CEO and Founder",
            successMsg: "Thank you for your message! We will contact you soon."
        },
        // Footer
        footer: {
            description: "Circular Biotechnology for the Food Industry",
            quickLinks: "Quick Links",
            contactTitle: "Contact",
            copyright: "© 2025 Algae Cycle Biotech. All rights reserved."
        }
    }
};

// Language switching functionality
let currentLang = localStorage.getItem('language') || 'es';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    const t = translations[lang];
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach((link, index) => {
        const keys = ['inicio', 'desafio', 'solucion', 'mercado', 'aliados', 'contacto'];
        if (keys[index]) link.textContent = t.nav[keys[index]];
    });
    
    // Update hero
    document.querySelector('.hero-title').textContent = t.hero.title;
    document.querySelector('.hero-subtitle').textContent = t.hero.subtitle;
    document.querySelector('.hero-buttons .btn-primary').textContent = t.hero.btn1;
    document.querySelector('.hero-buttons .btn-secondary').textContent = t.hero.btn2;
    
    // Update about section
    document.querySelector('#about .section-title').textContent = t.about.title;
    const aboutTexts = document.querySelectorAll('#about .about-text p');
    aboutTexts[0].textContent = t.about.text1;
    aboutTexts[1].textContent = t.about.text2;
    aboutTexts[2].textContent = t.about.text3;
    
    // Update solution section
    document.querySelector('#solution .section-title').textContent = t.solution.title;
    document.querySelector('#solution .solution-main h3').textContent = t.solution.mainTitle;
    document.querySelector('#solution .solution-main p').textContent = t.solution.mainText;
    document.querySelectorAll('#solution .advantage-card h4').forEach((h4, index) => {
        const keys = ['adv1Title', 'adv2Title', 'adv3Title', 'adv4Title'];
        if (keys[index]) h4.textContent = t.solution[keys[index]];
    });
    document.querySelectorAll('#solution .advantage-card p').forEach((p, index) => {
        const keys = ['adv1Text', 'adv2Text', 'adv3Text', 'adv4Text'];
        if (keys[index]) p.innerHTML = t.solution[keys[index]];
    });
    document.querySelector('.solution-footer p').textContent = t.solution.footer;
    
    // Update market section
    document.querySelector('#market .section-title').textContent = t.market.title;
    document.querySelector('.market-intro-text p').textContent = t.market.introText;
    document.querySelector('.market-subtitle p').textContent = t.market.subtitle;
    document.querySelectorAll('.market-box h3').forEach((h3, index) => {
        const keys = ['box1Title', 'box2Title'];
        if (keys[index]) h3.textContent = t.market[keys[index]];
    });
    document.querySelectorAll('.market-box p').forEach((p, index) => {
        const keys = ['box1Text', 'box2Text'];
        if (keys[index]) p.textContent = t.market[keys[index]];
    });
    
    // Update allies section
    document.querySelector('#allies .section-title').textContent = t.allies.title;
    
    // Update contact section
    document.querySelector('#contact .section-title').textContent = t.contact.title;
    const contactSubtitle = document.querySelector('.contact-subtitle-wrapper h3');
    if (contactSubtitle) contactSubtitle.textContent = t.contact.subtitle;
    document.querySelectorAll('.contact-item h3').forEach((h3, index) => {
        if (index === 0) h3.textContent = t.contact.email;
        if (index === 1) h3.textContent = t.contact.website;
    });
    document.querySelector('#name').placeholder = t.contact.formName;
    document.querySelector('#email').placeholder = t.contact.formEmail;
    document.querySelector('#subject').placeholder = t.contact.formSubject;
    document.querySelector('#message').placeholder = t.contact.formMessage;
    document.querySelector('.contact-form .btn-primary').textContent = t.contact.formSubmit;
    document.querySelector('.contact-quote-text p:first-child').textContent = t.contact.quote;
    document.querySelector('.contact-quote-author').textContent = t.contact.quoteAuthor;
    
    // Update footer
    const footerDesc = document.querySelector('.footer-description');
    if (footerDesc) footerDesc.textContent = t.footer.description;
    const footerCopyright = document.querySelector('.footer-copyright');
    if (footerCopyright) footerCopyright.textContent = t.footer.copyright;
    
    // Form handler is set up separately
    setupFormHandler();
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) btn.classList.add('active');
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Language switcher event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Set up form handler
    setupFormHandler();
    
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
    
    // Set initial language
    setLanguage(currentLang);
});
