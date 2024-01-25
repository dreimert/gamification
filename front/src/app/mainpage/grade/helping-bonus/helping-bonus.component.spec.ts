import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HelpingBonusComponent } from "./helping-bonus.component";
import { MatDialogRef } from "@angular/material/dialog";
import { GradeService } from "../../../services/grade.service";
import { Observable, of } from "rxjs";
import { User, UserType } from "../../../models/user.model";

describe("HelpingBonusComponent", () => {
    let component: HelpingBonusComponent;
    let fixture: ComponentFixture<HelpingBonusComponent>;
    const gradeServiceStub: Partial<GradeService> = {
        getBonus(): Observable<string[]> {
            return of<string[]>(["abdel taya"]);
        },
        getUserList(): Observable<User[]> {
            return of<User[]>([
                {
                    id: "1",
                    name: "abdel",
                    surname: "taya",
                    type: UserType.STUDENT,
                },
                {
                    id: "2",
                    name: "xinyi",
                    surname: "zhao",
                    type: UserType.STUDENT,
                },
            ]);
        },
    };
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HelpingBonusComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useFactory: () => jasmine.createSpyObj("MatDialogRef", ["close"]),
                },
                { provide: GradeService, useValue: gradeServiceStub },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HelpingBonusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
