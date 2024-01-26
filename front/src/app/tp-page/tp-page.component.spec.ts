import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TpPageComponent } from "./tp-page.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("TpPageComponent", () => {
    let component: TpPageComponent;
    let fixture: ComponentFixture<TpPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TpPageComponent, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(TpPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
