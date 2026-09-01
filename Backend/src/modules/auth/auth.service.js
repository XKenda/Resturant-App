import pool from "../../config/db.js"


export const signupService = async ({username, email, age , password}) => {
    try {
        const id = await pool.query(`INSERT INTO users(name, email, age, password) VALUES ($1, $2, $3, $4) RETURNING id`
            , [username, email, age, password]
        )
        return id.rows[0].id
    } catch (error) {
        throw error
    }
}