import transport from "../config/nodemailer.config.js"

const emailOptions = {
    subject: "Verify your email - Restaurant App",
}


const sendEmail = async (reciever, emailBody) => {
    try {
        transport.sendMail({
            ...emailOptions,
            to: reciever,
            html: emailBody
        })
    } catch (error) {
        console.log(error)
    }
}


export default sendEmail;