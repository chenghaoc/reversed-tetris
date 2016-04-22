var Tetris = (function() {

  var TetrisShape = [
    [
      [0, 1],
      [1],
      [1]
    ],
    [
      [0, 1],
      [0],
      [0]
    ],
    [
      [0,],
      [0, 1, 2],
      []
    ],
    [
      [2],
      [0, 1, 2],
      []
    ],
    [
      [0, 1, 2],
      [0],
      []
    ],
    [
      [0, 1, 2],
      [2],
      []
    ],
    [
      [0, 1],
      [1, 2],
      []
    ],
    [
      [0],
      [0],
      [0, 1]
    ],
    [
      [0, 1],
      [0],
      [0]
    ],
    [
      [1, 2],
      [0, 1],
      []
    ],
    [
      [1],
      [1],
      [1],
    ],
  ]

  var TetrisShape2 = [[
  [0,1,2]
  ]]

  var tetrisColor = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ]
  var Tetris = function(container, width, height, type) {
    this.container = container
    this.occupy = TetrisShape[Math.floor(type * TetrisShape.length)]
    this.width = width
    this.height = height
    this.counter = 0
    this.color = null
    var r = Math.floor(Math.random() * (this.container.width - this.width + 1))
    this.setInitPosition(r, 0)
    // this.setInitPosition(0, 0);
  }

  Tetris.prototype.setInitPosition = function(x, y) {
    this.position = {
      x: x,
      y: y
    }
  }

  Tetris.prototype.getArea = function() {
    var tetris = this
    var totalArea = []
    this.occupy.forEach(function(x, i) {
      x.forEach(function(block) {
        var area = {}
        area.x = tetris.position.x + block
        area.y = tetris.position.y + i
        totalArea.push(area)
      })
    })
    return totalArea
  }

  Tetris.prototype.draw = function(container) {
    var view = container.game.view
    var width = container.width
    var height = container.height
    var areas = this.getArea()
    var blocks = view.querySelectorAll('.container__block')
    var color
    if (!this.color)
      color = this.color = tetrisColor[Math.floor(Math.random() * tetrisColor.length)]
    else
      color = this.color
    areas.forEach(function(area) {
      container.map[area.y][area.x].color = color
      container.map[area.y][area.x].view.classList.add('container__block--tetris--' + color)
    })
  }

  Tetris.prototype.update = function(fallSpeed) {
    // console.log('=== update tetris ===');
    if (++this.counter >= fallSpeed) {
      this.counter = 0
      return this.fall()
    }
  }

  Tetris.prototype.fall = function() {
    ++this.position.y

    // get temp next position,
    // for determining if it will hit blocks
    if (this.isHitWall() || this.isHitBlocks()) {
      --this.position.y
      return true
    }
    return false
  }

  Tetris.prototype.slide = function(direction) {
    this.position.x += direction
    if (this.isHitWall() || this.isHitBlocks()) {
      this.position.x -= direction
      return true
    }
    return false
  }

  Tetris.prototype.isHitBlocks = function() {
    var map = this.container.map
    var areas
    var isHit = false

    areas = this.getArea()

    areas.forEach(function(area) {
      if (map[area.y][area.x].occupy === 1)
        isHit = true
    })
    return isHit
  }

  Tetris.prototype.isHitWall = function() {
    var areas = this.getArea()
    var container = this.container
    var isHit = false
    areas.forEach(function(area) {
      if (area.y >= container.height ||
        area.x >= container.width ||
        area.x < 0) {
        isHit = true
        return
      }
    })
    return isHit
  }
  return Tetris
})()
