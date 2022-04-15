import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat.service';
import { SocketService } from '../services/socket.service';
import faker from "faker";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private router:Router, private chatService:ChatService, private socketService:SocketService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "username": new FormControl(null,[Validators.required]),
    });
  }


  onSubmit():void{
    const username:string = this.loginForm.get("username").value;
    const socketId:string = this.socketService.getSocketId();
    const image:string = faker.image.people(300,300,true);
    console.log(image);
    const user = {
      name:username.substring(0,20),
      socketId:socketId,
      image: image,
      direct_messages:{},
      unread_messages:0
    }

    this.socketService.connectUser(user);

    this.router.navigate(["chat"]);
  }


}
