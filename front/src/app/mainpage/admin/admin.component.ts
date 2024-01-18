import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { Header } from "../header/header";
import { Teacher, UserType } from "../../models/user.model";
import { CommonModule } from "@angular/common";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { timer } from "rxjs";
import { SessionService } from "../../services/session.service";
import { Session, TeacherSession } from "../../models/session.model";

@Component({
    selector: "app-admin",
    standalone: true,
    imports: [CommonModule, HeaderComponent, RouterLink, RouterLinkActive],
    templateUrl: "./admin.component.html",
    styleUrl: "./admin.component.css",
})
export class AdminComponent implements OnInit {
    teachers: Teacher[] = [];
    section: Header = {
        name: "Admin",
    };
    list = true;
    
    // tpAccessible: TpAccessible = {};

    constructor(
        private router: Router,
        private sessionService: SessionService,
    ) {}
    ngOnInit(): void {
        this.fetchTeachers();
        // this.fetchTPsAccessibles();

    }
    deleteTeacher(teacher: Teacher) {
        //Delete the teacher credentials
        if (confirm("Etes-vous sûr de supprimer l'encadrant " + teacher.name + " " + teacher.surname + "?")) {
            console.log("deleted : " + teacher.name + " " + teacher.surname);
        }
    }
    fetchTeachers() {
        timer(100).subscribe(() => {
            this.teachers = teachers;
        });
    }

    gotoModifyAccess(teacher:Teacher){
        this.router.navigateByUrl(`/admin/modifyAccess`, { state: teacher });
    }
}
const teachers = [
    { id: "1d234cef65487", name: "Damien", surname: "Reimert", type: UserType.TEACHER, TPsAccessible:['kafka', 'scrapping']},
    { id: "1d4578cab", name: "Tristan", surname: "Roussillon", type: UserType.TEACHER, TPsAccessible:['kafka']},
    { id: "7c54de9fa654", name: "Stéphane", surname: "Frenot", type: UserType.TEACHER, TPsAccessible:[]},
];
