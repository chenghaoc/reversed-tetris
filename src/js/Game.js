var Game = (function() {
  var Game = function() {};

  Game.prototype.init = function(container, control, width, height, speed, views) {
    this.container = container;
    this.control = control;

    this.view = views.target;
    this.combo = new Combo();
    this.combo.bind(views.energy, views.score);
    this.container.bind(views.next);

    this.container.init(this, width, height, speed);
    this.control.init(this);

    this.speed = speed;
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
