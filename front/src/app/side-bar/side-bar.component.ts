import { Component,Input, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { sidebars_stu,sidebars_prof,sidebars_admin } from './side-bar';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';
import {User} from'../user';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  templateUrl: './side-bar.component.html',
  imports: [SidebarButtonComponent,CommonModule,RouterLink,RouterLinkActive],
})
export class SideBarComponent {
  sidebarButtons_stu=sidebars_stu
  sidebarButtons_teacher=sidebars_prof
  sidebarButtons_admin=sidebars_admin
  @Input() user! : User
}