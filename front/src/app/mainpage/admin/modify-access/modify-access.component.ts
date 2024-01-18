import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../header/header.component";
import { Header } from "../../header/header";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { timer } from "rxjs";
import { CommonModule } from "@angular/common";
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { ModifyAccess } from "../../../models/admin.model";
import { Teacher, UserType } from "../../../models/user.model";
@Component({
    selector: "app-modify-access",
    standalone: true,
    imports: [HeaderComponent, RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: "./modify-access.component.html",
    styleUrl: "./modify-access.component.css",
})
export class ModifyAccessComponent implements OnInit {
    teachersList: Teacher[] = [];
    tps: TP[] = [];
    teacher: Teacher = history.state;
    section: Header = {
        name: "Admin/modifier_accès_encadrant",
    };

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.fetchTeachersList();
        this.fetchTp();

        timer(200).subscribe(() => {
            this.tps.forEach((tp) => {
                this.tpsFormArray.push(this.initTPSelection(tp));
            });
        });
    }

    modifyAccessForm = this.formBuilder.group({
        teacher: [this.teacher.name + " " + this.teacher.surname, [Validators.required]],
        TPs: this.formBuilder.array([]),
    });

    tpsFormArray = this.modifyAccessForm.get("TPs") as FormArray;

    initTPSelection(tp: TP): FormGroup {
        return this.formBuilder.group({
            name: [tp.name],
            accessable: [this.teacher.TPsAccessible.includes(tp.name.toLowerCase())],
        });
    }
    toFormGroup(tpFormControl: AbstractControl) {
        return tpFormControl as FormGroup;
    }

    fetchTeachersList(): void {
        //add a small delay to simulate a real http request
        timer(100).subscribe(() => {
            this.teachersList = teachers;
        });
    }
    fetchTp(): void {
        //add a small delay to simulate a real http request
        timer(100).subscribe(() => {
            this.tps = TP;
        });
    }
    findTeacher(): Teacher | undefined {
        const fullName = this.modifyAccessForm.value.teacher as string;
        const teacher = this.teachersList.find((t) => t.name + " " + t.surname === fullName);
        return teacher;
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
        const teacher = this.findTeacher();
        const TPs = this.getTPsAccessable();
        if (id == "save" && teacher) {
            const modifyAccess: ModifyAccess = {
                id: teacher.id as string,
                name: teacher.name as string,
                surname: teacher.surname as string,
                TPs: TPs,
            };
            console.log(`${modifyAccess.name} is accessible to ${modifyAccess.TPs}`);
        } else if (!teacher) {
            alert("l'encadrant n'exist pas ! ");
        }
        this.router.navigate(["/admin/"]);
    }
}

const teachers = [
    {
        id: "1d234cef65487",
        name: "Damien",
        surname: "Reimert",
        type: UserType.TEACHER,
        TPsAccessible: ["kafka", "scrapping"],
    },
    { id: "1d4578cab", name: "Tristan", surname: "Roussillon", type: UserType.TEACHER, TPsAccessible: ["kafka"] },
    { id: "7c54de9fa654", name: "Stéphane", surname: "Frenot", type: UserType.TEACHER, TPsAccessible: [] },
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
