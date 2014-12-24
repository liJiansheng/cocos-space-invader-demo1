var g_sharedGameLayer;
var MAX_CONTAINT_WIDTH = 40;
var MAX_CONTAINT_HEIGHT = 40;
var GameLayer = cc.Layer.extend({
	_fighter:null,
	_invader:null,
	_bullet:null,
	statusLayer:null,
	p:null,
	ctor:function(){
		this._super();		
		this.init();		
	},
	init:function () {
		winSize = cc.director.getWinSize();
		this.screenRect = cc.rect(0, 0, winSize.width, winSize.height + 10);
		
		this._fighter = new Fighter();
		this.addChild(this._fighter);
		
		//this.addChild(this.statusLayer);
		cc.eventManager.addListener({
			prevTouchId: -1,
			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
			onTouchesMoved:function (touches, event) {
				var touch = touches[0];
				if (this.prevTouchId != touch.getID())
					this.prevTouchId = touch.getID();
				else event.getCurrentTarget().processEvent(touches[0]);
			}
		}, this);
		this.schedule(this.createEnemy, 1 / 6);
		this.schedule(this.fighterShoot, 1 / 6);
		this.scheduleUpdate();
	},
	processEvent:function (event) {	
			var delta = event.getDelta();
			var curPos = cc.p(this._fighter.x, this._fighter.y);  

			curPos = cc.pAdd(curPos, delta);
			curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(winSize.width, winSize.height));
			this._fighter.x = curPos.x;
			this._fighter.y = curPos.y;
			curPos = null;
		
	},
	update:function (dt) {		
			this.checkIsCollide();
			
	},	
	createEnemy:function(dt){
		var offset, tmpAction;		
		this._invader = new Invader();
		this.addChild(this._invader);
		
		CONTAINER_ENEMIES.push(this._invader);
		this._invader.x = 80 + (winSize.width - 160) * Math.random();
		this._invader.y = winSize.height;
		
		offset = cc.p(0, -winSize.height - this._invader.height);
		tmpAction = cc.moveBy(4, offset);
		this._invader.runAction(tmpAction);
	},
	fighterShoot:function (dt) {
		//this.shootEffect();		
		var offset;
		this._bullet = new Bullet();
		this.addChild(this._bullet);
		CONTAINER_BULLETS.push(this._bullet);
		this._bullet.x = this._fighter.x;
		this._bullet.y = this._fighter.y - 3;
		offset = cc.p(0, winSize.height);
		tmpAction = cc.moveBy(4, offset);
		this._bullet.runAction(tmpAction);
		
	},
	collide:function (a, b) {
		var ax = a.x, ay = a.y, bx = b.x, by = b.y;
		if (Math.abs(ax - bx) > MAX_CONTAINT_WIDTH || Math.abs(ay - by) > MAX_CONTAINT_HEIGHT)
			return false;

		var aRect = a.collideRect(ax, ay);
		var bRect = b.collideRect(bx, by);
		return cc.rectIntersectsRect(aRect, bRect);
	},
	checkIsCollide:function () {
		var selChild, bulletChild;
		// check collide
		var i, locShip =this._ship;
		for (i = 0; i < CONTAINER_ENEMIES.length; i++) {
			selChild = CONTAINER_ENEMIES[i];
			if (!selChild.active)
				continue;

			for (var j = 0; j < CONTAINER_BULLETS.length; j++) {
				bulletChild = CONTAINER_BULLETS[j];
				if (bulletChild.active && this.collide(selChild, bulletChild)) {
					bulletChild.destroy();
					selChild.destroy();
					this.statusLayer = this.getParent().getChildByTag(10);
					this.statusLayer.addScore();
				}
			}
			/*if (this.collide(selChild, locShip)) {
				if (locShip.active) {
					selChild.hurt();
					locShip.hurt();
				}
			}*/
		}	
	}	
});