import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TpPageComponent } from "./tp-page.component";
import { RouterTestingModule } from "@angular/router/testing";
import { SessionService } from "../services/session.service";
import { Session, SessionStatus, TeacherSession } from "../models/session.model";
import { Observable, of } from "rxjs";

let sessionServiceStub: Partial<SessionService>;

describe("TpPageComponent", () => {
    let component: TpPageComponent;
    let fixture: ComponentFixture<TpPageComponent>;

    beforeEach(async () => {
        sessionServiceStub = {
            getSession(): Observable<Session | TeacherSession> {
                return of<Session>({
                    id: "1",
                    name: "test",
                    teachers: ["1"],
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 1000 * 60 * 60 * 2),
                    TP: "1",
                    status: SessionStatus.SCHEDULED,
                    indexGrades: new Map<string, number>([["1", 1]]),
                    joined: false,
                });
            },
        };
        await TestBed.configureTestingModule({
            imports: [TpPageComponent, RouterTestingModule],
            providers: [{ provide: SessionService, useValue: sessionServiceStub }],
        }).compileComponents();

        fixture = TestBed.createComponent(TpPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
