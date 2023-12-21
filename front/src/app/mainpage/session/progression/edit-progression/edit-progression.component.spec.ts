import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditProgressionComponent } from "./edit-progression.component";
import { RouterTestingModule } from "@angular/router/testing";
import { SessionService } from "../../../../services/session.service";

let sessionServiceStub: Partial<SessionService>;

describe("EditProgressionComponent", () => {
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
