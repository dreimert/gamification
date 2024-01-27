import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { Header } from "../header/header";
import { CommonModule } from "@angular/common";
import { GradeService } from "../../services/grade.service";
import { StudentGrade } from "../../models/grade.model";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { HelpingBonusComponent } from "./helping-bonus/helping-bonus.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { User } from "../../models/user.model";
import { SessionService } from "../../services/session.service";

@Component({
    selector: "app-grade",
    standalone: true,
    imports: [HeaderComponent, CommonModule, MatTooltipModule],
    templateUrl: "./grade.component.html",
    styleUrl: "./grade.component.css",
})
export class GradeComponent implements OnInit {
    section: Header = {
        name: "Notes",
    };

    grades!: StudentGrade[];

    constructor(
        private gradeService: GradeService,
        private router: Router,
        private dialog: MatDialog,
        private sessionService: SessionService,
    ) {}

    ngOnInit() {
        this.gradeService.getMyGrades().subscribe({
            next: (grades) => {
                this.grades = grades;
            },
            error: (err) => {
                console.log(err);
                this.router.navigate(["/"]);
            },
        });
    }
    popupBonus(grade: StudentGrade) {
        let editTimeEnded: boolean;
        const date = new Date();
        date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
        this.sessionService.getSession(grade.sessionId).subscribe({
            next: (session) => {
                const endDate = new Date(session.endDate);
                editTimeEnded = endDate.getTime() < date.getTime();
                if (editTimeEnded) {
                    this.gradeService.getBonus(grade.progressionId).subscribe({
                        next: (students: User[]) => {
                            if (students.length >= 2) {
                                alert(
                                    "Vous ne pouvez plus voter.\nVous avez voté pour " +
                                        this.studentName(students[0]) +
                                        " et " +
                                        this.studentName(students[1]) +
                                        ".",
                                );
                            } else if (students.length == 1) {
                                alert(
                                    "Vous ne pouvez plus voter.\nVous avez voté pour " +
                                        this.studentName(students[0]) +
                                        ".",
                                );
                            } else {
                                alert("Vous ne pouvez plus voter.\nVous n'avez voté pour personne.");
                            }
                        },
                        error: (err) => {
                            console.log(err);
                        },
                    });
                } else {
                    this.dialog.open(HelpingBonusComponent, {
                        width: "60%",
                        data: grade,
                    });
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
    studentName(student: User | undefined) {
        return student === undefined ? null : student.name + " " + student.surname;
    }
}
