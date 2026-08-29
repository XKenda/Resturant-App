
export const errorHandler = (error, req, res, next) => {
    try {
        
        console.log(Object(error));
        const message = error.message;
        const code = error.code || 500

        console.log(`Error: ${message}`)
        console.log(`code: ${code}`)
        return res.status(code).json({error: message})
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({error: e.message})
    }
}