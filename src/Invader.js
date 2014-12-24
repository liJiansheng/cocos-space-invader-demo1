var Invader = cc.Sprite.extend({
	active:true,
	ctor:function (arg) {
	this._super(res.invader_png);
	},	
	update:function (dt) {
	
	},
	destroy:function () {	
		this.visible = false;
		this.active = false;
		this.stopAllActions();		
	},
	
	collideRect:function (x, y) {
		var w = this.width, h = this.height;
		return cc.rect(x - w / 2, y - h / 4, w, h / 2+20);
	}
});


