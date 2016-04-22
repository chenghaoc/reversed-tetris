var Control = (function() {
  var Control = function() {}

  Control.prototype.LEFT = 37
  Control.prototype.RIGHT = 39
  Control.prototype.DOWN = 40
  Control.prototype.ESC = 27
  Control.prototype.R = 82
  Control.prototype.SPACE = 32

  Control.prototype.init = function(game) {
    this.game = game
    this.keyDownHandler(game)
    this.series = 0
    this.keyDownCounter = 0
    this.keyUpCounter = 0
  }

  Control.prototype.dbDownPress = function() {
    var control = this
    if (this.timeout)
      clearTimeout(this.timeout)
    this.timeout = setTimeout(function() {

      control.keyDownCounter = 0
      control.keyUpCounter = 0
    }, 200)
  }

  Control.prototype.keyDownHandler = function(game) {
    var tetris = game.container.curTetris
    var control = this
    window.addEventListener('keydown', function(e) {
      if (!game.running)
        return
      if (e.keyCode === control.LEFT) {
        if (control.series > 1)
          game.container.curTetris.slide(-1)
        game.container.curTetris.slide(-1)
        ++control.series
      } else if (e.keyCode === control.RIGHT) {
        if (control.series > 1)
          game.container.curTetris.slide(1)
        game.container.curTetris.slide(1)
        ++control.series
      } else if (e.keyCode === control.DOWN) {
        ++control.keyDownCounter
        if (control.keyDownCounter >= 2 && control.keyUpCounter >= 1) {
          game.container.rushToEnd()
        } else {
          control.dbDownPress()
        }
        game.container.rush()
      } else if (e.keyCode === control.R) {
        game.container.reverse()
      } else if (e.keyCode === control.SPACE) {
        game.container.reverse()
      } else if (e.keyCode === control.ESC) {
        game.stop()
        game.menu.show()
      }
    })
    window.addEventListener('keyup', function(e) {
      if (e.keyCode === control.DOWN) {
        ++control.keyUpCounter
        game.container.release()
      }
      control.series = 0
    })
  }

  return Control

})()
