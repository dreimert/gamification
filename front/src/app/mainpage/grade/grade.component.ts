import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { Header } from "../header/header";
import { CommonModule } from "@angular/common";
import { GradeService } from "../../services/grade.service";
import { StudentGrade } from "../../models/grade.model";
import { Router } from "@angular/router";

@Component({
    selector: "app-grade",
    standalone: true,
    imports: [HeaderComponent, CommonModule],
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
}
