import { Component, HostListener,OnInit } from '@angular/core';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent implements OnInit {
  ismenuScrolled = false;
  isSideBarShow = false;
  @HostListener('window:scroll', ['$event'])
  ngOnInit(): void {
    this.scrollCheck();
  }

  scrollCheck() {
    if (window.scrollY > 35) {
      this.ismenuScrolled = true;
    } else {
      this.ismenuScrolled = false;
    }
  }

  openSideBar() {
    this.isSideBarShow = true;
  }

  closeSideBar() {
    this.isSideBarShow = false;
  }

  onMenuSelected(){
    this.closeSideBar();
  }
}
