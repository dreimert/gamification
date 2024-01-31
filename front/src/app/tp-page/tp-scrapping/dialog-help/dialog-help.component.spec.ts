import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DialogHelpComponent } from "./dialog-help.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

describe("DialogHelpComponent", () => {
    let component: DialogHelpComponent;
    let fixture: ComponentFixture<DialogHelpComponent>;
    let token: string;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DialogHelpComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useFactory: () => jasmine.createSpyObj("MatDialogRef", ["close"]),
                },
                { provide: MAT_DIALOG_DATA, useValue: token },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DialogHelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
