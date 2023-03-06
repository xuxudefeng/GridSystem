import { Component, ElementRef, Renderer2 } from '@angular/core';
// import { ArcRotateCamera, MeshBuilder, Vector3 } from 'babylonjs';
import { Application } from 'pixi.js';
import { XViewer2D } from 'XFrame/Viewer2D/xViewer2D';
// import { GameMain, Grid } from 'XFrame/Grid/Grid3D';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GridSystem';
  /**
   *
   */
  constructor(private renderer2: Renderer2, private el: ElementRef) {
    // const canvas = renderer2.selectRootElement(".canvas");
    // const game = new GameMain(canvas);
    // const grid = new Grid3D(game.scene);
    // const canvas = this.renderer2.selectRootElement("#cc1");
    // console.log(canvas);
  }


  ngAfterViewInit() {

    const pixijsContainer = this.renderer2.selectRootElement(".pixijs");

    const app = new Application({
      width: pixijsContainer.clientWidth,
      height: pixijsContainer.clientHeight,
      backgroundColor: 0xffffff
    });
    pixijsContainer.appendChild(app.view);

    // Listen for frame updates
    app.ticker.add(() => {

    });

    const viewer2d = new XViewer2D(app);

    // const canvas = this.renderer2.selectRootElement("#canvas");


    // const game = new GameMain(canvas);

    // const box = MeshBuilder.CreateBox("box",{size:0.2,height:5});
    // box.position.y = 2.5;

    // let grid: Grid;

    // game.scene.onPointerMove = (evt, info, type) => {

    // }

    // // game.scene.onPointerDown=(evt,info,type)=>{
    // //   if(info.pickedMesh!=null){
    // //     this.moving = true;
    // //   }
    // // }
    // // game.scene.onPointerUp=(evt,info,type)=>{
    // //   if(info?.originMesh==null){
    // //     this.moving = false;
    // //   }
    // // }

    // game.scene.onPointerObservable.add((info,evt)=>{

    // })

    // game.scene.onPointerPick = (evt, info) => {
    //   if (evt.button === 0) {

    //     console.log(game.grid.getNearestPointOnGrid(info.pickedPoint as Vector3).toString());

    //     const postion = game.grid.getNearestPointOnGrid(info.pickedPoint as Vector3);
    //     box.position = new Vector3(postion.x,2.5,postion.z);
    //   }
    // }

  }
}
