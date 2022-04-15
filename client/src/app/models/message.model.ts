import { User } from "./user.model";

export interface Message{
    user:{
        socketId:string,
        name:string,
        image:string
    },
    content:string,
    time: string
}