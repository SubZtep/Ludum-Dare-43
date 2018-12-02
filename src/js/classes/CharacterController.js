import { scene } from "Engine/engine"
import { Directions, InputManager } from './InputManager'

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
    this._moveSpeed = 2 // Move animation speed

    // Little helper
    this._helper = BABYLON.MeshBuilder.CreateSphere("helper", { diameter: .5 }, scene)
    this._helper.material = new BABYLON.StandardMaterial("helper", scene)
    this._helper.material.diffuseColor = new BABYLON.Color3(0, 0.5, 0.5)
    this._helper.parent = this._player
    this._helper.position = this._player.getPivotPoint()

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

  _slide (dir) {
    if (this._isMoving()) return

    let slide
    switch (dir) {
      case Directions.Up:
        slide = new BABYLON.Vector3(0, 0, 1)
        break
      case Directions.Down:
        slide = new BABYLON.Vector3(0, 0, -1)
        break
      case Directions.Left:
        slide = new BABYLON.Vector3(-1, 0, 0)
        break
      case Directions.Right:
        slide = new BABYLON.Vector3(1, 0, 0)
        break
      default:
        return
    }

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
      this._moveSpeed,
      /* () => {
        // Reset rotation for easy pivot calulation
        this._player.rotation = new BABYLON.Vector3(0, 0, 0)
        //console.log([this._player.position, this._player.getAbsolutePosition()])
      } */)

  }

  _roll (dir) {
    if (this._isMoving()) return

    let rot, piv, pos

    switch (dir) {
      case Directions.Up:
        rot = new BABYLON.Vector3(Math.PI / 2, 0, 0)
        piv = new BABYLON.Vector3(0, -0.5, 0.5)
        pos = new BABYLON.Vector3(0, 0, 1)
        break
      case Directions.Down:
        rot = new BABYLON.Vector3(-Math.PI / 2, 0, 0)
        piv = new BABYLON.Vector3(0, -0.5, -0.5)
        pos = new BABYLON.Vector3(0, 0, -1)
        break
      case Directions.Left:
        rot = new BABYLON.Vector3(0, 0, Math.PI / 2)
        piv = new BABYLON.Vector3(-0.5, -0.5, 0)
        pos = new BABYLON.Vector3(-1, 0, 0)
        break
      case Directions.Right:
        rot = new BABYLON.Vector3(0, 0, -Math.PI / 2)
        piv = new BABYLON.Vector3(0.5, -0.5, 0)
        pos = new BABYLON.Vector3(1, 0, 0)
        break
      default:
        return
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
        this._player.position = this._player.position.add(pos)
      })


    this._updateGUI()
  }

  _isMoving () {
    return this._isAnimRunning('slide') || this._isAnimRunning('roll')
  }

  _isAnimRunning (name) {
    return this._anims[name].run !== null &&
      this._anims[name].run.animationStarted
  }

}
