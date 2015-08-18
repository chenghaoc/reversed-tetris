var Container = (function() {
  var Container = function() {};

  Container.prototype.init = function(game, width, height) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.map = this.makeMap(width, height);
    this.drawContainer();
    // test
    this.dropTetris(new Tetris(this, 3, 3, 0));
    //
  };
  Container.prototype.update = function() {
    this.clean();
    if (this.curTetris.update()) {
      // true means hit
      // time to have next tetris
      this.fillTetris(this.curTetris);
      this.dropTetris(new Tetris(this, 3, 3, 0));
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
    var c = 0;
    while (c < height) {
      var r = 0;
      map[c] = [];
      while (r < width) {
        map[c][r] = {
          view: null,
          occupy: 0
        }; // 0: unoccupied
        ++r;
      }
      ++c;
    }
    // console.log('=== make map ===')
    // console.log(map)
    return map;
  };
  Container.prototype.reverse = function() {

  };

  Container.prototype.dropTetris = function(tetris) {
    this.curTetris = tetris;
  };

  Container.prototype.fillTetris = function(tetris) {
    var areas = tetris.getArea();
    var container = this;
    areas.forEach(function(area) {
      console.log(container.map);
      container.map[area.row][area.column].occupy = 1;
      container.map[area.column][area.row].view.classList.add('container__block--occupy')
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
