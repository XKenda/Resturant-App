import { REFRESH_SECRET } from "../config/env.js";
import checkToken from "../shared/check_token.js"
import jwt from 'jsonwebtoken';
import getUser from "../shared/get_user.js";
import RemoveRefreshTokenCookie from "../shared/removeRefreshTokenCookie.js";

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken

        const tokenIsExist = await checkToken(token);

        if(!tokenIsExist){
            RemoveRefreshTokenCookie(res);
            return res.status(401).json({success: false, message: 'Please login first'})
        }

        const id = await jwt.verify(token, REFRESH_SECRET).id

        const user = await getUser(id)

        req.user = user;
        req.token = token
        next();
    } catch (error) {
        next(error)
    }
}

export default auth