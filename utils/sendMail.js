const nodemailer = require("nodemailer")

const sendMail = (receivers, subject, message, html = "") => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.net",
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
            user: "amitgupta82718@gmail.com",
            pass: "kxkovazaxzaoakfp"
        }
    })

    const options = {
        from: "amitgupta82718@gmail.com",
        to: receivers,
        subject: subject,
        text: message,
        html: html
    }

    transporter.sendMail(options, (err, res) => {
        if (err) console.log(err)
        else console.log(res)
    })
}

module.exports = { sendMail }