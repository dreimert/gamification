import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../header/header.component";
import { Header } from "../../header/header";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { timer } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ModifyAccess } from "../../../models/admin.model";
import { User, UserType } from "../../../models/user.model";
@Component({
    selector: "app-modify-access",
    standalone: true,
    imports: [HeaderComponent, RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
    templateUrl: "./modify-access.component.html",
    styleUrl: "./modify-access.component.css",
})
export class ModifyAccessComponent implements OnInit {
    usersList: User[] = [];
    tps: TP[] = [];
    teacher!: User;
    section: Header = {
        name: "Admin/modifier_accès_encadrant",
    };

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.teacher = history.state;
        this.fetchUsersList();
        this.fetchTp();
    }

    modifyAccessForm = this.formBuilder.group({
        teacher: [this.teacher, [Validators.required]],
        TP: ["", Validators.required],
    });

    fetchUsersList(): void {
        //add a small delay to simulate a real http request
        timer(1000).subscribe(() => {
            this.usersList = teachers;
        });
    }
    fetchTp(): void {
        //add a small delay to simulate a real http request
        timer(1000).subscribe(() => {
            this.tps = TP;
        });
    }
    onSubmit(id: string) {
        if (id == "save") {
            const modifyAccess: ModifyAccess = {
                id: this.modifyAccessForm.value.teacher?.id as string,
                name: this.modifyAccessForm.value.teacher?.name as string,
                surname: this.modifyAccessForm.value.teacher?.surname as string,
                TPs: this.modifyAccessForm.value.TP as string,
            };
            console.log(modifyAccess);
        }
        this.router.navigate(["/admin/"]);
    }
}

const teachers = [
    { id: "1d234cef65487", name: "Damien", surname: "Reimert", type: UserType.TEACHER },
    { id: "1d4578cab", name: "Tristan", surname: "Roussillon", type: UserType.TEACHER },
    { id: "7c54de9fa654", name: "Stéphane", surname: "Frenot", type: UserType.TEACHER },
];

interface TP {
    name: string;
    id: string;
}

const TP = [
    { name: "Kafka", id: "1d234cef65487" },
    { name: "Scrapping", id: "1d4578cab" },
    { name: "TP2", id: "7c54de9fa654" },
];
