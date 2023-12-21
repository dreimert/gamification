import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProgressionComponent } from "./progression.component";
import { RouterTestingModule } from "@angular/router/testing";
import { SessionService } from "../../../services/session.service";

let sessionServiceStub: Partial<SessionService>;

describe("ProgressionComponent", () => {
    let component: ProgressionComponent;
    let fixture: ComponentFixture<ProgressionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProgressionComponent, RouterTestingModule],
            providers: [{ provide: SessionService, useValue: sessionServiceStub }],
        }).compileComponents();

        fixture = TestBed.createComponent(ProgressionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
