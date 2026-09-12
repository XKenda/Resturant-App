import bcrypt from "bcryptjs";
import { createRefreshToken, savetokenToDatabase, signupService, userIsExist } from "./auth.service.js";


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


export const logoutCountroller = (req, res, next) => {
    return res.end();
}