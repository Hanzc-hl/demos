function Timer() {
  this.time = new Date().valueOf()
  this.milliseconds = 0
}
Timer.prototype.resetTimer = function () {
  this.time = new Date().valueOf()
  this.milliseconds = 0
}
Timer.prototype.getSeconds = function () {
  const curTime = new Date().valueOf()
  this.milliseconds += curTime - this.time
  this.time = curTime
  return Math.floor(this.milliseconds / 1000)
}
