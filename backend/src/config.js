import dotenv from 'dotenv';

dotenv.config({ silent: true });
export const { JWT_SECRET, SERVER_PORT, DB_URL } = process.env;