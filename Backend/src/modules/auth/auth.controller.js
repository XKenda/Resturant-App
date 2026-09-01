

export const signupController = (req, res, next) => {
    try {
        const {firstName, lastName, email, password, age} = req.body
        
    } catch (error) {
        next(error)
    }
}