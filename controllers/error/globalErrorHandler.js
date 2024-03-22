const mongoose = require('mongoose')
module.exports = (error, req, res, next) => {

    if (error.code === 11000) {
        error.statusCode = 409
        error.message = `the ${Object.keys(error.keyValue)[0]} '${Object.values(error.keyValue)[0]}' already exists`
        error.status = 'duplicate key'
    }
    else if (error.name === 'ValidationError') {
        error.statusCode = 400
        error.message = Object.values(error.errors).map(error => {
            if (error.name === 'CastError') {
                return `'${error.value}' is not a valid '${error.path}' value`
            } else {
                return error.message
            }
        }).join('|')
        error.status = 'Bad Request'
    }
    else {
        error.statusCode = 500
        error.status = 'Internal Server Error'
    }
    console.log(error)
    res.status(error.statusCode).json({
        success: false,
        message: error.message || error.status,
        statusCode: error.statusCode
    })
}