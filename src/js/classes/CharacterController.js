import { scene } from "Engine/engine"
import { Directions, InputManager } from './InputManager'
import { camera } from "Scene/camera"

const Animations = {
  Slide: 'slideAnim',
  Roll: 'rollAnim'
}


export default class extends InputManager {

  constructor (playerObj) {
    super()

    this.cx = 0
    this._player = playerObj
    //this._scene = scene

    // Setting
    this._moveSpeed = 5 // Move animation speed

    // Little helper
    this._helper = BABYLON.MeshBuilder.CreateSphere("helper", { diameter: .5 }, scene)
    this._helper.material = new BABYLON.StandardMaterial("helper", scene)
    this._helper.material.diffuseColor = new BABYLON.Color3(0, 0.5, 0.5)
    this._helper.parent = this._player
    this._helper.position = this._player.getPivotPoint()
    this._helper.isPickable = false

    this._initAnimations()
    this._initKeyboard()

    this._initGUI()
  }

  _initAnimations () {
    this._anims = {}

    // Slide animation
    this._anims.slide = {}
    this._anims.slide.anim = new BABYLON.Animation(
      "moveAnim",
      "position",
      60,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
    this._anims.slide.run = null

    // Rotate animation
    this._anims.roll = {}
    this._anims.roll.anim = new BABYLON.Animation(
      "rollAnim",
      "rotation",
      60,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
    this._anims.roll.run = null
  }

  _directionToVector3 (dir) {
    switch (dir) {
      case Directions.Up:
        return BABYLON.Vector3.Forward()
      case Directions.Down:
        return BABYLON.Vector3.Backward()
      case Directions.Left:
        return BABYLON.Vector3.Left()
      case Directions.Right:
        return BABYLON.Vector3.Right()
    }
    return BABYLON.Vector3.Zero()
  }

  /** Test if the player can move to the specified direction */
  _canMove (dir) {
    let pos = this._directionToVector3(dir)

    for (let testX of [-0.5, 0, 0.5]) {
      let origin = this._player.position.clone()
      if (dir === Directions.Up || dir === Directions.Down) {
        origin.x += testX
      } else {
        origin.z += testX
      }
      origin.y -= 0.5 // check the ground exactly

      let ray = new BABYLON.Ray(origin, pos, 1.5)
      //if (typeof this._rayHelper !== "undefined") this._rayHelper.dispose()
      this._rayHelper = BABYLON.RayHelper.CreateAndShow(ray, scene, new BABYLON.Color3(1, 1, 0.1))
      this._rayHelper._renderLine.isPickable = false

      let hit = scene.pickWithRay(ray)
      if (hit.hit) {
        return false
      }
    }

    return true;
  }

  /** move the player */
  move (dir, special = false) {
    if (this._isMoving()) return
    if (!this._canMove(dir)) return

    if (special) {
      this._slide(dir)
    } else {
      this._roll(dir)
    }
  }

  /** move the player with slide animation */
  _slide (dir) {
    let slide = this._directionToVector3(dir)
    let newPos = this._player.position.add(slide)
    let keys = [
      { frame: 0, value: this._player.position },
      { frame: 60, value: newPos }
    ]
    this._anims.slide.anim.setKeys(keys)

    this._anims.slide.run = scene.beginDirectAnimation(
      this._player,
      [this._anims.slide.anim],
      0,
      60,
      false,
      this._moveSpeed)
  }

  /** move the player with roll animation */
  _roll (dir) {
    let rot, piv

    switch (dir) {
      case Directions.Up:
        rot = new BABYLON.Vector3(Math.PI / 2, 0, 0)
        piv = new BABYLON.Vector3(0, -0.5, 0.5)
        break
      case Directions.Down:
        rot = new BABYLON.Vector3(-Math.PI / 2, 0, 0)
        piv = new BABYLON.Vector3(0, -0.5, -0.5)
        break
      case Directions.Left:
        rot = new BABYLON.Vector3(0, 0, Math.PI / 2)
        piv = new BABYLON.Vector3(-0.5, -0.5, 0)
        break
      case Directions.Right:
        rot = new BABYLON.Vector3(0, 0, -Math.PI / 2)
        piv = new BABYLON.Vector3(0.5, -0.5, 0)
        break
    }

    this._player.setPivotPoint(piv)

    let keys = [
      { frame: 0, value: this._player.rotation },
      { frame: 60, value: this._player.rotation.add(rot) }
    ]
    this._anims.roll.anim.setKeys(keys)

    this._anims.roll.run = scene.beginDirectAnimation(
      this._player,
      [this._anims.roll.anim],
      0,
      60,
      false,
      this._moveSpeed,
      () => {
        this._player.rotation = new BABYLON.Vector3(0, 0, 0)
        this._player.position = this._player.position.add(
          this._directionToVector3(dir))
      })

    this._updateGUI()
  }

  /** Tells is the player is moving */
  _isMoving () {
    return this._isAnimRunning('slide') || this._isAnimRunning('roll')
  }

  _isAnimRunning (name) {
    return this._anims[name].run !== null &&
      this._anims[name].run.animationStarted
  }
}
