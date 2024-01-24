import { Component, ElementRef } from "@angular/core";
import * as d3 from "d3";
import { ParamPopupComponent } from "../param-popup/param-popup.component";
import { Block, BlockType } from "../kafka.model";
import { MatDialog } from "@angular/material/dialog";
@Component({
    selector: "app-d3-test",
    standalone: true,
    imports: [],
    templateUrl: "./d3-test.component.html",
    styleUrl: "./d3-test.component.css",
})
export class D3TestComponent {
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
            textCode: "",
        },
    ];
    minesCounter = 1;
    factories: Block[] = [];
    warehouses: Block[] = [];
    warehouseCounter = 1;
    factoryCounter = 1;
    svg: any;
    hostElement;
    g: any;
    divMine: any[] = [];
    divWarehouse: any[] = [];
    divFactory: any[] = [];
    constructor(
        private elRef: ElementRef,
        public dialog: MatDialog,
    ) {
        this.hostElement = this.elRef.nativeElement;
        this.createChart();
    }
    private createChart() {
        this.setChartDimensions();
        this.addGraphicsElement();
        const link = d3.linkHorizontal()({
            source: [10, 10],
            target: [100, 100],
        });
        this.createMine(this.mines[0]);
        this.createWarehouse();
        this.createFactory();
        this.svg.append("rect").attr("width", "32").attr("height", "16").attr("fill", "gray").attr("text", "test");
        this.svg.append("path").attr("d", link).attr("stroke", "black").attr("fill", "none");
    }
    createMine(
        mine: Block = {
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
            textCode: "",
        },
    ) {
        const m = d3
            .select(this.hostElement)
            .append("div")
            .attr("id", "Mine" + mine.id)
            .attr("class", "flex relative w-32 h-16 bg-gray-500 items-center")
            .html("<p class='m-auto cursor-grab'>" + mine.name + "</p>")
            .append("button")
            .attr("class", "absolute top-0 right-1 w-1/6 h-1/6 justify-center")
            .on("click", (e) => {
                this.displayPopup(mine);
            })
            .append("img")
            .attr("src", "/assets/tpKafka/three-dots-svgrepo-com.png");
        d3.drag()
            .on("start", function (d) {
                d3.select(this).raise().attr("stroke", "black");
            })
            .on("drag", function (d) {
                // d3.select(this).style("position", "absolute").style("top", d3.event.dx).style("left", d3.event.dy);
            });

        this.divMine.push(m);
    }
    // dragStart = (d) => {

    // };
    // dragging(event, d) {
    //     const xCoor = event.x;
    //     const yCoor = event.y;

    //     d3.select(this).attr("x", xCoor).attr("y", yCoor);
    // }
    // dragEnd(e, d) {
    //     d3.select(this).style("stroke", "black");
    // }
    createWarehouse() {
        const w = new Block(
            "Entrepôt " + this.warehouseCounter,
            1000 + this.warehouseCounter,
            BlockType.WARREHOUSE,
            100,
            undefined,
            0,
            this.minesCounter + this.warehouseCounter + this.factoryCounter * 64,
            0,
            this.minesCounter + this.warehouseCounter + this.factoryCounter * 64,
        );
        this.warehouses.push(w);
        this.divWarehouse.push(
            d3
                .select(this.hostElement)
                .append("div")
                .attr("id", "Warehouse" + w.id)
                .attr("class", "flex relative w-32 h-16 bg-gray-500 items-center")
                .html("<p class='m-auto cursor-grab'>" + w.name + "</p>")
                .append("button")
                .attr("class", "absolute top-0 right-1 w-1/6 h-1/6 justify-center")
                .on("click", (e) => {
                    this.displayPopup(w);
                })
                .append("img")
                .attr("src", "/assets/tpKafka/three-dots-svgrepo-com.png"),
        );
    }
    createFactory() {
        const f = new Block(
            "Usine " + this.factoryCounter,
            2000 + this.factoryCounter,
            BlockType.FACTORY,
            100,
            1,
            0,
            this.minesCounter + this.warehouseCounter + this.factoryCounter * 64,
            0,
            this.minesCounter + this.warehouseCounter + this.factoryCounter * 64,
        );
        this.warehouses.push(f);
        this.divWarehouse.push(
            d3
                .select(this.hostElement)
                .append("div")
                .attr("id", "Factory" + f.id)
                .attr("class", "flex relative w-32 h-16 bg-gray-500 items-center")
                .html("<p class='m-auto cursor-grab'>" + f.name + "</p>")
                .append("button")
                .attr("class", "absolute top-0 right-1 w-1/6 h-1/6 justify-center")
                .on("click", (e) => {
                    this.displayPopup(f);
                })
                .append("img")
                .attr("src", "/assets/tpKafka/three-dots-svgrepo-com.png"),
        );
    }
    displayPopup(element: Block) {
        const dialogRef = this.dialog.open(ParamPopupComponent, {
            width: "50%",
            height: "50%",
            data: element,
        });
    }
    private setChartDimensions() {
        const viewBoxHeight = 200;
        const viewBoxWidth = 200;
        this.svg = d3
            .select(this.hostElement)
            .append("svg")
            .attr("text", "text")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight);
    }
    private addGraphicsElement() {
        this.g = this.svg.append("g").attr("transform", "translate(0,0)");
    }
}
