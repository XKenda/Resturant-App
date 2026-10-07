import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV ? "production" : 'development'}.local`})

export const {
    PORT,
    DATABASE_URL,
    REFRESH_SECRET,
    SMTP_USER,
    SMTP_PASS
} = process.env