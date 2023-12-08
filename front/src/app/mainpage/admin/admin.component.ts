import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Header } from '../header/header';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  section : Header={
    name:"Admin",
  }
}
