import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { ChatService } from "../services/chat.service";
import { SocketService } from "../services/socket.service";

@Component({
  selector: "app-chatwindow",
  templateUrl: "./chatwindow.component.html",
  styleUrls: ["./chatwindow.component.css"],
})
export class ChatwindowComponent implements OnInit {

  currentChatRoom: User;

  sendMessage: string;

  currentRoomSubscription: Subscription;
  userListSubscription: Subscription;

  messages: Message[];

  userDisconnected:boolean = false;

  constructor(
    private router: Router,
    private chatService: ChatService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {


    this.userListSubscription = this.chatService.userListSubject.subscribe((users:User[])=>{
      if(this.currentChatRoom){
        const userActive:User = users.find((user:User)=>this.currentChatRoom.socketId === user.socketId)
        if(!userActive)
          this.userDisconnected = true;
        console.log("disconnected ",this.userDisconnected)
      }

    })


    this.currentRoomSubscription = this.chatService.selectedRoom.subscribe(
      (chat: User) => {
        this.currentChatRoom = chat;
        this.userDisconnected = false;
        let currentUser = this.chatService.currentUser;
        this.messages = currentUser.direct_messages[chat.socketId];
      }
    );
  }

  getCurrentTime(): string {
    const time: Date = new Date();
    const hours: string = String(
      (time.getHours() % 13) + (time.getHours() > 12 ? 1 : 0)
    );
    const timeOfDay = time.getHours() < 12 ? "am" : "pm";
    const minutes: string =
      (time.getMinutes() < 10 ? "0" : "") + String(time.getMinutes());

    return hours + ":" + minutes + " " + timeOfDay;
  }

  onSendMessage() {
    if (!this.sendMessage || this.userDisconnected) return;

    let currentUser = this.chatService.currentUser;

    this.socketService.sendPrivateMessage(this.currentChatRoom.socketId, {
      user: {
        socketId: currentUser.socketId,
        name: currentUser.name,
        image: currentUser.image,
      },
      content: this.sendMessage,
      time: this.getCurrentTime(),
    });
    this.sendMessage = "";
  }

  fromSender(message?: Message): any {
    return message.user.socketId === this.chatService.currentUser.socketId;
  }
}
