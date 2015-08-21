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
    this.nextTetris = new Tetris(this, 3, 3, Math.random());
    this.dropTetris(new Tetris(this, 3, 3, Math.random()));
    //
  };
  Container.prototype.bind = function(nextBlocksView) {
    this.nextBlocksView = nextBlocksView;
  };

  Container.prototype.update = function() {
    this.clean();
    this.game.combo.decreaseEnergy(0.001);
    if (this.curTetris.update(this.fallSpeed)) {
      // true means hit
      // time to have next tetris
      this.fillTetris(this.curTetris);
      this.dropTetris(new Tetris(this, 3, 3, Math.random()));
      this.removeCompletedRows();
      if (this.game.combo.increaseEnergy(0)) {
        // true means reach limit
        // time to explode
        this.collapse();
      }
    };
    this.curTetris.draw(this);
  };
  Container.prototype.clean = function() {
    this.map.forEach(function(row) {
      row.forEach(function(block) {
        // console.log(block.occupy)
        var color = block.color;
        block.view.classList.remove('container__block--tetris--' + color);
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
          color: null,
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
      if (blocks > 0) {
        y.map(function(element) {
          // reverse
          element.occupy = (1 - element.occupy);
          return element;
        })
      }
    });
    this.refreshView();
  };

  Container.prototype.dropTetris = function(tetris) {
    this.curTetris = this.nextTetris;
    this.nextTetris = tetris;
    var container = this;
    [].forEach.call(container.nextBlocksView, function(e) {
      e.classList.remove('sidebar__element__next__block--fill');
    });
    tetris.occupy.forEach(function(row, index) {

      row.forEach(function(element) {
        var value = element + index * 3;
        container.nextBlocksView[value].classList.add('sidebar__element__next__block--fill');
      })
    })
  };

  Container.prototype.fillTetris = function(tetris) {
    var areas = tetris.getArea();
    var container = this;
    areas.forEach(function(area) {
      container.map[area.y][area.x].occupy = 1;
      container.map[area.y][area.x].view.classList.add('container__block--occupy')
    });
    container.refreshView();
  };

  Container.prototype.hitCeil = function() {
    this.game.lose();
  };

  Container.prototype.removeCompletedRows = function() {
    var container = this;
    this.map.forEach(function(y, yIndex) {
      var blocks = y.reduce(function(memo, element, index, array) {
        return memo + element.occupy;
      }, 0);
      if (blocks === container.width) {
        y.map(function(element) {
          // reverse
          element.occupy = 0;
          return element;
        });
        container.downOneRow(yIndex);
        container.game.combo.increaseEnergy(2);
      }
    });
    this.refreshView();
  };

  Container.prototype.downOneRow = function(rowNo) {
    var map = this.map;
    var yIndex = rowNo - 1;
    for (yIndex; yIndex > 0; --yIndex) {
      map[yIndex].forEach(function(element, xIndex) {
        map[yIndex + 1][xIndex].occupy = element.occupy;
      })
    }
  };

  Container.prototype.collapse = function() {
    var block;
    var container = this;
    block = this.map.reduce(function(outerMemo, ele, outerIndex) {
      ele.reduce(function(innerMemo, ele, innerIndex) {
        if (ele.occupy === 1)
          innerMemo.push({
            x: innerIndex,
            y: outerIndex,
            tetris: ele
          });
        return innerMemo;
      }, outerMemo)
      return outerMemo;
    }, [])
    block.reverse().forEach(function(element, index) {
      var x = element.x;
      var y = element.y;
      var tetris = element.tetris;
      var curTetris = tetris;
      var nextTetris = container.map[y][x];
      tetris.occupy = 0;
      while (y <= container.height && nextTetris.occupy === 0) {
        curTetris = nextTetris;
        nextTetris = (y < container.height) ? container.map[y][x] : null;
        ++y;
      }
      curTetris.occupy = 1;
    })
    this.refreshView();
    this.game.combo.clear();
  };

  Container.prototype.refreshView = function() {
    this.map.forEach(function(y) {
      y.forEach(function(block) {
        if (block.occupy === 0) {
          block.view.classList.remove('container__block--occupy');
        } else {
          block.view.classList.add('container__block--occupy');
        }
      })
    })
  };

  Container.prototype.rush = function() {
    if (!this.OriginalSpeed)
      this.OriginalSpeed = this.fallSpeed;
    this.fallSpeed = this.fallSpeed / 5;
  };

  Container.prototype.release = function() {
    this.fallSpeed = this.OriginalSpeed;
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
