import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IEnrolledCourse } from '../../../models/IEnrolledCourse';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css'],
})
export class SalesReportComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  selectedYearControl: FormControl = new FormControl(this.currentYear);
  selectedYear = this.currentYear;
  yearArray = [2024, 2023, 2022, 2021, 2020];
  salesForm:FormGroup

  sales: IEnrolledCourse[];

  constructor(
    private _adminServie: AdminService,
    private _fb:FormBuilder
    ) {}

  ngOnInit(): void {
    this.getAllEnrolledCourse();
    this.salesForm = this._fb.group({
      year:[this.selectedYear]
    })
  }

  getAllEnrolledCourse() {
    this._adminServie.getAllEnrolledCourse(this.selectedYear).subscribe({
      next: (courses) => {
        this.sales = courses;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  fetchDataByYear() {
    this.selectedYear = this.salesForm.get("year").value    
    this._adminServie.getAllEnrolledCourse(this.selectedYear).subscribe({
      next: (corsee) => {
        this.sales = corsee;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
