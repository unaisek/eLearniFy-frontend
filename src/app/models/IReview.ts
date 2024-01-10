import { IUser } from "./IUser";

export interface IReview{
    _id?: string;
    userId?: IUser;
    courseId?:string;
    rating?: number;
    review?:string;
    createdAt?:Date
    // createdAt?: Date
}