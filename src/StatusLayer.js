var StatusLayer = cc.Layer.extend({   
    labelScore:null,
    score:1,
    ls:null,
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();       
        var winsize = cc.director.getWinSize();

        this.labelScore = new cc.LabelTTF("Score:0", "Helvetica", 20);
        this.labelScore.setColor(cc.color(254,254,254));//black color
        this.labelScore.setPosition(cc.p(40, 100));
        this.labelScore.setTag(10);
        this.addChild(this.labelScore);
        //this.labelScore.retain();              
    },
    addScore:function(){
    	this.score++;    	
    	this.labelScore.setString("Score:"+this.score);    
    }
});
