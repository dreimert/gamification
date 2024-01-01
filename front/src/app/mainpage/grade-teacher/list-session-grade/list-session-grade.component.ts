import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, ActivatedRoute, Router } from "@angular/router";
import { HeaderComponent } from "../../header/header.component";
import { Header } from "../../header/header";
import { SessionService } from "../../../services/session.service";
import { TeacherSession, Session } from "../../../models/session.model";
import { gradeStructure, listsGrade } from "./list_grade";

@Component({
    selector: "app-list-session-grade",
    standalone: true,
    imports: [HeaderComponent, CommonModule, RouterLink],
    templateUrl: "./list-session-grade.component.html",
    styleUrl: "./list-session-grade.component.css",
})
export class ListSessionGradeComponent {
    session!: Session | TeacherSession;
    section: Header = { name: `Notes/` };

    constructor(
        private sessionService: SessionService,
        private router: Router,
        private activeRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.session = history.state;
        this.section = {
            name: `Notes/${this.session.name}`,
        };
    }

    studentList = "";
    listGrade = [...listsGrade];
    studentNameSearch = "";
    filteredProgressions: gradeStructure[] = this.listGrade;

    searchStudent() {
        this.filteredProgressions = this.listGrade.filter((gradeStructure) =>
        gradeStructure.name.toLowerCase().includes(this.studentNameSearch.toLowerCase()),
        );
    }

    gotoProgressEdit() {
        this.router.navigateByUrl(`/grade-teacher/${this.session.id}/lookup/edit`, { state: this.session });
    }
}
