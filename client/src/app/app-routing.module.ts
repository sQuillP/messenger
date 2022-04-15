import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatGuard } from './chat.guard';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "home", component: LoginComponent},
  {path: "chat", canActivate:[ChatGuard], component: ChatComponent},
  {path:"", redirectTo:"/home", pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
