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
        this.setupParticles();
        this.setupContactForm();
        this.setupScrollEffects();
        this.setupInteractiveElements();
        this.setupMobileMenu();
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

    // Navegación mejorada - Efecto más sutil
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-list a');

        if (!navbar) return;

        // Efecto de scroll mejorado - más sutil
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateNavbar = () => {
            const currentScrollY = window.scrollY;
            
            // Solo aplicar efecto sutil después de cierto scroll
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
                
                // Efecto muy sutil de transparencia
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    // Scroll hacia abajo - ocultar ligeramente
                    navbar.style.transform = 'translateY(-5px)';
                    navbar.style.opacity = '0.95';
                } else {
                    // Scroll hacia arriba - mostrar completamente
                    navbar.style.transform = 'translateY(0)';
                    navbar.style.opacity = '1';
                }
            } else {
                // En la parte superior - navbar transparente
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

        // Navegación suave con validación
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
                    }
                }
            });
        });

        // Efecto activo en enlaces de navegación
        this.setupActiveNavLinks();
    }

    // Manejo del menú móvil
    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelectorAll('.mobile-nav a');

        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
                
                // Prevenir scroll del body cuando el menú está abierto
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Cerrar menú al hacer clic en enlace
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
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

    // Sistema de animaciones profesionales
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
                        if (entry.target.classList.contains('slide-right')) {
                            entry.target.classList.add('slide-right-visible');
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

        // Observar todos los elementos animables
        const animatedElements = document.querySelectorAll(
            '.fade-in, .slide-down, .slide-left, .slide-right, .sobre-mi-card, .habilidad-card, .proyecto-card, .contacto-form, .redes-container'
        );

        animatedElements.forEach(el => observer.observe(el));
    }

    // Sistema de partículas para la sección hero
    setupParticles() {
        const heroSection = document.querySelector('.inicio-hero');
        if (!heroSection) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.setAttribute('aria-hidden', 'true');
        heroSection.appendChild(particlesContainer);

        // Crear partículas
        for (let i = 0; i < 15; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 6 + 3;
        const colors = ['var(--accent)', 'var(--highlight)', 'var(--primary)'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            background: ${color};
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            opacity: ${Math.random() * 0.6 + 0.2};
        `;
        
        container.appendChild(particle);
    }

    // Formulario de contacto profesional
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
                this.resetFormLabels();
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

            // Validación en tiempo real
            input.addEventListener('input', () => {
                this.validateField(input);
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

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        switch (field.type) {
            case 'email':
                isValid = this.validateEmail(value);
                break;
            case 'text':
                if (field.name === 'nombre' && value.length < 2) {
                    isValid = false;
                }
                break;
            case 'textarea':
                if (value.length < 10) {
                    isValid = false;
                }
                break;
        }

        if (value && !isValid) {
            field.classList.add('invalid');
        } else {
            field.classList.remove('invalid');
        }

        return isValid;
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    resetFormLabels() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('focused');
        });
    }

    async simulateFormSubmit(formData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Datos del formulario simulados:', Object.fromEntries(formData));
                resolve();
            }, 2000);
        });
    }

    // Sistema de notificaciones mejorado
    showNotification(message, type = 'info') {
        // Evitar notificaciones duplicadas
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

        // Manejar cierre de notificación
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });

        // Auto-remover después de 5 segundos
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

    // Efectos de scroll optimizados - Sin efectos molestos
    setupScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            this.handleScrollReveal();
            this.updateActiveNavLinks();
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }, { passive: true });

        // Efecto inicial
        updateScrollEffects();
    }

    handleScrollReveal() {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
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
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentActive}`) {
                link.classList.add('active');
            }
        });
    }

    // Elementos interactivos mejorados
    setupInteractiveElements() {
        // Efecto hover sutil en tarjetas de proyecto
        const projectCards = document.querySelectorAll('.proyecto-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    card.style.transform = 'translateY(-4px)';
                    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    card.style.transform = 'translateY(0)';
                }
            });
        });

        // Contador de estadísticas
        this.setupCounters();
        
        // Filtro de proyectos
        this.setupProjectFilter();
        
        // Efecto de escritura automática
        this.setupTypingEffect();

        // Smooth scroll para todos los enlaces internos
        this.setupSmoothScroll();
    }

    // Smooth scroll mejorado para todos los enlaces
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupCounters() {
        const counters = document.querySelectorAll('.counter');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    }

    setupProjectFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.proyecto-card');

        if (!filterButtons.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover activo de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar activo al botón clickeado
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    setupTypingEffect() {
        const typedElement = document.querySelector('.typed-text');
        if (!typedElement) return;

        const texts = JSON.parse(typedElement.getAttribute('data-texts') || '["Desarrollador Web", "Tecnologías de la Información", "Innovación Digital"]');
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typedElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        };

        // Iniciar después de un delay
        setTimeout(type, 1000);
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

// Exportar para uso global (si es necesario)
window.PortfolioProfesional = PortfolioProfesional;