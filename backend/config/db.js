const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Railway auto-generates these environment variables when you add a MongoDB service
    const mongoUri = process.env.MONGODB_URI || 
                     process.env.MONGO_URL || 
                     process.env.MONGO_PUBLIC_URL ||
                     process.env.DATABASE_URL ||
                     process.env.MONGODB_URL; // Railway sometimes uses this
    
    if (!mongoUri) {
      console.warn('⚠️  MongoDB URI not found in environment variables.');
      console.warn('⚠️  Server will run without database (some features disabled)');
      console.warn('💡 To add MongoDB: Railway dashboard → New → Database → Add MongoDB');
      return; // Don't crash, just continue without DB
    }

    console.log('🔄 Connecting to Railway MongoDB...');
    console.log('📍 URI:', mongoUri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in logs

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 30000, // 30 second socket timeout
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 5, // Reduce connection pool size
      minPoolSize: 1, // Maintain at least 1 socket connection
    });

    console.log(`✅ Railway MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Test the connection
    await mongoose.connection.db.admin().ping();
    console.log('✅ MongoDB ping successful');
    
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    if (error.message.includes('Authentication failed')) {
      console.error('❌ Database authentication failed.');
      console.error('💡 Try removing and re-adding the MongoDB service in Railway');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.error('❌ Cannot reach Railway MongoDB service.');
      console.error('💡 Check if MongoDB service is running in Railway dashboard');
    } else if (error.message.includes('timeout')) {
      console.error('❌ Connection timeout to Railway MongoDB.');
      console.error('💡 Railway MongoDB might be starting up, try again in a moment');
    }
    
    console.warn('⚠️  Server will continue without database connection');
    console.warn('⚠️  Some features may not work properly');
    // Don't exit - let server run without DB for now
  }
};

module.exports = connectDB;
