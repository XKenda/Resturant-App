import bcrypt from "bcryptjs";
import { createRefreshToken, deleteToken, savetokenToDatabase, signupService, userIsExist } from "./auth.service.js";
import transport from "../../config/nodemailer.config.js";
import sendEmail from "../../shared/send_email.js";
import { emailVerifictionBody } from "../../utils/emailsBody.js";


export const signupController = async (req, res, next) => {
    try {
        const {username, email, password, age} = req.body

        const hashedpassword = await bcrypt.hash(password, 8);

        const id = await signupService({username, email, age, password:hashedpassword})

        return res.status(200).json({success: true, id});
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


























export const testController = async (req, res, next) => {
    try {
        await sendEmail("elmlonxxr@gmail.com", emailVerifictionBody(17792))
        console.log("\n email has been sent \n")
        res.status(200).send("done")
    } catch (error) {
        console.log(error)
        res.status(404).send("failed")
    }
}