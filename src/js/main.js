import "../scss/main.scss"
import { canvas, engine, scene } from "Engine/engine"
import { createCamera } from "Scene/camera"
import { createLight, shadowGenerator } from "Scene/light"
import { createEnvironment } from "Objects/environment"
import { createPlayer, player } from "Objects/player"
import CharacterController from "Classes/CharacterController"
import { initPool, throwSpheres } from "Classes/SphereSeeder"
import { initDebug } from "Engine/debug"
import { initAssetManager } from "Engine/assets"
import { data as ___S } from "./SETTINGS"
import { playIntro, stopIntro } from "./intro"

function createButton(context, func) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Full Screen";
    button.onclick = func;
    button.setAttribute("class", "btn br fullScreenBtn")
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

function startUp () {
  let hud = document.querySelector("#hud")

  createButton(hud, switchFullscreen )

  // Create basic objects
  createCamera()
  createLight()

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

  // Start intro
  playIntro()
}


function startGame () {
  stopIntro();

  createEnvironment()
  createPlayer()
  initPool()
  let cc = new CharacterController(player, scene)

  setTimeout(() => {
    throwSpheres(),
    setInterval(() => throwSpheres(), 5000)
  }, 2000)
}




// Booting listeners
let listinerOpt = { capture: false, once: true },
    canvasEl = document.querySelector("canvas")
canvasEl.addEventListener("engineLoaded", initAssetManager, listinerOpt)
canvasEl.addEventListener("assetsLoaded", startUp, listinerOpt)
canvasEl.addEventListener("introDone", startGame, { capture: false })
