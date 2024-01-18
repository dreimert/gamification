export class Block {
    name: string;
    id: number;
    productivity: number;
    profit: number;
    type: BlockType;
    constructor(name: string, id: number, type: BlockType, productivity: number, profit: number = 0) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.productivity = productivity;
        this.profit = profit;
    }
}
export enum BlockType {
    MINE = "mine",
    WARREHOUSE = "warehouse",
    FACTORY = "factory",
}
