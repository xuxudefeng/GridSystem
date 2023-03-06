// import { ActionManager, Angle, ArcRotateCamera, Color3, Engine, ExecuteCodeAction, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from 'babylonjs';
// import { GridMaterial } from 'babylonjs-materials';



// export class GameMain {
//     canvas: HTMLCanvasElement;
//     scene: Scene;
//     grid:Grid;
//     constructor(canvas: HTMLCanvasElement) {
//         this.canvas = canvas;
//         this.scene = this.createScene();
//         this.grid = new Grid(20,20,1);
//     }
//     public createScene(): Scene {

//         // 创建引擎对象
//         const engine = new Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
//         // 创建一个场景
//         const scene = new Scene(engine);
//         // 创建相机
//         const camera = new ArcRotateCamera('camera1',0, 10, 0, new Vector3(0, 0, 0), scene);
//         // Target the camera to scene origin
//         camera.setTarget(Vector3.Zero());
//         // Attach the camera to the canvas
//         camera.attachControl(this.canvas, false);
//         // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
//         const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
//         // run the render loop
//         engine.runRenderLoop(() => {
//             scene.render();
//         });

//         scene.onBeforeRenderObservable.add(()=>{
//             console.log("update")
//             // camera.alpha += 0.003;
//         })

        
//         // scene.onPointerPick = (evt,info)=>{
//         //     console.log(this.grid.getNearestPointOnGrid(info.pickedPoint as Vector3).toString());
//         // }


//         // the canvas/window resize event handler
//         window.addEventListener('resize', () => {
//             engine.resize();
//         });

        
//         this.createLocalAxes(scene);
//         return scene;
//     }

//     public createLocalAxes(scene: Scene): Mesh {
//         const size = 20;
//         const optionsX = {
//             points: [
//                 Vector3.Zero(),
//                 new Vector3(size, 0, 0),
//                 new Vector3(size * 0.95, 0.05 * size, 0),
//                 new Vector3(size, 0, 0),
//                 new Vector3(size * 0.95, -0.05 * size, 0)
//             ], //vec3 array,
//             updatable: true,
//         };
//         const optionsY = {
//             points: [
//                 Vector3.Zero(),
//                 new Vector3(0, size, 0),
//                 new Vector3(-0.05 * size, size * 0.95, 0),
//                 new Vector3(0, size, 0),
//                 new Vector3(0.05 * size, size * 0.95, 0)
//             ], //vec3 array,
//             updatable: true,
//         };
//         const optionsZ = {
//             points: [
//                 Vector3.Zero(),
//                 new Vector3(0, 0, size),
//                 new Vector3(0, -0.05 * size, size * 0.95),
//                 new Vector3(0, 0, size),
//                 new Vector3(0, 0.05 * size, size * 0.95)
//             ], //vec3 array,
//             updatable: true,
//         };
//         let pilot_local_axisX = MeshBuilder.CreateLines('pilot_local_axisX', optionsX, scene);
//         pilot_local_axisX.color = new Color3(1, 0, 0);

//         let pilot_local_axisY = MeshBuilder.CreateLines('pilot_local_axisY', optionsY, scene);
//         pilot_local_axisY.color = new Color3(0, 1, 0);

//         let pilot_local_axisZ = MeshBuilder.CreateLines('pilot_local_axisZ', optionsZ, scene);
//         pilot_local_axisZ.color = new Color3(0, 0, 1);

//         let local_origin = MeshBuilder.CreateBox('local_origin', { size: 1 }, scene);
//         local_origin.isVisible = false;

//         pilot_local_axisX.parent = local_origin;
//         pilot_local_axisY.parent = local_origin;
//         pilot_local_axisZ.parent = local_origin;

//         return local_origin;
//     }
// }

// export class Grid {

//     // intGrid:[];
//     cellSize:number = 1;
//     position:Vector3 = Vector3.Zero();
//     width:number;
//     height:number;

//     constructor(width: number, height: number,cellSize:number) {
//         this.width =width;
//         this.height=height;
//         this.cellSize = cellSize;
//         this.createGroundX();
//     }

//     getNearestPointOnGrid(position:Vector3):Vector3{
//         const xCount = Math.round(position.x/this.cellSize);
//         const yCount = Math.round(position.y/this.cellSize);
//         const zCount = Math.round(position.z/this.cellSize);
//         return new Vector3(xCount,yCount,zCount);
//     }

//     public createGroundX(): void {
//         const groundMaterial = new GridMaterial('groundMaterial');
//         groundMaterial.majorUnitFrequency = 10;
//         // groundMaterial.minorUnitVisibility = 0;
//         groundMaterial.gridRatio = this.cellSize;
//         // groundMaterial.backFaceCulling = false;
//         groundMaterial.mainColor = new Color3(1, 1, 1);
//         groundMaterial.lineColor = new Color3(0, 1, 1);
//         groundMaterial.opacity = 0.5;

//         const ground = MeshBuilder.CreateGround('ground', { width: this.width, height: this.height });
//         ground.material = groundMaterial;
        
