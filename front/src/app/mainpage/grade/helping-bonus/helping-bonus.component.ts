import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    Validators,
    ReactiveFormsModule,
    AbstractControl,
    ValidationErrors,
    FormControl,
} from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { User } from "../../../models/user.model";
import { Observable, debounceTime, of, startWith } from "rxjs";
import { GradeService } from "../../../services/grade.service";
import { MatDialogRef } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
    selector: "app-helping-bonus",
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, MatAutocompleteModule, MatTooltipModule],
    templateUrl: "./helping-bonus.component.html",
    styleUrl: "./helping-bonus.component.css",
})
export class HelpingBonusComponent implements OnInit {
    students: User[] = [];
    studentListAutocompletion!: Observable<User[]>;
    usersList: User[] = [];
    student2ListAutocompletion!: Observable<User[]>;
    usersList2!: User[];
    chosenStudent!: User;
    chosenStudent2!: User;
    constructor(
        public dialogRef: MatDialogRef<HelpingBonusComponent>,
        private formBuilder: FormBuilder,
        private gradeService: GradeService,
    ) {}
    studentBonusForm = this.formBuilder.group({
        student1: ["", [Validators.required, (c: FormControl) => this.validateName(c, "student1")]],
        student2: ["", [Validators.nullValidator, (c: FormControl) => this.validateName(c, "student2")]],
    });
    ngOnInit(): void {
        this.initStudent();
        this.initAutoCompletion();
    }
    initStudent() {
        this.gradeService.getBonus("").subscribe({
            next: (students: string[]) => {
                if (students.length >= 1) {
                    this.studentBonusForm.get("student1")?.setValue(students[0]);
                    this.studentFilter(students[0], 0);
                    if (students.length >= 2) {
                        this.studentBonusForm.get("student2")?.setValue(students[1]);
                        this.studentFilter(students[1], 1);
                    }
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
    initAutoCompletion(): void {
        this.studentBonusForm
            .get("student1")
            ?.valueChanges.pipe(debounceTime(300), startWith(""))
            .subscribe((value) => this.studentFilter(value, 0));
        this.studentBonusForm
            .get("student2")
            ?.valueChanges.pipe(debounceTime(300), startWith(""))
            .subscribe((value) => this.studentFilter(value, 1));
    }
    studentFilter(value: string | null, index: number): void {
        if (value && value.length > 2) {
            const filterValue = value.toLowerCase();
            this.gradeService.getUserList(filterValue as string).subscribe({
                next: (users: User[]) => {
                    if (index === 0) {
                        this.usersList = users;
                        this.studentListAutocompletion = of(users);
                    } else {
                        this.usersList2 = users;
                        this.student2ListAutocompletion = of(users);
                    }
                },
                error: (err) => {
                    console.log(err);
                },
            });
        } else {
            this.studentListAutocompletion = of([]);
        }
    }
    studentName(student: User | undefined) {
        return student === undefined ? null : student.name + " " + student.surname;
    }
    validateName(control: AbstractControl, s: string): ValidationErrors | null {
        const name: string = control.value;
        if (name) {
            if (s === "student1") {
                const existsName: boolean = this.usersList.some((student) => this.studentName(student) === name);
                if (!existsName) {
                    control.setErrors({ nameError: "Le nom entré n'existe pas" });
                    return { nameError: "Le nom entré n'existe pas" };
                }
                if (name === this.studentName(this.chosenStudent2)) {
                    control.setErrors({ nameUsedError: "Le nom entré est déjà utilisé pour le deuxième étudiant" });
                    return { nameUsedError: "Le nom entré est déjà utilisé pour le deuxième étudiant" };
                }
                this.chosenStudent = this.usersList.find((student) => this.studentName(student) === name)!;
            } else {
                const existsName: boolean = this.usersList2.some((student) => this.studentName(student) === name);
                if (!existsName) {
                    control.setErrors({ nameError: "Le nom entré n'existe pas" });
                    return { nameError: "Le nom entré n'existe pas" };
                }
                if (name === this.studentName(this.chosenStudent)) {
                    control.setErrors({ nameUsedError: "Le nom entré est déjà utilisé pour le première étudiant" });
                    return { nameUsedError: "Le nom entré est déjà utilisé pour le première étudiant" };
                }
                this.chosenStudent2 = this.usersList.find((student) => this.studentName(student) === name)!;
            }
            return null;
        }
        return null;
    }
    onSubmit() {
        if (this.studentBonusForm.valid) {
            const student: User[] = [this.chosenStudent];
            if (this.chosenStudent2 !== undefined) {
                student.push(this.chosenStudent2);
            }
            console.log(student);
            this.dialogRef.close();
            // TODO : create id in grade class to change value
            // this.gradeService.setBonus(student,sessionId).subscribe({
            //     next: () => {
            //         this.router.navigate(["/admin"]);
            //     },
            //     error: (err) => {
            //         console.log(err);
            //     },
            // });
        }
    }
    onCancel() {
        this.dialogRef.close();
    }
}
