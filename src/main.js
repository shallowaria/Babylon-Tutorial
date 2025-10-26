import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { Inspector } from "@babylonjs/inspector";
// Editor Playground and sandbox
const canvas = document.querySelector("#renderCanvas");

const engine = new BABYLON.Engine(canvas, true);

const createScene = async () => {
  const scene = new BABYLON.Scene(engine);

  // createArcRotateCamera replace attachControl
  // scene.createDefaultCameraOrLight(true, false, true);
  // scene.createDefaultCamera();
  // if (scene.activeCamera) {
  //   scene.activeCamera.position = new BABYLON.Vector3(0, 0, -10);
  //   scene.activeCamera.setTarget(BABYLON.Vector3.Zero());
  // }
  // scene.createDefaultLight();
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
  camera.setPosition(new BABYLON.Vector3(0, 1, -2));
  // camera.lowerBetaLimit = Math.PI / 4;
  // camera.upperBetaLimit = Math.PI / 2;

  // camera.lowerRadiusLimit = 20;
  // camera.upperRadiusLimit = 50;

  // const box = new BABYLON.MeshBuilder.CreateBox("myBox", {
  //   // 互斥
  //   size: 0.7,
  //   // width: 2,
  //   // height: 0.05,
  //   // depth: 0.5,
  //   // faceColors: [new BABYLON.Color4(1, 0, 0, 1), BABYLON.Color3.Green()],
  //   // 顺序： 后前右左上下
  //   faceUV: [
  //     new BABYLON.Vector4(0, 0, 1 / 6, 1),
  //     new BABYLON.Vector4(1 / 6, 0, 2 / 6, 1),
  //     new BABYLON.Vector4(2 / 6, 0, 3 / 6, 1),
  //     new BABYLON.Vector4(3 / 6, 0, 4 / 6, 1),
  //     new BABYLON.Vector4(4 / 6, 0, 5 / 6, 1),
  //     new BABYLON.Vector4(5 / 6, 0, 6 / 6, 1),
  //   ],
  //   // 防止翻转
  //   wrap: true,
  // });

  // const boxCatMat = new BABYLON.StandardMaterial();
  // box.material = boxCatMat;
  // boxCatMat.emissiveTexture = new BABYLON.Texture("/cats.png");

  // 位移
  // box.position.x = 1;
  // box.position = new BABYLON.Vector3(-1, 0.5, 0);

  // 旋转 x向上 y向左 z向左
  // box.rotation.x = Math.PI / 4;
  // box.rotation = new BABYLON.Vector3(0, 0, Math.PI / 6);

  // 缩放
  // box.scaling.y = 2;
  // box.scaling = new BABYLON.Vector3(2, 0.5, 1);

  // 调试
  const utilLayer = new BABYLON.UtilityLayerRenderer(scene);
  // const positionGizmo = new BABYLON.PositionGizmo(utilLayer);
  // positionGizmo.attachedMesh = box;

  // const rotationGizmo = new BABYLON.RotationGizmo(utilLayer);
  // rotationGizmo.attachedMesh = box;

  // const scaleGizmo = new BABYLON.ScaleGizmo(utilLayer);
  // scaleGizmo.attachedMesh = box;

  // const planeGizmo = new BABYLON.PlaneRotationGizmo(
  //   new BABYLON.Vector3(0, 1, 0),
  //   BABYLON.Color3.Red(0, 0, 0),
  //   utilLayer
  // );
  // planeGizmo.attachedMesh = box;

  const sphere = new BABYLON.MeshBuilder.CreateSphere(
    "mySphere",
    {
      diameter: 0.3,
      segments: 32,
      // diameterY: 0.4
    },
    scene
  );
  sphere.position = new BABYLON.Vector3(1, 1.5, 0);
  // const sphereMaterial = new BABYLON.StandardMaterial();
  // sphere.material = sphereMaterial;

  // // sphereMaterial.diffuseTexture = new BABYLON.Texture("/wood_texture.jpg");
  // sphereMaterial.emissiveTexture = new BABYLON.Texture("/wood_texture.jpg");

  // 漫反射
  // sphereMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);
  // 反射高光
  // sphereMaterial.specularColor = new BABYLON.Color3(1, 0, 0);
  // 环境反射（受 scene.ambientColor 环境光影响）
  // sphereMaterial.ambientColor = new BABYLON.Color3(0, 1, 1);
  // scene.ambientColor = new BABYLON.Color3(0, 1, 0.5);
  // 自发光
  // sphereMaterial.emissiveColor = new BABYLON.Color3(0, 1, 0);

  // 透明度
  // sphereMaterial.alpha = 0.2;

  // sphereMaterial.wireframe = true;

  const ground = new BABYLON.MeshBuilder.CreateGround("", {
    height: 5,
    width: 10,
    // 同 segments
    subdivisions: 5,
    subdivisionsX: 10,
  });

  // const groundCatMat = new BABYLON.StandardMaterial();
  // ground.material = groundCatMat;
  // groundCatMat.emissiveTexture = new BABYLON.Texture("/cats.png");

  // //偏移
  // groundCatMat.emissiveTexture.uOffset = 1.4;
  // groundCatMat.emissiveTexture.vOffset = 1.4;

  // // 重复生成
  // groundCatMat.emissiveTexture.uScale = 5;
  // groundCatMat.emissiveTexture.vScale = 5;

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

  // 文字，需在index内引入earcut
  // const fontData = await (await fetch("/Montserrat_Regular.json")).json();
  // // name, text, fontData, options resolution:文字曲线的精细度
  // const text = BABYLON.CreateText("", "My Text", fontData, {
  //   size: 2,
  //   depth: 0.5,
  //   resolution: 64,
  // });

  // 创建简单运动：帧率为60，所以每秒执行60次+0.01
  // scene.registerBeforeRender(() => {
  //   box.rotation.x += 0.01;
  //   box.rotation.y += 0.01;
  //   box.rotation.z += 0.01;
  // });

  // 创建且执行动画 name target propertyPath frameRate totalFrames fromValue toValue loopMode? easingFunction? Value是propertyPath的值
  // BABYLON.Animation.CreateAndStartAnimation(
  //   "xScaleAnimation",
  //   box,
  //   "scaling.x",
  //   30,
  //   120,
  //   0,
  //   2,
  //   BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
  //   new BABYLON.CircleEase()
  // );

  // 手动创建动画 单个数字FLOAT Vector3 VECTOR3 Quaternion QUATERNION
  // const animation = new BABYLON.Animation(
  //   "yRotAnimation",
  //   "rotation.y",
  //   30,
  //   BABYLON.Animation.ANIMATIONTYPE_FLOAT,
  //   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  // );
  // // 添加动画帧
  // const animationKeys = [];
  // animationKeys.push({
  //   frame: 0,
  //   value: 0,
  // });
  // animationKeys.push({
  //   frame: 120,
  //   value: 2 * Math.PI,
  // });
  // animation.setKeys(animationKeys);
  // //注册动画到目标对象 true表示循环
  // box.animations = [];
  // box.animations.push(animation);
  // scene.beginAnimation(box, 0, 120, true);

  // 光照
  // 点光源 name position
  // const light = new BABYLON.PointLight(
  //   "Pointlight",
  //   new BABYLON.Vector3(0, 1, 0),
  //   scene
  // );

  // 聚光灯 name position direction 圆锥体角度 光衰减指数: 从光束中心到边缘亮度下降得有多快 越大越集中，越小越平均
  // const light = new BABYLON.SpotLight(
  //   "spotlight",
  //   new BABYLON.Vector3(0, 1, 0),
  //   new BABYLON.Vector3(0, -1, 0),
  //   Math.PI / 3,
  //   2,
  //   scene
  // );
  // light.range = 10;

  // 太阳光 name direction
  const light = new BABYLON.DirectionalLight(
    "directionalLight",
    new BABYLON.Vector3(-2, -3, 0),
    scene
  );
  // light.intensity = 0.5;
  // 环境光 name 定义天空位置
  // const light = new BABYLON.HemisphericLight(
  //   "hemisphericLight",
  //   new BABYLON.Vector3(-5, 5, 0),
  //   scene
  // );
  // light.groundColor = new BABYLON.Color3(0, 1, 0);
  // // 基础颜色
  // light.diffuse = new BABYLON.Color3(0, 0, 1);
  // // 镜面反射
  // light.specular = new BABYLON.Color3(0, 1, 0);

  const lightGizmo = new BABYLON.LightGizmo(utilLayer);
  lightGizmo.light = light;

  // shadow 值越大shadow质量越好
  const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

  shadowGenerator.addShadowCaster(sphere);
  ground.receiveShadows = true;
  //透明度
  // shadowGenerator.setDarkness(0.5);
  // 光滑边
  shadowGenerator.useBlurExponentialShadowMap = true;
  // 模糊阴影
  shadowGenerator.useKernelBlur = true;
  shadowGenerator.blurKernel = 64;

  // fog
  // scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
  // scene.fogStart = 10;
  // scene.fogEnd = 60;

  // EXP 1.0 - exp(-distance * density) EXP2平方指数，边缘过渡更自然
  scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
  scene.fogDensity = 0.04;
  scene.fogColor = new BABYLON.Color3(0.3, 0.2, 0.6);

  // 选择对象
  scene.onPointerDown = function castRay() {
    const hit = scene.pick(scene.pointerX, scene.pointerY);

    if (hit.pickedMesh && hit.pickedMesh.name === "mySphere") {
      hit.pickedMesh.material = new BABYLON.StandardMaterial();
      hit.pickedMesh.material.diffuseColor = BABYLON.Color3.Red();
    }
  };

  // 导入模型 meshesNames rootUrl sceneFilename scene 已弃用
  // BABYLON.SceneLoader.ImportMesh("", "/", "Cow.gltf", scene);
  await BABYLON.ImportMeshAsync("./Cow.gltf", scene).then(function ({
    meshes,
    animationGroups,
    skeletons,
    material,
    particleSystems,
  }) {
    meshes[0].scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
    meshes[0].position = new BABYLON.Vector3(1, 0, 0);
    animationGroups[3].play(true);
  });

  // Music
  async function initAudio() {
    const audioEngine = await BABYLON.CreateAudioEngineAsync();
    await audioEngine.unlockAsync();
    BABYLON.CreateSoundAsync(
      "DivKid",
      "Divkid.mp3",
      { autoplay: true, loop: true },
      audioEngine
    );
  }
  initAudio();

  return scene;
};

const scene = createScene();

createScene().then((scene) => {
  Inspector.Show(scene, {});

  engine.runRenderLoop(() => {
    scene.render();
  });
});

window.addEventListener("resize", () => {
  engine.resize();
});
