require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ArrayUtils":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'dca0fj7sSNILLOm8yG3G6El', 'ArrayUtils');
// scripts\ArrayUtils.js

module.exports = {
    //删除数组里的元素
    remove: function remove(array, object) {
        for (var index = 0; index < array.length; index++) {
            if (array[index] === object) {
                //console.log("remove=",index);
                array.splice(index, 1);
            }
        }
    }

};

cc._RFpop();
},{}],"Bullet":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4644f0m2WtABYRy+pn6dOaG', 'Bullet');
// scripts\Bullet.js

cc.Class({
    "extends": cc.Component,

    properties: {},
    onLoad: function onLoad() {
        this.speed = 6;
    },
    move: function move() {
        var srcPos = this.node.getPosition();
        var targetPos = this.letter.node.getPosition();
        var dis = cc.pGetDistance(targetPos, srcPos);
        if (dis > 6) {
            var time = Math.abs(dis / this.speed);
            var x_dis = targetPos.x - srcPos.x;
            var y_dis = targetPos.y - srcPos.y;
            var x_speed = x_dis / time;
            var y_speed = y_dis / time;
            this.node.x = this.node.x + x_speed;
            this.node.y = this.node.y + y_speed;
        }
    },
    update: function update() {
        if (this.letter !== undefined) {}
    }
});

cc._RFpop();
},{}],"Const":[function(require,module,exports){
"use strict";
cc._RFpush(module, '8e444QNgelAmpjsxhXbKSHG', 'Const');
// scripts\Const.js

module.exports = {
                    letSpeeds: new Array(1, 2, 3, 4, 5),
                    keyCodes: new Array(cc.KEY.a, cc.KEY.b, cc.KEY.c, cc.KEY.d, cc.KEY.e, cc.KEY.f, cc.KEY.g, cc.KEY.h, cc.KEY.i, cc.KEY.j, cc.KEY.k, cc.KEY.l, cc.KEY.m, cc.KEY.n, cc.KEY.o, cc.KEY.p, cc.KEY.q, cc.KEY.r, cc.KEY.s, cc.KEY.t, cc.KEY.u, cc.KEY.v, cc.KEY.w, cc.KEY.x, cc.KEY.y, cc.KEY.z),
                    keyMap: {}

};
module.exports.keyMap[cc.KEY.a] = "A";
module.exports.keyMap[cc.KEY.b] = "B";
module.exports.keyMap[cc.KEY.c] = "C";
module.exports.keyMap[cc.KEY.d] = "D";
module.exports.keyMap[cc.KEY.e] = "E";
module.exports.keyMap[cc.KEY.f] = "F";
module.exports.keyMap[cc.KEY.g] = "G";
module.exports.keyMap[cc.KEY.h] = "H";
module.exports.keyMap[cc.KEY.i] = "I";
module.exports.keyMap[cc.KEY.j] = "J";
module.exports.keyMap[cc.KEY.k] = "K";
module.exports.keyMap[cc.KEY.l] = "L";
module.exports.keyMap[cc.KEY.m] = "M";
module.exports.keyMap[cc.KEY.n] = "N";
module.exports.keyMap[cc.KEY.o] = "O";
module.exports.keyMap[cc.KEY.p] = "P";
module.exports.keyMap[cc.KEY.q] = "Q";
module.exports.keyMap[cc.KEY.r] = "R";
module.exports.keyMap[cc.KEY.s] = "S";
module.exports.keyMap[cc.KEY.t] = "T";
module.exports.keyMap[cc.KEY.u] = "U";
module.exports.keyMap[cc.KEY.v] = "V";
module.exports.keyMap[cc.KEY.w] = "W";
module.exports.keyMap[cc.KEY.x] = "X";
module.exports.keyMap[cc.KEY.y] = "Y";
module.exports.keyMap[cc.KEY.z] = "Z";

cc._RFpop();
},{}],"Game":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game');
// scripts\Game.js

