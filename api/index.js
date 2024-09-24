import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config()

mongoose.connect(process.env.MONGO_DB).then(() => {
  console.log('Connected to MongoDB')
}).catch((err) => {
  console.log(err)
})

const app = express()

app.use(express.json())

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

//Middleware to handle incoming errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  res.status(statusCode).json({ 
    success: false, 
    statusCode, 
    message 
  })
})