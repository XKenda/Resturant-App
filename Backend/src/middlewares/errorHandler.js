
export const errorHandler = (err, req, res, next) => {
    try {
        const error = Object(err)
        console.log(error);
        let message;
        let code;
        if(error.code == '23502') {
            message = "Password cannot be null";
            code = "409"
        }
        else if (error.code == '23505') {
            message = "Email is alread exist";
            code = "409"
        }
        else {
            message = error.message
            code = error.code || 500
        }

        console.log(`Error: ${message}`)
        console.log(`code: ${code}`)
        return res.status(code).json({error: message})
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({error: e.message})
    }
}