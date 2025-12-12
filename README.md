# EduPlus - Online Tutoring Platform



## 🎓 About EduPlus

EduPlus is a comprehensive online tutoring platform that connects students with qualified tutors for personalized learning experiences. Our platform facilitates seamless tuition booking, payment processing, and educational management for students, tutors, and administrators.

### ✨ Key Features

- **🔐 Multi-Role Authentication** - Student, Tutor, and Admin dashboards
- **📚 Tuition Management** - Post, browse, and apply for tuitions
- **💳 Secure Payments** - Integrated payment processing with Stripe
- **📊 Analytics Dashboard** - Comprehensive reporting and analytics
- **👤 Profile Management** - Complete user profile customization
- **📱 Responsive Design** - Mobile-first, responsive UI/UX
- **🎨 Modern Animations** - Framer Motion powered smooth animations
- **🔍 Advanced Search** - Filter and search tutors and tuitions
- **📧 Real-time Notifications** - Toast notifications and alerts

## 🚀 Live Demo

- **Frontend**: [EduPlus Live Site](https://your-live-site-url.com)


## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Framer Motion** - Animation library
- **React Hook Form** - Form validation and management
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library
- **Lottie React** - Lottie animations

### Backend & Services
- **Firebase Authentication** - User authentication
- **Axios** - HTTP client for API requests
- **Stripe** - Payment processing
- **React Query (TanStack Query)** - Server state management

### Development Tools
- **ESLint** - Code linting
- **Vite** - Build tool and dev server
- **npm** - Package manager


## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Stripe account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/eduplus.git
cd eduplus
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id


```

### 4. Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google providers
3. Set up Firestore database
4. Add your domain to authorized domains

### 5. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build & Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify/Vercel
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables on your hosting platform

## 👥 User Roles & Features

### 🎓 Students
- Browse and search available tuitions
- Apply for tuitions with tutors
- Make secure payments via Stripe
- Track application status
- Manage profile and preferences
- View payment history

### 👨‍🏫 Tutors
- Create and manage tutor profiles
- Post available tuition slots
- Review and manage student applications
- Track earnings and payments
- Manage active tuitions
- Update availability and subjects

### 👨‍💼 Administrators
- User management (students and tutors)
- Tuition oversight and moderation
- Payment and transaction monitoring
- Platform analytics and reporting
- Content management
- System configuration

## 🎨 UI/UX Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

- **Smooth Animations** - Framer Motion powered interactions
- **Modern Components** - Clean, professional design system
- **Accessibility** - WCAG compliant interface
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - User-friendly error messages

## 🔐 Authentication & Security

- **Firebase Authentication** - Secure user authentication
- **Role-based Access Control** - Different permissions for each user type
- **Protected Routes** - Route guards for authenticated users
- **Secure API Calls** - Axios interceptors for secure requests
- **Input Validation** - Client and server-side validation

## 💳 Payment Integration

- **Stripe Integration** - Secure payment processing
- **Multiple Payment Methods** - Credit cards, digital wallets
- **Payment History** - Complete transaction records
- **Refund Management** - Automated refund processing
- **Receipt Generation** - Downloadable payment receipts

## 📊 Analytics & Reporting

- **User Analytics** - Registration and engagement metrics
- **Payment Analytics** - Revenue and transaction insights
- **Tuition Analytics** - Popular subjects and demand trends
- **Performance Metrics** - Platform usage statistics
- **Custom Reports** - Exportable data reports






## 📝 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Testing (if implemented)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 🐛 Known Issues & Troubleshooting

### Common Issues
1. **Firebase Configuration**: Ensure all environment variables are correctly set
2. **Payment Issues**: Verify Stripe keys and webhook configuration
3. **Build Errors**: Clear node_modules and reinstall dependencies
4. **Authentication Problems**: Check Firebase project settings




## 👨‍💻 Author

**Your Name**
- GitHub: [@shajidaa](https://github.com/Shajidaa)
- LinkedIn: [Shajida Akter Lopa](https://www.linkedin.com/in/shajida-akter-lopa/)
- Email: shajidaislam34@gmail.com
## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Firebase for authentication and backend services
- Stripe for secure payment processing
- All contributors and users of EduPlus


---

**Made with ❤️ for better education**

For more information,  contact us at [shajidaislam34@gmail.com](mailto:shajidaislam34@gmail.com).