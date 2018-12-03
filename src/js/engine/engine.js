import * as BABYLON from "babylonjs"
import { data as ___S } from "JS/SETTINGS"


export let canvas   // HTML canvas
export let engine   // Babylon engine
export let scene    // Current scene

function initEngine () {

  if (BABYLON.Engine.isSupported()) {
    // Everything is fine, let's start Babylon

    canvas = document.querySelector("canvas")
    engine = new BABYLON.Engine(canvas, true)
    engine.enableOfflineSupport = false


    /*
    ** SCENE PROPERTIES
    */
    scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color3(0.11, 0.21, 0.25)


    /*
    ** ADD SKYBOX
    */

    if ([ 'dds' ].includes(___S.SKYBOX.Pic.split('.').pop())) {
      // .dds file
      var hdrTexture = new BABYLON.CubeTexture(___S.SKYBOX.Pic, scene);
      scene.createDefaultSkybox(hdrTexture, true, 10000);
    } else {
      // 6 faces cubemap
      var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size:1000.0 }, scene)
      var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene)
      skyboxMaterial.backFaceCulling = false
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(___S.SKYBOX.Pic, scene)
      skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
      skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
      skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
      skybox.material = skyboxMaterial;

      // Nights & Days
      skybox.rotation = ___S.SKYBOX.RotationStart.clone()

      setInterval(() =>
          skybox.rotation = skybox.rotation.subtract(___S.SKYBOX.RotationStep),
          ___S.SKYBOX.IntervalTimeout)
    }


    //scene.workerCollisions = true

    // Set physics engine
    let gravityVector = new BABYLON.Vector3(0, -9.81, -5)
    //let physicsPlugin = new BABYLON.CannonJSPlugin()
    let physicsPlugin = new BABYLON.OimoJSPlugin()

    scene.enablePhysics(gravityVector, physicsPlugin)


    // Handle resize event (try without it)
    window.addEventListener("resize", () => engine.resize())

    // Tell to the game, it is time to start
    canvas.dispatchEvent(new Event("engineLoaded"))

  } else {

    // Make the player disappointed, browser copycat
    document.write("<h1>I'm afraid your Browser is not supported.</h1>")
    canvas = engine = scene = null
  }
}

// Wait until the page is loaded
document.addEventListener("DOMContentLoaded", initEngine, false)
