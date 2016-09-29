
var Const = require("Const")
cc.Class({
    extends: cc.Component,

    properties: {
        letterLabel: {
            default: null,
            type: cc.Label
        },
    },
    onLoad: function () {
        this.letKeyCode = -1;
        this.level      = 1;
        this.speed      = 1;
        this.enable     = true;
    },
    getLetter:function(keyCode) 
    {
        return Const.keyMap[keyCode];
    },
    init:function(keyCode,level,game) {
        //console.log("keyCode=======:",keyCode);
        this.game       = game ;
        this.letKeyCode = keyCode;
        this.level      = level;
        this.enable     = true;
        this.letterLabel.string = this.getLetter(this.letKeyCode);
        this.speed      = Const.letSpeeds[this.level-1];
    },
    destroy: function() {
        this.game.addScore(this.level);
        this.node.destroy();
    },
    
    doPickAction: function() {
        var scale = cc.scaleTo(0.05, 2);
        var callback = cc.callFunc(this.destroy, this);
        this.node.runAction(cc.sequence(scale, callback));
        this.enable = false;
    },
    doLoseAction: function() {
        var scale = cc.scaleTo(0.05, 0.1);
        var callback = cc.callFunc(this.destroy, this);
        this.node.runAction(cc.sequence(scale, callback));
        this.enable = false;
    },
    update: function (dt) {
        if (this.enable === true)
        { 
            // console.log("this letKeyCode:" + this.letKeyCode +"  keyCode:"+this.game.keyCode);
            if (this.game.keyCode === this.letKeyCode )
            {
                this.doPickAction();
                this.game.keyCode = 0;
                return;
            }
            this.node.y = this.node.y - this.speed ;
            if (this.node.y < -320)
            {
                this.doLoseAction();
            }
        }
    },
});
