import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Observable } from "rxjs";
import { HeaderComponent } from "../../header/header.component";
import { Header } from "../../header/header";
import { TeacherSession, Session } from "../../../models/session.model";

@Component({
    selector: "app-edit-session-ongoing",
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
    templateUrl: "./edit-session-ongoing.component.html",
    styleUrl: "./edit-session-ongoing.component.css",
})
export class EditSessionOngoingComponent implements OnInit {
    session: Session | TeacherSession = history.state;
    section: Header = { name: `Session/SESSION_NAME/edit_session_ongoing` };

    studentListAutocompletion!: Observable<string[]> | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}

    ngOnInit(): void {
        console.log(this.session);
        this.section = {
            name: `Session/${this.session.name}/edit_session_ongoing`,
        };

        const endDate = new Date(this.session.endDate);
        this.editSessionOngoing.get("endDate")?.setValue(endDate.toISOString().substring(0, 16));
    }

    editSessionOngoing = this.formBuilder.group({
        name: [this.session.name, Validators.required],
        password: ["", Validators.required],
        endDate: ["", Validators.required],
    });

    passwordVisible = false;
    public viewPassword(): void {
        this.passwordVisible = !this.passwordVisible;
    }

    onSubmit() {
        this.router.navigateByUrl(`/sessions`);
    }
}
