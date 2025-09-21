// Category Page Functionality
class CategoryManager {
    constructor() {
        this.products = [];
        this.currentView = 'grid';
        this.init();
    }

    init() {
        this.loadProducts();
        this.bindEvents();
        this.updateView();
    }

    loadProducts() {
        const productCards = document.querySelectorAll('.product-card');
        this.products = Array.from(productCards).map(card => ({
            element: card,
            name: card.dataset.name || card.querySelector('h3').textContent,
            price: parseFloat(card.dataset.price || 0),
            priceText: card.querySelector('.product-price').textContent
        }));
    }

    bindEvents() {
        // Sort functionality
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortProducts(e.target.value);
            });
        }

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleView(e.target.closest('.view-btn').dataset.view);
            });
        });

        // Add to cart for new products
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                if (window.cart) {
                    const product = e.target.getAttribute('data-product');
                    const price = parseFloat(e.target.getAttribute('data-price'));
                    window.cart.addItem(product, price);
                    this.showAddedToCartAnimation(e.target);
                }
            });
        });

        // Quick view for new products
        document.querySelectorAll('.quick-view').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                if (window.quickView) {
                    window.quickView.showQuickView(e.target);
                }
            });
        });
    }

    sortProducts(sortBy) {
        const container = document.getElementById('products-grid');
        let sortedProducts = [...this.products];

        switch (sortBy) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'featured':
            default:
                // Keep original order
                break;
        }

        // Remove all products from container
        container.innerHTML = '';

        // Add products in new order
        sortedProducts.forEach(product => {
            container.appendChild(product.element);
        });

        // Re-add fade-in animation
        this.animateProducts();
    }

    toggleView(view) {
        const container = document.getElementById('products-grid');
        const viewButtons = document.querySelectorAll('.view-btn');

        // Update active button
        viewButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        // Update container class
        if (view === 'list') {
            container.classList.add('list-view');
        } else {
            container.classList.remove('list-view');
        }

        this.currentView = view;
    }

    animateProducts() {
        const products = document.querySelectorAll('.product-card');
        products.forEach((product, index) => {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                product.style.transition = 'all 0.3s ease';
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }, index * 100);
        });
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

    updateView() {
        // Initialize view based on current state
        this.animateProducts();
    }
}

// Enhanced Product Image Mapping for Categories
function updateProductImageMapping() {
    if (window.cart && window.cart.getProductImage) {
        const originalGetProductImage = window.cart.getProductImage.bind(window.cart);
        
        window.cart.getProductImage = function(productName) {
            const categoryImages = {
                // Notebooks
                'Premium Leather Notebook': 'assets/images/nb1.jpg',
                'Spiral Bound Notebook': 'assets/images/nb2.jpg',
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
                
                // Pens
                'Smooth Gel Pen Set': 'assets/images/pen1.jpg',
                'Professional Colored Pencils': 'assets/images/pen2.jpg',
                'Luxury Fountain Pen': 'assets/images/pen3.jpg',
                
                // Art Supplies
                'Professional Watercolor Set': 'assets/images/ct4.jpg',
                'Premium Art Brush Set': 'assets/images/ct6.jpg',
                
                // Planners
                'Weekly Planner 2025': 'assets/images/mp1.jpg',
                'Monthly Goal Planner': 'assets/images/mp2.jpg',
                
                // Office Essentials
                'Bamboo Desk Organizer': 'assets/images/dt1.jpg',
                'Office Essentials Kit': 'assets/images/ec1.jpg',
                'Sticky Note Collection': 'assets/images/np1.jpg'
            };
            
            return categoryImages[productName] || originalGetProductImage(productName);
        };
    }
}

// Initialize category functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize category manager
    window.categoryManager = new CategoryManager();
    
    // Update product image mapping
    setTimeout(() => {
        updateProductImageMapping();
    }, 100);
    
    // Add scroll animations for category pages
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

    // Observe product cards for animation
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});

// Search functionality for category pages
function filterProducts(searchTerm) {
    const products = document.querySelectorAll('.product-card');
    const normalizedSearch = searchTerm.toLowerCase();
    
    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const description = product.querySelector('.product-description')?.textContent.toLowerCase() || '';
        
        if (name.includes(normalizedSearch) || description.includes(normalizedSearch)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Export for use in other scripts
window.categoryManager = window.categoryManager || null;
window.filterProducts = filterProducts;