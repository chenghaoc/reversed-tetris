var Control = (function() {
  var Control = function() {};

  Control.prototype.LEFT = 37;
  Control.prototype.RIGHT = 39;
  Control.prototype.DOWN = 40;
  Control.prototype.ESC = 27;
  Control.prototype.R = 82;
  Control.prototype.SPACE = 32;

  Control.prototype.init = function(game) {
    this.game = game;
    this.keyDownHandler(game);
  };

  Control.prototype.keyDownHandler = function(game) {
    var tetris = game.container.curTetris;
    var control = this;
    window.addEventListener('keydown', function(e) {
      if (!game.running)
        return;
      if (e.keyCode === control.LEFT) {
        game.container.curTetris.slide(-1);
      } else if (e.keyCode === control.RIGHT) {
        game.container.curTetris.slide(1);
      } else if (e.keyCode === control.DOWN) {
        game.container.rush();
      } else if (e.keyCode === control.R) {
        game.container.reverse();
      } else if (e.keyCode === control.SPACE) {
        game.container.reverse();
      } else if (e.keyCode === control.ESC) {
        game.stop();
        game.menu.show();
      }
    });
    window.addEventListener('keyup', function(e) {
      if (e.keyCode === control.DOWN) {
        game.container.release();
      }
    });
  };

  return Control;


})();
