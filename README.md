# Website CMS with Next.js & MongoDB

A modern, full-featured Content Management System built with Next.js and MongoDB. Manage your website content from anywhere with a secure admin panel.

## Features

✨ **Public Website**
- Modern, responsive design with dark theme
- Hero section with call-to-action
- Products showcase with categories and pricing
- Contact information with social media links
- Smooth animations and transitions

🔐 **Admin Panel**
- Secure authentication with NextAuth.js
- Edit hero section content
- Full product management (Create, Read, Update, Delete)
- Update contact information
- Real-time content updates

## Tech Stack

- **Frontend**: Next.js 14, React 18
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js
- **Styling**: Custom CSS with modern design system

## Prerequisites

- Node.js 18+ installed
- MongoDB database (either local or MongoDB Atlas)

## Setup Instructions

### 1. Install Dependencies

```bash
cd website-cms
npm install
```

### 2. Set Up MongoDB

**Option A: MongoDB Atlas (Recommended - Free Cloud Database)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string

**Option B: Local MongoDB**

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/website-cms`

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Edit `.env.local` with your values:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key_here

# Admin Credentials (for seeding)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

**Important**: Generate a secure `NEXTAUTH_SECRET`:
```bash
# On Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Or use any random string generator
```

### 4. Seed the Database

```bash
npm run seed
```

This will create:
- Admin user with your credentials
- Sample hero content
- 6 sample products
- Contact information

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Public Website

Visit `http://localhost:3000` to see your website with:
- Hero section
- Products listing
- Contact information

### Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Login with your admin credentials (default: `admin@example.com` / `admin123`)
3. Use the dashboard to manage content:
   - **Hero Tab**: Edit hero section text and CTA
   - **Products Tab**: Add, edit, or delete products
   - **Contact Tab**: Update contact info and social links

### Updating Content

All changes made in the admin panel are immediately reflected on the public website. Just refresh the page to see updates!

## Project Structure

```
website-cms/
├── components/           # React components
│   ├── Hero.js          # Hero section
│   ├── Products.js      # Products grid
│   ├── Contact.js       # Contact section
│   └── admin/           # Admin components
│       ├── HeroEditor.js
│       ├── ProductsManager.js
│       └── ContactEditor.js
├── pages/               # Next.js pages
│   ├── index.js         # Homepage
│   ├── _app.js          # App wrapper
│   ├── admin/           # Admin pages
│   │   ├── login.js
│   │   └── dashboard.js
│   └── api/             # API routes
│       ├── auth/        # NextAuth
│       ├── hero.js
│       ├── products/
│       └── contact.js
├── models/              # MongoDB models
│   ├── User.js
│   ├── Hero.js
│   ├── Product.js
│   └── Contact.js
├── lib/                 # Utilities
│   ├── mongodb.js       # DB connection
│   └── seed.js          # Seeding script
└── styles/              # CSS files
    ├── globals.css
    └── admin.module.css
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

Works with any Node.js hosting platform:
- Netlify
- Railway
- Render
- AWS
- DigitalOcean

**Remember to**:
- Set all environment variables
- Use MongoDB Atlas for production
- Change default admin password!

## Security Recommendations

🔒 **Important Security Steps**:

1. **Change Default Password**: Immediately change the admin password after first login
2. **Use Strong Secrets**: Generate a strong `NEXTAUTH_SECRET`
3. **HTTPS in Production**: Always use HTTPS for production deployments
4. **Environment Variables**: Never commit `.env.local` to version control
5. **MongoDB Security**: Use MongoDB Atlas with IP whitelisting and strong passwords

## Customization

### Adding New Content Sections

1. Create a new model in `models/`
2. Add API routes in `pages/api/`
3. Create component in `components/`
4. Add editor in `components/admin/`
5. Update dashboard to include new tab

### Styling

- Edit `styles/globals.css` for public website styles
- Edit `styles/admin.module.css` for admin panel styles
- Customize CSS variables in `:root` for colors and themes

## Troubleshooting

**MongoDB Connection Error**
- Check your connection string in `.env.local`
- Ensure MongoDB Atlas IP whitelist includes your IP
- For local MongoDB, ensure service is running

**NextAuth Error**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain

**Can't Login**
- Run `npm run seed` again to recreate admin user
- Check browser console for errors

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review MongoDB and Next.js documentation
3. Check browser console for error messages

## License

MIT License - feel free to use for personal or commercial projects!

---

**Built with ❤️ using Next.js and MongoDB**
