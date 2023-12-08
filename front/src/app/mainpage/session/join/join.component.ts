import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Session, sessions } from '../session';


@Component({
  selector: 'app-join',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './join.component.html',
  styleUrl: './join.component.css'
})
export class JoinComponent {
  constructor(
    public dialogRef: MatDialogRef<JoinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  enteredPassword: string = '';
  session = [...sessions];
  passwordMatch: boolean | undefined;

  closeDialog(): void {
    this.dialogRef.close();
  }

  rejoindre(): void {
    if (this.enteredPassword == this.data.session.password){
      this.passwordMatch = true;
      this.dialogRef.close();
    }else{
      this.passwordMatch = false;
    }
  }

  calculateFontSize(textLength: number): string{
    const baseSize = 28; 
    const minSize = 10; 
    const scalingFactor = 0.5;

    const calculatedSize = baseSize - textLength * scalingFactor;
    
    return Math.max(calculatedSize, minSize) + 'px';
  }
  
}
