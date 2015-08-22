var Menu = (function() {
  var Menu = function() {};

  Menu.prototype.bind = function(game, target) {
    this.view = target;
    this.game = game;
    this.setListeners();
  };

  Menu.prototype.show = function(type) {
    if (type === 'start')
    	this.makeStartMenu();
    else if (type === 'middle')
    	this.makeMiddleMenu();
    else if (type === 'end')
    	this.makeEndMenu();


    this.view.classList.remove('display-none');
  };

  Menu.prototype.makeStartMenu = function() {
  	// body...
  };

  Menu.prototype.makeMiddleMenu = function() {
  	// body...
  };

  Menu.prototype.makeEndMenu = function() {
  	// body...
  };

  Menu.prototype.hide = function() {
    this.view.classList.add('display-none');
  };

  Menu.prototype.setScore = function(score) {
    this.view.querySelector('#score-panel').textContent = score;
  };

  Menu.prototype.setListeners = function() {
    var menu = this;
    console.log(this.view)
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
