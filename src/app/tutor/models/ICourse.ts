export interface addCourseResponse{
    message:string
}

export interface ICourse {
  title: string;
  category: string;
  level: string;
  courseType: string;
  price: string;
  description: string;
  thumbnail: string;
  introductionVideo: string;
  chapters: { chapter: String | IChapter; order: number }[];
  tutor?: string;
}

export interface IChapter {
  chapterTitle: string;
  chapterDescription: string;
  chapterVideo: string;
  chapterMaterial: string;
  courseId?: string;
}