import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AvancementComponent } from "./avancement.component";
import { RouterTestingModule } from "@angular/router/testing";
import { Observable, of } from "rxjs";
import { Session, SessionStatus, TeacherSession } from "../../../models/session.model";
import { SessionService } from "../../../services/session.service";

let sessionServiceStub: Partial<SessionService>;

describe("AvancementComponent", () => {
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

    let component: AvancementComponent;
    let fixture: ComponentFixture<AvancementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AvancementComponent, RouterTestingModule],
            providers: [{ provide: SessionService, useValue: sessionServiceStub }],
        }).compileComponents();

        fixture = TestBed.createComponent(AvancementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
