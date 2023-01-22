const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/userRouter')
const http = require('http')
const {Server} = require('socket.io')

const secretKey = "djjhgkfkjfkdgkjkfkghurenvj[]jfdjhfjdnsj48heji"


app.use(cors())

const server = http.createServer(app)


const io = new Server(server, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
})
server.listen(4444)

io.on("connection", (socket) =>{
    console.log(socket.id);  

    socket.on("join_room",  (data) =>{
        socket.join(data)
        console.log(`user with id : ${socket.id} joined : ${data}`)
    })
    socket.on("send_message", async (data) =>{
        console.log(data.room, "send message server")
        io.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () =>{
        console.log("user disconnect", socket.id)
    })
})




app.use(express.json())
app.use(cookieParser())


app.use('/user', userRouter)


app.listen(3001, (port) =>{
    console.log(`server is running on port ${port}`)
})