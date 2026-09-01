import { Pool } from "pg";
import { DATABASE_URL } from "./env.js";


const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

export const connectToDatabase = async () => {
    await pool.connect().then(() => {
        console.log("\nConnected To Database\n")
    }).catch((error) => {
        console.log("\n=================================\nFailed Connecting to Database\n============================\n");
        console.log(`\n=================================\nError: ${Object(error)}\n============================\n`)
    })
}

export default pool