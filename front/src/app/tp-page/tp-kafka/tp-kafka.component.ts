import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { CdkDragEnd, DragDropModule } from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material/dialog";
import { ParamPopupComponent } from "./param-popup/param-popup.component";
import { Block, BlockType } from "./kafka.model";
@Component({
    selector: "app-tp-kafka",
    standalone: true,
    imports: [CommonModule, DragDropModule],
    templateUrl: "./tp-kafka.component.html",
    styleUrl: "./tp-kafka.component.css",
})
export class TpKafkaComponent implements OnInit {
    lvl!: number;
    mines: Block[] = [{ name: "Mine 1", id: 1, type: BlockType.MINE, productivity: 100, profit: 0 }];
    minesCounter = 1;
    factories: Block[] = [];
    warehouses: Block[] = [];
    warehouseCounter = 1;
    factoryCounter = 1;
    constructor(
        private titleService: Title,
        public dialog: MatDialog,
    ) {
        this.titleService.setTitle("Tp Kafka");
    }
    ngOnInit(): void {
        this.fetchLevel();
    }
    changeLevel() {
        this.lvl += 1;
    }
    fetchLevel() {
        // Service to get last level of student
        this.lvl = 0;
    }
    dragEnd($event: CdkDragEnd) {
        console.log($event.source.getFreeDragPosition());
    }
    createWarehouse() {
        const w = new Block(
            "Entrepôt " + this.warehouseCounter,
            1000 + this.warehouseCounter,
            BlockType.WARREHOUSE,
            100,
        );
        this.warehouses.push(w);
        this.warehouseCounter++;
        console.log("Entrepôt created");
        console.log(this.warehouses);
    }
    createFactory() {
        const w = new Block("Usine " + this.factoryCounter, 2000 + this.factoryCounter, BlockType.FACTORY, 100, 1);
        this.factories.push(w);
        this.factoryCounter++;
        console.log("Usine created");
        console.log(this.factories);
    }
    popup(element: Block) {
        console.log("clicked");
        console.log(element);
        const dialogRef = this.dialog.open(ParamPopupComponent, {
            width: "50%",
            height: "50%",
            data: element,
        });
    }
}
