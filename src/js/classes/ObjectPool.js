export default class {

  constructor () {
    this.pool = []
  }

  add (obj) {
    obj.collisionsEnabled = false
    obj.physicsImpostor.sleep()
    obj.setEnabled(false)
    //FIXME: fall dawn is calculating!!!

    this.pool.push(obj)
  }

  get () {
    if (this.pool.length === 0) return null

    let obj = this.pool.pop()
    obj.setEnabled(true)
    obj.physicsImpostor.wakeUp()
    return obj
  }

  wipe () {
    let obj
    while (obj = this.pool.pop()) {
      obj.dispose()
    }
  }

  empty () {
    return this.pool.length === 0
  }
}
