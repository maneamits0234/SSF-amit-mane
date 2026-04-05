# Ayurvedic E-Commerce Website

## Project Overview
A professional, trust-focused Ayurvedic/Medical product website built for a social foundation. Features comprehensive Marathi language support with seamless bilingual content.

## Key Features

### Design & UX
- **Medical + Ayurvedic Theme**: Clean, professional UI with earthy green (#2d7a3e) and brown (#8b7355) color palette
- **Fully Responsive**: Mobile-first design with perfect responsiveness across all devices
  - Mobile: 2-column product grid
  - Tablet: 3-column product grid  
  - Desktop: 4-column product grid
- **Marathi Primary**: All content available in Marathi with English secondary
- **Smooth Animations**: Hover effects, transitions, smooth scrolling

### Pages & Sections

#### Home Page
1. **Hero Section**: 
   - Attractive hero image
   - Bilingual tagline
   - Dual CTA buttons (Call Now + WhatsApp)
   - Trust indicators

2. **Benefits Section**: 
   - 100% Natural
   - No Side Effects  
   - Trusted Products
   - Certified Quality

3. **Products Section**:
   - 6 premium Ayurvedic products
   - Responsive grid layout
   - Featured product badges
   - Discount indicators

4. **About Section**:
   - Foundation information
   - Social mission statement
   - Trust-building content

5. **CTA Section**:
   - Prominent call-to-action
   - Contact encouragement

6. **Contact Section**:
   - Phone, WhatsApp, Email
   - Visual contact cards

#### Product Detail Page (PDP)
- Large product image
- Bilingual product name & description
- Price with discount display
- **Strong CTAs**: Call Now + WhatsApp buttons
- Sticky mobile CTA bar (appears on scroll)
- Comprehensive benefits list (Marathi)
- Ingredients section (Marathi)
- Usage instructions (Marathi)
- Related products section
- Trust badges
- Add to cart functionality

#### Shopping Cart
- Slide-in cart panel
- Product management (add/remove/quantity)
- Price calculation with shipping
- Free shipping indicator
- Direct order via Call or WhatsApp

### Technical Implementation

#### Tech Stack
- React 18+ (Functional Components + Hooks)
- React Router (Data mode)
- TypeScript
- Tailwind CSS v4
- Lucide React Icons

#### Components Structure
```
/src/app/
├── App.tsx                 # Root component
├── Layout.tsx              # Layout wrapper
├── routes.tsx              # Router configuration
├── components/
│   ├── Header.tsx          # Navigation with contact info
│   ├── ProductCard.tsx     # Product display card
│   ├── Cart.tsx            # Shopping cart
│   └── Footer.tsx          # Footer with links
├── pages/
│   ├── Home.tsx            # Home page
│   └── ProductDetail.tsx   # PDP
└── data/
    └── products.ts         # Product data + contact info
```

### Key Integrations

#### Click-to-Call
- Direct phone calling via `tel:` protocol
- Integrated in header, PDPs, and cart

#### WhatsApp Integration
- Pre-filled messages in Marathi
- Product-specific inquiries
- Order placement from cart
- Links use `wa.me` with encoded text

### Contact Information
- **Phone**: +91 98765 43210
- **WhatsApp**: 919876543210
- **Email**: info@ayurvedafoundation.org
- **Address**: Pune, Maharashtra

### Products
1. **Organic Turmeric Powder** (शुद्ध हळद पावडर) - ₹299
2. **Ayurvedic Hair Oil** (आयुर्वेदिक केशतेल) - ₹599
3. **Herbal Wellness Tea** (हर्बल आरोग्य चहा) - ₹349
4. **Ashwagandha Root Powder** (अश्वगंधा मूळ पावडर) - ₹449
5. **Moringa Leaf Powder** (शेवगा पानांची पावडर) - ₹399
6. **Ayurvedic Face Cream** (आयुर्वेदिक चेहरा क्रीम) - ₹699

### Marathi Language Support
- Google Fonts: Noto Sans Devanagari + Inter
- All product data bilingual
- Primary display in Marathi
- Trust-building Marathi messaging

### Performance Optimizations
- Lazy loading images
- Smooth scroll behavior
- Optimized component rendering
- Custom scrollbar styling

### Trust & Conversion Elements
- "100% नैसर्गिक" (100% Natural) messaging
- "कोणतेही साइड इफेक्ट नाहीत" (No Side Effects)
- "विश्वासार्ह" (Trusted) badges
- Social foundation credibility
- 5000+ satisfied customers mention
- Quality certification indicators

### Responsive Breakpoints
- Mobile: < 768px (2 columns)
- Tablet: 768px - 1024px (3 columns)
- Desktop: > 1024px (4 columns)

## Color Palette
- Primary Green: #2d7a3e
- Secondary Brown: #8b7355
- Background: #ffffff
- Accent Beige: #fef7ed
- Light Green: #e8f5e9
- Error Red: #d4183d
- WhatsApp Green: #25D366

## Brand Voice
- **Trustworthy**: Medical-grade credibility
- **Natural**: Emphasis on purity
- **Accessible**: Simple Marathi language
- **Caring**: Health-focused messaging
- **Traditional**: Ayurvedic wisdom

---

**Built with focus on conversion, trust, and accessibility for Ayurvedic product customers.**
