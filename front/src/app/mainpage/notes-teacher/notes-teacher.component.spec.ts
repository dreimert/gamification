import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NotesTeacherComponent } from "./notes-teacher.component";
import { Observable, of } from "rxjs";
import { Session, SessionStatus, TeacherSession } from "../../models/session.model";
import { SessionService } from "../../services/session.service";
import { UserService } from "../../services/user.service";
import { PrivateUser, UserType } from "../../models/user.model";

let sessionServiceStub: Partial<SessionService>;
let userServiceStub: Partial<UserService>;

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
    userServiceStub = {
        getCurrentUser(): Observable<PrivateUser> {
            return of<PrivateUser>({
                id: "1",
                username: "test",
                email: "abc@test.com",
                name: "test",
                surname: "test",
                type: UserType.STUDENT,
            });
        },
    };

    let component: NotesTeacherComponent;
    let fixture: ComponentFixture<NotesTeacherComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotesTeacherComponent],
            providers: [
                { provide: SessionService, useValue: sessionServiceStub },
                { provide: UserService, useValue: userServiceStub },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(NotesTeacherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
