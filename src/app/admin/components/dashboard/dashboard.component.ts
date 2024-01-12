import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IAdminDashboardData } from '../../models/IAdminDashboardData';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  adminDashboardData: IAdminDashboardData;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  @ViewChild(BaseChartDirective) pieChart: BaseChartDirective;
  // BAR CHART
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['week1', 'week2', 'week3', 'week4'],
    datasets: [{ data: [100, 400, 800, 700], label: 'weekly Revenue' }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  // PIE CHART
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = ['Paid course', 'Free courses'];
  public pieChartDatasets = [
    {
      data: [2,1],
    },
  ];
  
  
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private _adminService: AdminService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAdminDashbordValues();
  }
  getAdminDashbordValues() {
    console.log(this.pieChartDatasets);
    this._adminService.getAdminDashboard().subscribe({
      next: (response) => {
        this.adminDashboardData = response;
        this.barChartData.datasets[0].data =
          this.adminDashboardData.weeklyRevenueOfMonth;
        this.pieChartDatasets[0].data =
          this.adminDashboardData.paidAndFreeCourseCount;
        setTimeout(() => {
          if (this.chart && this.chart.chart) {
            this.chart.chart.update();
          }
          if (this.pieChart && this.pieChart.chart) {
            
            this.pieChart.chart.update();
            // this._cdr.detectChanges();
          }
        }, 0);

        console.log(this.pieChartDatasets[0].data);
      },
    });
  }
}
