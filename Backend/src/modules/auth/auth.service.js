import jwt from "jsonwebtoken";
import pool from "../../config/db.js"
import { REFRESH_SECRET } from "../../config/env.js";


export const signupService = async ({ username, email, age, password }) => {
    try {
        const res = await pool.query(`INSERT INTO users(name, email, age, password) VALUES ($1, $2, $3, $4) RETURNING id, email`
            , [username, email, age, password]
        )

        return res.rows[0]
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

        if (res.rows[0]) {
            return true
        }
        return true

    } catch (error) {
        throw error
    }
}

export const deleteToken = async (token) => {
    try {
        const res = await pool.query("DELETE FROM tokens WHERE token = $1 RETURNING *", [token])
        if(res.rows[0]) return true;

        return false
    } catch (error) {
        throw error
    }
}

export const saveOTP = async (otp, id) => {
    try {
        const current = new Date();
        current.setMinutes(current.getMinutes() + 15)
        await pool.query("DELETE * FROM emailverificationotp WHERE user_id = $1", [id]);
        const data = await pool.query("INSERT INTO emailverificationotp(user_id, otp_hash, expires_at) VALUES ($1, $2, $3) RETURNING id ", [id, otp, current])

        return data.rows[0].id
    } catch (error) {
        throw error
    }
}

export const verifyEmailService = async ({email, hashedOTP}) => {
    try {
        const data = await pool.query('SELECT * FROM emailverificationotp WHERE email = $1', [email]);

        const user = data.rows[0][0]
        console.log(data.rows[0])

        if(!user) return {verified: false, message: "Verify your email later"}

        const current = new Date();
        if( current > user.expires_at) return {verified: false, message: "OTP has been expired, please try again"}
        if(!user.otp_hash === hashedOTP) return {verified: false, message: "Wrong otp try againg"}

        await pool.query("UPDATE user SET email_verified = true WHERE email = $1", [email])

        return {verified: true}
    } catch (error) {
        throw error
    }
}