import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { HeaderComponent } from "../../../header/header.component";
import { Header } from "../../../header/header";
import { TeacherSession, Session } from "../../../../models/session.model";
import { levels, progressions } from "../progression";

@Component({
    selector: "app-edit-progression",
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
    templateUrl: "./edit-progression.component.html",
    styleUrl: "./edit-progression.component.css",
})
export class EditProgressionComponent implements OnInit {
    session!: Session | TeacherSession;
    section: Header = { name: `Session/SESSION_NAME/avancement/modifier` };

    studentListShowing!: Observable<string[]> | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.session = history.state;
        this.section = {
            name: `Session/${this.session.name}/avancement/modifier`,
        };

        // filter student
        this.studentListShowing = this.progressionForm.get("name")?.valueChanges.pipe(
            startWith(""),
            map((value) => this.studentFilter(value)),
        );

        this.progressionForm.get("progression")?.valueChanges.subscribe((progressionValue) => {
            this.compareProgression(progressionValue);
        });
    }

    progressionForm = this.formBuilder.group({
        name: ["", [Validators.required, this.validateName.bind(this)]],
        progression: ["", Validators.required],
    });

    // change form of students data
    levels = Object.entries(levels).map(([key, value], index) => {
        return { id: index, key: key, value: value };
    });
    progressions = [...progressions];
    students_level: { [key: string]: string } = this.progressions.reduce(
        (result: Record<string, string>, progression) => {
            result[progression.name] = progression.level;
            return result;
        },
        {},
    );
    allStudents = Object.keys(this.students_level);

    progressionStudentChosen!: string | null;

    validateName(control: AbstractControl): ValidationErrors | null {
        const name: string = control.value;
        if (name) {
            this.progressionStudentChosen = this.students_level[name];
        }
        if (!name || this.allStudents.includes(name)) {
            return null;
        } else {
            control.setErrors({ nameError: "Le nom entré n'existe pas" });
            return { nameError: "Le nom entré n'existe pas" };
        }
    }

    warning_progression_lower = "";
    compareProgression(progressionValue: string | null): void {
        if (this.progressionStudentChosen && progressionValue && progressionValue < this.progressionStudentChosen) {
            this.warning_progression_lower = "Attention ! L'élève va aller à un niveau précédent !";
        } else {
            this.warning_progression_lower = "";
        }
    }

    private studentFilter(value: string | null): string[] {
        if (value) {
            const filterValue = value.toLowerCase();
            return this.allStudents.filter((student) => student.toLowerCase().includes(filterValue));
        }
        return this.allStudents;
    }

    onSubmit() {
        this.gotoProgression();
    }
    gotoProgression() {
        this.router.navigateByUrl(`/session/${this.session.id}/progressions`, { state: this.session });
    }
}
