import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-tutor-header',
  templateUrl: './tutor-header.component.html',
  styleUrls: ['./tutor-header.component.css'],
})
export class TutorHeaderComponent {
  ismenuScrolled = false;
  isSideBarShow = false;
  @HostListener('window:scroll', ['$event'])
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
}
