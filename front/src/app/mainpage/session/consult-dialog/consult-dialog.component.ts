

import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { calculateFontSize } from "../utils";
import { Session, TeacherSession } from "../../../models/session.model";
import { Router, RouterLink } from "@angular/router";

@Component({
    selector: "app-consult-dialog",
    standalone: true,
    imports: [FormsModule, CommonModule, RouterLink],
    templateUrl: "./consult-dialog.component.html",
    styleUrl: "./consult-dialog.component.css",
})
export class ConsultDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConsultDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public session: Session | TeacherSession,
        private router:Router
    ) {}

    enteredPassword: string = "";
    passwordMatch: boolean | undefined;

    closeDialog(): void {
        this.dialogRef.close();
    }

    gotoNotePage(): void{
        this.router.navigateByUrl(`/grade-teacher/${this.session.id}/lookup`, { state: this.session });
        this.dialogRef.close();
    }

    joinSession(): void {
        this.dialogRef.close(this.enteredPassword);
    }

    calculateFontSize(textLength: number): string {
        return calculateFontSize(textLength);
    }
}
