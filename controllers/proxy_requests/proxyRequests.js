const asyncHandler = require('../../utils/asyncHandler')
const axios = require('axios')

const proxyRequests = asyncHandler(async (req, res) => {
    const { method, url, body, headers } = req.body
    let response
    switch (method) {

        case method == "POST":
            response = await axios.post(url, body, headers)
            break;
        case method == "PATCH":
            response = await axios.patch(url, body, headers)
            break;
        case method == "PUT":
            response = await axios.put(url, body, headers)
            break;
        case method == "DELETE":
            response = await axios.delete(url, body, headers)
            break;
        default:
            response = await axios.get(url, headers)
    }
    res.status(response.status).json(response?.data ? response.data : { message: 'Something went wrong' })
})

module.exports = { proxyRequests }