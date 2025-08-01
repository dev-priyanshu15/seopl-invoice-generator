# 🧾 SEOPL Invoice Generator

[![React](https://img.shields.io/badge/React-18.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey?logo=express)](https://expressjs.com/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.0-blue?logo=mui)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> *SEOPL Full Stack Challenge Solution* - A professional, modular MERN stack invoice generator built for freelancers with PDF export, live preview, and smooth animations. Completed in 5 hours! ⚡

![Invoice Generator Demo](https://via.placeholder.com/800x400/1976d2/ffffff?text=Invoice+Generator+Preview)

## ✨ Features

### 🎯 Core Functionality
- *📝 Form-based Invoice Entry* - Comprehensive client information and line items management
- *👀 Live Preview* - Real-time invoice preview with instant updates
- *🔄 Dynamic Line Items* - Add, remove, and reorder items with smooth animations
- *💰 Smart Calculations* - Automatic subtotal, discount, and tax computation
- *📄 Professional PDF Export* - High-quality PDF generation using Puppeteer

### 🎨 User Experience
- *🌓 Dark/Light Theme Toggle* - Smooth animated theme switching
- *📱 Mobile Responsive* - Optimized for all device sizes and orientations
- *⚡ Smooth Animations* - Professional UI interactions and transitions
- *🎨 Modern Design* - Clean interface with Material-UI components
- *🚀 Fast Performance* - Optimized React components with TypeScript

### 🔧 Technical Excellence
- *🏗 Modular Architecture* - Clean, maintainable code structure
- *🛡 Type Safety* - Full TypeScript implementation
- *📊 Error Handling* - Comprehensive error management
- *🔒 Secure API* - CORS-enabled backend with proper validation

## 🏗 Architecture

mermaid
graph TB
    A[React Frontend] --> B[Express API]
    B --> C[Puppeteer PDF Engine]
    A --> D[Material-UI Components]
    A --> E[TypeScript Types]
    B --> F[CORS Middleware]


## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| *React* | 18.0+ | UI Framework |
| *TypeScript* | 4.9+ | Type Safety |
| *Material-UI* | 5.0+ | Component Library |
| *Axios* | Latest | HTTP Client |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| *Node.js* | 16+ | Runtime Environment |
| *Express* | 4.18+ | Web Framework |
| *Puppeteer* | 21+ | PDF Generation |
| *CORS* | Latest | Cross-Origin Support |

## 📦 Installation

### Prerequisites
Ensure you have the following installed:
- *Node.js* (v16 or higher) - [Download](https://nodejs.org/)
- *npm* (comes with Node.js) or *yarn*
- *Git* - [Download](https://git-scm.com/)

### Quick Start

1. *Clone the Repository*
   bash
   git clone https://github.com/dev-priyanshu15/seopl-invoice-generator.git
   cd seopl-invoice-generator
   

2. *Backend Setup*
   bash
   # Navigate to server directory
   cd server
   
   # Install dependencies
   npm install
   
   # Start development server
   npm run dev
   
   
   Expected output:
   
   🚀 Server running on port 5000
   📊 Environment: development
   

3. *Frontend Setup* (Open new terminal)
   bash
   # Navigate to client directory
   cd client
   
   # Install dependencies
   npm install
   
   # Start React development server
   npm start
   
   
   Expected output:
   
   Compiled successfully!
   Local: http://localhost:3000
   

4. *Access the Application*
   - *Frontend*: http://localhost:3000
   - *Backend API*: http://localhost:5000
   - *Health Check*: http://localhost:5000/api/health

## 📖 Usage Guide

### Creating Your First Invoice

1. *Client Information*
   typescript
   // Example client data
   {
     invoiceNumber: "INV-001",
     clientName: "John Doe",
     clientEmail: "john@example.com",
     clientAddress: "123 Main St\nNew York, NY 10001"
   }
   

2. *Adding Line Items*
   typescript
   // Example line items
   [
     {
       description: "Web Development Services",
       quantity: 40,
       rate: 75.00,
       amount: 3000.00
     },
     {
       description: "UI/UX Design",
       quantity: 20,
       rate: 85.00,
       amount: 1700.00
     }
   ]
   

3. *Applying Discounts & Taxes*
   - *Discount*: Enter percentage (e.g., 10 for 10%)
   - *Tax*: Enter tax rate (e.g., 8.5 for 8.5%)
   - Calculations update automatically

4. *Generating PDF*
   - Click "Download PDF" button
   - Professional invoice PDF downloads instantly
   - Styled with company branding and formatting

### Theme Switching
Toggle between light and dark modes using the switch in the top-right corner. Theme preference is maintained during the session.

## 🎯 API Documentation

### Endpoints

#### Generate PDF
http
POST /api/invoices/generate-pdf
Content-Type: application/json

{
  "invoiceData": {
    "invoiceNumber": "INV-001",
    "clientName": "John Doe",
    "clientEmail": "john@example.com",
    "clientAddress": "123 Main St\nNew York, NY 10001",
    "items": [
      {
        "description": "Service",
        "quantity": 1,
        "rate": 100,
        "amount": 100
      }
    ],
    "subtotal": 100,
    "discount": 0,
    "tax": 0,
    "total": 100
  }
}


*Response*: PDF file download

#### Health Check
http
GET /api/health


*Response*:
json
{
  "status": "Server is running!",
  "timestamp": "2025-08-01T14:30:00.000Z"
}


## 🗂 Project Structure


seopl-invoice-generator/
├── 📁 client/                    # React Frontend
│   ├── 📁 public/               # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/       # React components
│   │   │   ├── InvoiceForm.tsx  # Form component
│   │   │   └── InvoicePreview.tsx # Preview component
│   │   ├── 📁 types/           # TypeScript definitions
│   │   │   └── Invoice.ts      # Invoice interfaces
│   │   ├── App.tsx             # Main app component
│   │   └── index.tsx           # Entry point
│   ├── package.json            # Frontend dependencies
│   └── tsconfig.json           # TypeScript config
├── 📁 server/                   # Express Backend
│   ├── 📁 routes/              # API routes
│   │   └── invoices.js         # Invoice endpoints
│   ├── server.js               # Server entry point
│   └── package.json            # Backend dependencies
├── README.md                   # Project documentation
├── LICENSE                     # MIT license
└── .gitignore                 # Git ignore rules


## 🛠 Development

### Available Scripts

#### Backend (/server)
bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run build    # Install dependencies (for deployment)


#### Frontend (/client)
bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
npm run eject    # Eject from Create React App


### Environment Variables

Create .env file in server directory:
env
PORT=5000
NODE_ENV=development


### Code Examples

#### Adding Custom Validation
typescript
// In InvoiceForm.tsx
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


#### Custom PDF Styling
javascript
// In routes/invoices.js
const customCSS = `
  .custom-header {
    background: linear-gradient(45deg, #1976d2, #42a5f5);
    color: white;
    padding: 20px;
  }
`;


## 🚀 Deployment

### Production Build

1. *Build Frontend*
   bash
   cd client
   npm run build
   

2. *Deploy to Heroku*
   bash
   # Install Heroku CLI, then:
   heroku create your-invoice-app
   heroku buildpacks:set heroku/nodejs
   git push heroku main
   

3. *Deploy to Vercel (Frontend) + Railway (Backend)*
   bash
   # Frontend to Vercel
   cd client
   vercel --prod
   
   # Backend to Railway
   cd server
   railway login
   railway deploy
   

### Environment Configuration

#### Production Environment Variables
env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com


## 🧪 Testing

### Running Tests
bash
# Frontend tests
cd client
npm test

# Backend tests (if implemented)
cd server
npm test


### Test Coverage
bash
npm test -- --coverage


## 📊 Performance

### Optimization Features
- *React.memo()* for component optimization
- *Lazy loading* for code splitting
- *Efficient re-renders* with proper state management
- *Optimized PDF generation* with Puppeteer settings

### Bundle Analysis
bash
cd client
npm run build
npx bundle-analyzer build/static/js/*.js


## 🐛 Troubleshooting

### Common Issues

#### PDF Generation Fails
bash
# Install additional dependencies for Puppeteer
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2


#### CORS Errors
- Ensure backend is running on port 5000
- Check CORS configuration in server.js

#### TypeScript Errors
bash
# Clear TypeScript cache
rm -rf node_modules/@types
npm install


### Debug Mode
bash
# Enable debug logs
DEBUG=* npm run dev


## 🤝 Contributing

1. *Fork the repository*
2. *Create a feature branch*
   bash
   git checkout -b feature/amazing-feature
   
3. *Commit your changes*
   bash
   git commit -m 'Add amazing feature'
   
4. *Push to the branch*
   bash
   git push origin feature/amazing-feature
   
5. *Open a Pull Request*

### Development Guidelines
- Follow TypeScript best practices
- Add tests for new features
- Update documentation
- Use conventional commit messages

## 📄 License

This project is licensed under the *MIT License* - see the [LICENSE](LICENSE) file for details.


MIT License

Copyright (c) 2025 Priyanshu Singh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...


## 🙏 Acknowledgments

- *SEOPL* for the challenging and engaging full-stack project
- *Material-UI* team for the excellent component library
- *Puppeteer* team for robust PDF generation capabilities
- *React* and *TypeScript* communities for amazing tools

## 📞 Contact & Support

- *Developer*: Priyanshu Singh
- *GitHub*: [@dev-priyanshu15](https://github.com/dev-priyanshu15)
- *Project Link*: [seopl-invoice-generator](https://github.com/dev-priyanshu15/seopl-invoice-generator)

---

<div align="center">

*⭐ Star this repository if you found it helpful!*

Built with ❤ for the SEOPL Full Stack Challenge

</div>
