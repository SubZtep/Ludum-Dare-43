import { scene, canvas, engine } from "Engine/engine"

export let assetsManager = null

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

export function initAssetManager () {
	var loadingScreen = new GameLoadingScreen()
	engine.loadingScreen = loadingScreen;

  assetsManager = new BABYLON.AssetsManager(scene)
  assetsManager.onProgress = managerProgress
  assetsManager.onFinish = managerOnFinish

  addTask("textures/wood.png")
  addTask("textures/wood-normal-map.png")
  addTask("textures/stone.png")
  addTask("textures/stone-normal-map.png")
  addTask("textures/hand.png")
  addTask("textures/hand-colour.png")
  addTask("textures/hand-grasp.png")
  addTask("textures/hand-grasp-colour.png")
  addTask("textures/hand-release.png")
  addTask("textures/hand-release-colour.png")
  //addTask("meshes/base.babylon")
  //addTask("meshes/flower-take4-apply.babylon")
  //addTask("meshes/flower_take4_apply_petal_big2_100_DIFFUSE.jpg")
  assetsManager.load()
}

function addTask(fileName) {
  let task1 = null
  switch (fileName.substring(0, fileName.indexOf("/"))) {
    case "textures":
      task1 = assetsManager.addTextureTask("Task", `assets/${fileName}`)
      break
    case "meshes":
      if (fileName.slice(-8) === ".babylon") {
        task1 = assetsManager.addMeshTask("Task Mesh", "", `assets/meshes/${fileName.split("/")[1]}`)
      } else {
        task1 = assetsManager.addTextureTask("Task", `assets/${fileName}`)
      }
      break;
  }
  task1.onSuccess = taskOnSuccess
  task1.onError = taskOnError
}

function taskOnSuccess (task) {
  //console.log('Success', task)
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
  console.log('Error', task, message, exception)
  loadingEl.style.background = "darkred"
}

function managerProgress (remainingCount, totalCount, lastFinishedTask) {
  //console.log('Progress', [remainingCount, totalCount, lastFinishedTask])
  loadingTextEl.textContent = `${totalCount-remainingCount}/${totalCount} - ${lastFinishedTask.url}`
}

function managerOnFinish (tasks) {
  //console.log('Finitto:)', tasks)
  //engine.hideLoadingUI()
  canvas.dispatchEvent(new Event("assetsLoaded"))
}