var Const = require("Const");
var ArrayUtils = require("ArrayUtils");
cc.Class({
    "extends": cc.Component,

    properties: {
        letterPrefab: {
            "default": null,
            type: cc.Prefab
        },
        bulletPrefab: {
            "default": null,
            type: cc.Prefab
        },
        // 地面节点，用于确定星星生成的高度
        ground: {
            "default": null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            "default": null,
            type: cc.Node
        },
        // score label 的引用
        scoreDisplay: {
            "default": null,
            type: cc.Label
        },
        // 得分音效资源
        scoreAudio: {
            "default": null,
            url: cc.AudioClip
        }

    },

    // use this for initialization
    onLoad: function onLoad() {
        console.log("Const keyCodes length = " + Const.keyCodes.length);
        // 初始化计时器
        this.timer = 0;
        // 初始化计分
        this.score = 0;
        //
        this.keyCode = 0;
        //
        this.letterTimer = 0;
        //增加按钮事件
        this.addKeyListener();

        this.letterList = [];
    },
    randomKeyCode: function randomKeyCode() {
        var index = Math.floor(cc.rand()) % 5; //Const.keyCodes.length;
        //console.log("random:"+ index)  ;
        return Const.keyCodes[index];
    },

    getScore: function getScore(level) {
        switch (level) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 3;
            case 4:
                return 4;
        }
        return 1;
    },

    addScore: function addScore(level) {
        this.score += this.getScore(level);
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function gameOver() {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('game');
    },

    createLetter: function createLetter() {
        //生成一个字母
        // 使用给定的模板在场景中生成一个新节点
        var letter = cc.instantiate(this.letterPrefab);
        //将新增的节点添加到 Canvas 节点下面
        this.node.addChild(letter);
        letter.setPosition(this.randomLetterPosition());
        var letComponent = letter.getComponent('Letter');
        letComponent.init(this.randomKeyCode(), 1, this);
        this.letterList.push(letComponent);
    },

    randomLetterPosition: function randomLetterPosition() {
        var randX = cc.randomMinus1To1() * (this.node.width / 2);
        return cc.p(randX, this.node.height / 2);
    },
    createBullet: function createBullet() {
        var bullet = cc.instantiate(this.bulletPrefab);
        this.node.addChild(bullet);
        bullet.setPosition(cc.p(0, -this.node.height / 2));
        return bullet;
    },

    addKeyListener: function addKeyListener() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                self.keyCode = keyCode;
                //console.log("do keyCode====:"+keyCode);
            },
            onKeyReleased: function onKeyReleased(keyCode, event) {
                self.keyCode = 0;
            }
        }, this.node);
    },
    // called every frame
    update: function update(dt) {
        //字母生成
        this.timer += dt;
        if (this.timer > 2.0) {
            this.createLetter();
            this.timer = 0;
        }
        //检查
        if (this.keyCode !== 0) {
            for (var index in this.letterList) {
                var letter = this.letterList[index];
                //console.log("letter="+letter);
                if (letter.isPick(this.keyCode)) {
                    letter.doPickAction();
                    this.createBullet();

                    break;
                }
            }
        }
        this.keyCode = 0;
    },
    removeLetter: function removeLetter(letter) {
        ArrayUtils.remove(this.letterList, letter);
    }

});

cc._RFpop();
},{"ArrayUtils":"ArrayUtils","Const":"Const"}],"Letter":[function(require,module,exports){
"use strict";
cc._RFpush(module, '807f83fi4lA4b1g4V7huAQE', 'Letter');
// scripts\Letter.js


var Const = require("Const");
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
        this.speed = 1;
        this.enable = true;
    },
    getLetter: function getLetter(keyCode) {
        return Const.keyMap[keyCode];
    },
    init: function init(keyCode, level, game) {
        //console.log("keyCode=======:",keyCode);
        this.game = game;
        this.letKeyCode = keyCode;
        this.level = level;
        this.enable = true;
        this.letterLabel.string = this.getLetter(this.letKeyCode);
        this.speed = Const.letSpeeds[this.level - 1];
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
        this.game.removeLetter(this);
    },
    doLoseAction: function doLoseAction() {
        var scale = cc.scaleTo(0.05, 0.1);
        var callback = cc.callFunc(this.destroy, this);
        this.node.runAction(cc.sequence(scale, callback));
        this.enable = false;
        this.game.removeLetter(this);
    },
    isPick: function isPick(keyCode) {
        return this.letKeyCode == keyCode;
    },
    update: function update(dt) {
        if (this.enable === true) {
            // console.log("this letKeyCode:" + this.letKeyCode +"  keyCode:"+this.game.keyCode);
            this.node.y = this.node.y - this.speed;
            if (this.node.y < -320) {
                this.doLoseAction();
            }
        }
    }
});

