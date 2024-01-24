import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Block } from "../kafka.model";
import { CommonModule } from "@angular/common";
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from "@angular/forms";
import { create } from "d3";

@Component({
    selector: "app-param-popup",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: "./param-popup.component.html",
    styleUrl: "./param-popup.component.css",
})
export class ParamPopupComponent {
    block: Block;
    warehouses: Block[];
    paramForm!: FormGroup;
    @Output() createArrow = new EventEmitter<{ block: Block; s: string }>();
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ParamPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.block = this.data.block;
        this.warehouses = this.data.warehouses;
        this.creatForm();
    }
    creatForm() {
        this.paramForm = this.formBuilder.group({
            name: [this.block.name, [Validators.required]],
            code: [this.block.textCode, Validators.required],
        });
    }
    closeDialog(): void {
        this.dialogRef.close();
    }
    saveCode(): void {
        console.log(this.paramForm.value.code);
        this.block.name = this.paramForm.value.name as string;
        this.block.textCode = this.paramForm.value.code as string;
        const code = this.block.textCode.split(";").filter(Boolean);
        const t = code[0].split(/[()]/);
        console.log(t);
        if (t[0] === "pub") {
            console.log("published");
            console.log(this.warehouses);
            console.log(this.warehouses.some((e) => e.name === t[1]));
            if (this.warehouses.some((e) => e.name === t[1])) {
                this.createArrow.emit({ block: this.block, s: t[1] });
                console.log("published comp");
            }
        }
        this.dialogRef.close();
    }
}
