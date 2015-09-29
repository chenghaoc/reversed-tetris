var Conversation = (function() {
  var Conversation = function() {
    this.queue = [];
    this.delay = 100;
  };

  Conversation.prototype.MESSAGE = {
    "localScore": [
      "就在剛剛，我用 [1] 分，刷新了 [0] 項各人紀錄，沒什麼"
    ],
    "reaction": [
    	"阿呀！"
    ],
    "other": [
    	"恩..."
    ]
  };

  Conversation.prototype.bind = function(target) {
    this.target = target;
  };

  Conversation.prototype.update = function() {
    --this.delay;
    if (this.delay <= 0) {
      if (this.queue.length > 0) {
        var msg = this.queue.shift();
        this.say(msg);
      }
      this.delay = 300;
    }
  };

  Conversation.prototype.enQueue = function(text) {
    this.queue.push(text);
  };

  Conversation.prototype.clear = function() {
    this.target.innerHTML = "";
    this.queue = [];
  };

  Conversation.prototype.say = function(text) {
    console.log("say");
    this.target.addEventListener("animationend", function(e) {
      console.log("remove");
      this.target.classList.add('js-bubble-animation');
      this.target.classList.remove('js-bubble-showing');
    }.bind(this));

    this.target.classList.add('js-bubble-showing');
    this.target.innerHTML = text;
  };

  Conversation.prototype.fillData = function(template, datas) {
    var result = template;
    datas.forEach(function(data, idx, arr) {
      result = result.replace("[" + idx + "]", data);
    });

    return result;

  };

  return Conversation;
})();
