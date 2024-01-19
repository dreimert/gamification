import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Header } from "../../header/header";
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { timer } from "rxjs";
import { AddTeacher } from "../../../models/admin.model";
import { HeaderComponent } from "../../header/header.component";
import { Router } from "@angular/router";
import { Teacher, UserType } from "../../../models/user.model";
@Component({
    selector: "app-add-teacher",
    standalone: true,
    imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
    templateUrl: "./add-teacher.component.html",
    styleUrl: "./add-teacher.component.css",
})
export class AddTeacherComponent implements OnInit {
    usersList: Teacher[] = [];
    tps: TP[] = [];
    teacher!: Teacher;
    section: Header = {
        name: "Admin/ajouter_encadrant",
    };
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.fetchUsersList();
        this.fetchTp();

        timer(200).subscribe(() => {
            this.tps.forEach((tp) => {
                this.tpsFormArray.push(this.initTPSelection(tp));
            });
        });
    }

    // addTeacherForm = this.formBuilder.group({
    //     teacher: [this.teacher, [Validators.required]],
    //     TP: ["", Validators.required],
    // });

    addTeacherForm = this.formBuilder.group({
        teacher: [this.teacher, [Validators.required]],
        TPs: this.formBuilder.array([]),
    });

    tpsFormArray = this.addTeacherForm.get("TPs") as FormArray;

    initTPSelection(tp: TP): FormGroup {
        return this.formBuilder.group({
            name: [tp.name],
            accessable: [false],
        });
    }
    toFormGroup(tpFormControl: AbstractControl) {
        return tpFormControl as FormGroup;
    }

    fetchUsersList(): void {
        //add a small delay to simulate a real http request
        timer(100).subscribe(() => {
            this.usersList = users;
        });
    }
    fetchTp(): void {
        //add a small delay to simulate a real http request
        timer(100).subscribe(() => {
            this.tps = TP;
        });
    }
    getTPsAccessable(): string[] {
        const tpsAccessable: string[] = [];
        this.tpsFormArray.controls.forEach((tpForm) => {
            if (tpForm.get("accessable")?.value) {
                tpsAccessable.push(tpForm.get("name")?.value);
            }
        });
        return tpsAccessable;
    }
    onSubmit(id: string) {
        const TPs = this.getTPsAccessable();
        if (id == "save") {
            if (
                confirm(
                    "Etes-vous sûr de vouloir ajouter l'encadrant " +
                        this.addTeacherForm.value.teacher?.name +
                        " " +
                        this.addTeacherForm.value.teacher?.surname +
                        " ?",
                )
            ) {
                const addTeacher: AddTeacher = {
                    id: this.addTeacherForm.value.teacher?.id as string,
                    name: this.addTeacherForm.value.teacher?.name as string,
                    surname: this.addTeacherForm.value.teacher?.surname as string,
                    TPs: TPs,
                };
                console.log("added:");
                console.log(addTeacher);
            }
        }
        this.router.navigate(["/admin/"]);
    }
}

const users = [
    { id: "1d234cef65487", name: "Damien", surname: "Reimert", type: UserType.STUDENT, TPsAccessible: ["kafka", "scrapping"], },
    { id: "1d4578cab", name: "Tristan", surname: "Roussillon", type: UserType.STUDENT, TPsAccessible: ["kafka"] },
    { id: "7c54de9fa654", name: "Stéphane", surname: "Frenot", type: UserType.STUDENT, TPsAccessible: ["kafka"] },
    { id: "406e05f94304", name: "Abdel", surname: "Taya", type: UserType.STUDENT, TPsAccessible: ["TP3"] },
    { id: "90f9cf8ccf90", name: "Xinyi", surname: "Zhao", type: UserType.STUDENT, TPsAccessible: [""] },
    { id: "173cae034c4b", name: "Valentin", surname: "Lemaire", type: UserType.STUDENT, TPsAccessible: ["TP6"] },
];

interface TP {
    name: string;
    id: string;
}

const TP = [
    { name: "kafka", id: "1d234cef65487" },
    { name: "scrapping", id: "1d4578cab" },
    { name: "TP2", id: "7c54de9fa654" },
    { name: "TP3", id: "7c54de9fa655" },
    { name: "TP4", id: "7c54de9fa656" },
    { name: "TP5", id: "7c54de9fa657" },
    { name: "TP6", id: "7c54de9fa658" },
    { name: "TP7", id: "7c54de9fa659" },
    { name: "TP8", id: "7c54de9fa650" },
    { name: "TP9", id: "7c54de9fa651" },
];
