import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Block } from "../kafka.model";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-param-popup",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./param-popup.component.html",
    styleUrl: "./param-popup.component.css",
})
export class ParamPopupComponent {
    constructor(
        public dialogRef: MatDialogRef<ParamPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public block: Block,
    ) {}
    closeDialog(): void {
        this.dialogRef.close();
    }
    saveCode(): void {
        this.closeDialog();
    }
}
