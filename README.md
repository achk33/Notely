# A-Station - Premium Stationery Website

A modern, responsive website for a premium stationery shop featuring notebooks, pens, planners, art supplies, and office essentials.

## Features

- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, minimalistic design with soft pastel colors
- **Interactive Elements**: Smooth animations, hover effects, and transitions
- **Shopping Cart**: Functional cart with add/remove items and checkout
- **Product Showcase**: Featured products with quick view functionality
- **Category Navigation**: Browse by product categories
- **Customer Testimonials**: Social proof with star ratings
- **Newsletter Subscription**: Email collection for marketing
- **Search Functionality**: Product search modal
- **Mobile Menu**: Responsive hamburger navigation

## Design Features

- **Color Palette**: Soft pastels (#e8d5e8, #f0e6d2, #d4e8e8)
- **Typography**: Inter font family for modern readability
- **Rounded Corners**: Consistent 20px border radius
- **Smooth Animations**: CSS transitions and keyframe animations
- **Glass Morphism**: Backdrop blur effects for modern appearance
- **Gradient Accents**: Subtle gradients for call-to-action elements

## File Structure

```
stationery-website/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css       # Main stylesheet
│   ├── js/
│   │   └── script.js        # Interactive functionality
│   └── images/              # Product and content images
└── README.md               # This file
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Interactive functionality and DOM manipulation
- **Font Awesome**: Icons for UI elements
- **Google Fonts**: Inter font family
- **Unsplash**: High-quality placeholder images

## Setup Instructions

1. **Clone or Download** the project files to your local machine
2. **Open** `index.html` in a modern web browser
3. **Or serve** the files using a local server for best performance:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using Live Server (VS Code extension)
   Right-click index.html → "Open with Live Server"
   ```

## Browser Compatibility

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Features Overview

### Hero Section
- Engaging tagline: "Write. Create. Inspire."
- Call-to-action button with smooth scroll
- Animated floating elements

### Product Showcase
- Grid layout with 6 featured products
- Hover effects and quick view modals
- Add to cart functionality with visual feedback

### Categories
- 5 main categories: Notebooks, Pens, Art Supplies, Planners, Office Essentials
- Icon-based design with hover animations

### About Section
- Company story and values
- Feature highlights with icons
- Professional imagery

### Testimonials
- Customer reviews with star ratings
- Profile images and customer details
- Responsive card layout

### Newsletter
- Email validation
- Success/error feedback
- Gradient background design

### Shopping Cart
- Slide-out sidebar cart
- Add/remove items functionality
- Running total calculation
- Checkout simulation

## Customization

### Colors
Edit the CSS custom properties in `styles.css`:
```css
:root {
    --primary-color: #e8d5e8;
    --secondary-color: #f0e6d2;
    --accent-color: #d4e8e8;
    /* ... other colors */
}
```

### Products
Update product data in `index.html` and corresponding JavaScript arrays.

### Images
Replace Unsplash URLs with your own product images in `index.html`.

## Performance

- Optimized CSS with efficient selectors
- Debounced scroll events
- Lazy loading ready
- Minimal external dependencies

## Mobile Responsiveness

- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Touch-friendly interface
- Optimized typography scaling

## Future Enhancements

- Product search functionality
- User authentication
- Payment integration
- Product filtering and sorting
- Wishlist functionality
- Product reviews system
- Inventory management

## License

This project is open source and available under the [MIT License](LICENSE).

---

**A-Station** - Write. Create. Inspire. ✨