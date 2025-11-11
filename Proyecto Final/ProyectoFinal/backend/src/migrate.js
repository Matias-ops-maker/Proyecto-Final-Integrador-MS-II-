import dotenv from 'dotenv';
import { sequelize, syncModels } from './models/index.js';

dotenv.config();

async function migrate() {
  try {
    await sequelize.authenticate();
    await syncModels();
    await sequelize.close();
    } catch (error) {
    process.exit(1);
  }
}

if (import.meta.url === `file:
  migrate();
}

export default migrate;

