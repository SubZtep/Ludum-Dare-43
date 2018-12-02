import { canvas, scene } from "Engine/engine"

export let camera = null

export function createCamera () {
  createArcCamera()
  //createFollowCamera()

  //new BABYLON.BlackAndWhitePostProcess("bandw", 1.0, camera) // black&white

  /* var kernel = 32.0;
  var postProcess0 = new BABYLON.BlurPostProcess("Horizontal blur", new BABYLON.Vector2(1.0, 0), kernel, 1.0, camera);
  var postProcess1 = new BABYLON.BlurPostProcess("Vertical blur", new BABYLON.Vector2(0, 1.0), kernel, 1.0, camera); */

  /* var postProcess = new BABYLON.ImageProcessingPostProcess("processing", 1.0, camera);
  postProcess.vignetteWeight = 10;
  postProcess.vignetteStretch = 2;
  postProcess.vignetteColor = new BABYLON.Color4(0, 0.3, 0, 0);
  postProcess.vignetteEnabled = true; */

  /* var postProcess = new BABYLON.ImageProcessingPostProcess("processing", 1.0, camera);
  postProcess.exposure = 0.2 */
}

function createFollowCamera () {
  camera = new BABYLON.FollowCamera(
    "Camera",
    new BABYLON.Vector3(0, 10, -10),
    scene)

  camera.radius = 10
  camera.heightOffset = 10
  camera.rotationOffset = 180
  camera.cameraAcceleration = 0.001
  camera.maxCameraSpeed = 10
}

function createArcCamera () {
  camera = new BABYLON.ArcRotateCamera(
    "Camera",
    -Math.PI / 2,
    Math.PI / 8,
    50, //15,
    new BABYLON.Vector3(0, 0, 3),
    scene)
  camera.attachControl(canvas, true)
}
