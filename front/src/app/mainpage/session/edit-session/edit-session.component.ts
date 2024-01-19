import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { HeaderComponent } from "../../header/header.component";
import { Header } from "../../header/header";
import { TeacherSession, Session } from "../../../models/session.model";
import { SessionService } from "../../../services/session.service";

@Component({
    selector: "app-edit-session",
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
    templateUrl: "./edit-session.component.html",
    styleUrl: "./edit-session.component.css",
})
export class EditSessionComponent implements OnInit {
    session: Session | TeacherSession = history.state;
    section: Header = { name: `Session/SESSION_NAME/edit_session` };
    tps!: TP[];
    startDate = new Date(this.session.startDate);
    endDate = new Date(this.session.endDate);

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private sessionService: SessionService,
    ) {}

    ngOnInit(): void {
        this.fetchTP();
        if (this.session.status == "inProgress") {
            this.editSessionForm.get("TP")?.disable();
            this.editSessionForm.get("startDate")?.disable();
        }

        this.section =
            this.session.status == "inProgress"
                ? { name: `Session/ "${this.session.name}" /modifier_session_en_cours` }
                : { name: `Session/ "${this.session.name}" /modifier_session_programmée` };

        this.editSessionForm.get("startDate")?.setValue(this.startDate.toISOString().substring(0, 16));
        this.editSessionForm.get("endDate")?.setValue(this.endDate.toISOString().substring(0, 16));

        // get password to show on the part 'Mot de pass' for not changing it every time
        // this.sessionService.getPassword(this.session.id).subscribe((password) => {
        //     this.editSessionForm.get('password')?.setValue(password);
        // });
    }

    editSessionForm = this.formBuilder.group(
        {
            name: [this.session.name, Validators.required],
            password: ["", Validators.required],
            TP: [this.session.TP, Validators.required],
            startDate: ["", Validators.required],
            endDate: ["", Validators.required],
        },
        { validators: this.validateDate },
    );

    validateDate(control: AbstractControl): ValidationErrors | null {
        const startDate = new Date(control.get("startDate")?.value as string);
        const endDate = new Date(control.get("endDate")?.value as string);
        if (startDate.getTime() > endDate.getTime()) {
            control.get("endDate")?.setErrors({
                dateError: "La date de fin doit être après la date de début",
            });
            return { dateError: "La date de fin doit être après la date de début" };
        }
        if (endDate.getTime() < new Date().getTime()) {
            control.get("endDate")?.setErrors({
                dateError: "La date de fin doit être après la date actuelle",
            });
            return { dateError: "La date de fin doit être après la date actuelle" };
        }
        return null;
    }

    fetchTP(): void {
        this.tps = TPs;
    }

    passwordVisible = false;
    public viewPassword(): void {
        this.passwordVisible = !this.passwordVisible;
    }

    onSubmit() {
        // const startDate = new Date(this.editSessionForm.value.startDate as string);
        // const endDate = new Date(this.editSessionForm.value.endDate as string);
        // const editedSession: CreateSession = {
        //     name: this.editSessionForm.value.name as string,
        //     password: this.editSessionForm.value.password as string,
        //     TP: this.session.status=='scheduled' ? this.editSessionForm.value.TP as string : this.session.TP,
        //     startDate: this.session.status=='scheduled' ? startDate : this.session.startDate,
        //     endDate: endDate,
        // };

        // this.sessionService.editSession(editedSession).subscribe(() => {
        //     window.location.href = "/session/";
        // });

        window.location.href = "/session/";
    }
}

interface TP {
    name: string;
    id: string;
}

const TPs: TP[] = [
    { name: "kafka", id: "1d234cef65487" },
    { name: "scrapping", id: "1d4578cab" },
];
