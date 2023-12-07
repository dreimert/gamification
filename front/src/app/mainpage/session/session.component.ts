import { Component } from '@angular/core';
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
      data: {session: session, title: 'Dialog Title', message: 'Hello, this is a message!'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  section: Header = {
    name:"Session"
  }
  sessions = [...sessions]
}
