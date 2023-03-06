import { Container, Graphics } from "pixi.js";

export class XGrid2D extends Graphics {

    gridWidth: number;
    gridHeight: number;

    /**
     * 网格间隔
     */
    gridSpacing: number = 100;
    /**
     * 网格宽度
     */
    lineWidth: number = 1;
    /**
     * 网格颜色
     */
    gridColor: number = 0xff000;


    constructor(private container: Container,private view:Container, width: number, height: number) {
        super();
        this.container.addChild(this);
        this.gridWidth = width;
        this.gridHeight = height;
        this.drawGrid();



        window.onresize = () => {
            this.redraw();
        };
    }

    redraw() {
        this.clear();
        this.drawGrid();
    }
    /**
     * 画线
     */
    private drawLine(startX: number, startY: number, endX: number, endY: number, width: number) {
        this.lineStyle(this.lineWidth, this.gridColor, 1);
        this.moveTo(startX, startY);
        this.lineTo(endX, endY);
    }
    /** 返回 n 其中 -gridSize/2 < n <= gridSize/2 */
    private calculateGridOffset(n: number): number {
        if (n >= 0) {
            return (n + this.gridSpacing / 2.0) % this.gridSpacing - this.gridSpacing / 2.0;
        } else {
            return (n - this.gridSpacing / 2.0) % this.gridSpacing + this.gridSpacing / 2.0;
        }
    }
    /**
     * 画网格
     */
    drawGrid() {
        var offsetX = this.calculateGridOffset(-this.view.x);//-this.viewmodel.originX);
        var offsetY = this.calculateGridOffset(-this.view.y);//-this.viewmodel.originY);

        for (var x = 0; x <= (this.gridWidth / this.gridSpacing); x++) {
            this.drawLine(this.gridSpacing * x + offsetX, 0, this.gridSpacing * x + offsetX, this.gridHeight, this.lineWidth);

        }
        for (var y = 0; y <= (this.gridHeight / this.gridSpacing); y++) {
            this.drawLine(0, this.gridSpacing * y + offsetY, this.gridWidth, this.gridSpacing * y + offsetY, this.lineWidth);
        }
    }
}