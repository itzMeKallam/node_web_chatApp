const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const Users = require('./users.js')
const PORT = process.env.PORT || 8080
const io = socketio(server, {
    cors: '*'
})

io.on('connection', (socket)=>{

    socket.on('checkUserInRoom',({name,room}, callback)=>{
        let {error} = Users.checkUserInRoom({name, room})
        callback(error)
    })

    socket.on('join', ({name, room}, callback)=>{
        let {error, user} = Users.addUser({id: socket.id, name, room})
        if(error){
            callback(error)
        } else {
            socket.join(user.room)
            socket.emit('message', {user: 'Admin', text: `${user.name}, Welcome to ${user.room}`})
            socket.broadcast.to(user.room).emit('message', {user: 'Admin', text: `${user.name}, has joined`})    
        }
       
    })

    socket.on('message', (message, callback) =>{
        let user = Users.getUser(socket.id)
        io.to(user.room).emit('message', {user: user.name, text: message})
        callback()
    })

    

    socket.on('disconnect', ()=>{
        const user = Users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        }
    })
})


server.listen(PORT, ()=>{
    console.log('Server listening')
})