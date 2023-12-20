import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NoteProfComponent } from "./note-prof.component";

describe("NoteProfComponent", () => {
    let component: NoteProfComponent;
    let fixture: ComponentFixture<NoteProfComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NoteProfComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NoteProfComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
