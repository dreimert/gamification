import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { UserService } from "./services/user.service";
import { Observable, of } from "rxjs";
import { PrivateUser, UserType } from "./models/user.model";
import { Session, SessionStatus, TeacherSession } from "./models/session.model";
import { SessionService } from "./services/session.service";
import { RouterTestingModule } from "@angular/router/testing";

let userServiceStub: Partial<UserService>;
let sessionServiceStub: Partial<SessionService>;
describe("AppComponent", () => {
    beforeEach(async () => {
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

        await TestBed.configureTestingModule({
            imports: [AppComponent, RouterTestingModule],
            providers: [
                { provide: UserService, useValue: userServiceStub },
                { provide: SessionService, useValue: sessionServiceStub },
            ],
        }).compileComponents();
    });

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
