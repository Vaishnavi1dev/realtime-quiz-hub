# MongoDB Atlas Setup Guide

## Option 1: MongoDB Atlas (Recommended - Free Cloud Database)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" or "Sign Up"
3. Create account with email or Google

### Step 2: Create a Cluster
1. After login, click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select a cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to you
5. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username (e.g., `quizadmin`)
5. Enter password (save this!)
6. Set privileges to "Read and write to any database"
7. Click "Add User"

### Step 4: Whitelist IP Address
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address
4. Click "Confirm"

### Step 5: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 6: Update .env File
1. Open `backend/.env`
2. Replace the MONGODB_URI with your connection string
3. Replace `<username>` with your database username
4. Replace `<password>` with your database password
5. Add database name after `.net/`: `...mongodb.net/quizmaster?retryWrites...`

Example:
```
MONGODB_URI=mongodb+srv://quizadmin:mypassword123@cluster0.abc123.mongodb.net/quizmaster?retryWrites=true&w=majority
```

### Step 7: Test Connection
```bash
cd backend
npm run dev
```

You should see: `✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net`

---

## Option 2: Local MongoDB Installation

### Windows:
1. Download from: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Complete" installation
4. Install as Windows Service
5. Use connection string: `mongodb://localhost:27017/quizmaster`

### Mac (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu):
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

---

## Troubleshooting

### Connection Timeout
- Check if IP is whitelisted in Network Access
- Verify username and password are correct
- Ensure no firewall blocking port 27017

### Authentication Failed
- Double-check username and password
- Make sure user has correct permissions
- Password special characters must be URL encoded

### Cannot Connect to Local MongoDB
- Check if MongoDB service is running
- Verify port 27017 is not blocked
- Try: `mongod --version` to check installation

---

## Quick Start (No Database)

The server can run without MongoDB for testing:
1. Comment out or remove MONGODB_URI from .env
2. Server will start with in-memory data only
3. Data will be lost on server restart

---

## Need Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB Community: https://www.mongodb.com/community/forums/
- Connection String Format: https://docs.mongodb.com/manual/reference/connection-string/
