const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config()
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 8000

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/payments', require('./routes/paymentRoute'))
app.use('/api/appartment', require('./routes/appartmentRoutes'))
app.use('/api/properties', require('./routes/propertyRoute'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tenants', require('./routes/tenantRoutes'))
app.use('/api/businesses', require('./routes/businessRoutes'))

app.use(errorHandler) 


app.listen(port, ()=>  console.log(`Server is running on port ${port}`)
)