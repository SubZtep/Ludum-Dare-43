export default class {

  constructor () {
    this.pool = []
  }

  add (obj) {
    obj.physicsImpostor.sleep()
    obj.setEnabled(false)
    this.pool.push(obj)
  }

  get () {
    if (this.pool.length === 0) return null

    let obj = this.pool.pop()
    obj.setEnabled(true)
    obj.physicsImpostor.wakeUp()
    return obj
  }

  empty () {
    return this.pool.length === 0
  }
}
