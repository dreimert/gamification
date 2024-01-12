import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditSessionOngoingComponent } from "./edit-session-ongoing.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("EditSessionOngoingComponent", () => {
    let component: EditSessionOngoingComponent;
    let fixture: ComponentFixture<EditSessionOngoingComponent>;

    beforeEach(async () => {
        window.history.pushState({ id: "1", name: "TP", password:'password', endDate:'2025-12-11T11:03:00.000Z' }, "", "");
        await TestBed.configureTestingModule({
            imports: [EditSessionOngoingComponent, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(EditSessionOngoingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
