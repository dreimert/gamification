import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { teachers } from '../teacher';
@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent {
  teachers=teachers;
  max=teachers.length-1;
}
