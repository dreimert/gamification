import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { Header } from "../header/header";
import { User, UserType } from "../../models/user.model";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { timer } from "rxjs";
@Component({
    selector: "app-admin",
    standalone: true,
    imports: [CommonModule, HeaderComponent, RouterLink, RouterLinkActive],
    templateUrl: "./admin.component.html",
    styleUrl: "./admin.component.css",
})
export class AdminComponent implements OnInit {
    teachers: User[] = [];
    section: Header = {
        name: "Admin",
    };
    list = true;
    constructor() {}
    ngOnInit(): void {
        this.fetchTeachers();
    }
    deleteTeacher(teacher: User) {
        //Delete the teacher credentials
        if (confirm("Etes-vous sûr de supprimer l'encadrant " + teacher.name + " " + teacher.surname + "?")) {
            console.log("deleted : " + teacher.name + " " + teacher.surname);
        }
    }
    fetchTeachers() {
        timer(1000).subscribe(() => {
            this.teachers = teachers;
        });
    }
}
const teachers = [
    { id: "1d234cef65487", name: "Damien", surname: "Reimert", type: UserType.TEACHER },
    { id: "1d4578cab", name: "Tristan", surname: "Roussillon", type: UserType.TEACHER },
    { id: "7c54de9fa654", name: "Stéphane", surname: "Frenot", type: UserType.TEACHER },
];
