var Game = (function() {
  var Game = function() {};

  Game.prototype.init = function(container, width, height, speed) {
    this.container = container;
    this.container.init(this, width, height);
    this.speed = speed;
    this.timer = 0;
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
    if (++this.timer === 20) {
      this.timer = 0;
      this.container.update();
    }
    // use closure, because bind is slower
    this.frame = window.requestAnimationFrame(function() {
      game.step();
    });
  };
  return Game;
})();
