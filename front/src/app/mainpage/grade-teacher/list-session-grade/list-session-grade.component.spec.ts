import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListSessionGradeComponent } from "./list-session-grade.component";
import { Observable, of } from "rxjs";
import { Session, SessionStatus, TeacherSession } from "../../../models/session.model";
import { SessionService } from "../../../services/session.service";
import { RouterTestingModule } from "@angular/router/testing";

let sessionServiceStub: Partial<SessionService>;

describe("ListSessionGradeComponent", () => {
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
    let component: ListSessionGradeComponent;
    let fixture: ComponentFixture<ListSessionGradeComponent>;

    beforeEach(async () => {
        window.history.pushState({ id: "1", name: "TP" }, "", "");
        await TestBed.configureTestingModule({
            imports: [ListSessionGradeComponent, RouterTestingModule],
            providers: [{ provide: SessionService, useValue: sessionServiceStub }],
        }).compileComponents();

        fixture = TestBed.createComponent(ListSessionGradeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
