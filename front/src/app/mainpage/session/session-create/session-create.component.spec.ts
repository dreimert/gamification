import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SessionCreateComponent } from "./session-create.component";
import { SessionService } from "../../../services/session.service";
import { Observable, of } from "rxjs";
import { PrivateUser, UserType } from "../../../models/user.model";
import { CreateSession, SessionStatus, TeacherSession } from "../../../models/session.model";
import { UserService } from "../../../services/user.service";

let userServiceStub: Partial<UserService>;
let sessionServiceStub: Partial<SessionService>;

describe("SessionCreateComponent", () => {
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
    sessionServiceStub = {
        newSession(session: CreateSession): Observable<TeacherSession> {
            return of<TeacherSession>({
                id: "SessionID",
                name: session.name,
                teachers: ["TeacherID"],
                startDate: session.startDate,
                endDate: session.endDate,
                TP: session.TP,
                students: [],
                status: SessionStatus.SCHEDULED,
            });
        },
    };
    let component: SessionCreateComponent;
    let fixture: ComponentFixture<SessionCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SessionCreateComponent],
            providers: [
                { provide: UserService, useValue: userServiceStub },
                { provide: SessionService, useValue: sessionServiceStub },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SessionCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
