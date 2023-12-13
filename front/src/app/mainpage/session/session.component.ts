
import { Component, Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { JoinComponent } from './join/join.component';
import { HeaderComponent } from '../header/header.component'
import { Header } from '../header/header'
import { Session, sessions } from './session';
// import { FunctionsService } from './functions.service';
import { calculateFontSize } from './utils';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css',
  // providers:[FunctionsService]
})
export class SessionComponent {
  constructor(
    public dialog: MatDialog,
    // private functions: FunctionsService
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

  section: Header = {
    name:"Session"
  }
  sessions = [...sessions]

  // calculateFontSize(textLength: number): string{
  //   return this.functions.calculateFontSize(textLength)
  // }

  calculateFontSize(textLength: number): string{
    return calculateFontSize(textLength)
  }



}
