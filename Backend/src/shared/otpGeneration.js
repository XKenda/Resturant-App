import crypto from "node:crypto";


const GenerateOTP = () => {
    try {
        const otp = crypto.randomInt(100000, 999999)
        return otp;
    } catch (error) {
        console.log(error.message)
    }
}

export default GenerateOTP;