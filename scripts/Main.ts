/// <reference path="../lib/babylon.d.ts"/>
/// <reference path="../lib/jquery.d.ts"/>

class Main {

  public static Canvas: HTMLCanvasElement;
  public static Engine: BABYLON.Engine;
  public static Scene: BABYLON.Scene;
  public static Camera: BABYLON.ArcRotateCamera;
  public static Light: BABYLON.PointLight;
  public static ShadowLight: BABYLON.DirectionalLight;

  constructor(canvasElement: string) {
    Main.Canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    Main.Engine = new BABYLON.Engine(Main.Canvas, true);
  }

  public CreateScene(): void {
    Main.Scene = new BABYLON.Scene(Main.Engine);
    Main.Scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

    Main.Camera = new BABYLON.ArcRotateCamera("ArcCamera", 0, 0, 1, BABYLON.Vector3.Zero(), Main.Scene);
    Main.Camera.setPosition(new BABYLON.Vector3(5, 5, 5));
    Main.Camera.attachControl(Main.Canvas);
    Main.Camera.wheelPrecision = 5;

    Main.Light = new BABYLON.PointLight("light", new BABYLON.Vector3(1, 5, 3), Main.Scene);
    Main.Light.diffuse = new BABYLON.Color3(1, 1, 1);
    Main.Light.specular = new BABYLON.Color3(1, 1, 1);

    BABYLON.Engine.ShadersRepository = "./shaders/";
    let glassMaterial: BABYLON.ShaderMaterial = new BABYLON.ShaderMaterial(
      "Glass",
      Main.Scene,
      "glass",
      {
        attributes: ["position", "normal", "uv"],
        uniforms: ["world", "worldView", "worldViewProjection"],
      }
    );
    let k1: number = 0;
    let k2: number = 5;
    let k3: number = 10;
    let k4: number = 15;
    Main.Scene.registerBeforeRender(() => {
      if (glassMaterial) {
        glassMaterial.setVector3("source1", Main.Camera.globalPosition);
        glassMaterial.setVector3("source2", Main.Camera.globalPosition);
        glassMaterial.setVector3("source3", Main.Camera.globalPosition);
        glassMaterial.setVector3("source4", Main.Camera.globalPosition);
        let srcDist1: number = k1;
        let srcDist2: number = k2;
        let srcDist3: number = k3;
        let srcDist4: number = k4;
        k1 += 0.05;
        if (k1 > 20) {
          k1 = 0;
        }
        k2 += 0.05;
        if (k2 > 20) {
          k2 = 0;
        }
        k3 += 0.05;
        if (k3 > 20) {
          k3 = 0;
        }
        k4 += 0.05;
        if (k4 > 20) {
          k4 = 0;
        }
        glassMaterial.setFloat("sqrSourceDist1", srcDist1 * srcDist1);
        glassMaterial.setFloat("sqrSourceDist2", srcDist2 * srcDist2);
        glassMaterial.setFloat("sqrSourceDist3", srcDist3 * srcDist3);
        glassMaterial.setFloat("sqrSourceDist4", srcDist4 * srcDist4);
      }
    });
    glassMaterial.backFaceCulling = true;

    BABYLON.SceneLoader.ImportMesh(
      "",
      "./datas/city.babylon",
      "",
      Main.Scene,
      (
        meshes: BABYLON.AbstractMesh[],
        particles: BABYLON.ParticleSystem[],
        skeletons: BABYLON.Skeleton[]
      ) => {
        for (let i: number = 0; i < meshes.length; i++) {
          meshes[i].material = glassMaterial;
        }
      }
    );
  }

  public Animate(): void {
    Main.Engine.runRenderLoop(() => {
      Main.Scene.render();
    });

    window.addEventListener("resize", () => {
      Main.Engine.resize();
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  let game : Main = new Main("render-canvas");
  game.CreateScene();
  game.Animate();
});
