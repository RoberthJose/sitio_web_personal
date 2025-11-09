// ==============================
// main.js - Portafolio Profesional
// Tecnologías de la Información - DSI Unidad 2
// ==============================

class PortfolioProfesional {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupAnimations();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupContactForm();
    }

    // Pantalla de carga profesional
    setupLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <p class="loading-text">Cargando portafolio...</p>
            </div>
        `;
        document.body.prepend(loadingScreen);

        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1500);
        });
    }

    // Navegación mejorada
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        // Efecto de scroll mejorado
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateNavbar = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
                
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    navbar.style.transform = 'translateY(-5px)';
                    navbar.style.opacity = '0.95';
                } else {
                    navbar.style.transform = 'translateY(0)';
                    navbar.style.opacity = '1';
                }
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.transform = 'translateY(0)';
                navbar.style.opacity = '1';
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });

        // Navegación suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Cerrar menú móvil si está abierto
                    const mobileMenu = document.querySelector('.mobile-menu');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.querySelector('.menu-toggle').classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });

        this.setupActiveNavLinks();
    }

    // Manejo del menú móvil
    setupMobileMenu() {
        // Crear elementos del menú móvil si no existen
        if (!document.querySelector('.menu-toggle')) {
            this.createMobileMenu();
        }

        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelectorAll('.mobile-nav a, .nav-list a');

        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
                
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Cerrar menú al hacer clic en enlace
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (mobileMenu.classList.contains('active') && 
                    !menuToggle.contains(e.target) && 
                    !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            // Cerrar menú con tecla Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Crear menú móvil dinámicamente
    createMobileMenu() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        // Crear contenedor del menú móvil
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Clonar los enlaces de navegación
        const navList = document.querySelector('.nav-list');
        if (navList) {
            const mobileNav = navList.cloneNode(true);
            mobileNav.className = 'mobile-nav';
            mobileMenu.appendChild(mobileNav);
        }
        
        // Crear botón hamburguesa
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Abrir menú');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        // Insertar elementos en el navbar
        const navContainer = document.createElement('div');
        navContainer.className = 'nav-container';
        
        // Mover el contenido existente al contenedor
        const existingContent = navbar.innerHTML;
        navContainer.innerHTML = existingContent;
        navContainer.appendChild(menuToggle);
        navContainer.appendChild(mobileMenu);
        
        navbar.innerHTML = '';
        navbar.appendChild(navContainer);
    }

    // Sistema de animaciones
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        if (entry.target.classList.contains('fade-in')) {
                            entry.target.classList.add('fade-in-visible');
                        }
                        if (entry.target.classList.contains('slide-down')) {
                            entry.target.classList.add('slide-down-visible');
                        }
                        if (entry.target.classList.contains('slide-left')) {
                            entry.target.classList.add('slide-left-visible');
                        }
                        if (entry.target.classList.contains('sobre-mi-card') || 
                            entry.target.classList.contains('habilidad-card')) {
                            entry.target.classList.add('visible');
                        }
                        if (entry.target.classList.contains('proyecto-card')) {
                            entry.target.classList.add('visible');
                        }
                    }, index * 150);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos animables
        const animatedElements = document.querySelectorAll(
            '.fade-in, .slide-down, .slide-left, .sobre-mi-card, .habilidad-card, .proyecto-card, .contacto-form'
        );

        animatedElements.forEach(el => observer.observe(el));
    }

    // Efectos de scroll
    setupScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            this.updateActiveNavLinks();
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }, { passive: true });

        this.updateActiveNavLinks();
    }

    setupActiveNavLinks() {
        this.updateActiveNavLinks();
        
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    this.updateActiveNavLinks();
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        });
    }

    updateActiveNavLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-list a, .mobile-nav a');
        const scrollPos = window.scrollY + 100;

        let currentActive = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentActive = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('activo');
            const href = link.getAttribute('href');
            if (href === `#${currentActive}` || (currentActive === '' && href === '#inicio')) {
                link.classList.add('activo');
            }
        });
    }

    // Formulario de contacto
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Validación mejorada
            if (!this.validateForm(formData)) {
                this.showNotification('Por favor, completa todos los campos correctamente', 'error');
                return;
            }

            // Animación de envío
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            try {
                await this.simulateFormSubmit(formData);
                this.showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
                contactForm.reset();
            } catch (error) {
                this.showNotification('Error al enviar el mensaje. Intenta nuevamente.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });

        // Efectos en inputs
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    validateForm(formData) {
        const nombre = formData.get('nombre').trim();
        const correo = formData.get('correo').trim();
        const asunto = formData.get('asunto').trim();
        const mensaje = formData.get('mensaje').trim();
        
        if (!nombre || !correo || !asunto || !mensaje) {
            return false;
        }
        
        if (!this.validateEmail(correo)) {
            return false;
        }
        
        if (mensaje.length < 10) {
            return false;
        }
        
        return true;
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    async simulateFormSubmit(formData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Datos del formulario simulados:', Object.fromEntries(formData));
                resolve();
            }, 2000);
        });
    }

    // Sistema de notificaciones
    showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');

        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ'
        };

        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icons[type] || icons.info}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Cerrar notificación">×</button>
            </div>
        `;

        document.body.appendChild(notification);

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });

        setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);
    }

    hideNotification(notification) {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioProfesional();
});

// Manejo de errores global
window.addEventListener('error', (e) => {
    console.error('Error en la aplicación:', e.error);
});
