import { createRefreshToken, savetokenToDatabase } from "../modules/auth/auth.service.js";

const issueRefreshToken = async (res, userId) => {
    const refreshToken = await createRefreshToken({ id: userId });
    const tokenSaved = await savetokenToDatabase(refreshToken);

    if (!tokenSaved) return false;

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 15,
    });

    return true;
};

export default issueRefreshToken;
