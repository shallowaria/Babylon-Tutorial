import * as BABYLON from "@babylonjs/core";

const canvas = document.querySelector("#renderCanvas");

const engine = new BABYLON.Engine(canvas, true);

const createScene = async () => {
  const scene = new BABYLON.Scene(engine);

  // createArcRotateCamera 创建光源 替换现有
  // scene.createDefaultCameraOrLight(true, false, true);
  // if (scene.activeCamera) {
  //   scene.activeCamera.position = new BABYLON.Vector3(0, 0, -10);
  //   scene.activeCamera.setTarget(BABYLON.Vector3.Zero());
  // }
  scene.createDefaultLight();
  // 第一人称相机
  // const camera = new BABYLON.UniversalCamera(
  //   "camera",
  //   new BABYLON.Vector3(0, 5, -10),
  //   scene
  // );
  // camera.inputs.addMouseWheel();
  // camera.setTarget(BABYLON.Vector3.Zero());

  // 产品展示相机 name alpha beta radius target optional
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    0,
    0,
    10,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);
  camera.setPosition(new BABYLON.Vector3(0, 0, -20));
  camera.lowerBetaLimit = Math.PI / 4;
  camera.upperBetaLimit = Math.PI / 2;

  camera.lowerRadiusLimit = 20;
  camera.upperRadiusLimit = 50;

  // const box = new BABYLON.MeshBuilder.CreateBox("myBox", {
  //   // 互斥
  //   size: 0.1,
  //   width: 2,
  //   height: 0.05,
  //   depth: 0.5,
  //   faceColors: [new BABYLON.Color4(1, 0, 0, 1), BABYLON.Color3.Green()],
  // });

  // const sphere = new BABYLON.MeshBuilder.CreateSphere(
  //   "mySphere",
  //   { diameter: 0.3, segments: 32 },
  //   scene
  // );

  // const ground = new BABYLON.MeshBuilder.CreateGround("", {
  //   height: 10,
  //   width: 10,
  //   // 同 segments
  //   subdivisions: 5,
  //   subdivisionsX: 10,
  // });

  // ground.material = new BABYLON.StandardMaterial();
  // ground.material.wireframe = true;

  // const groundFromHM = new BABYLON.MeshBuilder.CreateGroundFromHeightMap(
  //   "",
  //   "/heightmap.png",
  //   {
  //     height: 10,
  //     width: 10,
  //     subdivisions: 40,
  //     maxHeight: 2,
  //   }
  // );
  // groundFromHM.material = new BABYLON.StandardMaterial();
  // groundFromHM.material.wireframe = true;

  const fontData = await (await fetch("/Montserrat_Regular.json")).json();
  // name, text, fontData, options resolution:文字曲线的精细度
  const text = BABYLON.CreateText("", "My Text", fontData, {
    size: 2,
    depth: 0.5,
    resolution: 64,
  });

  return scene;
};

const scene = createScene();

createScene().then((scene) => {
  engine.runRenderLoop(() => {
    scene.render();
  });
});

window.addEventListener("resize", () => {
  engine.resize();
});
