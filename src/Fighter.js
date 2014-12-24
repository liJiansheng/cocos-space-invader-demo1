var Fighter = cc.Sprite.extend({
	appearPosition:cc.p(160, 60),
	ctor:function () {
	this._super(res.fighter_png);	
	this.x = this.appearPosition.x;
	this.y = this.appearPosition.y;
		
	}
	
});
	