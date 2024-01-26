import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ParamPopupComponent } from "./param-popup.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Block, BlockType } from "../kafka.model";

describe("ParamPopupComponent", () => {
    let component: ParamPopupComponent;
    let fixture: ComponentFixture<ParamPopupComponent>;
    let block: Block;

    beforeEach(async () => {
        block = {
            name: "name",
            id: 1,
            productivity: 100,
            profit: 100,
            type: BlockType.MINE,
        };
        await TestBed.configureTestingModule({
            imports: [ParamPopupComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useFactory: () => jasmine.createSpyObj("MatDialogRef", ["close"]),
                },
                { provide: MAT_DIALOG_DATA, useValue: block },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ParamPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
