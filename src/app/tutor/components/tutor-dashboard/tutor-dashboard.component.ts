import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalService } from '../../../shared/services/confirm-modal.service';
import { TutorService } from '../../services/tutor.service';
import { ITutorDashboardData } from '../../models/ITutorDashboardData';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.css'],
})
export class TutorDashboardComponent implements OnInit {
  myCourses = [];
  tutorDashboardData: ITutorDashboardData;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: '3 days revenu',
        fill: false,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;

  constructor(
    private _courseService: CourseService,
    private _toastr: ToastrService,
    private _dialogService: ConfirmModalService,
    private _tutorService: TutorService
  ) {}

  ngOnInit(): void {
    this.getMyAllCourses();
    this.getTutorDashboardData();
  }

  getTutorDashboardData() {
    console.log(this.lineChartData.datasets[0].data,"before");
    console.log(this.lineChartData.labels,"before");
    
    
    const tuotrId = localStorage.getItem('user');
    this._tutorService.getDashboardData(tuotrId).subscribe({
      next: (response) => {
        console.log(response);
        this.tutorDashboardData = response;       
        this.setLineChartData(this.tutorDashboardData);
      },
    });
  }

  getMyAllCourses() {
    this._courseService.getAllMyCourses().subscribe((res) => {
      this.myCourses = res;
    });
  }

  unList(courseId: string) {
    //
    this._dialogService
      .confirmModal({
        title: 'Please confirm action',
        message: 'Are you sure want to unlist the course!',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
      })
      .subscribe((confirmed: boolean) => {
        console.log(confirmed, 'confirm');

        if (confirmed) {
          this._courseService.unListCourse(courseId).subscribe((res) => {
            this._toastr.success('course Unlisted');
            this.getMyAllCourses();
          });
        }
      });
  }

  list(courseId: string) {
    this._dialogService
      .confirmModal({
        title: 'Please confirm action',
        message: 'Are you sure want to list the course!',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
      })
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._courseService.listCourse(courseId).subscribe({
            next: (res) => {
              this._toastr.success('Course Listed');
              this.getMyAllCourses();
            },
            error: (error) => {
              this._toastr.error('course listing failed');
              console.log(error);
            },
          });
        }
      });
  }

  setLineChartData(tutorDashboardData: ITutorDashboardData) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 29);
    const intervalLabels = [];
    for (let i = 0; i < 30; i += 3) {
      const intervalStart = new Date(startDate);
      intervalStart.setDate(startDate.getDate() + i);
      const label = `${intervalStart.getDate()}-${Math.min(
        intervalStart.getDate() + 2,
        startDate.getDate() + 29
      )}`;
      intervalLabels.push(label);
    }
      this.lineChartData.labels = intervalLabels;          
      this.lineChartData.datasets[0].data =
        tutorDashboardData?.threeDaysRevenues;
      this.chart.chart.update();
  }
}
