import { IUser } from "./IUser";

export interface IChat {
  courseId?: string;
  id?: string;
  messages?: IMessage[];
}


export interface IMessage {
  userName?: string;
  senderId?:string | IUser;
  message?: string;
  createdAt?: Date;
}
