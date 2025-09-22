// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.cartCount = 0;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCartUI();
    }

    bindEvents() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const product = e.target.getAttribute('data-product');
                const price = parseFloat(e.target.getAttribute('data-price'));
                this.addItem(product, price);
                this.showAddedToCartAnimation(e.target);
            });
        });

        // Cart icon click
        document.querySelector('.cart-icon').addEventListener('click', () => {
            this.openCart();
        });

        // Close cart
        document.querySelector('.close-cart').addEventListener('click', () => {
            this.closeCart();
        });

        // Cart overlay click
        document.querySelector('.cart-overlay').addEventListener('click', () => {
            this.closeCart();
        });

        // Checkout button
        document.querySelector('.checkout-btn').addEventListener('click', () => {
            this.checkout();
        });
    }

    addItem(name, price) {
        const existingItem = this.items.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                name,
                price,
                quantity: 1,
                image: this.getProductImage(name)
            });
        }

        this.updateCartData();
        this.renderCartItems();
        this.updateCartUI();
    }

    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
        this.updateCartData();
        this.renderCartItems();
        this.updateCartUI();
    }

    updateCartData() {
        this.cartCount = this.items.reduce((total, item) => total + item.quantity, 0);
        this.total = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    updateCartUI() {
        document.querySelector('.cart-count').textContent = this.cartCount;
        document.querySelector('#cart-total').textContent = this.total.toFixed(2);
    }

    getProductImage(productName) {
        const imageMap = {
            // Featured Products
            'Premium Leather Notebook': 'assets/images/nb1.jpg',
            'Smooth Gel Pen Set': 'assets/images/pen1.jpg',
            'Professional Watercolor Set': 'assets/images/ct4.jpg',
            'Weekly Planner 2025': 'assets/images/mp1.jpg',
            'Bamboo Desk Organizer': 'assets/images/dt1.jpg',
            'Professional Colored Pencils': 'assets/images/pen2.jpg',
            'Spiral Bound Notebook': 'assets/images/nb2.jpg',
            'Premium Art Brush Set': 'assets/images/ct6.jpg',
            'Office Essentials Kit': 'assets/images/ec1.jpg',
            'Sticky Note Collection': 'assets/images/np1.jpg',
            'Luxury Fountain Pen': 'assets/images/pen3.jpg',
            'Monthly Goal Planner': 'assets/images/mp2.jpg',
            
            // Notebooks Category
            'Hardcover Journal': 'assets/images/nb3.jpg',
            'Pocket Notebook Set': 'assets/images/nb4.jpg',
            'Eco-Friendly Notebook': 'assets/images/nb5.jpg',
            'Graph Paper Notebook': 'assets/images/nb6.jpg',
            'Artist Sketchbook': 'assets/images/nb7.jpg',
            'Lined Composition Book': 'assets/images/nb8.jpg',
            'Waterproof Notebook': 'assets/images/nb9.jpg',
            'Executive Notebook': 'assets/images/nb10.jpg',
            'Student Notebook Pack': 'assets/images/nb11.jpg',
            'Bullet Journal': 'assets/images/nb12.jpg',
            
            // Pens Category
            'Ballpoint Pen Collection': 'assets/images/pen4.jpg',
            'Calligraphy Pen Set': 'assets/images/pen5.jpg',
            'Rollerball Pen Duo': 'assets/images/pen6.jpg',
            'Marker Set Professional': 'assets/images/pen7.jpg',
            'Fineliner Pen Pack': 'assets/images/pen8.jpg',
            'Executive Pen Set': 'assets/images/pen9.jpg',
            'Highlighter Collection': 'assets/images/pen10.jpg'
        };
        return imageMap[productName] || 'assets/images/nb1.jpg';
    }

    renderCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: #718096; padding: 2rem;">Your cart is empty</p>';
            return;
        }

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                </div>
                <button class="remove-item" onclick="cart.removeItem('${item.name}')" style="background: none; border: none; color: #e53e3e; cursor: pointer; font-size: 1.2rem;">&times;</button>
            </div>
        `).join('');
    }

    openCart() {
        document.querySelector('.cart-sidebar').classList.add('open');
        document.querySelector('.cart-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        document.querySelector('.cart-sidebar').classList.remove('open');
        document.querySelector('.cart-overlay').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    showAddedToCartAnimation(button) {
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.background = '#48bb78';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1000);
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        alert(`Thank you for your order! Total: $${this.total.toFixed(2)}\n\nThis is a demo - no actual payment was processed.`);
        this.items = [];
        this.updateCartData();
        this.renderCartItems();
        this.updateCartUI();
        this.closeCart();
    }
}

// Newsletter Subscription
class Newsletter {
    constructor() {
        this.init();
    }

    init() {
        const form = document.querySelector('.newsletter-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.subscribe();
        });
    }

    subscribe() {
        const emailInput = document.querySelector('.newsletter-form input');
        const email = emailInput.value.trim();
        
        if (this.validateEmail(email)) {
            this.showSuccessMessage();
            emailInput.value = '';
        } else {
            this.showErrorMessage();
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showSuccessMessage() {
        const form = document.querySelector('.newsletter-form');
        const originalHTML = form.innerHTML;
        
        form.innerHTML = '<p style="color: white; font-weight: 600;">Thank you for subscribing!</p>';
        
        setTimeout(() => {
            form.innerHTML = originalHTML;
            // Re-bind the event
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                newsletter.subscribe();
            });
        }, 3000);
    }

    showErrorMessage() {
        const emailInput = document.querySelector('.newsletter-form input');
        emailInput.style.borderColor = '#e53e3e';
        emailInput.placeholder = 'Please enter a valid email address';
        
        setTimeout(() => {
            emailInput.style.borderColor = '';
            emailInput.placeholder = 'Enter your email address';
        }, 3000);
    }
}

// Smooth Scrolling and Navigation
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupScrollEffect();
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // CTA Button smooth scroll
        document.querySelector('.cta-button').addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#products');
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    setupMobileMenu() {
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
    }

    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--navbar-bg-scrolled').trim() || 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--navbar-bg').trim() || 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Theme Manager (Light/Dark)
class ThemeManager {
    constructor() {
        this.key = 'theme-preference';
        this.root = document.documentElement;
        this.button = null;
        this.init();
    }

    init() {
        this.applySavedPreference();
        this.setupToggle();
    }

    getPreferred() {
        const saved = localStorage.getItem(this.key);
        if (saved === 'light' || saved === 'dark') return saved;
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }

    apply(theme) {
        this.root.setAttribute('data-theme', theme);
    }

    applySavedPreference() {
        this.apply(this.getPreferred());
    }

    toggle() {
        const current = this.root.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        this.apply(next);
        localStorage.setItem(this.key, next);
        
        // Update navbar background immediately after theme change
        this.updateNavbarBackground();
    }

    updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        // Small delay to allow CSS variables to update
        setTimeout(() => {
            // Apply the correct navbar background based on scroll position and current theme
            if (window.scrollY > 100) {
                navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--navbar-bg-scrolled').trim() || 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--navbar-bg').trim() || 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }, 10);
    }

    setupToggle() {
        this.button = document.querySelector('.theme-toggle');
        if (!this.button) return;
        this.button.addEventListener('click', () => this.toggle());
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add fade-in class to elements that should animate
        const animatedElements = document.querySelectorAll('.product-card, .category-card, .testimonial-card, .about-text, .about-image');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
}

// Search Functionality
class Search {
    constructor() {
        this.init();
    }

    init() {
        const searchIcon = document.querySelector('.search-icon');
        searchIcon.addEventListener('click', () => {
            this.showSearchModal();
        });
    }

    showSearchModal() {
        const searchHTML = `
            <style>
              .modal-backdrop{position:fixed;inset:0;background:var(--overlay-backdrop);z-index:2000;display:flex;align-items:center;justify-content:center}
              .modal-card{background:var(--background-white);color:var(--text-primary);padding:2rem;border-radius:20px;width:90%;max-width:500px;box-shadow:0 10px 30px var(--shadow-medium)}
              .modal-card h3{margin-bottom:1rem;text-align:center}
              .modal-card input{width:100%;padding:1rem;border:2px solid var(--border-color);background:var(--background-white);color:var(--text-primary);border-radius:10px;font-size:1rem;margin-bottom:1rem}
              .modal-actions{display:flex;gap:1rem;justify-content:center}
              .btn{padding:0.8rem 1.5rem;border:none;border-radius:8px;cursor:pointer;font-weight:600}
              .btn-secondary{background:var(--border-color);color:var(--text-primary)}
              .btn-primary{background:linear-gradient(135deg, var(--primary-color), var(--accent-color));color:#fff}
            </style>
            <div class="search-modal modal-backdrop">
                <div class="modal-card">
                    <h3>Search Products</h3>
                    <input type="text" placeholder="What are you looking for?">
                    <div class="modal-actions">
                        <button class="btn btn-secondary" onclick="this.closest('.search-modal').remove()">Cancel</button>
                        <button class="btn btn-primary" onclick="alert('Search functionality would be implemented here!'); this.closest('.search-modal').remove()">Search</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', searchHTML);
        
        // Focus on input
        setTimeout(() => {
            document.querySelector('.search-modal input').focus();
        }, 100);
    }
}

