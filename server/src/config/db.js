import mongoose from 'mongoose';

const connectDB = async () => {
  let retries = 5;
  while (retries) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      break;
    } catch (error) {
      console.error(`MongoDB Connection Error: ${error.message}`);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  mongoose.connection.on('error', err => {
    console.error(`MongoDB event error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
};

export default connectDB;
