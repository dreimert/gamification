import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConsultDialogComponent } from "./consult-dialog.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Session, SessionStatus, TeacherSession } from "../../../models/session.model";

describe("ConsultDialogComponent", () => {
    let component: ConsultDialogComponent;
    let fixture: ComponentFixture<ConsultDialogComponent>;
    let session: Session | TeacherSession;

    beforeEach(async () => {
        session = {
            id: "1",
            name: "test",
            teachers: ["1"],
            startDate: new Date(),
            endDate: new Date(Date.now() + 1000 * 60 * 60 * 2),
            TP: "1",
            status: SessionStatus.SCHEDULED,
        };
        await TestBed.configureTestingModule({
            imports: [ConsultDialogComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useFactory: () => jasmine.createSpyObj("MatDialogRef", ["close", "afterClosed"]),
                },
                { provide: MAT_DIALOG_DATA, useValue: session },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ConsultDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
