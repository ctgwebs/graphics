# Design Templates Website - Production Ready! 🎉

A modern, responsive website for downloading free and premium editable vector design templates built with Next.js 14, MongoDB, and Stripe.

## 🚀 Live Demo
Visit: [Your Vercel URL]

## ✨ Features

### Core Functionality
- ✅ **Home page** with hero section, featured templates, and categories
- ✅ **Template browsing** with search, filters, and pagination
- ✅ **Template detail pages** with preview and download
- ✅ **User authentication** (registration, login, dashboard)
- ✅ **Admin dashboard** with template management
- ✅ **Payment processing** with Stripe for premium templates
- ✅ **File upload** system for template management
- ✅ **Favorites** and download tracking

### Design & UX
- ✅ **Responsive design** with Pinterest-style grid layout
- ✅ **Dark/Light mode** toggle
- ✅ **Modern UI** with shadcn/ui components
- ✅ **Smooth animations** and transitions
- ✅ **Mobile-first** approach

### SEO & Performance
- ✅ **SEO optimized** with proper metadata
- ✅ **Sitemap** and robots.txt generation
- ✅ **Performance monitoring** with Vercel Analytics
- ✅ **Image optimization** with Next.js Image
- ✅ **Server-side rendering** for better SEO

### Admin Features
- ✅ **Template upload** with drag-and-drop
- ✅ **Template management** (CRUD operations)
- ✅ **User management** and analytics
- ✅ **Order tracking** and revenue monitoring
- ✅ **Category management**

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS, shadcn/ui, Framer Motion
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB with Mongoose ODM
- **Payments**: Stripe for premium templates
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics, Google Analytics (optional)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18.17 or later
- MongoDB database (Atlas or local)
- Stripe account (for payments)

### Environment Variables
Create a `.env.local` file with:

\`\`\`env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_URL=your_app_url
NEXTAUTH_SECRET=your_nextauth_secret

# Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# App Configuration
NEXT_PUBLIC_APP_URL=your_app_url

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_FB_PIXEL_ID=your_facebook_pixel_id
\`\`\`

### Installation Steps

1. **Clone and install dependencies:**
\`\`\`bash
git clone <your-repo-url>
cd design-templates
npm install
\`\`\`

2. **Set up environment variables:**
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your values
\`\`\`

3. **Seed the database:**
\`\`\`bash
npm run seed
\`\`\`

4. **Run development server:**
\`\`\`bash
npm run dev
\`\`\`

5. **Open in browser:**
\`\`\`
http://localhost:3000
\`\`\`

## 🗄 Database Schema

### Collections

#### Templates
\`\`\`typescript
{
  _id: ObjectId
  title: string
  slug: string
  description: string
  category: string
  tags: string[]
  imageUrl: string
  fileUrl: string
  fileFormats: string[]
  isPremium: boolean
  price?: number
  downloadCount: number
  viewCount: number
  likeCount: number
  status: "draft" | "published" | "archived"
  createdAt: Date
  updatedAt: Date
  author: string
}
\`\`\`

#### Users
\`\`\`typescript
{
  _id: ObjectId
  name: string
  email: string
  password: string // hashed
  role: "user" | "admin"
  downloads: Array<{templateId: ObjectId, downloadedAt: Date}>
  favorites: ObjectId[]
  createdAt: Date
  updatedAt: Date
}
\`\`\`

#### Orders
\`\`\`typescript
{
  _id: ObjectId
  userId: ObjectId
  templateId: ObjectId
  amount: number
  paymentId: string
  status: "pending" | "completed" | "failed"
  createdAt: Date
}
\`\`\`

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub:**
\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

2. **Deploy to Vercel:**
- Connect your GitHub repository to Vercel
- Configure environment variables in Vercel dashboard
- Deploy automatically

3. **Configure Stripe Webhooks:**
- Add webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
- Select events: `checkout.session.completed`
- Copy webhook secret to environment variables

### Manual Deployment

\`\`\`bash
npm run build
npm start
\`\`\`

## 👤 Default Admin Account

After running the seed script:
- **Email**: admin@designtemplates.com
- **Password**: admin123

⚠️ **Important**: Change the admin password after first login!

## 📊 Analytics & Monitoring

### Built-in Analytics
- Vercel Analytics (automatic)
- Template download tracking
- User engagement metrics
- Revenue tracking

### Optional Integrations
- Google Analytics
- Facebook Pixel
- Custom event tracking

## 🔧 Configuration

### Stripe Setup
1. Create Stripe account
2. Get API keys from dashboard
3. Configure webhook endpoints
4. Test with Stripe test cards

### MongoDB Setup
1. Create MongoDB Atlas cluster
2. Configure network access
3. Create database user
4. Get connection string

### File Upload (Optional)
Configure cloud storage for production:
- AWS S3
- Cloudinary
- Vercel Blob Storage

## 📈 Business Features

### Revenue Streams
- Premium template sales
- Subscription plans (future)
- Custom design services
- Affiliate partnerships

### Marketing Tools
- SEO optimization
- Social sharing
- Newsletter integration
- Analytics tracking

### Admin Tools
- Sales dashboard
- User analytics
- Template performance
- Revenue reporting

## 🛡 Security

- Password hashing with bcrypt
- JWT-based authentication
- CSRF protection
- Input validation
- Rate limiting (recommended for production)

## 🔄 Maintenance

### Regular Tasks
- Database backups
- Security updates
- Performance monitoring
- Content moderation

### Scaling Considerations
- CDN for static assets
- Database indexing
- Caching strategies
- Load balancing

## 📞 Support

For technical support or questions:
- Email: support@designtemplates.com
- Documentation: [Link to docs]
- GitHub Issues: [Link to issues]

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using Next.js, MongoDB, and Stripe**
