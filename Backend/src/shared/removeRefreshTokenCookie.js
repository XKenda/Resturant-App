


const RemoveRefreshTokenCookie = (res) => {
    try {

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 15
        })

        return true
    } 
    catch (error) {
        return false
    }

        
}


export default RemoveRefreshTokenCookie;