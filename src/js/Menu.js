var Menu = (function() {
  var Menu = function() {};

  Menu.prototype.bind = function(game, target) {
    this.view = target;
    this.game = game;
    this.setListeners();
  };

  Menu.prototype.show = function(type) {
    this.view.classList.remove('display-none');
  };

  Menu.prototype.hide = function() {
    this.view.classList.add('display-none');
  };

  Menu.prototype.setScore = function(score) {
    this.view.querySelector('#score-panel').textContent = score;
  };

  Menu.prototype.setListeners = function() {
    var menu = this;
    this.view.querySelector('#resume-btn').addEventListener('click', function(e) {
    	menu.game.start();
      menu.hide();
    });
    this.view.querySelector('#start-btn').addEventListener('click', function(e) {
    	menu.game.start();
      menu.hide();
    });
    this.view.querySelector('#restart-btn').addEventListener('click', function(e) {
    	menu.game.restart();
    	menu.game.start();
      menu.hide();
    });
  };

  return Menu;
})();

var game = new Game();

game.init(
  new Container(),
  new Control(),
  new Menu(),
  12,
  16,
  30, {
    target: document.querySelector('#game'),
    energy: document.querySelector('#combo'),
    score: document.querySelector('#score'),
    next: document.querySelectorAll('.sidebar__element__next__block'),
    menu: document.querySelector('#menu')
  });
