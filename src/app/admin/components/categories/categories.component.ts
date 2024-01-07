import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from '../../models/ICategory';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  showModal = false;
  categoryForm !: FormGroup;
  categoryList:[ICategory];
  constructor(
    private _fb:FormBuilder,
    private _adminService: AdminService,
    private _toastr:ToastrService

    ) {}

  ngOnInit(): void {

    this.categoryForm = this._fb.group({

      categoryName:["",[Validators.required]],
      description:["",[Validators.required]]

    })
    
    this.getCategoryList();
  }


  toggleModal(){
    this.showModal = !this.showModal
  }

  categoryFormSubmit(){
    const category = this.categoryForm.getRawValue();
    this._adminService.addCategory(category)
    .subscribe((res)=>{
      this._toastr.success("category added successfully..!!");
      // window.location.reload();
    },(err)=>{
      this._toastr.error(err.error.message)
    })

  }

  getCategoryList(){
    this._adminService.getAllCategory().subscribe((categoryData)=>{
      this.categoryList = categoryData;      
    })
  }

  get nameControl(){
    return this.categoryForm.get('categoryName')
  }

  get descriptionControl() {
    return this.categoryForm.get('description')
  }
}
