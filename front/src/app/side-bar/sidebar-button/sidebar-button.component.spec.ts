import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SidebarButtonComponent } from "./sidebar-button.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("SidebarButtonComponent", () => {
    let component: SidebarButtonComponent;
    let fixture: ComponentFixture<SidebarButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SidebarButtonComponent, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(SidebarButtonComponent);
        component = fixture.componentInstance;
        component.sidebarButton = {
            id: 1,
            name: "Accueil",
            url: "/home",
            open: true,
        };
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
