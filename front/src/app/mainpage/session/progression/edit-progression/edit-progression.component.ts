// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-edit-progression',
//   standalone: true,
//   imports: [],
//   templateUrl: './edit-progression.component.html',
//   styleUrl: './edit-progression.component.css'
// })
// export class EditProgressionComponent {

// }

import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { HeaderComponent } from "../../../header/header.component";
import { Header } from "../../../header/header";
import { SessionService } from "../../../../services/session.service";
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

    StuList!: Observable<string[]> | undefined;

    constructor(
        private sessionService: SessionService,
        private formBuilder: FormBuilder,
    ) {}

    segments = window.location.href.split("/");
    sessionId =
        decodeURIComponent(this.segments[this.segments.length - 3].replace(/%20/g, " ")) ||
        "URL does not have enough segments.";
    ngOnInit(): void {
        // get session info
        this.sessionService.getAvailableSessions().subscribe((sessions: Session[] | TeacherSession[]) => {
            const sessionInfo = sessions.find((s: Session | TeacherSession) => s.id == this.sessionId);
            if (sessionInfo) {
                this.session = sessionInfo;
                this.sessionName = this.session.name;
            } else {
                console.log("name of session not found");
            }
            this.section = {
                name: `Session/${this.sessionName}/avancement/modifier`,
            };
        });

        // filter student
        this.StuList = this.progressionForm.get("name")?.valueChanges.pipe(
            startWith(""),
            map((value) => this._filter(value)),
        );
    }

    progressionForm = this.formBuilder.group({
        name: ["", [Validators.required, this.validateName.bind(this)]],
        progression: ["", [Validators.required, this.validateProgress.bind(this)]],
    });

    // change form of students data
    levels = Object.entries(levels).map(([key, value], index) => {
        return { id: index, key: key, value: value };
    });
    progressions = [...progressions];
    students: { [key: string]: string } = this.progressions.reduce((result: Record<string, string>, progression) => {
        result[progression.name] = progression.level;
        return result;
    }, {});
    studentsList = Object.keys(this.students);

    StuProgress!: string | null;

    validateName(control: AbstractControl): ValidationErrors | null {
        const name: string = control.value;
        if (name) {
            this.StuProgress = this.students[name];
        }
        if (!name || this.studentsList.includes(name)) {
            return null;
        } else {
            control.setErrors({ nameError: "Le nom entré n'existe pas" });
            return { nameError: "Le nom entré n'existe pas" };
        }
    }

    validateProgress(control: AbstractControl): ValidationErrors | null {
        const progress = control.value;
        if (this.StuProgress && progress && progress < this.StuProgress) {
            control.setErrors({ progressError: "Attention ! L'élève va aller à un niveau précédent !" });
            return { progressError: "Attention ! L'élève va aller à un niveau précédent !" };
        } else {
            return null;
        }
    }

    private _filter(value: string | null): string[] {
        if (value) {
            const filterValue = value.toLowerCase();
            return this.studentsList.filter((stu) => stu.toLowerCase().includes(filterValue));
        }
        return this.studentsList;
    }

    onSubmit() {
        window.location.href = `/session/${this.sessionId}/progressions/`;
    }
}
