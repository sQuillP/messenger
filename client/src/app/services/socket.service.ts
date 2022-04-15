import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { io } from "socket.io-client";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { ChatService } from "./chat.service";

@Injectable({
    providedIn:"root"
})
export class SocketService{


    private socket:Partial<any>;

    loggedInSubscription:Subscription;


    constructor(private router:Router,private chatService:ChatService){


        this.socket = io("http://localhost:3000");

        this.socket.on("receive-message",(message:Message)=>{
            this.chatService.consumeMessage(message);
        });

        this.socket.on("receive-users",(users:User[])=>{
            users = users.filter(user=>{ 
                return user.socketId !== this.chatService.currentUser.socketId
            });
            
            this.chatService.userList = users;
            this.chatService.userListSubject.next(users);
        })

        this.socket.on("registered-user",(user)=>{
            this.chatService.addUser(user);
        });
    }


    sendPrivateMessage(to:string,message:Message):void{
        this.chatService.addMessage(message);
        this.socket.emit("send-message",to,message);
    }


    getSocketId():string{
        return this.socket.id;
    }


    connectUser(user:User):void{
        this.chatService.currentUser = user;

        let modifiedUser = {...user};
        delete modifiedUser.direct_messages;

        this.socket.emit("connect-user",modifiedUser,(users:User[])=>{
            this.chatService.userList = users;
            this.chatService.userListSubject.next(users);
        })
    }


} 