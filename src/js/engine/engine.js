import * as BABYLON from "babylonjs"

let
  canvas, // HTML canvas
  engine, // Babylon engine
  scene   // Current scene

function initEngine () {

  // Test if the browser is support BabylionJS
  if (BABYLON.Engine.isSupported()) {

    // Everything is fine, let's start Babylon
    canvas = document.querySelector("canvas")
    engine = new BABYLON.Engine(canvas, true)
    scene = new BABYLON.Scene(engine)

    scene.clearColor = new BABYLON.Color3(0.41, 0.51, 0.55)
    scene.enablePhysics()

    // Handle resize event (try without it)
    window.addEventListener("resize", () => engine.resize())

    // Tell to the game, it is time to start
    canvas.dispatchEvent(new Event('loaded'))

  } else {

    // Make the player disappointed, browser copycat
    document.write("<h1>I'm afraid your Browser is not supported.</h1>")
    canvas = engine = scene = null
  }
}

// Wait until the page is loaded
document.addEventListener("DOMContentLoaded", initEngine, false)

export {
  canvas,
  engine,
  scene
}
