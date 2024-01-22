import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GradeComponent } from "./grade.component";
import { GradeService } from "../../services/grade.service";
import { Observable, of } from "rxjs";
import { StudentGrade } from "../../models/grade.model";

let gradeServiceStub: Partial<GradeService>;

describe("GradeComponent", () => {
    gradeServiceStub = {
        getMyGrades(): Observable<StudentGrade[]> {
            return of<StudentGrade[]>([
                {
                    sessionName: "test",
                    tp: "kafka",
                    level: 1,
                    grade: 10,
                    mean: 10,
                    std: 0,
                    coefficient: 1,
                },
            ]);
        },
    };

    let component: GradeComponent;
    let fixture: ComponentFixture<GradeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GradeComponent],
            providers: [{ provide: GradeService, useValue: gradeServiceStub }],
        }).compileComponents();

        fixture = TestBed.createComponent(GradeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
