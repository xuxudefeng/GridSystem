import { Application, Container } from "pixi.js";
import { XGrid2D } from "./xGrid2D";

export class XViewer2D extends Container {

    grid: XGrid2D;
    app1:Application;
    /**
     *
     */
    constructor(app: Application) {
        super();
        this.name = "xViewer2D";
        this.app1 = app;
        this.app1.stage.addChild(this);
        this.position.set(150, 180);
        this.grid = new XGrid2D(this.app1.stage, this, this.app1.view.width, this.app1.view.height);
        console.log(this.name);
        // Follow the pointer
        // Enable interactivity!
        this.app1.stage.interactive = true;

        // Make sure the whole canvas area is interactive, not just the circle.
        this.app1.stage.hitArea = app.screen;
        this.app1.stage.on('pointerup', this.onDragEnd,this);
        this.app1.stage.on('pointerdown', this.onDragStart,this);
        this.app1.stage.on('pointerupoutside', this.onDragEnd,this);
    }

    dragTarget: any;
    onDragMove(event: any) {
        if (this.dragTarget) {
            this.dragTarget.toLocal(event.global, null, this.dragTarget.position);
            this.grid.redraw();
        }
    }

    onDragStart() {
        console.log(this.name);
        this.alpha = 0.5;
        this.dragTarget = this;
        this.app1.stage.on('pointermove', this.onDragMove,this);
    }

    onDragEnd() {
        if (this.dragTarget) {
            this.app1.stage.off('pointermove', this.onDragMove,this);
            this.dragTarget.alpha = 1;
            this.dragTarget = null;
        }
    }
}