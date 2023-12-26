import { ICourse } from "../tutor/models/ICourse";

export interface IUser {
    _id:string;    
    name: string;
    email: string;
    role: string;
    courses: string[] | ICourse[];
    profileImage:string;
}