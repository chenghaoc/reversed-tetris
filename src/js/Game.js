var Game = (function() {
  var Game = function() {};

  Game.prototype.init = function(container, control, width, height, speed) {
    this.container = container;
    this.container.init(this, width, height, speed);
    this.control = control;
    this.control.init(this);
    this.speed = speed;
  };
  Game.prototype.bind = function(target) {
    this.view = target;
  };
  Game.prototype.start = function() {
    var game = this;
    this.frame = window.requestAnimationFrame(function() {
      game.step();
    });
  };
  Game.prototype.stop = function() {

  };
  Game.prototype.step = function() {
    var game = this;
    this.container.update();
    // use closure, because bind is slower
    this.frame = window.requestAnimationFrame(function() {
      game.step();
    });
  };
  return Game;
})();