cc._RFpop();
},{"Const":"Const"}],"Player":[function(require,module,exports){
"use strict";
cc._RFpush(module, '6c688v72QdOKamCGCT+xaAd', 'Player');
// scripts\Player.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0,
        // 跳跃音效资源
        jumpAudio: {
            "default": null,
            url: cc.AudioClip
        }
    },

    setJumpAction: function setJumpAction() {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        var callback = cc.callFunc(this.playJumpSound, this);
        // 不断重复，而且每次完成落地动作后调用回调来播放声音
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },

    playJumpSound: function playJumpSound() {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },

    setInputControl: function setInputControl() {
        var self = this;
        //add keyboard input listener to jump, turnLeft and turnRight
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // set a flag when key pressed
            onKeyPressed: function onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.d:
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                }
            },
            // unset a flag when key released
            onKeyReleased: function onKeyReleased(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                        self.accRight = false;
                        break;
                }
            }
        }, self.node);
    },

    // use this for initialization
    onLoad: function onLoad() {
        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;

        // 初始化键盘输入监听
        this.setInputControl();
    },

    // called every frame
    update: function update(dt) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
        if (this.node.x < -480) {
            this.node.x = 480;
            this.xSpeed = 0;
        } else if (this.node.x > 480) {
            this.node.x = -480;
            this.xSpeed = 0;
        }
    }
});

