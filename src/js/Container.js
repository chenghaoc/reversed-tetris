var Container = (function() {
  var Container = function() {}

  Container.prototype.init = function(game, width, height, fallSpeed) {
    this.game = game
    this.width = width ? width : this.width
    this.height = height ? height : this.height
    this.map = this.makeMap(width, height)
    this.fallSpeed = this.OriginalSpeed = fallSpeed ? fallSpeed : this.fallSpeed
    this.noOfDropTetris = 0
    this.animatedBlocks = 0
    this.drawContainer()
    // test
    this.nextTetris = new Tetris(this, 3, 3, Math.random())
    this.dropTetris(new Tetris(this, 3, 3, Math.random()))
    //
  }
  Container.prototype.restart = function() {
    var newMap = this.makeMap(this.width, this.height)
    this.map.forEach(function(y, yIndex) {
      y.forEach(function(x, xIndex) {
        newMap[yIndex][xIndex].view = x.view
        newMap[yIndex][xIndex].view.classList.forEach(function(cls) {
          if (cls != 'container__block') {
            newMap[yIndex][xIndex].view.classList.remove(cls)
          }
        })
      })
    })
    this.map = newMap
    this.noOfDropTetris = 0
    this.OriginalSpeed = 30
    this.refreshView(true)
    this.clean()
    // test
    this.nextTetris = new Tetris(this, 3, 3, Math.random())
    this.dropTetris(new Tetris(this, 3, 3, Math.random()))
    //
  }

  Container.prototype.bind = function(nextBlocksView) {
    this.nextBlocksView = nextBlocksView
  }

  Container.prototype.update = function() {
    this.clean()
    this.game.combo.decreaseEnergy(0.001)
    if (this.curTetris.update(this.fallSpeed)) {
      // true means hit
      // time to have next tetris
      if (!this.fillTetris(this.curTetris))
        return
      this.dropTetris(new Tetris(this, 3, 3, Math.random()))
      this.removeCompletedRows()
      if (this.game.combo.increaseEnergy(0.2)) {
        // true means reach limit
        // time to explode
        this.collapse()
      }
    }
    this.curTetris.draw(this)
  }
  Container.prototype.clean = function() {
    this.map.forEach(function(row) {
      row.forEach(function(block) {
        var color = block.color
        block.view.classList.remove('container__block--tetris--' + color)
      })
    })
  }
  Container.prototype.makeMap = function(width, height) {
    var map = []
    var y = 0
    while (y < height) {
      var x = 0
      map[y] = []
      while (x < width) {
        map[y][x] = {
          color: null,
          view: null,
          occupy: 0
        } // 0: unoccupied
        ++x
      }
      ++y
    }
    return map
  }
  Container.prototype.reverse = function() {
    if (this.animatedBlocks > 0)
      return
    var cur = this.curTetris
    var hasTetris = false
    this.map.forEach(function(y, i) {
      var blocks = y.reduce(function(memo, element, index, array) {
        return memo + element.occupy
      }, 0)
      if (blocks > 0 && !hasTetris) {
        var tetrisHeight = cur.occupy[2].length == 0 ? 2 : 3
        if (cur.position.y + tetrisHeight >= i) {
          hasTetris = true
          return
        }

        y.map(function(element) {
          // reverse
          element.occupy = (1 - element.occupy)
          if (element.view.classList.contains('container__block--occupying'))
            console.log('f')
          return element
        })
      }
    })
    this.refreshView(false)
  }

  Container.prototype.dropTetris = function(tetris) {
    this.curTetris = this.nextTetris
    this.nextTetris = tetris
    var container = this
    container.release();
    [].forEach.call(container.nextBlocksView, function(e) {
      e.classList.remove('sidebar__element__next__block--fill')
    })
    tetris.occupy.forEach(function(row, index) {

      row.forEach(function(element) {
          var value = element + index * 3
          container.nextBlocksView[value].classList.add('sidebar__element__next__block--fill')
        })
    })
    ++container.noOfDropTetris
    // container.fallSpeed = 30 - (Math.log(container.noOfDropTetris) / Math.log(1.3));
    // container.fallSpeed = container.OriginalSpeed - (5 / Math.sqrt(container.noOfDropTetris));
    container.fallSpeed = 1000 / getSpeed(container.OriginalSpeed, container.noOfDropTetris)
    container.OriginalSpeed = container.fallSpeed

    function getSpeed(time, nb) {
      return speed = 1000 / time + (4 / Math.sqrt(nb))
    }
  }

  Container.prototype.fillTetris = function(tetris) {
    var areas = tetris.getArea()
    var container = this
    var isContinue = true
    areas.forEach(function(area) {
      if (area.y === 0) {
        isContinue = false
      }
      container.map[area.y][area.x].occupy = 1
    })
    container.game.combo.increaseScore(2 * Math.floor(30 - container.OriginalSpeed))
    container.refreshView(true)
    if (!isContinue)
      container.hitCeil()
    return isContinue
  }

  Container.prototype.hitCeil = function() {
    this.game.lose()
  }

  Container.prototype.removeCompletedRows = function() {
    var container = this
    this.map.forEach(function(y, yIndex) {
      var blocks = y.reduce(function(memo, element, index, array) {
        return memo + element.occupy
      }, 0)
      if (blocks === container.width) {
        y.map(function(element) {
          element.occupy = 0
          return element
        })
        container.downOneRow(yIndex)
        container.game.combo.increaseEnergy(2)
        container.game.combo.increaseScore(10)
      }
    })
    this.refreshView(true)
  }

  Container.prototype.downOneRow = function(rowNo) {
    var map = this.map
    var yIndex = rowNo - 1
    for (yIndex; yIndex > 0; --yIndex) {
      map[yIndex].forEach(function(element, xIndex) {
        map[yIndex + 1][xIndex].occupy = element.occupy
      })
    }
  }

  Container.prototype.collapse = function() {
    var block
    var container = this
    var game = this.game
    game.stop()
    block = this.map.reduce(function(outerMemo, ele, outerIndex) {
      ele.reduce(function(innerMemo, ele, innerIndex) {
        if (ele.occupy === 1)
          innerMemo.push({
            x: innerIndex,
            y: outerIndex,
            tetris: ele
          })
        return innerMemo
      }, outerMemo)
      return outerMemo
    }, [])
    block = block.reverse()
    var blockIndex = 0
    var element = block[blockIndex]
    var x = element.x
    var y = element.y
    var tetris = element.tetris
    var curTetris = tetris
    var nextTetris = container.map[y][x]

    function drop() {
      tetris.occupy = 0
      container.refreshView(true)
      if (y <= container.height && nextTetris.occupy === 0) {
        curTetris.occupy = 0
        curTetris = nextTetris
        nextTetris = (y < container.height) ? container.map[y][x] : null
        ++y
      } else {
        ++blockIndex
        if (blockIndex === block.length) {
          container.refreshView(true)
          container.removeCompletedRows()
          game.start()
          return
        }
        element = block[blockIndex]
        x = element.x
        y = element.y
        tetris = element.tetris
        curTetris = tetris
        nextTetris = container.map[y][x]

      }
      curTetris.occupy = 1
      window.requestAnimationFrame(drop)
    }
    window.requestAnimationFrame(drop)

    this.game.combo.clear()
  }

  Container.prototype.refreshView = function(animated) {
    var container = this
    this.map.forEach(function(y) {
      y.forEach(function(block) {
        if (block.occupy === 0 && block.view.classList.contains('container__block--occupy')) {
          if (animated) {
            ++container.animatedBlocks
            block.view.addEventListener('animationend', function(e) {
              block.view.classList.remove('container__block--occupy')
              block.view.classList.remove('container__block--occupying')
              --container.animatedBlocks
            }, false)
            block.view.classList.add('container__block--occupying')
          } else {
            block.view.classList.remove('container__block--occupy')
          }
        } else if (block.occupy != 0 && !block.view.classList.contains('container__block--occupy')) {
          block.view.classList.add('container__block--occupy')
        }
      })
    })
    if (container.animatedBlocks < 0)
      container.animatedBlocks = 0
  }

  Container.prototype.rush = function() {
    if (!this.OriginalSpeed)
      this.OriginalSpeed = this.fallSpeed
    this.fallSpeed = this.fallSpeed / 5
  }
  Container.prototype.rushToEnd = function() {
    while (!this.curTetris.fall()) {}
  }

  Container.prototype.release = function() {
    this.fallSpeed = this.OriginalSpeed
  }

  Container.prototype.drawContainer = function() {
    var view = this.game.view

    function newDiv(classes) {
      var div = document.createElement('div')
      classes.forEach(function(c) {
        div.classList.add(c)
      })
      return div
    }

    var divContainer = newDiv(['container'])
    this.map.forEach(function(row) {
      var divRow = newDiv(['container__row', 'clearfix'])
      row.forEach(function(column) {
        var divBlock = newDiv(['container__block'])
        divRow.appendChild(divBlock)

        column.view = divBlock
      })
      divContainer.appendChild(divRow)
    })
    view.appendChild(divContainer)
  }
  return Container
})()
