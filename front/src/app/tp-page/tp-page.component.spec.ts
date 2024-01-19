import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TpPageComponent } from "./tp-page.component";

describe("TpPageComponent", () => {
    let component: TpPageComponent;
    let fixture: ComponentFixture<TpPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TpPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TpPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
