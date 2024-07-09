import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  MONGODB_URI: string;
  DB_NAME: string;
}

const envConfig: EnvConfig = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  DB_NAME: process.env.DB_NAME || 'your_default_database_name',
};

export default envConfig;
