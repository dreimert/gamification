import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component'
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { JoinComponent } from '../session/join/join.component';
import { Session, sessions } from '../session/session';
import {Header} from '../header/header'
@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  section: Header = {
    name:"Accueil"
  }
  constructor(public dialog: MatDialog) {}

  openDialog(session: Session): void {
    const dialogRef = this.dialog.open(JoinComponent, {
      width: '934px',
      height: '465px',
      data: {session: session},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  sessions = [...sessions]

  calculateFontSize(textLength: number): string{
    const baseSize = 28; 
    const minSize = 10; 
    const scalingFactor = 0.5;

    const calculatedSize = baseSize - textLength * scalingFactor;
    
    return Math.max(calculatedSize, minSize) + 'px';
  }
  
}
