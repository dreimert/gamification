import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../header/header.component";
import { Header } from "../../header/header";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { timer } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ModifyAccess } from "../../../models/admin.model";
import { AdminService } from "../admin.service";
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
    section: Header = {
        name: "Admin/modifier_accès_encadrant",
    };

    constructor(
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private router: Router,
    ) {
        this.adminService.getMessage.subscribe((msg) => this.modifyAccessForm.get("name")?.setValue(msg));
    }

    ngOnInit(): void {
        this.fetchUsersList();
        this.fetchTp();
    }

    modifyAccessForm = this.formBuilder.group({
        name: ["", [Validators.required]],
        TP: ["", Validators.required],
    });

    fetchUsersList(): void {
        //add a small delay to simulate a real http request
        timer(5000).subscribe(() => {
            this.usersList = teachers;
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
            const modifyAccess: ModifyAccess = {
                name: this.modifyAccessForm.value.name as string,
                TPs: this.modifyAccessForm.value.TP as string,
            };
            console.log(modifyAccess);
        }
        this.router.navigate(["/admin/"]);
    }
}

const teachers = [
    { id: "1d234cef65487", name: "Damien", surname: "Reimert", type: UserType.STUDENT },
    { id: "1d4578cab", name: "Tristan", surname: "Roussillon", type: UserType.STUDENT },
    { id: "7c54de9fa654", name: "Stéphane", surname: "Frenot", type: UserType.STUDENT },
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
