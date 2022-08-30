var express = require('express')
var http = require('http')
const {Server} = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=>{
    console.log(`user ${socket.id} is connectd`);
    socket.on('message',(data)=>{
        socket.broadcast.emit('message:received',data)
    })
    socket.on('disconnect',()=>{
        console.log(`user ${socket.id} is left`);
    })
})

const port = 5000
server.listen(port, () => {
    console.log(`Example apps listening on port ${port}`)
})