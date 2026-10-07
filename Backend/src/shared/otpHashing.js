import crypto from "node:crypto";


const hashOTP = (otp) => {
    try {
        const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex")

        return hashOTP;
    } catch (error) {
        console.log(error)
    }
}

export default hashOTP;