cc._RFpop();
},{}]},{},["Bullet","Game","Player","Letter","Const","ArrayUtils"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9zY3JpcHRzL0FycmF5VXRpbHMuanMiLCJhc3NldHMvc2NyaXB0cy9CdWxsZXQuanMiLCJhc3NldHMvc2NyaXB0cy9Db25zdC5qcyIsImFzc2V0cy9zY3JpcHRzL0dhbWUuanMiLCJhc3NldHMvc2NyaXB0cy9MZXR0ZXIuanMiLCJhc3NldHMvc2NyaXB0cy9QbGF5ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZGNhMGZqN3NTTklMTE9tOHlHM0c2RWwnLCAnQXJyYXlVdGlscycpO1xuLy8gc2NyaXB0c1xcQXJyYXlVdGlscy5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvL+WIoOmZpOaVsOe7hOmHjOeahOWFg+e0oFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBvYmplY3QpIHtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgaWYgKGFycmF5W2luZGV4XSA9PT0gb2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInJlbW92ZT1cIixpbmRleCk7XG4gICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzQ2NDRmMG0yV3RBQllSeStwbjZkT2FHJywgJ0J1bGxldCcpO1xuLy8gc2NyaXB0c1xcQnVsbGV0LmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge30sXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc3BlZWQgPSA2O1xuICAgIH0sXG4gICAgbW92ZTogZnVuY3Rpb24gbW92ZSgpIHtcbiAgICAgICAgdmFyIHNyY1BvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgdGFyZ2V0UG9zID0gdGhpcy5sZXR0ZXIubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgZGlzID0gY2MucEdldERpc3RhbmNlKHRhcmdldFBvcywgc3JjUG9zKTtcbiAgICAgICAgaWYgKGRpcyA+IDYpIHtcbiAgICAgICAgICAgIHZhciB0aW1lID0gTWF0aC5hYnMoZGlzIC8gdGhpcy5zcGVlZCk7XG4gICAgICAgICAgICB2YXIgeF9kaXMgPSB0YXJnZXRQb3MueCAtIHNyY1Bvcy54O1xuICAgICAgICAgICAgdmFyIHlfZGlzID0gdGFyZ2V0UG9zLnkgLSBzcmNQb3MueTtcbiAgICAgICAgICAgIHZhciB4X3NwZWVkID0geF9kaXMgLyB0aW1lO1xuICAgICAgICAgICAgdmFyIHlfc3BlZWQgPSB5X2RpcyAvIHRpbWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IHRoaXMubm9kZS54ICsgeF9zcGVlZDtcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gdGhpcy5ub2RlLnkgKyB5X3NwZWVkO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGV0dGVyICE9PSB1bmRlZmluZWQpIHt9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc4ZTQ0NFFOZ2VsQW1wanN4aFhiS1NIRycsICdDb25zdCcpO1xuLy8gc2NyaXB0c1xcQ29uc3QuanNcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxldFNwZWVkczogbmV3IEFycmF5KDEsIDIsIDMsIDQsIDUpLFxuICAgICAgICAgICAgICAgICAgICBrZXlDb2RlczogbmV3IEFycmF5KGNjLktFWS5hLCBjYy5LRVkuYiwgY2MuS0VZLmMsIGNjLktFWS5kLCBjYy5LRVkuZSwgY2MuS0VZLmYsIGNjLktFWS5nLCBjYy5LRVkuaCwgY2MuS0VZLmksIGNjLktFWS5qLCBjYy5LRVkuaywgY2MuS0VZLmwsIGNjLktFWS5tLCBjYy5LRVkubiwgY2MuS0VZLm8sIGNjLktFWS5wLCBjYy5LRVkucSwgY2MuS0VZLnIsIGNjLktFWS5zLCBjYy5LRVkudCwgY2MuS0VZLnUsIGNjLktFWS52LCBjYy5LRVkudywgY2MuS0VZLngsIGNjLktFWS55LCBjYy5LRVkueiksXG4gICAgICAgICAgICAgICAgICAgIGtleU1hcDoge31cblxufTtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkuYV0gPSBcIkFcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkuYl0gPSBcIkJcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkuY10gPSBcIkNcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkuZF0gPSBcIkRcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkuZV0gPSBcIkVcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkuZl0gPSBcIkZcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkuZ10gPSBcIkdcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkuaF0gPSBcIkhcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkuaV0gPSBcIklcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkual0gPSBcIkpcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkua10gPSBcIktcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkubF0gPSBcIkxcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkubV0gPSBcIk1cIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkubl0gPSBcIk5cIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkub10gPSBcIk9cIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkucF0gPSBcIlBcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkucV0gPSBcIlFcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkucl0gPSBcIlJcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkuc10gPSBcIlNcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkudF0gPSBcIlRcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkudV0gPSBcIlVcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkudl0gPSBcIlZcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkud10gPSBcIldcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkueF0gPSBcIlhcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkueV0gPSBcIllcIjtcbm1vZHVsZS5leHBvcnRzLmtleU1hcFtjYy5LRVkuel0gPSBcIlpcIjtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzRlMTJmTFNRdTFMK0tWNlFteERpYXZVJywgJ0dhbWUnKTtcbi8vIHNjcmlwdHNcXEdhbWUuanNcblxudmFyIENvbnN0ID0gcmVxdWlyZShcIkNvbnN0XCIpO1xudmFyIEFycmF5VXRpbHMgPSByZXF1aXJlKFwiQXJyYXlVdGlsc1wiKTtcbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsZXR0ZXJQcmVmYWI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIGJ1bGxldFByZWZhYjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5Zyw6Z2i6IqC54K577yM55So5LqO56Gu5a6a5pif5pif55Sf5oiQ55qE6auY5bqmXG4gICAgICAgIGdyb3VuZDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHBsYXllciDoioLngrnvvIznlKjkuo7ojrflj5bkuLvop5LlvLnot7PnmoTpq5jluqbvvIzlkozmjqfliLbkuLvop5LooYzliqjlvIDlhbNcbiAgICAgICAgcGxheWVyOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgLy8gc2NvcmUgbGFiZWwg55qE5byV55SoXG4gICAgICAgIHNjb3JlRGlzcGxheToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICAvLyDlvpfliIbpn7PmlYjotYTmupBcbiAgICAgICAgc2NvcmVBdWRpbzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29uc3Qga2V5Q29kZXMgbGVuZ3RoID0gXCIgKyBDb25zdC5rZXlDb2Rlcy5sZW5ndGgpO1xuICAgICAgICAvLyDliJ3lp4vljJborqHml7blmahcbiAgICAgICAgdGhpcy50aW1lciA9IDA7XG4gICAgICAgIC8vIOWIneWni+WMluiuoeWIhlxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5rZXlDb2RlID0gMDtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5sZXR0ZXJUaW1lciA9IDA7XG4gICAgICAgIC8v5aKe5Yqg5oyJ6ZKu5LqL5Lu2XG4gICAgICAgIHRoaXMuYWRkS2V5TGlzdGVuZXIoKTtcblxuICAgICAgICB0aGlzLmxldHRlckxpc3QgPSBbXTtcbiAgICB9LFxuICAgIHJhbmRvbUtleUNvZGU6IGZ1bmN0aW9uIHJhbmRvbUtleUNvZGUoKSB7XG4gICAgICAgIHZhciBpbmRleCA9IE1hdGguZmxvb3IoY2MucmFuZCgpKSAlIDU7IC8vQ29uc3Qua2V5Q29kZXMubGVuZ3RoO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwicmFuZG9tOlwiKyBpbmRleCkgIDtcbiAgICAgICAgcmV0dXJuIENvbnN0LmtleUNvZGVzW2luZGV4XTtcbiAgICB9LFxuXG4gICAgZ2V0U2NvcmU6IGZ1bmN0aW9uIGdldFNjb3JlKGxldmVsKSB7XG4gICAgICAgIHN3aXRjaCAobGV2ZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMTtcbiAgICB9LFxuXG4gICAgYWRkU2NvcmU6IGZ1bmN0aW9uIGFkZFNjb3JlKGxldmVsKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gdGhpcy5nZXRTY29yZShsZXZlbCk7XG4gICAgICAgIHRoaXMuc2NvcmVEaXNwbGF5LnN0cmluZyA9ICdTY29yZTogJyArIHRoaXMuc2NvcmUudG9TdHJpbmcoKTtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLnNjb3JlQXVkaW8sIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgZ2FtZU92ZXI6IGZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICAgICAgICB0aGlzLnBsYXllci5zdG9wQWxsQWN0aW9ucygpOyAvL+WBnOatoiBwbGF5ZXIg6IqC54K555qE6Lez6LeD5Yqo5L2cXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xuICAgIH0sXG5cbiAgICBjcmVhdGVMZXR0ZXI6IGZ1bmN0aW9uIGNyZWF0ZUxldHRlcigpIHtcbiAgICAgICAgLy/nlJ/miJDkuIDkuKrlrZfmr41cbiAgICAgICAgLy8g5L2/55So57uZ5a6a55qE5qih5p2/5Zyo5Zy65pmv5Lit55Sf5oiQ5LiA5Liq5paw6IqC54K5XG4gICAgICAgIHZhciBsZXR0ZXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxldHRlclByZWZhYik7XG4gICAgICAgIC8v5bCG5paw5aKe55qE6IqC54K55re75Yqg5YiwIENhbnZhcyDoioLngrnkuIvpnaJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGxldHRlcik7XG4gICAgICAgIGxldHRlci5zZXRQb3NpdGlvbih0aGlzLnJhbmRvbUxldHRlclBvc2l0aW9uKCkpO1xuICAgICAgICB2YXIgbGV0Q29tcG9uZW50ID0gbGV0dGVyLmdldENvbXBvbmVudCgnTGV0dGVyJyk7XG4gICAgICAgIGxldENvbXBvbmVudC5pbml0KHRoaXMucmFuZG9tS2V5Q29kZSgpLCAxLCB0aGlzKTtcbiAgICAgICAgdGhpcy5sZXR0ZXJMaXN0LnB1c2gobGV0Q29tcG9uZW50KTtcbiAgICB9LFxuXG4gICAgcmFuZG9tTGV0dGVyUG9zaXRpb246IGZ1bmN0aW9uIHJhbmRvbUxldHRlclBvc2l0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZFggPSBjYy5yYW5kb21NaW51czFUbzEoKSAqICh0aGlzLm5vZGUud2lkdGggLyAyKTtcbiAgICAgICAgcmV0dXJuIGNjLnAocmFuZFgsIHRoaXMubm9kZS5oZWlnaHQgLyAyKTtcbiAgICB9LFxuICAgIGNyZWF0ZUJ1bGxldDogZnVuY3Rpb24gY3JlYXRlQnVsbGV0KCkge1xuICAgICAgICB2YXIgYnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5idWxsZXRQcmVmYWIpO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoYnVsbGV0KTtcbiAgICAgICAgYnVsbGV0LnNldFBvc2l0aW9uKGNjLnAoMCwgLXRoaXMubm9kZS5oZWlnaHQgLyAyKSk7XG4gICAgICAgIHJldHVybiBidWxsZXQ7XG4gICAgfSxcblxuICAgIGFkZEtleUxpc3RlbmVyOiBmdW5jdGlvbiBhZGRLZXlMaXN0ZW5lcigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkTGlzdGVuZXIoe1xuICAgICAgICAgICAgZXZlbnQ6IGNjLkV2ZW50TGlzdGVuZXIuS0VZQk9BUkQsXG4gICAgICAgICAgICBvbktleVByZXNzZWQ6IGZ1bmN0aW9uIG9uS2V5UHJlc3NlZChrZXlDb2RlLCBldmVudCkge1xuICAgICAgICAgICAgICAgIHNlbGYua2V5Q29kZSA9IGtleUNvZGU7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImRvIGtleUNvZGU9PT09OlwiK2tleUNvZGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uS2V5UmVsZWFzZWQ6IGZ1bmN0aW9uIG9uS2V5UmVsZWFzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmtleUNvZGUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLm5vZGUpO1xuICAgIH0sXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgLy/lrZfmr43nlJ/miJBcbiAgICAgICAgdGhpcy50aW1lciArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMudGltZXIgPiAyLjApIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTGV0dGVyKCk7XG4gICAgICAgICAgICB0aGlzLnRpbWVyID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvL+ajgOafpVxuICAgICAgICBpZiAodGhpcy5rZXlDb2RlICE9PSAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLmxldHRlckxpc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGV0dGVyID0gdGhpcy5sZXR0ZXJMaXN0W2luZGV4XTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibGV0dGVyPVwiK2xldHRlcik7XG4gICAgICAgICAgICAgICAgaWYgKGxldHRlci5pc1BpY2sodGhpcy5rZXlDb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXR0ZXIuZG9QaWNrQWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQnVsbGV0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMua2V5Q29kZSA9IDA7XG4gICAgfSxcbiAgICByZW1vdmVMZXR0ZXI6IGZ1bmN0aW9uIHJlbW92ZUxldHRlcihsZXR0ZXIpIHtcbiAgICAgICAgQXJyYXlVdGlscy5yZW1vdmUodGhpcy5sZXR0ZXJMaXN0LCBsZXR0ZXIpO1xuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc4MDdmODNmaTRsQTRiMWc0VjdodUFRRScsICdMZXR0ZXInKTtcbi8vIHNjcmlwdHNcXExldHRlci5qc1xuXG5cbnZhciBDb25zdCA9IHJlcXVpcmUoXCJDb25zdFwiKTtcbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsZXR0ZXJMYWJlbDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9XG4gICAgfSxcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5sZXRLZXlDb2RlID0gLTE7XG4gICAgICAgIHRoaXMubGV2ZWwgPSAxO1xuICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICAgICAgdGhpcy5lbmFibGUgPSB0cnVlO1xuICAgIH0sXG4gICAgZ2V0TGV0dGVyOiBmdW5jdGlvbiBnZXRMZXR0ZXIoa2V5Q29kZSkge1xuICAgICAgICByZXR1cm4gQ29uc3Qua2V5TWFwW2tleUNvZGVdO1xuICAgIH0sXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChrZXlDb2RlLCBsZXZlbCwgZ2FtZSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwia2V5Q29kZT09PT09PT06XCIsa2V5Q29kZSk7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMubGV0S2V5Q29kZSA9IGtleUNvZGU7XG4gICAgICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgdGhpcy5lbmFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmxldHRlckxhYmVsLnN0cmluZyA9IHRoaXMuZ2V0TGV0dGVyKHRoaXMubGV0S2V5Q29kZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBDb25zdC5sZXRTcGVlZHNbdGhpcy5sZXZlbCAtIDFdO1xuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5nYW1lLmFkZFNjb3JlKHRoaXMubGV2ZWwpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICBkb1BpY2tBY3Rpb246IGZ1bmN0aW9uIGRvUGlja0FjdGlvbigpIHtcbiAgICAgICAgdmFyIHNjYWxlID0gY2Muc2NhbGVUbygwLjA1LCAyKTtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gY2MuY2FsbEZ1bmModGhpcy5kZXN0cm95LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShzY2FsZSwgY2FsbGJhY2spKTtcbiAgICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nYW1lLnJlbW92ZUxldHRlcih0aGlzKTtcbiAgICB9LFxuICAgIGRvTG9zZUFjdGlvbjogZnVuY3Rpb24gZG9Mb3NlQWN0aW9uKCkge1xuICAgICAgICB2YXIgc2NhbGUgPSBjYy5zY2FsZVRvKDAuMDUsIDAuMSk7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNjLmNhbGxGdW5jKHRoaXMuZGVzdHJveSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2Uoc2NhbGUsIGNhbGxiYWNrKSk7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2FtZS5yZW1vdmVMZXR0ZXIodGhpcyk7XG4gICAgfSxcbiAgICBpc1BpY2s6IGZ1bmN0aW9uIGlzUGljayhrZXlDb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxldEtleUNvZGUgPT0ga2V5Q29kZTtcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGlzIGxldEtleUNvZGU6XCIgKyB0aGlzLmxldEtleUNvZGUgK1wiICBrZXlDb2RlOlwiK3RoaXMuZ2FtZS5rZXlDb2RlKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gdGhpcy5ub2RlLnkgLSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgaWYgKHRoaXMubm9kZS55IDwgLTMyMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Mb3NlQWN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzZjNjg4djcyUWRPS2FtQ0dDVCt4YUFkJywgJ1BsYXllcicpO1xuLy8gc2NyaXB0c1xcUGxheWVyLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyDkuLvop5Lot7Pot4Ppq5jluqZcbiAgICAgICAganVtcEhlaWdodDogMCxcbiAgICAgICAgLy8g5Li76KeS6Lez6LeD5oyB57ut5pe26Ze0XG4gICAgICAgIGp1bXBEdXJhdGlvbjogMCxcbiAgICAgICAgLy8g5pyA5aSn56e75Yqo6YCf5bqmXG4gICAgICAgIG1heE1vdmVTcGVlZDogMCxcbiAgICAgICAgLy8g5Yqg6YCf5bqmXG4gICAgICAgIGFjY2VsOiAwLFxuICAgICAgICAvLyDot7Pot4Ppn7PmlYjotYTmupBcbiAgICAgICAganVtcEF1ZGlvOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0SnVtcEFjdGlvbjogZnVuY3Rpb24gc2V0SnVtcEFjdGlvbigpIHtcbiAgICAgICAgLy8g6Lez6LeD5LiK5Y2HXG4gICAgICAgIHZhciBqdW1wVXAgPSBjYy5tb3ZlQnkodGhpcy5qdW1wRHVyYXRpb24sIGNjLnAoMCwgdGhpcy5qdW1wSGVpZ2h0KSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKTtcbiAgICAgICAgLy8g5LiL6JC9XG4gICAgICAgIHZhciBqdW1wRG93biA9IGNjLm1vdmVCeSh0aGlzLmp1bXBEdXJhdGlvbiwgY2MucCgwLCAtdGhpcy5qdW1wSGVpZ2h0KSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpO1xuICAgICAgICAvLyDmt7vliqDkuIDkuKrlm57osIPlh73mlbDvvIznlKjkuo7lnKjliqjkvZznu5PmnZ/ml7bosIPnlKjmiJHku6zlrprkuYnnmoTlhbbku5bmlrnms5VcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gY2MuY2FsbEZ1bmModGhpcy5wbGF5SnVtcFNvdW5kLCB0aGlzKTtcbiAgICAgICAgLy8g5LiN5pat6YeN5aSN77yM6ICM5LiU5q+P5qyh5a6M5oiQ6JC95Zyw5Yqo5L2c5ZCO6LCD55So5Zue6LCD5p2l5pKt5pS+5aOw6Z+zXG4gICAgICAgIHJldHVybiBjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGp1bXBVcCwganVtcERvd24sIGNhbGxiYWNrKSk7XG4gICAgfSxcblxuICAgIHBsYXlKdW1wU291bmQ6IGZ1bmN0aW9uIHBsYXlKdW1wU291bmQoKSB7XG4gICAgICAgIC8vIOiwg+eUqOWjsOmfs+W8leaTjuaSreaUvuWjsOmfs1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuanVtcEF1ZGlvLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIHNldElucHV0Q29udHJvbDogZnVuY3Rpb24gc2V0SW5wdXRDb250cm9sKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vYWRkIGtleWJvYXJkIGlucHV0IGxpc3RlbmVyIHRvIGp1bXAsIHR1cm5MZWZ0IGFuZCB0dXJuUmlnaHRcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHtcbiAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJELFxuICAgICAgICAgICAgLy8gc2V0IGEgZmxhZyB3aGVuIGtleSBwcmVzc2VkXG4gICAgICAgICAgICBvbktleVByZXNzZWQ6IGZ1bmN0aW9uIG9uS2V5UHJlc3NlZChrZXlDb2RlLCBldmVudCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5hOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5kOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NMZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyB1bnNldCBhIGZsYWcgd2hlbiBrZXkgcmVsZWFzZWRcbiAgICAgICAgICAgIG9uS2V5UmVsZWFzZWQ6IGZ1bmN0aW9uIG9uS2V5UmVsZWFzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuYTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLmQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNlbGYubm9kZSk7XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICAvLyDliJ3lp4vljJbot7Pot4PliqjkvZxcbiAgICAgICAgdGhpcy5qdW1wQWN0aW9uID0gdGhpcy5zZXRKdW1wQWN0aW9uKCk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24odGhpcy5qdW1wQWN0aW9uKTtcblxuICAgICAgICAvLyDliqDpgJ/luqbmlrnlkJHlvIDlhbNcbiAgICAgICAgdGhpcy5hY2NMZWZ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWNjUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgLy8g5Li76KeS5b2T5YmN5rC05bmz5pa55ZCR6YCf5bqmXG4gICAgICAgIHRoaXMueFNwZWVkID0gMDtcblxuICAgICAgICAvLyDliJ3lp4vljJbplK7nm5jovpPlhaXnm5HlkKxcbiAgICAgICAgdGhpcy5zZXRJbnB1dENvbnRyb2woKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgLy8g5qC55o2u5b2T5YmN5Yqg6YCf5bqm5pa55ZCR5q+P5bin5pu05paw6YCf5bqmXG4gICAgICAgIGlmICh0aGlzLmFjY0xlZnQpIHtcbiAgICAgICAgICAgIHRoaXMueFNwZWVkIC09IHRoaXMuYWNjZWwgKiBkdDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFjY1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnhTcGVlZCArPSB0aGlzLmFjY2VsICogZHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6ZmQ5Yi25Li76KeS55qE6YCf5bqm5LiN6IO96LaF6L+H5pyA5aSn5YC8XG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnhTcGVlZCkgPiB0aGlzLm1heE1vdmVTcGVlZCkge1xuICAgICAgICAgICAgLy8gaWYgc3BlZWQgcmVhY2ggbGltaXQsIHVzZSBtYXggc3BlZWQgd2l0aCBjdXJyZW50IGRpcmVjdGlvblxuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSB0aGlzLm1heE1vdmVTcGVlZCAqIHRoaXMueFNwZWVkIC8gTWF0aC5hYnModGhpcy54U3BlZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5qC55o2u5b2T5YmN6YCf5bqm5pu05paw5Li76KeS55qE5L2N572uXG4gICAgICAgIHRoaXMubm9kZS54ICs9IHRoaXMueFNwZWVkICogZHQ7XG4gICAgICAgIGlmICh0aGlzLm5vZGUueCA8IC00ODApIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS54ID0gNDgwO1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm9kZS54ID4gNDgwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IC00ODA7XG4gICAgICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7Il19
