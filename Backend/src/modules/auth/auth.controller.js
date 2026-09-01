import bcrypt from "bcryptjs";
import { signupService } from "./auth.service.js";

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