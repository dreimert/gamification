import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditProgressionComponent } from "./edit-progression.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Observable, of } from "rxjs";
import { Session, SessionStatus, TeacherSession } from "../../../../models/session.model";
import { SessionService } from "../../../../services/session.service";

let sessionServiceStub: Partial<SessionService>;

describe("EditProgressionComponent", () => {
    sessionServiceStub = {
        getAvailableSessions(): Observable<Session[] | TeacherSession[]> {
            return of<Session[]>([
                {
                    id: "1",
                    name: "test",
                    teachers: ["1"],
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 1000 * 60 * 60 * 2),
                    TP: "1",
                    status: SessionStatus.SCHEDULED,
                },
            ]);
        },
    };

    let component: EditProgressionComponent;
    let fixture: ComponentFixture<EditProgressionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditProgressionComponent, RouterTestingModule],
            providers: [{ provide: SessionService, useValue: sessionServiceStub }],
        }).compileComponents();

        fixture = TestBed.createComponent(EditProgressionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
