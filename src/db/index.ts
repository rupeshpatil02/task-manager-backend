import mongoose, { ConnectOptions } from 'mongoose';
import envConfig from './dbConfig';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${envConfig.MONGODB_URI}/${envConfig.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions // Type assertion here
    );

    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('MONGODB connection FAILED ', error);
    process.exit(1);
  }
};

export default connectDB;

