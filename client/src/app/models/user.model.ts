import { Message } from "./message.model";

const imgurl:string = "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";


export interface User{
    name:string;
    socketId:string;
    image:string;
    direct_messages?: {[socketId:string]:Message[]};
    unread_messages:number;
}
