import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from './services/chat.service';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {

  constructor(private chatService:ChatService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.chatService.currentUser){
      this.router.navigate(["/home"]);
      return false;
    }
    return true;
  }
  
}
