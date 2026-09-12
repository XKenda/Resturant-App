import jwt from "jsonwebtoken";
import pool from "../../config/db.js"
import { REFRESH_SECRET } from "../../config/env.js";
import datetime from "datetime"


export const signupService = async ({ username, email, age, password }) => {
    try {
        const id = await pool.query(`INSERT INTO users(name, email, age, password) VALUES ($1, $2, $3, $4) RETURNING id`
            , [username, email, age, password]
        )
        return id.rows[0].id
    } catch (error) {
        throw error
    }
}

export const userIsExist = async (email) => {
    try {
        const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (res.rows[0]) return res.rows[0]
    } catch (error) {
        throw error
    }
}

export const createRefreshToken = async (data) => {
    try {
        const token = jwt.sign(data, REFRESH_SECRET)

        return token
    } catch (error) {
        throw error
    }
}

export const savetokenToDatabase = async (token) => {
    try {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 15)

        const res = await pool.query('INSERT INTO tokens(token, enddate) VALUES ($1 , $2) RETURNING id', [token, endDate])
        console.log(res)
        if (res.rows[0]) {
            return true
        }
        return true

    } catch (error) {
        throw error
    }
}