import 'babylonjs-inspector'
import { scene } from "Engine/engine"

export let gizmoMeshes = []

export function initDebug () {
  createGizmoManager()
  scene.debugLayer.show()
}

function createGizmoManager () {
  let gizmoManager = new BABYLON.GizmoManager(scene)
  gizmoManager.positionGizmoEnabled = true
  gizmoManager.attachableMeshes = gizmoMeshes

  document.onkeydown =  e => {
    if (e.key == 'w') {
        gizmoManager.positionGizmoEnabled = !gizmoManager.positionGizmoEnabled
    }
    if (e.key == 'e') {
        gizmoManager.rotationGizmoEnabled = !gizmoManager.rotationGizmoEnabled
    }
    if (e.key == 'r') {
        gizmoManager.scaleGizmoEnabled = !gizmoManager.scaleGizmoEnabled
    }
    if (e.key == 'q') {
        gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled
    }
  }
}
