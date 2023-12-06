import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {SideBarComponent} from './side-bar/side-bar.component'
import { RouterModule } from '@angular/router';
import {AccueilComponent} from './mainpage/accueil/accueil.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports:[CommonModule, RouterModule,SideBarComponent,RouterOutlet,AccueilComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';

  // constructor(private router:Router){}

  // onNavigate(route: string){
  //   this.router.navigate([route]);
  // }
}
