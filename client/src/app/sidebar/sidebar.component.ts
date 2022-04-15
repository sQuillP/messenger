import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat.service';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private chatService:ChatService, private socketService:SocketService) { }

  userList: User[];
  

  userListSubscription:Subscription;

  
  ngOnInit(): void {
    this.userListSubscription = this.chatService.userListSubject
    .subscribe((users:User[])=>{
      this.userList = users;
    });
  }


  onChatSelect(chat:User):void {
    this.chatService.setSelectedRoom(chat);
  }




  
}
