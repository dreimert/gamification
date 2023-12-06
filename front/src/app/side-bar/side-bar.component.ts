import { Component,Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { sidebars_stu } from './side-bar';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  templateUrl: './side-bar.component.html',
  //styleUrls: ['./side-bar.component.css'],
  imports: [SidebarButtonComponent,CommonModule,RouterLink,RouterLinkActive],
})
export class SideBarComponent {
  sidebars_stu = sidebars_stu;


  // open(sidebar: Sidebar){
  //   sidebars_stu.forEach(sidebarButton => sidebarButton.open = false)
  //   sidebar.open = true
  //   this.navigateTo.emit(sidebar.name)
  // }
}