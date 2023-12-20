import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../models/Iusesr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  userList:IUser[];

  constructor(
    private _adminService:AdminService,
    private _toastr:ToastrService
  ){}

  ngOnInit(): void {

    this.getAllUser();
    
  }

  getAllUser(){
    this._adminService.getAllUsers().subscribe((res)=>{
      console.log(res);
      
      this.userList = res     
    },(err)=>{
      this._toastr.error(err.error.message)
    })

  }

  onAction(blocked: boolean , index:number, id:string){
    if(blocked){
      this.userList[index].is_blocked = false;
      this._adminService.unBlockUser(id).subscribe((res)=>{
        this._toastr.success(`${this.userList[index].name} is Unblocked`);
      })
    } else {
      this.userList[index].is_blocked = true;
      this._adminService.blockUser(id).subscribe((res)=>{
        this._toastr.warning(`${this.userList[index].name} is Blocked`)
      },(err)=>{
        this._toastr.error(err.error.message)
      })
    }

  }

}
