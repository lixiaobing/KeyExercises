"use strict";
cc._RFpush(module, '807f83fi4lA4b1g4V7huAQE', 'Letter');
// scripts\Letter.js

cc.Class({
    "extends": cc.Component,

    properties: {
        letterLabel: {
            "default": null,
            type: cc.Label
        }
    },
    onLoad: function onLoad() {
        this.letKeyCode = -1;
        this.level = 1;
        this.enable = true;
        this.keyMap = {};
        this.keyMap[cc.KEY.a] = "A";
        this.keyMap[cc.KEY.b] = "B";
        this.keyMap[cc.KEY.c] = "C";
        this.keyMap[cc.KEY.d] = "D";
        this.keyMap[cc.KEY.e] = "E";
        this.keyMap[cc.KEY.f] = "F";
        this.keyMap[cc.KEY.g] = "G";
        this.keyMap[cc.KEY.h] = "H";
        this.keyMap[cc.KEY.i] = "I";
        this.keyMap[cc.KEY.j] = "J";
        this.keyMap[cc.KEY.k] = "K";
        this.keyMap[cc.KEY.l] = "L";
        this.keyMap[cc.KEY.m] = "M";
        this.keyMap[cc.KEY.n] = "N";
        this.keyMap[cc.KEY.o] = "O";
        this.keyMap[cc.KEY.p] = "P";
        this.keyMap[cc.KEY.q] = "Q";
        this.keyMap[cc.KEY.r] = "R";
        this.keyMap[cc.KEY.s] = "S";
        this.keyMap[cc.KEY.t] = "T";
        this.keyMap[cc.KEY.u] = "U";
        this.keyMap[cc.KEY.v] = "V";
        this.keyMap[cc.KEY.w] = "W";
        this.keyMap[cc.KEY.x] = "X";
        this.keyMap[cc.KEY.y] = "Y";
        this.keyMap[cc.KEY.z] = "Z";
    },
    getLetter: function getLetter(keyCode) {
        return this.keyMap[keyCode];
    },

    init: function init(keyCode, level, game) {
        //console.log("keyCode=======:",keyCode);
        this.game = game;
        this.letKeyCode = keyCode;
        this.level = level;
        this.enable = true;
        this.letterLabel.string = this.getLetter(this.letKeyCode);
    },
    destroy: function destroy() {
        this.game.addScore(this.level);
        this.node.destroy();
    },

    doPickAction: function doPickAction() {
        var scale = cc.scaleTo(0.05, 2);
        var callback = cc.callFunc(this.destroy, this);
        this.node.runAction(cc.sequence(scale, callback));
        this.enable = false;
    },
    doLoseAction: function doLoseAction() {
        var scale = cc.scaleTo(0.05, 0.1);
        var callback = cc.callFunc(this.destroy, this);
        this.node.runAction(cc.sequence(scale, callback));
        this.enable = false;
    },
    update: function update(dt) {
        if (this.enable === true) {
            console.log("this letKeyCode:" + this.letKeyCode + "  keyCode:" + this.game.keyCode);
            if (this.game.keyCode === this.letKeyCode) {
                this.doPickAction();
                this.game.keyCode = 0;
                return;
            }
            this.node.y = this.node.y - 2;
            if (this.node.y < -320) {
                this.doLoseAction();
            }
        }
    }
});

cc._RFpop();