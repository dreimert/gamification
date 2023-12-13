import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Session, sessions } from '../session';
// import { FunctionsService } from '../functions.service';
import { calculateFontSize } from '../utils';


@Component({
  selector: 'app-join',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './join.component.html',
  styleUrl: './join.component.css',
  // providers:[FunctionsService]
})
export class JoinComponent {
  constructor(
    public dialogRef: MatDialogRef<JoinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // @Inject(FunctionsService) private functions: FunctionsService,
  ) {}

  enteredPassword: string = '';
  session = [...sessions];
  passwordMatch: boolean | undefined;

  closeDialog(): void {
    this.dialogRef.close();
  }

  rejoindre(): void {
    console.log("send password to backend")
    // if (this.enteredPassword == this.data.session.password){
    //   this.passwordMatch = true;
    //   this.dialogRef.close();
    // }else{
    //   this.passwordMatch = false;
    // }
  }

  calculateFontSize(textLength: number): string{
    return calculateFontSize(textLength)
  }
  
}
