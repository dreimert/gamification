export class Arrow {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    id: number;
    width: number;
    height: number;
    sourceX!: number;
    sourceY!: number;
    destX!: number;
    destY!: number;
    show: boolean;
    constructor(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        id: number,
        width: number,
        height: number,
        show: boolean = true,
    ) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.id = id;
        this.width = width;
        this.height = height;
        this.show = show;
        this.calculateCoordinates();
    }
    // if (this.y2 < this.y1) {
    //             this.sourceX = this.x1 + this.width;
    //             this.sourceY = this.y1;
    //         } else if (this.y2 > this.y1 + this.width) {
    //             this.sourceX = this.x1 + this.width / 2;
    //             this.sourceY = this.y1 + this.height;
    //         } else {
    //             this.sourceX = this.x1 + this.width / 2;
    //             this.sourceY = this.y1 + this.height;
    //         }
    calculateCoordinates() {
        if (this.x2 > this.x1 + this.width) {
            this.sourceX = this.x1 + this.width;
            this.sourceY = this.y1 + this.height / 2;
            if (this.y2 < this.y1) {
                this.destX = this.x2 + this.width / 2;
                this.destY = this.y2 + this.height;
            } else if (this.y2 > this.y1 + this.height) {
                this.destX = this.x2 + this.width / 2;
                this.destY = this.y2;
            } else {
                this.destX = this.x2;
                this.destY = this.y2 + this.height / 2;
            }
        } else if (this.y2 < this.y1) {
            this.sourceX = this.x1 + this.width / 2;
            this.sourceY = this.y1;
            this.destX = this.x2 + this.width / 2;
            this.destY = this.y2 + this.height;
        } else {
            this.sourceX = this.x1 + this.width / 2;
            this.sourceY = this.y1 + this.height;
            this.destX = this.x2 + this.width / 2;
            this.destY = this.y2;
        }
        this.show = true;
    }
}

export class Block {
    name: string;
    id: number;
    productivity: number;
    profit: number;
    type: BlockType;
    xInit: number;
    yInit: number;
    x: number;
    y: number;
    sourceArrow: number[];
    destArrow: number[];
    textCode: string;
    constructor(
        name: string,
        id: number,
        type: BlockType,
        productivity: number,
        profit: number = 0,
        xInit: number = 0,
        yInit: number,
        x: number,
        y: number,
        sourceArrow: number[] = [],
        destArrow: number[] = [],
        textCode: string = "",
    ) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.productivity = productivity;
        this.profit = profit;
        this.xInit = xInit;
        this.yInit = yInit;
        this.x = x;
        this.y = y;
        this.sourceArrow = sourceArrow;
        this.destArrow = destArrow;
        this.textCode = textCode;
    }
}
export enum BlockType {
    MINE = "mine",
    WARREHOUSE = "warehouse",
    FACTORY = "factory",
}
