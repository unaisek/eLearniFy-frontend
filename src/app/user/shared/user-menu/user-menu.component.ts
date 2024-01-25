import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {

  @Output() menuItemSelected:EventEmitter<void> = new EventEmitter<void>();


  onClickMenu(){
    this.menuItemSelected.emit()
  }

}
