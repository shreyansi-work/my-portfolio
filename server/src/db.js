import mongoose from 'mongoose';

/** Connects to MongoDB Atlas. Returns true on success. The URI itself is never logged. */
export async function connectMongo(uri) {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('MongoDB connected');
    return true;
  } catch (err) {
    console.error('MongoDB connection failed:', err.name, '-', err.message.split('\n')[0]);
    return false;
  }
}

export async function disconnectMongo() {
  await mongoose.disconnect();
}
