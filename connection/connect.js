const mongoose = require("mongoose")

const connect = (url, PORT, app) => {
    mongoose
        .connect(url, { dbName: "Lavanya_Mess" })
        .then(() => {
            console.log("db conncected...")
            app.listen(PORT, () => {
                console.log("server listening on PORT " + PORT)
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = connect