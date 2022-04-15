const io = require('socket.io')(3000,{
    cors: {
        origin: ["http://localhost:4200"]
    }
});


const globalUsers = [];


function removeUser(socketId){
    globalUsers.forEach((user,index)=>{
        if(user.socketId === socketId)
            globalUsers.splice(index,1)
    })
}

io.on("connection",(socket)=>{
    console.log(socket.id + "has connected");
    socket.on("send-message",(room,message)=>{
        socket.to(room).emit("receive-message",message);
    })


    socket.on("connect-user",(user,callback)=>{
        console.log("in connect-user",user);
        socket.broadcast.emit("registered-user",user);
        callback(globalUsers);
        globalUsers.push(user);
    })


    socket.on("disconnect",()=>{
        removeUser(socket.id);
        socket.broadcast.emit("receive-users",globalUsers)
    })

    socket.on("join-room",(room,callback)=>{
        console.log("joining a room");
        if(!socket.rooms.has(room))
            socket.join(room);
        else
            console.log("already joined in current room")
    })


    socket.on("leave-room",(room,callback)=>{
        if(socket.rooms.has(room))
            socket.leave(room);
    })
});

