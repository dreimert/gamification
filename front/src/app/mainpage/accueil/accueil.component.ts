import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../header/header.component'
import { Header} from '../header/header'
import { SessionCardComponent } from '../session-card/session-card.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [HeaderComponent,CommonModule,SessionCardComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css',
})
export class AccueilComponent {
  section: Header = {
    name:"Accueil"
  }
}
