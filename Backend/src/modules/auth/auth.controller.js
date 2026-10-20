import bcrypt from "bcryptjs";
import { createRefreshToken, deleteToken, saveOTP, savetokenToDatabase, signupService, userIsExist } from "./auth.service.js";
import transport from "../../config/nodemailer.config.js";
import sendEmail from "../../shared/send_email.js";
import { emailVerifictionBody } from "../../utils/emailsBody.js";
import GenerateOTP from "../../shared/otpGeneration.js";
import hashOTP from "../../shared/otpHashing.js";
import hashOTP from "../../shared/otpHashing.js";


export const signupController = async (req, res, next) => {
    try {
        const {username, email, password, age} = req.body

        const hashedpassword = await bcrypt.hash(password, 8);

        const data = await signupService({username, email, age, password:hashedpassword})

        const otp = GenerateOTP();
        const hashedOTP = hashOTP(otp);
        const id = await saveOTP(hashedOTP, data.id)

        await sendEmail(data.email, emailVerifictionBody(otp))

        

        return res.status(200).json({success: true, id : data.id});
    } catch (error) {
        next(error);
    }
}

export const loginController = async (req, res, next) => {
    try {
        const {email , password} = req.body;
        const user = await userIsExist(email);

        const passwordIsMatch = await bcrypt.compare(password, user.password);

        if(!passwordIsMatch) return res.status(404).json({success: false, message: "email or password is incorrect"});
        
        const refreshToken = await createRefreshToken({id: user.id})

        const tokenSaved = await savetokenToDatabase(refreshToken)

        if(tokenSaved) {

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite : 'lax',
                maxAge : 1000 * 60 * 60 * 24 * 15,
            })
        } else {
            return res.status(403).json({success: false, message: "An error occured, please try again later"})
        }
        return res.status(200).json({success: true, id: user.id})
    } catch (error) {
        next(error)
    }
}


export const logoutCountroller = async (req, res, next) => {
    try {
        const token = req.token;

        const tokenDeleted = await deleteToken(token);

        if(!tokenDeleted) return res.status(403).json({success: false, message: "Error ocured , try again later"})

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 15
        })
        res.status(204).json({success: true, message : "logout successfully"})
    } catch (error) {
        next(error)
    }
}



export const verifEmailController = async (req, res, next) => {
    try {
        const {email, otp} = req.body;

        const hashedOTP = hashOTP(otp);

        const verified = 
    } catch (error) {
        next(error)
    }
}