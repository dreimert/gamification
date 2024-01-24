import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { CdkDragStart, CdkDragEnd, DragDropModule, CdkDragMove } from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material/dialog";
import { ParamPopupComponent } from "./param-popup/param-popup.component";
import { Arrow, Block, BlockType } from "./kafka.model";
import { D3TestComponent } from "./d3-test/d3-test.component";
@Component({
    selector: "app-tp-kafka",
    standalone: true,
    imports: [CommonModule, DragDropModule, D3TestComponent],
    templateUrl: "./tp-kafka.component.html",
    styleUrl: "./tp-kafka.component.css",
})
export class TpKafkaComponent implements OnInit {
    lvl!: number;
    mines: Block[] = [
        {
            name: "Mine 1",
            id: 1,
            type: BlockType.MINE,
            productivity: 100,
            profit: 0,
            xInit: 0,
            yInit: 0,
            x: 0,
            y: 0,
            sourceArrow: [],
            destArrow: [],
            textCode: "pub(Entrepot 1);",
        },
    ];
    minesCounter = 1;
    warehouseCounter = 0;
    factoryCounter = 0;
    arrowCounter = 0;
    zIndex = 2;
    factories: Block[] = [];
    warehouses: Block[] = [];
    arrows: Arrow[] = [];
    width = 128;
    height = 64;
    line = {
        x1: 150,
        y1: 100,
        x2: 300,
        y2: 20,
    };
    constructor(
        private titleService: Title,
        public dialog: MatDialog,
    ) {
        this.titleService.setTitle("Tp Kafka");
    }
    ngOnInit(): void {
        this.fetchLevel();
        this.createWarehouse();
        // console.log(this.createArrow(this.mines[0], this.warehouses[0].name));
    }
    changeLevel() {
        this.lvl += 1;
    }
    fetchLevel() {
        // Service to get last level of student
        this.lvl = 1;
    }
    dragStartMine($event: CdkDragStart, draggedBlock: Block) {
        // draggedBlock.sourceArrow.forEach((id) => {
        //     this.arrows.find((e) => e.id === id)!.show = false;
        // });
    }
    dragStartWarehouse($event: CdkDragStart, draggedBlock: Block) {
        // draggedBlock.sourceArrow.forEach((id) => {
        //     this.arrows.find((e) => e.id === id)!.show = false;
        // });
    }
    dragMine($event: CdkDragEnd | CdkDragMove, draggedBlock: Block) {
        //Chercher l'id des bon arrow dans arrows avec source ou dest arrow
        // Changer leur position
        // Réafficher
        const pos = $event.source.getFreeDragPosition();
        draggedBlock.x = pos.x;
        draggedBlock.y = pos.y;
        // console.log(draggedBlock.sourceArrow);
        draggedBlock.sourceArrow.forEach((id) => {
            const a = this.arrows.find((e) => e.id === id);
            // console.log(a);
            a!.x1 = pos.x + draggedBlock.xInit;
            a!.y1 = pos.y + draggedBlock.yInit;
            a!.calculateCoordinates();
            // a!.x1 = pos.x + draggedBlock.xInit + $event.source.getRootElement().offsetWidth;
            // a!.y1 = pos.y + draggedBlock.yInit + $event.source.getRootElement().offsetHeight / 2;
        });
        // this.line.x1 = pos.x + $event.source.getRootElement().offsetWidth;
        // this.line.y1 = pos.y + $event.source.getRootElement().offsetHeight / 2;
    }
    dragWarehouse($event: CdkDragEnd | CdkDragMove, draggedBlock: Block) {
        const pos = $event.source.getFreeDragPosition();
        // console.log();
        draggedBlock.x = pos.x;
        draggedBlock.y = pos.y;
        // console.log(draggedBlock);
        draggedBlock.sourceArrow.forEach((id) => {
            const a = this.arrows.find((e) => e.id === id);
            a!.x1 = pos.x + draggedBlock.xInit;
            a!.y1 = pos.y + draggedBlock.yInit;
            a!.calculateCoordinates();
            // a!.x1 = pos.x + draggedBlock.xInit + $event.source.getRootElement().offsetWidth;
            // a!.y1 = pos.y + draggedBlock.yInit + $event.source.getRootElement().offsetHeight / 2;
        });
        draggedBlock.destArrow.forEach((id) => {
            const a = this.arrows.find((e) => e.id === id);
            a!.x2 = pos.x + draggedBlock.xInit;
            a!.y2 = pos.y + draggedBlock.yInit;
            a!.calculateCoordinates();
            // + $event.source.getRootElement().offsetHeight / 2
            // console.log(draggedBlock);
        });
        // this.line.x2 = pos.x;
        // this.line.y2 = pos.y + 64 + $event.source.getRootElement().offsetHeight / 2;
    }
    dragFactory($event: CdkDragEnd | CdkDragMove, draggedBlock: Block) {
        const pos = $event.source.getFreeDragPosition();
        draggedBlock.x = pos.x;
        draggedBlock.y = pos.y;
        // console.log(this.arrows);
        draggedBlock.destArrow.forEach((id) => {
            const a = this.arrows.find((e) => e.id === id);
            a!.x2 = pos.x + draggedBlock.xInit;
            a!.y2 = pos.y + draggedBlock.yInit;
            a!.calculateCoordinates();
            // + $event.source.getRootElement().offsetHeight / 2
            // console.log(draggedBlock);
        });
    }
    createWarehouse() {
        const w = new Block(
            "Entrepot " + (this.warehouseCounter + 1),
            1000 + this.warehouseCounter,
            BlockType.WARREHOUSE,
            100,
            undefined,
            0,
            (this.minesCounter + this.warehouseCounter + this.factoryCounter) * 64,
            0,
            (this.minesCounter + this.warehouseCounter + this.factoryCounter) * 64,
        );
        this.warehouses.push(w);
        this.warehouseCounter++;
        console.log("Entrepôt created");
        console.log(this.warehouses);
    }
    createFactory() {
        const w = new Block(
            "Usine " + (this.factoryCounter + 1),
            2000 + this.factoryCounter,
            BlockType.FACTORY,
            100,
            1,
            0,
            (this.minesCounter + this.warehouseCounter + this.factoryCounter) * 64,
            0,
            (this.minesCounter + this.warehouseCounter + this.factoryCounter) * 64,
            [],
            [],
            "pub(Entrepot 1);",
        );
        this.factories.push(w);
        this.factoryCounter++;
        console.log("Usine created");
        console.log(this.factories);
    }
    createArrow(b: Block, s: string): boolean {
        // const elem = document.getElementById("Mine1");
        // const rect = elem?.getBoundingClientRect();
        // console.log(elem);
        const w = this.warehouses.find((e) => e.name === s);
        if (w === undefined) {
            return false;
        } else if (b.type === BlockType.MINE) {
            const a = new Arrow(
                b.x + b.xInit,
                b.y + b.yInit,
                w.x + w.xInit,
                w.y + w.yInit,
                this.arrowCounter,
                this.width,
                this.height,
            );
            b.sourceArrow.push(this.arrowCounter);
            w.destArrow.push(this.arrowCounter);
            this.arrows.push(a);
            this.arrowCounter++;
            console.log(a);
        } else {
            const a = new Arrow(
                w.x + w.xInit,
                w.y + w.yInit,
                b.x + b.xInit,
                b.y + b.yInit,
                this.arrowCounter,
                this.width,
                this.height,
            );
            w.sourceArrow.push(this.arrowCounter);
            b.destArrow.push(this.arrowCounter);
            this.arrows.push(a);
            this.arrowCounter++;
            console.log(a);
        }
        return true;
    }
    popup(element: Block) {
        console.log("clicked");
        console.log(element);
        const dialogRef = this.dialog.open(ParamPopupComponent, {
            width: "50%",
            height: "50%",
            data: { block: element, warehouses: this.warehouses },
        });
        dialogRef.componentInstance.createArrow.subscribe((res) => {
            this.createArrow(res.block, res.s);
        });
    }
}