// Product Quick View
class QuickView {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.quick-view').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showQuickView(e.target);
            });
        });
    }

    showQuickView(button) {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        const productImage = productCard.querySelector('img').src;

        const quickViewHTML = `
            <style>
              .modal-backdrop{position:fixed;inset:0;background:var(--overlay-backdrop);z-index:2000;display:flex;align-items:center;justify-content:center;padding:2rem}
              .modal-card{background:var(--background-white);color:var(--text-primary);border-radius:20px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;box-shadow:0 10px 30px var(--shadow-medium)}
              .modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;padding:2rem}
              .modal-title{margin-bottom:1rem}
              .modal-price{font-size:1.5rem;color:var(--primary-color);font-weight:700;margin-bottom:1rem}
              .modal-text{color:var(--text-secondary);line-height:1.6;margin-bottom:2rem}
              .modal-actions{display:flex;gap:1rem}
              .btn{flex:1;padding:1rem;border:none;border-radius:8px;cursor:pointer;font-weight:600}
              .btn-secondary{background:var(--border-color);color:var(--text-primary)}
              .btn-primary{background:linear-gradient(135deg, var(--primary-color), var(--accent-color));color:#fff}
              @media (max-width: 600px){.modal-grid{grid-template-columns:1fr;gap:1.5rem;padding:1.5rem}}
            </style>
            <div class="quick-view-modal modal-backdrop">
                <div class="modal-card">
                    <div class="modal-grid">
                        <div>
                            <img src="${productImage}" alt="${productName}" style="width:100%;border-radius:10px;object-fit:cover">
                        </div>
                        <div>
                            <h2 class="modal-title">${productName}</h2>
                            <p class="modal-price">${productPrice}</p>
                            <p class="modal-text">
                                This premium stationery item is crafted with attention to detail and quality.
                                Perfect for professionals, students, and creatives alike.
                            </p>
                            <div class="modal-actions">
                                <button class="btn btn-secondary" onclick="this.closest('.quick-view-modal').remove()">Close</button>
                                <button class="btn btn-primary" onclick="cart.addItem('${productName}', ${productPrice.replace('$', '')}); this.closest('.quick-view-modal').remove();">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', quickViewHTML);
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all classes
    window.cart = new ShoppingCart();
    window.newsletter = new Newsletter();
    window.navigation = new Navigation();
    window.scrollAnimations = new ScrollAnimations();
    window.search = new Search();
    window.quickView = new QuickView();
    window.theme = new ThemeManager();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Add some interactive effects
    addInteractiveEffects();
});

// Additional Interactive Effects
function addInteractiveEffects() {
    // Floating animation for hero elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.1) translateY(-10px)';
            element.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        const speed = 0.5;
        
        parallaxElements.forEach(element => {
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Category buttons hover effect
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Product hover sound effect (visual feedback)
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Testimonial cards interactive rating
    document.querySelectorAll('.testimonial-rating').forEach(rating => {
        rating.addEventListener('click', () => {
            rating.style.transform = 'scale(1.1)';
            setTimeout(() => {
                rating.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Footer social links
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.querySelector('i').className.split('-')[1];
            alert(`This would open our ${platform} page!`);
        });
    });
}

// Utility function for debouncing
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

// Performance optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Any scroll-dependent code can go here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);