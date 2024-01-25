import { Component,OnInit } from '@angular/core';
import { ICourse } from '../../../tutor/models/ICourse';
import { UserCourseService } from '../../services/user-course.service';
import { UserService } from '../../services/user.service';
import { ICategory } from '../../../models/ICategory';
import { FormBuilder, FormGroup} from '@angular/forms';
import { IFilter } from '../../../models/IFilter'

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit{

  courseList:ICourse[];
  categories:ICategory[];
  filterForm:FormGroup;

  filterValues:IFilter;
  searchValue:string = "";
  loading: boolean = true;

  // selectedCategory: string ="All Category";
  // selectedLevel: string;
  // selectedCourseType: string;

  constructor(
    private _courseService:UserCourseService,
    private _userService: UserService,
    private _fb: FormBuilder
  ){
  }

  ngOnInit(): void {
    this.filterForm = this._fb.group({
      category: ['all'],
      courseType: ['all'],
      level: ['all'],
    });

    this.getAllCourse();
    this.getAllCategories();

  }
  getAllCourse(){
    this.loading = true
    this.filterValues = this.filterForm.getRawValue();
    this._courseService.getAllCoursesForStudent(this.filterValues).subscribe({
      next:(courses)=>{
        this.courseList= courses;
        this.loading = false
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }
  getAllCategories(){
    this._userService.getAllCategories().subscribe({
      next:(response)=>{
        this.categories = response;
        
      },
      error:(error)=>{
        console.log(error);
        this.loading = false;
      }
    })
  }

  searchCourse(){
    this.filterValues.searchValue = this.searchValue;
    this.loading = true
    this._courseService.getAllCoursesForStudent(this.filterValues).subscribe({
      next:(courses)=>{
        this.courseList = courses;
        this.loading = false
      },
      error:(error)=>{
        console.log(error);
        this.loading = false;
      }
    })

  }

  applyFilter(){
    this.filterValues = this.filterForm.getRawValue();  
    this.filterValues.searchValue = this.searchValue; 
    this._courseService.getAllCoursesForStudent(this.filterValues).subscribe({
      next: (courses) => {
        this.courseList = courses;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
    
  }

  resetFilter(){
    this.loading = true
    this.filterForm.patchValue({
      category:"all",
      courseType:"all",
      level:"all"
    })
    this.filterValues = this.filterForm.getRawValue();
    this.filterValues.searchValue = this.searchValue;
    this._courseService.getAllCoursesForStudent(this.filterValues).subscribe({
      next: (courses) => {
        this.courseList = courses;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
    
  }

}
