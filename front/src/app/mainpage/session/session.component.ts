
import { Component, Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { JoinComponent } from './join/join.component';
import { HeaderComponent } from '../header/header.component'
import { Header } from '../header/header'
import { Session, sessions } from './session';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent {
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

  section: Header = {
    name:"Session"
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
