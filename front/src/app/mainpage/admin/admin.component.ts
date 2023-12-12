import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Header } from '../header/header';
import { teachers } from './teacher';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink,RouterLinkActive,RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,HeaderComponent,RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  teachers=teachers;
  max=teachers.length-1;
  section : Header={
    name:"Admin",
  }
  list=true;
  updateSection(event:any){
    this.section=event.constructor.name;
  }
}
