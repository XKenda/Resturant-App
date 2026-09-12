import pool from "../config/db.js"


const getUser = async (id) => {
    try {
        const res = await pool.query(`SELECT id, name, email, age FROM users WHERE id = $1 `, [id]);

        if(res.rows[0]) {
            return res.rows[0];
        }
        return false
    } catch (error) {
        throw error
    }
}

export default getUser;