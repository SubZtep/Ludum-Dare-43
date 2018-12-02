import dat from "dat.gui"

export /* Enums */ const Directions = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3
}
export class InputManager {

  _initKeyboard () {
    document.addEventListener("keypress", e => {
      let dir
      //console.log(e)
      switch (e.key) {
        case "W":
        case "w":
          dir = Directions.Up
          break
        case "S":
        case "s":
          dir = Directions.Down
          break
        case "A":
        case "a":
          dir = Directions.Left
          break
        case "D":
        case "d":
          dir = Directions.Right
          break
        default:
          return
      }

      if (e.shiftKey) {
        this._slide(dir)
      } else {
        this._roll(dir)
      }
    })
  }


  _initGUI () {
    let FizzyText = function (obj) {
      this.x = obj.x
      this.y = obj.y
      this.z = obj.z
    }
    this._gui = new dat.GUI()

    this._gui.addFolder('Player Position')
    this._ftPlayerPos = new FizzyText(this._player.position)

    this._gui.add(this._ftPlayerPos, 'x').step(0.5).onChange(val => {
      this._player.position.x = val
    })
    this._gui.add(this._ftPlayerPos, 'y').step(0.5).onChange(val => {
      this._player.position.y = val
    })
    this._gui.add(this._ftPlayerPos, 'z').step(0.5).onChange(val => {
      this._player.position.z = val
    })


    this._gui.addFolder('Player Rotation')
    this._ftPlayerRot = new FizzyText(this._player.rotation)

    this._gui.add(this._ftPlayerRot, 'x').onChange(val => {
      this._player.rotation.x = val
    })
    this._gui.add(this._ftPlayerRot, 'y').onChange(val => {
      this._player.rotation.y = val
    })
    this._gui.add(this._ftPlayerRot, 'z').onChange(val => {
      this._player.rotation.z = val
    })


    this._gui.addFolder('Player Pivot Position')
    this._ftPlayerPivotPos = new FizzyText(this._player.getPivotPoint())

    //this._gui.add(this._ftPlayerPivotPos, 'x', -0.5, 0.5, 0.5).onChange(val => {
      this._gui.add(this._ftPlayerPivotPos, 'x').step(0.5).onChange(val => {
      let piv = this._player.getPivotPoint()
      piv.x = val
      this._player.setPivotPoint(piv)
      this._helper.position = piv
    })
    this._gui.add(this._ftPlayerPivotPos, 'y').step(0.5).onChange(val => {
      let piv = this._player.getPivotPoint()
      piv.y = val
      this._player.setPivotPoint(piv)
      this._helper.position = piv
    })
    this._gui.add(this._ftPlayerPivotPos, 'z').step(0.5).onChange(val => {
      let piv = this._player.getPivotPoint()
      piv.z = val
      this._player.setPivotPoint(piv)
      this._helper.position = piv
    })
  }

  _updateGUI () {
    if (typeof this._gui === 'undefined') return

    this._ftPlayerPos.x = this._player.position.x
    this._ftPlayerPos.y = this._player.position.y
    this._ftPlayerPos.z = this._player.position.z

    this._ftPlayerRot.x = this._player.rotation.x
    this._ftPlayerRot.y = this._player.rotation.y
    this._ftPlayerRot.z = this._player.rotation.z

    let piv = this._player.getPivotPoint()
    this._ftPlayerPivotPos.x = piv.x
    this._ftPlayerPivotPos.y = piv.y
    this._ftPlayerPivotPos.z = piv.z

    this._helper.position = piv

    for (let c of this._gui.__controllers) {
      c.updateDisplay()
    }
  }

}
