var Bullet = cc.Sprite.extend({
	active:true,
	ctor:function (arg) {
		this._super(res.bullet_png);
	},	
	update:function (dt) {

	},
	destroy:function () {
		this.active = false;
		this.visible = false;
	},

	collideRect:function (x, y) {
		var w = this.width, h = this.height;
		return cc.rect(x - w / 2, y - h / 4, w, h / 2+20);
	}
});


