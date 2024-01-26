import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-dialog-help",
    standalone: true,
    imports: [],
    templateUrl: "./dialog-help.component.html",
    styleUrl: "./dialog-help.component.css",
})
export class DialogHelpComponent {
    closeDialog(): void {
        this.dialogRef.close();
    }

    constructor(
        public dialogRef: MatDialogRef<DialogHelpComponent>,
        @Inject(MAT_DIALOG_DATA) public token: string,
    ) {}
}
