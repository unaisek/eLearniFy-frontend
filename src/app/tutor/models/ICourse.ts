import { ICategory } from "../../admin/models/ICategory";
import { IUser } from "../../models/IUser";

export interface addCourseResponse{
    message:string
}

export interface ICourse {
  _id:string;
  title: string;
  category: ICategory;
  level: string;
  courseType: string;
  price: string;
  description: string;
  thumbnail: string;
  introductionVideo: string;
  chapters: { chapter: IChapter; order: number }[];
  tutor?: IUser ;
  enrolledStudents: string[];
  status:boolean;
  createdAt:string
}

export interface IChapter {
  _id:string;
  chapterTitle: string;
  chapterDescription: string;
  chapterVideo: string;
  chapterMaterial: string;
  courseId?: string;
}