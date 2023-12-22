import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Header } from "../../header/header";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { timer } from "rxjs";
import { AddTeacher } from "../../../models/admin.model";
import { HeaderComponent } from "../../header/header.component";
import { Router } from "@angular/router";
import { User, UserType } from "../../../models/user.model";
@Component({
    selector: "app-add-teacher",
    standalone: true,
    imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
    templateUrl: "./add-teacher.component.html",
    styleUrl: "./add-teacher.component.css",
})
export class AddTeacherComponent implements OnInit {
    usersList: User[] = [];
    tps: TP[] = [];
    section: Header = {
        name: "Admin/ajouter_encadrant",
    };
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.fetchUsersList();
        this.fetchTp();
    }

    addTeacherForm = this.formBuilder.group({
        name: ["", [Validators.required]],
        TP: ["", Validators.required],
    });
    fetchUsersList(): void {
        //add a small delay to simulate a real http request
        timer(5000).subscribe(() => {
            this.usersList = users;
        });
    }
    fetchTp(): void {
        //add a small delay to simulate a real http request
        timer(5000).subscribe(() => {
            this.tps = TP;
        });
    }
    onSubmit(id: string) {
        if (id == "save") {
            if (confirm("Etes-vous sûr de vouloir ajouter l'encadrant " + this.addTeacherForm.value.name + " ?")) {
                const addTeacher: AddTeacher = {
                    name: this.addTeacherForm.value.name as string,
                    TPs: this.addTeacherForm.value.TP as string,
                };
                console.log("added:");
                console.log(addTeacher);
            }
        }
        this.router.navigate(["/admin/"]);
    }
}

const users = [
    { id: "1d234cef65487", name: "Damien", surname: "Reimert", type: UserType.STUDENT },
    { id: "1d4578cab", name: "Tristan", surname: "Roussillon", type: UserType.STUDENT },
    { id: "7c54de9fa654", name: "Stéphane", surname: "Frenot", type: UserType.STUDENT },
    { id: "406e05f94304", name: "Abdel", surname: "Taya", type: UserType.STUDENT },
    { id: "90f9cf8ccf90", name: "Xinyi", surname: "Zhao", type: UserType.STUDENT },
    { id: "173cae034c4b", name: "Valentin", surname: "Lemaire", type: UserType.STUDENT },
];

interface TP {
    name: string;
    id: string;
}

const TP = [
    { name: "Tout", id: "173cae034c4b" },
    { name: "Kafka", id: "1d234cef65487" },
    { name: "Scrapping", id: "1d4578cab" },
    { name: "TP2", id: "7c54de9fa654" },
];
