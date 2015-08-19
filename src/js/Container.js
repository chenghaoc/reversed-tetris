var Container = (function() {
  var Container = function() {};

  Container.prototype.init = function(game, width, height, fallSpeed) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.map = this.makeMap(width, height);
    this.fallSpeed = fallSpeed;
    this.drawContainer();
    // test
    this.dropTetris(new Tetris(this, 3, 3, Math.random()));
    //
  };
  Container.prototype.update = function() {
    this.clean();
    if (this.curTetris.update(this.fallSpeed)) {
      // true means hit
      // time to have next tetris
      this.fillTetris(this.curTetris);
      this.dropTetris(new Tetris(this, 3, 3, Math.random()));
      this.removeCompletedRows();
    };
    this.curTetris.draw(this);
  };
  Container.prototype.clean = function() {
    this.map.forEach(function(row) {
      row.forEach(function(block) {
        // console.log(block.occupy)
        block.view.classList.remove('container__block--tetris');
      })
    })
  };
  Container.prototype.makeMap = function(width, height) {
    var map = [];
    var y = 0;
    while (y < height) {
      var x = 0;
      map[y] = [];
      while (x < width) {
        map[y][x] = {
          view: null,
          occupy: 0
        }; // 0: unoccupied
        ++x;
      }
      ++y;
    }
    // console.log('=== make map ===')
    // console.log(map)
    return map;
  };
  Container.prototype.reverse = function() {
    this.map.forEach(function(y) {
      var blocks = y.reduce(function(memo, element, index, array) {
        return memo + element.occupy;
      }, 0);
      console.log(blocks)
      if (blocks > 0) {
        y.map(function(element) {
          // reverse
          console.log(element)
          element.occupy = (1 - element.occupy);
          element.view.classList.toggle('container__block--occupy');
          return element;
        })
      }
    });
  };

  Container.prototype.dropTetris = function(tetris) {
    this.curTetris = tetris;
  };

  Container.prototype.fillTetris = function(tetris) {
    var areas = tetris.getArea();
    var container = this;
    areas.forEach(function(area) {
      container.map[area.y][area.x].occupy = 1;
      container.map[area.y][area.x].view.classList.add('container__block--occupy')
    });
  };

  Container.prototype.removeCompletedRows = function() {
  	var container = this;
    this.map.forEach(function(y) {
      var blocks = y.reduce(function(memo, element, index, array) {
        return memo + element.occupy;
      }, 0);
      console.log(blocks + ',' + container.width)
      if (blocks === container.width) {
        y.map(function(element) {
          // reverse
          console.log(element)
          element.occupy = 0;
          element.view.classList.remove('container__block--occupy');
          return element;
        })
      }
    });
  };

  Container.prototype.drawContainer = function() {
    var view = this.game.view;

    function newDiv(classes) {
      var div = document.createElement('div');
      classes.forEach(function(c) {
        div.classList.add(c);
      });
      return div;
    }

    var divContainer = newDiv(['container']);
    this.map.forEach(function(row) {
      var divRow = newDiv(['container__row', 'clearfix']);
      row.forEach(function(column) {
        var divBlock = newDiv(['container__block']);
        divRow.appendChild(divBlock);

        column.view = divBlock;
      })
      divContainer.appendChild(divRow);
    })
    view.appendChild(divContainer);
  };
  return Container;
})();
