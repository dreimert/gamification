import { Component,Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { JoinComponent } from '../session/join/join.component';
import {Header} from '../header/header'
import { Session, sessions } from '../session/session';

@Component({
  selector: 'app-session-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-card.component.html',
  styleUrl: './session-card.component.css'
})
export class SessionCardComponent {
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

  constructor(
    public dialog: MatDialog,
  ) {}

  calculateFontSize(textLength: number): string{
    const baseSize = 28; 
    const minSize = 10; 
    const scalingFactor = 0.5;

    const calculatedSize = baseSize - textLength * scalingFactor;
    
    return Math.max(calculatedSize, minSize) + 'px';
  }

  selectSession(Header:any): Session[]{
    if (Header.name == "Accueil") {
      return this.sessions.filter(session => session.state == 'En cours');
    }else {
      return this.sessions;
    }
  }

  isGreenPellet(session: any): boolean {
    return session.state === 'En cours';
  }

  isRedPellet(session: any): boolean {
    return session.state == 'Terminée';
  }

  sessions = [...sessions]

  @Input() Header! : Header
}
