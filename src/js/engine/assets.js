import { scene, canvas, engine } from "Engine/engine"
import { data as __S } from "JS/SETTINGS"


/*
** LOADING SCREEN
*/

let loadingEl = document.querySelector("#loading")
let loadingTextEl = loadingEl.querySelector(".msg")
function GameLoadingScreen() {
  this.loadingUIBackgroundColor = ""
  this.loadingUIText = ""
}
GameLoadingScreen.prototype.displayLoadingUI = () => {}
GameLoadingScreen.prototype.hideLoadingUI = () => {
  loadingEl.className = "hide"
  setTimeout(() => loadingEl.parentNode.removeChild(loadingEl), 300)
}


/*
** ASSET MANAGER
*/

const assetFiles = [
  "textures/stone.png",
  "textures/stone-normal-map.png",
  "textures/bg_scan_starlin_512x512.jpg",
]

export let assetsManager = null
export function initAssetManager () {

	engine.loadingScreen = new GameLoadingScreen()

  assetsManager = new BABYLON.AssetsManager(scene)
  assetsManager.onProgress = managerProgress
  assetsManager.onFinish = managerOnFinish

  assetFiles.map(fn => addTask(fn))
  for (let sf of ["_px", "_nx", "_py", "_ny", "_pz", "_nz"]) {
    addTask(`${__S.SKYBOX.Pic}${sf}.jpg`)
  }

  assetsManager.load()
}

function addTask(fn) {
  let task1 = null,
      folder = fn.split("/")[0]

  switch (folder) {
    case "skybox":
    case "textures":
    case "meshes":
      task1 = assetsManager.addTextureTask("Task", fn)
      break
    /* case "meshes":
      if (fn.slice(-8) === ".babylon") {
        task1 = assetsManager.addMeshTask("Task Mesh", "", `assets/meshes/${fn.split("/")[1]}`)
      } else {
        task1 = assetsManager.addTextureTask("Task", `assets/${fn}`)
      }
      break; */
    default: return
  }

  if (task1 !== null) {
    task1.onSuccess = taskOnSuccess
    task1.onError = taskOnError
  }
}

function taskOnSuccess (task) {
  // Merge broken object
  /* if (task.name === "Task Mesh") {
    let merge = []
    for (let b of task.loadedMeshes) {
      b.computeWorldMatrix(true)
      merge.push(b)
    }
    BABYLON.Mesh.MergeMeshes(merge)
  } */
}

function taskOnError (task, message, exception) {
  addLoadingMessage(`ERROR: ${message}`)
  loadingEl.style.background = "darkred"
}

function managerProgress (remainingCount, totalCount, lastFinishedTask) {
  addLoadingMessage(`${totalCount-remainingCount}/${totalCount}: ${lastFinishedTask.url}`)
}

function managerOnFinish (tasks) {
  //engine.hideLoadingUI()
  canvas.dispatchEvent(new Event("assetsLoaded"))
}

function addLoadingMessage (text) {
  loadingTextEl.textContent += "\n"+text
}
