var Game = (function() {
  var Game = function() {}

  Game.prototype.init = function(container, control, menu1, menu2, width, height, speed, views) {
    this.container = container
    this.control = control
    this.menu = menu1
    this.rankMenu = menu2

    this.view = views.target
    this.combo = new Combo()
    this.combo.bind(views.energy, views.score)
    this.container.bind(views.next)
    this.menu.bind(this, views.menu, 0)
    this.rankMenu.bind(this, views.rankMenu, 1)

    this.container.init(this, width, height, speed)
    this.control.init(this)

    this.speed = speed
    this.running = false
    this.isLose = false
  }

  Game.prototype.restart = function() {
    this.container.restart()
    this.combo.reset()
    this.isLose = false
  }

  Game.prototype.start = function() {
    var game = this
    this.running = true
    this.frame = window.requestAnimationFrame(function() {
      game.step()
    })
  }
  Game.prototype.stop = function() {
    this.running = false
  }
  Game.prototype.lose = function() {
    // this.menu.show('end');
    this.rankMenu.setScore(this.combo.score)
    this.rankMenu.showRank()
    this.rankMenu.show()
    this.stop()
    this.isLose = true
  }
  Game.prototype.step = function() {
    var game = this
    if (!this.running)
      return
    this.container.update()
    this.frame = window.requestAnimationFrame(function() {
      game.step()
    })
  }
  return Game
})()
