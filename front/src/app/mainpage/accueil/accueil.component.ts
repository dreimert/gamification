import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component'
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { JoinComponent } from '../session/join/join.component';
import { Session, sessions } from '../session/session';
import {Header} from '../header/header'
import { calculateFontSize } from '../session/utils';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css',
})
export class AccueilComponent {
  section: Header = {
    name:"Accueil"
  }

  constructor(
    public dialog: MatDialog,
  ) {}
  
  openDialog(session: Session): void {
    const dialogRef = this.dialog.open(JoinComponent, {
      width: '60%',
      height: '70%',
      data: {session: session},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  sessions = [...sessions]

  calculateFontSize(textLength: number): string{
    return calculateFontSize(textLength)
  }
  
}
