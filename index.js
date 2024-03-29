const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

// default middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ credentials: true, origin: '*' }))
app.use(cookieParser())
app.use(morgan('dev'))

// custom middlewares
const { verifyUser } = require('./middlewares/verifyUser')

const connect = require('./connection/connect')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const planRoutes = require('./routes/planRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const subscriptionRoutes = require('./routes/subscriptionRoutes')
const orderRoutes = require('./routes/orderRoutes')
const menuRoutes = require('./routes/menuRoutes')
const { proxyRequests } = require('./controllers/proxy_requests/proxyRequests')
const CustomError = require('./utils/customError')
const asyncHandler = require('./utils/asyncHandler')
const globalErrorHandler = require('./controllers/error/globalErrorHandler')

// routes
app.get('/', (req, res) => { res.send("Welcome to the Lavanya Mess backend") })
app.post('/api/proxyRequest', proxyRequests)
app.use('/api/auth', authRoutes)
app.use('/api/user', verifyUser, userRoutes)
app.use('/api/product', verifyUser, productRoutes)
app.use('/api/plan', verifyUser, planRoutes)
app.use('/api/payment', verifyUser, paymentRoutes)
app.use('/api/subscription', verifyUser, subscriptionRoutes)
app.use('/api/order', verifyUser, orderRoutes)
app.use('/api/menu', verifyUser, menuRoutes)
app.all('*', (req, res, next) => {
    const error = new CustomError(`the route ${req.originalUrl} not found`, 404)
    next(error)
})

app.use(globalErrorHandler)
connect(process.env.MONGO_URL, '5000', app)