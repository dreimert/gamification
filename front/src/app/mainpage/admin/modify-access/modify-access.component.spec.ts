import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ModifyAccessComponent } from "./modify-access.component";

describe("ModifyAccessComponent", () => {
    let component: ModifyAccessComponent;
    let fixture: ComponentFixture<ModifyAccessComponent>;

    beforeEach(async () => {
        window.history.pushState({ id: "1", name: "TP" }, "", "");
        await TestBed.configureTestingModule({
            imports: [ModifyAccessComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ModifyAccessComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
