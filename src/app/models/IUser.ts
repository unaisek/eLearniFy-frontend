import { ICourse } from "../tutor/models/ICourse";

export interface IUser {
    _ID:string;    
    name: string;
    email: string;
    role: string;
    courses: string[] | ICourse[];
    profileImage:string;
}