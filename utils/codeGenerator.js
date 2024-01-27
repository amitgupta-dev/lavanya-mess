const otpGenerator = require('otp-generator')

const codeGenerator = () => {
    return otpGenerator.generate(8, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: true,
        specialChars: false
    })
}

module.exports = { codeGenerator }