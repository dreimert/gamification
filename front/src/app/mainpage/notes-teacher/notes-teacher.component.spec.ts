import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NotesTeacherComponent } from "./notes-teacher.component";
import { Observable, of } from "rxjs";
import { PrivateUser, UserType } from "../../models/user.model";
import { Session, SessionStatus, TeacherSession } from "../../models/session.model";
import { UserService } from "../../services/user.service";
import { SessionService } from "../../services/session.service";

let sessionServiceStub: Partial<SessionService>;

describe("NotesTeacherComponent", () => {
    sessionServiceStub = {
        getAllSessions(): Observable<Session[] | TeacherSession[]> {
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
    let component: NotesTeacherComponent;
    let fixture: ComponentFixture<NotesTeacherComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotesTeacherComponent],
            providers: [{ provide: SessionService, useValue: sessionServiceStub }],
        }).compileComponents();

        fixture = TestBed.createComponent(NotesTeacherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
