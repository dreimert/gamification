import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Observable } from "rxjs";
import { HeaderComponent } from "../../header/header.component";
import { Header } from "../../header/header";
import { TeacherSession, Session } from "../../../models/session.model";

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
    editSession!: FormGroup;
    tps!: TP[];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.buildForm();
        this.fetchTP();

        console.log(this.session);
        // console.log(this.session.TP);
        this.section = this.session.status=="inProgress" ? {name: `Session/ "${this.session.name}" /modifier_session_en_cours`,} : {name: `Session/ "${this.session.name}" /modifier_session_programmée`,}

        const startDate = new Date(this.session.startDate);
        const endDate = new Date(this.session.endDate);
        this.editSession.get("startDate")?.setValue(endDate.toISOString().substring(0, 16));
        this.editSession.get("endDate")?.setValue(startDate.toISOString().substring(0, 16));
    }

    private buildForm():void{
        switch (this.session.status){
            case "inProgress":
                this.editSession = this.formBuilder.group({
                    name: [this.session.name, Validators.required],
                    password: ["", Validators.required],
                    endDate: ["", Validators.required],
                });
                break;
            case "scheduled":
                this.editSession = this.formBuilder.group({
                    name: [this.session.name, Validators.required],
                    password: ["", Validators.required],
                    TP: ["", Validators.required],
                    startDate: ["", Validators.required],
                    endDate: ["", Validators.required],
                });
                const startDate = new Date(this.session.startDate);
                this.editSession.get("startDate")?.setValue(startDate.toISOString().substring(0, 16));
                break;
        }
        const endDate = new Date(this.session.endDate);
        this.editSession.get("endDate")?.setValue(endDate.toISOString().substring(0, 16));
        
    }

    fetchTP():void{
        this.tps = TPs;
    }

    passwordVisible = false;
    public viewPassword(): void {
        this.passwordVisible = !this.passwordVisible;
    }

    onSubmit() {
        this.router.navigateByUrl(`/sessions`);
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
