var Tetris = (function() {

  var TetrisShape = [
    [
      [0, 1, 2],
      [1],
      [1]
    ],
    [
      [0, 1, 2],
      [1],
      [0, 1, 2]
    ],
    [
      [0, 1, 2],
      [0, 2],
      [0, 2]
    ],
    [
      [0],
      [0],
      [0, 1, 2]
    ]
  ];
  var Tetris = function(container, width, height, type) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.occupy = TetrisShape[Math.floor(type * TetrisShape.length)];
    this.counter = 0;
    var r = Math.floor(Math.random() * (this.container.width - this.width))
    console.log(r)
    this.setInitPosition(r, 0);
    // this.setInitPosition(0, 0);
  };

  Tetris.prototype.setInitPosition = function(row, column) {
    this.position = {
      row: row,
      column: column
    }
  };

  Tetris.prototype.getArea = function() {
    var tetris = this;
    var totalArea = [];
    this.occupy.forEach(function(row, i) {
      row.forEach(function(block) {
        var area = {};
        area.row = tetris.position.row + block;
        area.column = tetris.position.column + i;
        totalArea.push(area);
      })
    });
    return totalArea;
  };

  Tetris.prototype.draw = function(container) {
    var view = container.game.view;
    var width = container.width;
    var height = container.height;
    var areas = this.getArea().map(function(area) {
      return area.column * width + area.row;
    });
    // console.log('=== draw tetris ===')
    var blocks = view.querySelectorAll('.container__block');
    areas.forEach(function(area) {
      blocks[area].classList.add('container__block--tetris');
    })
  };

  Tetris.prototype.update = function(fallSpeed) {
    // console.log('=== update tetris ===');
    if (++this.counter >= fallSpeed) {
      this.counter = 0;
      return this.fall();
    }
  };

  Tetris.prototype.fall = function() {
    ++this.position.column;

    // get temp next position,
    // for determining if it will hit blocks
    if (this.isHitWall() || this.isHitBlocks()) {
      --this.position.column;
      return true;
    }
    return false;
  };

  Tetris.prototype.slide = function(direction) {
    this.position.row += direction;
    if (this.isHitWall() || this.isHitBlocks()) {
      this.position.row -= direction;
      return true;
    }
    return false;
  };

  Tetris.prototype.isHitBlocks = function() {
    var map = this.container.map;
    var areas;
    var isHit = false;

    areas = this.getArea();

    areas.forEach(function(area) {
      if (map[area.row][area.column].occupy === 1)
        isHit = true;
    })
    return isHit;


  };

  Tetris.prototype.isHitWall = function() {
    var areas = this.getArea();
    var container = this.container;
    var isHit = false;
    areas.forEach(function(area) {
      if (area.column >= container.height ||
        area.row >= container.width ||
        area.row < 0) {
        isHit = true;
        return;
      }
    })
    return isHit;
  };

  return Tetris;

})();
