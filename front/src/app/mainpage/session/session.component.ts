import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JoinComponent } from './join/join.component';

@Component({
  selector: 'app-session',
  // standalone: true,
  // imports: [],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(JoinComponent, {
      width: '934px',
      height: '465px',
      data: { title: 'Dialog Title', message: 'Hello, this is a message!' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
