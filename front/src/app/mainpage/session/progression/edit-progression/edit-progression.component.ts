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
    sessionName = "";
    sessionId = "";

    StuList!: Observable<string[]> | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.session = history.state;
        this.sessionName = this.session.name;
        this.sessionId = this.session.id;
        this.section = {
            name: `Session/${this.sessionName}/avancement/modifier`,
        };

        // filter student
        this.StuList = this.progressionForm.get("name")?.valueChanges.pipe(
            startWith(""),
            map((value) => this.stuFilter(value)),
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
    studentsList = Object.keys(this.students_level);

    Progression_StudentChosen!: string | null;

    validateName(control: AbstractControl): ValidationErrors | null {
        const name: string = control.value;
        if (name) {
            this.Progression_StudentChosen = this.students_level[name];
        }
        if (!name || this.studentsList.includes(name)) {
            return null;
        } else {
            control.setErrors({ nameError: "Le nom entré n'existe pas" });
            return { nameError: "Le nom entré n'existe pas" };
        }
    }

    Warning_Progression_Lower = "";
    compareProgression(progressionValue: string | null): void {
        if (this.Progression_StudentChosen && progressionValue && progressionValue < this.Progression_StudentChosen) {
            this.Warning_Progression_Lower = "Attention ! L'élève va aller à un niveau précédent !";
        } else {
            this.Warning_Progression_Lower = "";
        }
    }

    private stuFilter(value: string | null): string[] {
        if (value) {
            const filterValue = value.toLowerCase();
            return this.studentsList.filter((stu) => stu.toLowerCase().includes(filterValue));
        }
        return this.studentsList;
    }

    onSubmit() {
        this.gotoProgression();
    }
    gotoProgression() {
        this.router.navigateByUrl(`/session/${this.session.id}/progressions`, { state: this.session });
    }
}
