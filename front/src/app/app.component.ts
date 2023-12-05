import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {SideBarComponent} from './side-bar/side-bar.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[CommonModule, RouterOutlet,SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';

  List(){
    window.alert('C\'est une liste de prof!');
  }
}
