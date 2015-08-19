var Combo = (function() {
	var energyLimit = 10;

	var Combo = function() {
		this.energy = 0;
		this.score = 0;
		this.deceaseSpeed = 30;
		this.decreaseIndex = 0;
	};


	Combo.prototype.increaseEnergy = function(no) {
		if (this.energy >= energyLimit)
			return;
		this.energy += no;
		this.show();
	};
	Combo.prototype.decreaseEnergy = function(no) {
		if (++ this.decreaseIndex < 3 || this.energy <= 0)
			return;
		this.decreaseIndex = 0;
		this.energy -= no;
		this.show();
	};

	Combo.prototype.explode = function() {
		this.score += Math.floor(this.energy);
		this.energy = 0;
		this.show();
	};
	Combo.prototype.bind = function(energyBar, scorePanel) {
		this.energyBar = energyBar;
		this.scorePanel = scorePanel;
	};
	Combo.prototype.show = function() {
		this.energyBar.style.width = this.energy * 17 + 'px';
		this.scorePanel.textContent = this.score;
	};

	return Combo;
})();
