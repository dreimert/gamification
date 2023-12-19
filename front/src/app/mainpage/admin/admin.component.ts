import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Header } from '../header/header';
import { teachers } from './teacher';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { AdminService } from './admin.service';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,HeaderComponent,RouterLink,RouterLinkActive],
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
  constructor(private adminService:AdminService){

  }
  updateSection(event:any){
    this.section=event.constructor.name;
  }
  deleteTeacher(id:string){
    //Delete the teacher credentials
    if(confirm("Etes-vous sûr de supprimer l'encadrant "+id+"?")) {
      console.log("deleted : "+id);
    }
    
  }
  updateMessage(name: string){
    this.adminService.setMessage(name);
  }
}
