require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const morgan = require('morgan')

const connectDB = require('./db/connect')

const authRouter = require('./routes/authRoutes')

const notFoundMiddleWare = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')


app.use(express.json())
app.use(morgan('tiny'))


app.get('/',(req, res)=>{
    res.send("Hello")
})

app.use('/api/v1/auth', authRouter)


app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 8080

const start= async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()