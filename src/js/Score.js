var Score = (function() {
  var Score = function() {}

  Score.prototype.initParse = function() {
    var scoreCls = this
    var fileref = document.createElement('script')
    fileref.setAttribute('type', 'text/javascript')
    fileref.setAttribute('src', 'https://parse.com/downloads/javascript/parse-1.6.0.min.js')
    document.getElementsByTagName('head')[0].appendChild(fileref)
    fileref.onload = function() {
      Parse.initialize('L210xGaBMGOeeYn0554HqmhNei0GsGvyl8PdXhKh', 'h9JUpLcJa7HoVUxna0SwiJLKQpHK4FYxFlOwUYkn')
      scoreCls.ScoreObj = Parse.Object.extend('GameScore')
    }
  }

  Score.prototype.saveScoreLocal = function(score) {
    var curScore = localStorage.getItem('tetris-score')
    if (!curScore || score > curScore)
      localStorage.setItem('tetris-score', score)
  }

  Score.prototype.getScoreLocal = function() {
    var score = localStorage.getItem('tetris-score')
    return score ? score : -1
  }

  Score.prototype.setScoreParse = function(name, score, callback) {
    var scoreCls = this
    if (scoreCls.isSetScore)
      return
    var ScoreObj = this.ScoreObj
    var scoreObj = new ScoreObj()
    scoreObj.save({
      name: name,
      score: score
    }).then(function(object) {
      scoreCls.isSetScore = true
      scoreCls.getScoreParse(10, function(results) {
        // Do something with the returned Parse.Object values
        var views = document.querySelectorAll('.menu__panel--rank__element')
        for (var i = 0; i < results.length; i++) {
          if (!views[i])
            continue
          var object = results[i]
          views[i].querySelector('.menu__panel--rank__element__name').textContent = object.get('name')
          views[i].querySelector('.menu__panel--rank__element__score').textContent = object.get('score')
          callback()
        }
      })
    })
  }

  Score.prototype.getScoreParse = function(limit, callback) {
    var query = new Parse.Query(this.ScoreObj)
    query.descending('score')
    query.find({
      success: function(results) {
        callback(results)
      },
      error: function(error) {
        console.log('Error: ' + error.code + ' ' + error.message)
      }
    })
  }

  return Score
})()
