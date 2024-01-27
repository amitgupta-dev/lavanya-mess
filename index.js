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
app.use(cors({ credentials: true, origin: ['http://localhost:5173'] }))
app.use(cookieParser())
app.use(morgan('dev'))

// custom middlewares
const { verifyUser } = require('./middlewares/verifyUser')

const connect = require('./connection/connect')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

// routes
app.get('/', (req, res) => { res.send("Welcome to the Lavanya Mess backend") })
app.use('/api/auth', authRoutes)
app.use('/api/user', verifyUser, userRoutes)

connect(process.env.MONGO_URL, '5000', app)