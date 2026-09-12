import pool from "../config/db.js";


const checkToken = async (token) => {
    try {
        const current = new Date()
        const res = await pool.query(`SELECT * FROM tokens WHERE token = $1 AND enddate >= $2`, [token, current])

        if (res.rows[0].token) {
            return true;
        }
        return false
    } catch (error) {
        throw error;
    }
}

export default checkToken;