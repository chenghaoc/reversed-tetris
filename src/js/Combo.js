var Combo = (function() {
  var energyLimit = 10

  var Combo = function() {
    this.energy = 0
    this.score = 0
    this.deceaseSpeed = 30
    this.decreaseIndex = 0
  }

  Combo.prototype.reset = function() {
    this.score = 0
    this.energy = 0
    this.show()
  }

  Combo.prototype.increaseScore = function(no) {
    this.score += no
    this.show()
  }

  Combo.prototype.increaseEnergy = function(no) {
    if (this.energy >= energyLimit)
        return true
    this.energyBar.classList.remove('slow-transible')
    this.energy += no
    this.show()
    return false
  }
  Combo.prototype.decreaseEnergy = function(no) {
    if (++this.decreaseIndex < 3 || this.energy <= 0)
        return
    this.energyBar.classList.remove('slow-transible')
    this.decreaseIndex = 0
    this.energy -= no
    this.show()
  }

  Combo.prototype.clear = function() {
    this.energy = 0
    this.energyBar.classList.add('slow-transible')
    this.show()
  }

  Combo.prototype.bind = function(energyBar, scorePanel) {
    this.energyBar = energyBar
    this.scorePanel = scorePanel
  }
  Combo.prototype.show = function() {
    this.energyBar.style.width = this.energy * 17 + 'px'
    this.scorePanel.textContent = this.score
  }

  return Combo
})()
