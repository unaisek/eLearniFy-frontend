import { IChapter, ICourse } from "../tutor/models/ICourse";
import { IUser } from "./IUser";

export interface IEnrolledCourse{
    _id?:string;
    userId?:IUser;
    courseId?:ICourse;
    price?:number;
    status?:boolean;
    progression?:IChapter[];
    createdAt:Date;

}