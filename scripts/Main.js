var Main = (function () {
    function Main(canvasElement) {
        Main.Canvas = document.getElementById(canvasElement);
        Main.Engine = new BABYLON.Engine(Main.Canvas, true);
    }
    Main.prototype.CreateScene = function () {
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
        var glassMaterial = new BABYLON.ShaderMaterial("Glass", Main.Scene, "glass", {
            attributes: ["position", "normal", "uv"],
            uniforms: ["world", "worldView", "worldViewProjection"],
        });
        var k1 = 0;
        var k2 = 5;
        var k3 = 10;
        Main.Scene.registerBeforeRender(function () {
            if (glassMaterial) {
                glassMaterial.setVector3("source1", BABYLON.Vector3.Zero());
                glassMaterial.setVector3("source2", BABYLON.Vector3.Zero());
                glassMaterial.setVector3("source3", BABYLON.Vector3.Zero());
                var srcDist1 = k1;
                var srcDist2 = k2;
                var srcDist3 = k3;
                k1 += 0.05;
                if (k1 > 15) {
                    k1 = 0;
                }
                k2 += 0.05;
                if (k2 > 15) {
                    k2 = 0;
                }
                k3 += 0.05;
                if (k3 > 15) {
                    k3 = 0;
                }
                glassMaterial.setFloat("sqrSourceDist1", srcDist1 * srcDist1);
                glassMaterial.setFloat("sqrSourceDist2", srcDist2 * srcDist2);
                glassMaterial.setFloat("sqrSourceDist3", srcDist3 * srcDist3);
            }
        });
        glassMaterial.backFaceCulling = true;
        BABYLON.SceneLoader.ImportMesh("", "./datas/city.babylon", "", Main.Scene, function (meshes, particles, skeletons) {
            for (var i = 0; i < meshes.length; i++) {
                meshes[i].material = glassMaterial;
            }
        });
    };
    Main.prototype.Animate = function () {
        Main.Engine.runRenderLoop(function () {
            Main.Scene.render();
        });
        window.addEventListener("resize", function () {
            Main.Engine.resize();
        });
    };
    return Main;
}());
window.addEventListener("DOMContentLoaded", function () {
    var game = new Main("render-canvas");
    game.CreateScene();
    game.Animate();
});
