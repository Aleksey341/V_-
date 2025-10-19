// ========================================
// Sticky Navigation Highlight
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Intersection Observer for section highlighting
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav-sticky').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ========================================
// Scroll Animations
// ========================================
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.card, .scenario-card, .choice-path, .strategic-choice');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// ========================================
// Modal Functions
// ========================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add click outside to close
        setTimeout(() => {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal(modalId);
                }
            });
        }, 100);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = 'auto';
    }
});

// ========================================
// Ripple Effect for Buttons
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// ========================================
// Hover Effect for Choice Paths
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const otrsPath = document.querySelector('.choice-otrs');
    const hrsPath = document.querySelector('.choice-hrs');
    const decisionCards = document.querySelectorAll('.card-decision');
    
    if (otrsPath) {
        otrsPath.addEventListener('mouseenter', function() {
            decisionCards.forEach(card => {
                card.style.transform = 'scale(1.02)';
                card.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.3)';
            });
        });
        
        otrsPath.addEventListener('mouseleave', function() {
            decisionCards.forEach(card => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }
    
    if (hrsPath) {
        hrsPath.addEventListener('mouseenter', function() {
            decisionCards.forEach(card => {
                card.style.transform = 'scale(1.02)';
                card.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.3)';
            });
        });
        
        hrsPath.addEventListener('mouseleave', function() {
            decisionCards.forEach(card => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }
});

// ========================================
// Scroll to Top on Page Load
// ========================================
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

// ========================================
// Table Responsive Enhancement
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('.comparison-table');
    
    if (table && window.innerWidth < 768) {
        const tableContainer = table.parentElement;
        
        // Add scroll hint
        const scrollHint = document.createElement('div');
        scrollHint.className = 'scroll-hint';
        scrollHint.innerHTML = '<i class="fas fa-hand-point-right"></i> Прокрутите таблицу вправо';
        scrollHint.style.cssText = `
            text-align: center;
            padding: 10px;
            background: rgba(99, 102, 241, 0.1);
            color: #6366f1;
            border-radius: 8px;
            margin-bottom: 10px;
            font-size: 0.875rem;
            font-weight: 500;
        `;
        
        tableContainer.parentElement.insertBefore(scrollHint, tableContainer);
        
        // Remove hint after scroll
        tableContainer.addEventListener('scroll', function() {
            if (this.scrollLeft > 50) {
                scrollHint.style.display = 'none';
            }
        }, { once: true });
    }
});

// ========================================
// Progress Bar on Scroll
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// ========================================
// Counter Animation for Numbers
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ========================================
// Print Functionality
// ========================================
function printPage() {
    window.print();
}

// ========================================
// Copy Link Functionality
// ========================================
function copyLink(sectionId) {
    const url = window.location.href.split('#')[0] + '#' + sectionId;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Ссылка скопирована!');
        });
    }
}

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Enhanced Scroll Behavior
// ========================================
let lastScroll = 0;
const nav = document.querySelector('.nav-sticky');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.boxShadow = 'none';
    } else {
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Accessibility Enhancements
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });
    
    // Add keyboard navigation for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
    });
    
    // Add focus trap in modals
    document.addEventListener('keydown', function(e) {
        const openModal = document.querySelector('.modal.show');
        if (openModal && e.key === 'Tab') {
            const focusableElements = openModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
});

// ========================================
// Performance Optimization
// ========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Console Welcome Message
// ========================================
console.log('%c🚀 БП Увольнение - Развитие 2026', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cИнтерактивный одностраничник для принятия стратегических решений', 'color: #6b7280; font-size: 14px;');
console.log('%cОптимизировано для всех устройств', 'color: #10b981; font-size: 12px;');