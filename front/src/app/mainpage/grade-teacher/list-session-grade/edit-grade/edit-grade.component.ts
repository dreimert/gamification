import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import {
    AbstractControl,
    FormBuilder,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
    ValidatorFn,
} from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { HeaderComponent } from "../../../header/header.component";
import { Header } from "../../../header/header";
import { TeacherSession, Session } from "../../../../models/session.model";
import { levels, listsGrade } from "../list_grade";

@Component({
    selector: "app-edit-grade",
    standalone: true,
    imports: [
        CommonModule,
        HeaderComponent,
        ReactiveFormsModule,
        RouterLink,
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    templateUrl: "./edit-grade.component.html",
    styleUrl: "./edit-grade.component.css",
})
export class EditGradeComponent implements OnInit {
    session!: Session | TeacherSession;
    section: Header = { name: `Notes/SESSION_NAME/modifier` };

    studentListAutocompletion!: Observable<string[]> | undefined;
    gradeOfSelectedLevel: string = "";

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.session = history.state;
        this.section = {
            name: `Notes/${this.session.name}/modifier`,
        };

        // filter student
        this.studentListAutocompletion = this.singleGradeForm.get("name")?.valueChanges.pipe(
            startWith(""),
            map((value) => this.studentFilter(value)),
        );

        this.levelGradeForm.get("level")?.valueChanges.subscribe((selectedLevel) => {
            const levelKey = Number(selectedLevel);
            this.gradeOfSelectedLevel = this.getGradeForLevel(levelKey);
        });
    }

    singleGradeForm = this.formBuilder.group({
        name: ["", [Validators.required, this.validateName.bind(this)]],
        grade: ["", Validators.required],
    });

    levelGradeForm = this.formBuilder.group({
        level: ["", Validators.required],
        grade: ["", [Validators.required, this.validateNote()]],
    });

    // change form of students data
    levels = Object.entries(levels).map(([key, value], index) => {
        return { id: index, key: key, value: value };
    });
    listGrade = [...listsGrade];
    students_info: { [key: string]: string } = this.listGrade.reduce((result: Record<string, string>, listGrade) => {
        result[listGrade.name] = listGrade.grade;
        return result;
    }, {});
    allStudents = Object.keys(this.students_info);

    gradestudentChosen!: string | null;
    levelstudentChosen!: string | null;

    validateName(control: AbstractControl): ValidationErrors | null {
        const name: string = control.value;
        if (name) {
            this.gradestudentChosen = this.students_info[name];
            this.levelstudentChosen = this.listGrade.find((student) => student.name === name)?.level || null;
        }
        if (!name || this.allStudents.includes(name)) {
            return null;
        } else {
            control.setErrors({ nameError: "Le nom entré n'existe pas" });
            return { nameError: "Le nom entré n'existe pas" };
        }
    }

    getGradeForLevel(levelKey: number): string {
        const level = this.levels.find((level) => level.id === levelKey);
        return level ? level.value : "N/A";
    }

    validateNote(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const note: number = +control.value;

            if (!isNaN(note) && note >= 0 && note <= 20) {
                return null; // Note is valid
            } else {
                return { invalidNote: { value: control.value } }; // Note is invalid
            }
        };
    }

    private studentFilter(value: string | null): string[] {
        if (value) {
            const filterValue = value.toLowerCase();
            return this.allStudents.filter((student) => student.toLowerCase().includes(filterValue));
        }
        return this.allStudents;
    }

    onSubmit() {
        this.gotoListGrade();
    }
    gotoListGrade() {
        this.router.navigateByUrl(`/grade-teacher/${this.session.id}/lookup`, { state: this.session });
    }
}
