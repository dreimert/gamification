import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink, ActivatedRoute, Router } from "@angular/router";
import { HeaderComponent } from "../../header/header.component";
import { Header } from "../../header/header";
import { SessionService } from "../../../services/session.service";
import { TeacherSession, Session } from "../../../models/session.model";
import { gradeStructure, listsGrade } from "./list_grade";

@Component({
    selector: "app-list-session-grade",
    standalone: true,
    imports: [HeaderComponent, CommonModule, FormsModule, RouterLink],
    templateUrl: "./list-session-grade.component.html",
    styleUrl: "./list-session-grade.component.css",
})
export class ListSessionGradeComponent implements OnInit {
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
    filteredStudentGrades: gradeStructure[] = this.listGrade;

    searchStudent() {
        this.filteredStudentGrades = this.listGrade.filter((gradeStructure) =>
            gradeStructure.name.toLowerCase().includes(this.studentNameSearch.toLowerCase()),
        );
    }

    gotoNoteEdit() {
        this.router.navigateByUrl(`/grade-teacher/${this.session.id}/lookup/edit`, { state: this.session });
    }

    return(): void {
        history.back();
    }
}
