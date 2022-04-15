import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";


@Injectable({
    providedIn:"root"
})
export class ChatService{


    selectedRoom = new Subject<User>();
    userListSubject = new Subject<User[]>();
    
    private _selectedRoom:User;
    currentUser:User;
    userList:User[] = [];

    constructor(){}


    setSelectedRoom(room:User):void{
        if(!this.currentUser.direct_messages[room.socketId])
            this.currentUser.direct_messages[room.socketId] = [];
        room.unread_messages = 0;
        this.selectedRoom.next(room);
        this._selectedRoom = room;
    }
   

    addUser(user:User):void{
    
        this.userList.push(user);
        this.userListSubject.next([...this.userList]);
    }


    addMessage(message:Message):void{
        console.log(message.user.image)
        this.currentUser.direct_messages[this._selectedRoom.socketId].push(message);
    }


    consumeMessage(message:Message):void{
        console.log(message.user.image)
        if(!this._selectedRoom || this._selectedRoom.socketId !== message.user.socketId){
            let user = this.userList.find((user:User)=> user.socketId === message.user.socketId);
            user.unread_messages++;
        }
        if(this.currentUser.direct_messages[message.user.socketId])
            this.currentUser.direct_messages[message.user.socketId].push(message);
        else 
            this.currentUser.direct_messages[message.user.socketId] = [message];
    }
   
}