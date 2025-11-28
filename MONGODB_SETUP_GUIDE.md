# MongoDB Setup Guide

This guide will walk you through setting up MongoDB for your CMS project. Choose **Option A** (recommended) or **Option B**.

---

## Option A: MongoDB Atlas (Cloud - Recommended) ⭐

MongoDB Atlas is a free cloud database service. No installation needed!

### Step 1: Create MongoDB Atlas Account

1. Go to **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with:
   - Email address
   - Or Google account
   - Or GitHub account
3. Complete the registration

### Step 2: Create a Free Cluster

1. After login, click **"Build a Database"** or **"Create"**
2. Choose **"M0 FREE"** tier (it's completely free forever)
3. Select a cloud provider and region:
   - **Provider**: AWS, Google Cloud, or Azure (any works)
   - **Region**: Choose closest to your location (e.g., Mumbai for India)
4. Click **"Create Cluster"** (takes 3-5 minutes to provision)

### Step 3: Create Database User

1. You'll see a **"Security Quickstart"** screen
2. Under **"How would you like to authenticate your connection?"**:
   - Choose **"Username and Password"**
   - Username: `admin` (or any name you prefer)
   - Password: Click **"Autogenerate Secure Password"** and **COPY IT**
   - Or create your own password (remember it!)
3. Click **"Create User"**

### Step 4: Set Up Network Access

1. Still on Security Quickstart, scroll to **"Where would you like to connect from?"**
2. Choose **"My Local Environment"**
3. Click **"Add My Current IP Address"**
   - Or click **"Add IP Address"** and enter `0.0.0.0/0` (allows access from anywhere - less secure but easier for development)
4. Click **"Finish and Close"**

### Step 5: Get Connection String

1. Click **"Database"** in the left sidebar
2. Find your cluster (usually named "Cluster0")
3. Click **"Connect"** button
4. Choose **"Connect your application"**
5. Select:
   - **Driver**: Node.js
   - **Version**: 5.5 or later
6. **COPY** the connection string (looks like this):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Connection String

1. Replace `<password>` with your actual password (from Step 3)
2. Add database name after `.net/`:
   ```
   mongodb+srv://admin:YourPassword@cluster0.xxxxx.mongodb.net/website-cms?retryWrites=true&w=majority
   ```

### Step 7: Configure Your Project

1. Open `d:\HITESH\website-cms\.env.local.example`
2. Copy it to create `.env.local`:
   ```powershell
   cd d:\HITESH\website-cms
   Copy-Item .env.local.example .env.local
   ```
3. Edit `.env.local` and paste your connection string:
   ```env
   MONGODB_URI=mongodb+srv://admin:YourPassword@cluster0.xxxxx.mongodb.net/website-cms?retryWrites=true&w=majority
   ```

### Step 8: Generate NextAuth Secret

In PowerShell, run:
```powershell
# Generate a random secret
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

Copy the output and add to `.env.local`:
```env
NEXTAUTH_SECRET=your_generated_secret_here
```

### Step 9: Complete .env.local File

Your final `.env.local` should look like:
```env
MONGODB_URI=mongodb+srv://admin:YourPassword@cluster0.xxxxx.mongodb.net/website-cms?retryWrites=true&w=majority
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=abc123xyz789randomsecret12345678
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

**✅ You're done with MongoDB Atlas setup!**

---

## Option B: Local MongoDB Installation

Install MongoDB on your Windows machine.

### Step 1: Download MongoDB

1. Go to **https://www.mongodb.com/try/download/community**
2. Select:
   - **Version**: Latest (e.g., 7.0.x)
   - **Platform**: Windows
   - **Package**: MSI
3. Click **"Download"**

### Step 2: Install MongoDB

1. Run the downloaded `.msi` file
2. Choose **"Complete"** installation
3. **Important**: Check **"Install MongoDB as a Service"**
4. Check **"Install MongoDB Compass"** (optional GUI tool)
5. Click **"Next"** and **"Install"**
6. Wait for installation to complete

### Step 3: Verify Installation

Open PowerShell and run:
```powershell
mongod --version
```

You should see version information. If not, add MongoDB to PATH:
1. Search for "Environment Variables" in Windows
2. Edit "Path" variable
3. Add: `C:\Program Files\MongoDB\Server\7.0\bin`

### Step 4: Start MongoDB Service

MongoDB should start automatically. To verify:
```powershell
# Check if service is running
Get-Service -Name MongoDB
```

If not running, start it:
```powershell
# Start MongoDB service
Start-Service -Name MongoDB
```

### Step 5: Configure Your Project

1. Copy `.env.local.example` to `.env.local`:
   ```powershell
   cd d:\HITESH\website-cms
   Copy-Item .env.local.example .env.local
   ```

2. Edit `.env.local`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/website-cms
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=generate_random_secret_here
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   ```

3. Generate `NEXTAUTH_SECRET` (same as Option A, Step 8)

**✅ You're done with local MongoDB setup!**

---

## Next Steps (After MongoDB Setup)

Now that MongoDB is configured, continue with the project setup:

### 1. Install Dependencies
```powershell
cd d:\HITESH\website-cms
npm install
```

### 2. Seed the Database
```powershell
npm run seed
```

You should see:
```
✅ Database seeded successfully!

Admin credentials:
Email: admin@example.com
Password: admin123
```

### 3. Start Development Server
```powershell
npm run dev
```

### 4. Access Your Site
- **Public Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

---

## Troubleshooting

### MongoDB Atlas Issues

**Problem**: "Authentication failed"
- **Solution**: Double-check your password in the connection string
- Make sure you replaced `<password>` with actual password

**Problem**: "Connection timeout"
- **Solution**: Check IP whitelist in Atlas (add `0.0.0.0/0` for testing)

**Problem**: "Network error"
- **Solution**: Check your internet connection

### Local MongoDB Issues

**Problem**: "MongoServerError: connect ECONNREFUSED"
- **Solution**: MongoDB service not running. Run `Start-Service -Name MongoDB`

**Problem**: "mongod command not found"
- **Solution**: Add MongoDB to PATH (see Step 3 above)

### General Issues

**Problem**: Seed script fails
- **Solution**: Check `MONGODB_URI` in `.env.local` is correct
- Make sure MongoDB is accessible

**Problem**: Can't login to admin
- **Solution**: Run `npm run seed` again to recreate admin user

---

## Quick Reference

### MongoDB Atlas Connection String Format
```
mongodb+srv://username:password@cluster.mongodb.net/database?options
```

### Local MongoDB Connection String Format
```
mongodb://localhost:27017/database
```

### Check MongoDB Atlas Status
- Login to https://cloud.mongodb.com
- Go to "Database" → View your cluster

### Check Local MongoDB Status
```powershell
Get-Service -Name MongoDB
```

---

## Security Tips

🔒 **For Production**:
1. Use MongoDB Atlas (more secure than local)
2. Use strong passwords
3. Whitelist only specific IP addresses
4. Change default admin password immediately
5. Use environment variables (never commit `.env.local`)
6. Enable 2FA on MongoDB Atlas account

---

**Need Help?**
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB Local Docs: https://docs.mongodb.com/manual/
- Check the main README.md for more information
