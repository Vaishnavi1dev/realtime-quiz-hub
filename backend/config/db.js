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
      console.warn('⚠️  Server will run without database (connecting services...)');
      console.warn('💡 Go to Railway dashboard → Connect MongoDB service to SmartQuizapp');
      return; // Allow server to start while we fix connection
    }

    console.log('🔄 Connecting to Railway MongoDB (REQUIRED)...');
    console.log('📍 URI pattern:', mongoUri.substring(0, 20) + '...');

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000, // 15 second timeout
      socketTimeoutMS: 45000, // 45 second socket timeout
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 10, // Connection pool size
      minPoolSize: 2, // Minimum connections
      retryWrites: true,
      w: 'majority'
    });

    console.log(`✅ Railway MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Connection state: ${conn.connection.readyState}`);
    
    // Test the connection with a real operation
    await mongoose.connection.db.admin().ping();
    console.log('✅ MongoDB ping successful - database is ready');
    
    // Test collections access
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📋 Available collections: ${collections.map(c => c.name).join(', ')}`);
    
  } catch (error) {
    console.error(`❌ CRITICAL DATABASE ERROR: ${error.message}`);
    
    if (error.message.includes('Authentication failed')) {
      console.error('❌ Database authentication failed - check credentials');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.error('❌ Cannot reach MongoDB service - check Railway dashboard');
    } else if (error.message.includes('timeout')) {
      console.error('❌ Database connection timeout - service may be down');
    }
    
    console.warn('⚠️  Server will continue while we fix database connection');
    console.warn('⚠️  Connect MongoDB service in Railway dashboard');
    // Don't exit - let server start while we fix connection
  }
};

module.exports = connectDB;
