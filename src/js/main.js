import "../scss/main.scss"
import { canvas, engine, scene } from "Engine/engine"
import { createCamera } from "Scene/camera"
import { createLight, shadowGenerator } from "Scene/light"
import { createEnvironment } from "Objects/environment"
import { createPlayer, player } from "Objects/player"
import CharacterController from "Classes/CharacterController"
import { getSphere, initPool, throwSpheres } from "Classes/SphereSeeder"
import { initDebug } from "Engine/debug"
import { initAssetManager } from "Engine/assets"
import { data as ___S } from "./SETTINGS"


function createButton(context, func) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Full Screen";
    button.onclick = func;
    context.appendChild(button);
}


let isFullScreen = false
function switchFullscreen () {
  if (!isFullScreen) {
      BABYLON.Tools.RequestFullscreen(canvas)
  } else {
      BABYLON.Tools.ExitFullscreen()
  }
}


function startGame () {
  let hud = document.querySelector("#hud")

  createButton(hud, switchFullscreen )

  // Create basic objects
  createCamera()
  createLight()
  createEnvironment()
  createPlayer()
  initPool()

  let cc = new CharacterController(player, scene)

  setTimeout(() => {
    throwSpheres(),
    setInterval(() => throwSpheres(), 5000)
  }, 2000)

  // Game loop
  engine.runRenderLoop(() => {
    scene.render()
  })


  if (!PRODUCTION) {
    let msg = document.createElement("div")
    msg.setAttribute("class", "devBuild")
    msg.innerText = "Dev build."
    hud.appendChild(msg)

    if (___S.showDebug) initDebug()
  }
}


// Booting listeners
let listinerOpt = { capture: false, once: true },
    canvasEl = document.querySelector("canvas")
canvasEl.addEventListener("engineLoaded", initAssetManager, listinerOpt)
canvasEl.addEventListener("assetsLoaded", startGame, listinerOpt)
