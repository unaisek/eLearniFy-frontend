import { ICategory } from "src/app/admin/models/ICategory";

export interface addCourseResponse{
    message:string
}

export interface ICourse {
  title: string;
  category: string | ICategory;
  level: string;
  courseType: string;
  price: string;
  description: string;
  thumbnail: string;
  introductionVideo: string;
  chapters: { chapter: String | IChapter; order: number }[];
  tutor?: string;
  enrolledStudents: string[];
}

export interface IChapter {
  _id:string;
  chapterTitle: string;
  chapterDescription: string;
  chapterVideo: string;
  chapterMaterial: string;
  courseId?: string;
}