//         ground.position.x = this.width/2;
//         ground.position.z = this.height/2;


//         // for (const iterator of this.intGrid) {
//         //     const box = MeshBuilder.CreateBox("box");
//         // }
//     }

// }



// export class Grid3D {
//     /**
//      *
//      */
//     constructor(scene: Scene) {
//         this.createGroundX(scene);
//     }
//     public createGroundX(scene: Scene): void {
//         const groundMaterial = new GridMaterial('groundMaterial', scene);
//         groundMaterial.majorUnitFrequency = 10;
//         // groundMaterial.minorUnitVisibility = 0.45;
//         groundMaterial.gridRatio = 1;
//         groundMaterial.backFaceCulling = false;
//         groundMaterial.mainColor = new Color3(1, 1, 1);
//         groundMaterial.lineColor = new Color3(1.0, 1.0, 1.0);
//         groundMaterial.opacity = 0.98;

//         const ground = MeshBuilder.CreateGround('ground', { width: 1000, height: 1000 });
//         ground.material = groundMaterial;
//         ground.position.x = 0;
//         ground.position.z = 0;
//     }

//     public createGroundY(scene: Scene): void {
//         const groundMaterial = new GridMaterial('groundMaterial', scene);
//         groundMaterial.majorUnitFrequency = 10;
//         // groundMaterial.minorUnitVisibility = 0.45;
//         groundMaterial.gridRatio = 1;
//         groundMaterial.backFaceCulling = false;
//         groundMaterial.mainColor = new Color3(1, 1, 1);
//         groundMaterial.lineColor = new Color3(1.0, 1.0, 1.0);
//         groundMaterial.opacity = 0.98;

//         const ground = MeshBuilder.CreateGround('ground', { width: 1000, height: 1000 });
//         ground.material = groundMaterial;
//         ground.position.x = 0;
//         ground.position.y = 0;
//         ground.rotation = new Vector3(Angle.FromDegrees(90).radians(), 0, 0);
//     }
//     public createGroundZ(scene: Scene): void {
//         const groundMaterial = new GridMaterial('groundMaterial', scene);
//         groundMaterial.majorUnitFrequency = 10;
//         // groundMaterial.minorUnitVisibility = 0.45;
//         groundMaterial.gridRatio = 1;
//         groundMaterial.backFaceCulling = false;
//         groundMaterial.mainColor = new Color3(1, 1, 1);
//         groundMaterial.lineColor = new Color3(1.0, 1.0, 1.0);
//         groundMaterial.opacity = 0.98;

//         const ground = MeshBuilder.CreateGround('ground', { width: 1000, height: 1000 });
//         ground.material = groundMaterial;
//         ground.position.y = 0;
//         ground.position.z = 0;
//         ground.rotation = new Vector3(0, 0, Angle.FromDegrees(90).radians());
//     }

//     // 创建本地坐标系
//     public createLocalAxes(scene: Scene): Mesh {
//         const size = 20;
//         const optionsX = {
//             points: [
//                 Vector3.Zero(),
//                 new Vector3(size, 0, 0),
//                 new Vector3(size * 0.95, 0.05 * size, 0),
//                 new Vector3(size, 0, 0),
//                 new Vector3(size * 0.95, -0.05 * size, 0)
//             ], //vec3 array,
//             updatable: true,
//         };
//         const optionsY = {
//             points: [
//                 Vector3.Zero(),
//                 new Vector3(0, size, 0),
//                 new Vector3(-0.05 * size, size * 0.95, 0),
//                 new Vector3(0, size, 0),
//                 new Vector3(0.05 * size, size * 0.95, 0)
//             ], //vec3 array,
//             updatable: true,
//         };
//         const optionsZ = {
//             points: [
//                 Vector3.Zero(),
//                 new Vector3(0, 0, size),
//                 new Vector3(0, -0.05 * size, size * 0.95),
//                 new Vector3(0, 0, size),
//                 new Vector3(0, 0.05 * size, size * 0.95)
//             ], //vec3 array,
//             updatable: true,
//         };
//         let pilot_local_axisX = MeshBuilder.CreateLines('pilot_local_axisX', optionsX, scene);
//         pilot_local_axisX.color = new Color3(1, 0, 0);

//         let pilot_local_axisY = MeshBuilder.CreateLines('pilot_local_axisY', optionsY, scene);
//         pilot_local_axisY.color = new Color3(0, 1, 0);

//         let pilot_local_axisZ = MeshBuilder.CreateLines('pilot_local_axisZ', optionsZ, scene);
//         pilot_local_axisZ.color = new Color3(0, 0, 1);

//         let local_origin = MeshBuilder.CreateBox('local_origin', { size: 1 }, scene);
//         local_origin.isVisible = false;

//         pilot_local_axisX.parent = local_origin;
//         pilot_local_axisY.parent = local_origin;
//         pilot_local_axisZ.parent = local_origin;

//         return local_origin;
//     }

// }
