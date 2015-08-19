var Control = (function() {
  var Control = function() {};

  Control.prototype.LEFT = 37;
  Control.prototype.RIGHT = 39;
  Control.prototype.DOWN = 40;
  Control.prototype.HOR_REVERSE = 90;
  Control.prototype.VER_REVERSE = 88;

  Control.prototype.init = function(game) {
    this.game = game;
    this.keyDownHandler(game);
  };

  Control.prototype.keyDownHandler = function(game) {
    var tetris = game.container.curTetris;
    var control = this;
    window.addEventListener('keydown', function(e) {
      if (e.keyCode === control.LEFT) {
        game.container.curTetris.slide(-1);
      } else if (e.keyCode === control.RIGHT) {
        game.container.curTetris.slide(1);
      } else if (e.keyCode === control.DOWN) {
        game.container.curTetris.rush();
      } else if (e.keyCode === control.HOR_REVERSE) {
        game.container.reverse();
      } else if (e.keyCode === control.VER_REVERSE) {

      }
    });
  };

  return Control;


})();
