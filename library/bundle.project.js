require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Bullet":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4644f0m2WtABYRy+pn6dOaG', 'Bullet');
// scripts\Bullet.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 0
    },

    // use this for initialization
    onLoad: function onLoad() {},

    getPlayerDistance: function getPlayerDistance() {
        // 根据 player 节点位置判断距离
        var playerPos = this.game.player.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    onPicked: function onPicked() {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        // 调用 Game 脚本的得分方法
        this.game.gainScore();
        // 然后销毁当前星星节点
        this.node.destroy();
    },

    // called every frame
    update: function update(dt) {
        // 每帧判断和主角之间的距离是否小于收集距离
        if (this.getPlayerDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
        // 根据 Game 脚本中的计时器更新星星的透明度
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
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
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
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
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height / 2;
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        // 初始化计分
        this.score = 0;
        //
        this.keyCode = 0;
        //
        this.letterTimer = 0;

        this.addKeyListener();
    },
    randomKeyCode: function randomKeyCode() {
        var index = Math.floor(cc.rand()) % Const.keyCodes.length;
        console.log("random:" + index);
        return Const.keyCodes[index];
    },
    // called every frame
    update: function update(dt) {
        this.timer += dt;
        //字母生成
        this.letterTimer += dt;
        if (this.letterTimer > 2.0) {
            this.createLetter();
            console.log("this.letterTimer:" + this.letterTimer);
            this.letterTimer = 0;
        }
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
    },

    randomLetterPosition: function randomLetterPosition() {
        var randX = cc.randomMinus1To1() * (this.node.width / 2);
        return cc.p(randX, this.node.height / 2);
    },
    addKeyListener: function addKeyListener() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                self.keyCode = keyCode;
                console.log("do keyCode:" + keyCode);
            },
            onKeyReleased: function onKeyReleased(keyCode, event) {
                self.keyCode = 0;
            }
        }, this.node);
    }

});

cc._RFpop();
},{"Const":"Const"}],"Letter":[function(require,module,exports){
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
    },
    doLoseAction: function doLoseAction() {
        var scale = cc.scaleTo(0.05, 0.1);
        var callback = cc.callFunc(this.destroy, this);
        this.node.runAction(cc.sequence(scale, callback));
        this.enable = false;
    },
    update: function update(dt) {
        if (this.enable === true) {
            // console.log("this letKeyCode:" + this.letKeyCode +"  keyCode:"+this.game.keyCode);
            if (this.game.keyCode === this.letKeyCode) {
                this.doPickAction();
                this.game.keyCode = 0;
                return;
            }
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
},{}]},{},["Bullet","Game","Player","Letter","Const"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9zY3JpcHRzL0J1bGxldC5qcyIsImFzc2V0cy9zY3JpcHRzL0NvbnN0LmpzIiwiYXNzZXRzL3NjcmlwdHMvR2FtZS5qcyIsImFzc2V0cy9zY3JpcHRzL0xldHRlci5qcyIsImFzc2V0cy9zY3JpcHRzL1BsYXllci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNDY0NGYwbTJXdEFCWVJ5K3BuNmRPYUcnLCAnQnVsbGV0Jyk7XG4vLyBzY3JpcHRzXFxCdWxsZXQuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIOaYn+aYn+WSjOS4u+inkuS5i+mXtOeahOi3neemu+Wwj+S6jui/meS4quaVsOWAvOaXtu+8jOWwseS8muWujOaIkOaUtumbhlxuICAgICAgICBwaWNrUmFkaXVzOiAwXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBnZXRQbGF5ZXJEaXN0YW5jZTogZnVuY3Rpb24gZ2V0UGxheWVyRGlzdGFuY2UoKSB7XG4gICAgICAgIC8vIOagueaNriBwbGF5ZXIg6IqC54K55L2N572u5Yik5pat6Led56a7XG4gICAgICAgIHZhciBwbGF5ZXJQb3MgPSB0aGlzLmdhbWUucGxheWVyLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIC8vIOagueaNruS4pOeCueS9jee9ruiuoeeul+S4pOeCueS5i+mXtOi3neemu1xuICAgICAgICB2YXIgZGlzdCA9IGNjLnBEaXN0YW5jZSh0aGlzLm5vZGUucG9zaXRpb24sIHBsYXllclBvcyk7XG4gICAgICAgIHJldHVybiBkaXN0O1xuICAgIH0sXG5cbiAgICBvblBpY2tlZDogZnVuY3Rpb24gb25QaWNrZWQoKSB7XG4gICAgICAgIC8vIOW9k+aYn+aYn+iiq+aUtumbhuaXtu+8jOiwg+eUqCBHYW1lIOiEmuacrOS4reeahOaOpeWPo++8jOeUn+aIkOS4gOS4quaWsOeahOaYn+aYn1xuICAgICAgICB0aGlzLmdhbWUuc3Bhd25OZXdTdGFyKCk7XG4gICAgICAgIC8vIOiwg+eUqCBHYW1lIOiEmuacrOeahOW+l+WIhuaWueazlVxuICAgICAgICB0aGlzLmdhbWUuZ2FpblNjb3JlKCk7XG4gICAgICAgIC8vIOeEtuWQjumUgOavgeW9k+WJjeaYn+aYn+iKgueCuVxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICAvLyDmr4/luKfliKTmlq3lkozkuLvop5LkuYvpl7TnmoTot53nprvmmK/lkKblsI/kuo7mlLbpm4bot53nprtcbiAgICAgICAgaWYgKHRoaXMuZ2V0UGxheWVyRGlzdGFuY2UoKSA8IHRoaXMucGlja1JhZGl1cykge1xuICAgICAgICAgICAgLy8g6LCD55So5pS26ZuG6KGM5Li6XG4gICAgICAgICAgICB0aGlzLm9uUGlja2VkKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8g5qC55o2uIEdhbWUg6ISa5pys5Lit55qE6K6h5pe25Zmo5pu05paw5pif5pif55qE6YCP5piO5bqmXG4gICAgICAgIHZhciBvcGFjaXR5UmF0aW8gPSAxIC0gdGhpcy5nYW1lLnRpbWVyIC8gdGhpcy5nYW1lLnN0YXJEdXJhdGlvbjtcbiAgICAgICAgdmFyIG1pbk9wYWNpdHkgPSA1MDtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSBtaW5PcGFjaXR5ICsgTWF0aC5mbG9vcihvcGFjaXR5UmF0aW8gKiAoMjU1IC0gbWluT3BhY2l0eSkpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnOGU0NDRRTmdlbEFtcGpzeGhYYktTSEcnLCAnQ29uc3QnKTtcbi8vIHNjcmlwdHNcXENvbnN0LmpzXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgICAgICAgICAgICAgICBsZXRTcGVlZHM6IG5ldyBBcnJheSgxLCAyLCAzLCA0LCA1KSxcbiAgICAgICAgICAgICAgICAgICAga2V5Q29kZXM6IG5ldyBBcnJheShjYy5LRVkuYSwgY2MuS0VZLmIsIGNjLktFWS5jLCBjYy5LRVkuZCwgY2MuS0VZLmUsIGNjLktFWS5mLCBjYy5LRVkuZywgY2MuS0VZLmgsIGNjLktFWS5pLCBjYy5LRVkuaiwgY2MuS0VZLmssIGNjLktFWS5sLCBjYy5LRVkubSwgY2MuS0VZLm4sIGNjLktFWS5vLCBjYy5LRVkucCwgY2MuS0VZLnEsIGNjLktFWS5yLCBjYy5LRVkucywgY2MuS0VZLnQsIGNjLktFWS51LCBjYy5LRVkudiwgY2MuS0VZLncsIGNjLktFWS54LCBjYy5LRVkueSwgY2MuS0VZLnopLFxuICAgICAgICAgICAgICAgICAgICBrZXlNYXA6IHt9XG5cbn07XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmFdID0gXCJBXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmJdID0gXCJCXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmNdID0gXCJDXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmRdID0gXCJEXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmVdID0gXCJFXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmZdID0gXCJGXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmddID0gXCJHXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmhdID0gXCJIXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmldID0gXCJJXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmpdID0gXCJKXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmtdID0gXCJLXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmxdID0gXCJMXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLm1dID0gXCJNXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLm5dID0gXCJOXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLm9dID0gXCJPXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnBdID0gXCJQXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnFdID0gXCJRXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnJdID0gXCJSXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnNdID0gXCJTXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnRdID0gXCJUXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnVdID0gXCJVXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnZdID0gXCJWXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnddID0gXCJXXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnhdID0gXCJYXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnldID0gXCJZXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnpdID0gXCJaXCI7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc0ZTEyZkxTUXUxTCtLVjZRbXhEaWF2VScsICdHYW1lJyk7XG4vLyBzY3JpcHRzXFxHYW1lLmpzXG5cbnZhciBDb25zdCA9IHJlcXVpcmUoXCJDb25zdFwiKTtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxldHRlclByZWZhYjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgYnVsbGV0UHJlZmFiOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICAvLyDmmJ/mmJ/kuqfnlJ/lkI7mtojlpLHml7bpl7TnmoTpmo/mnLrojIPlm7RcbiAgICAgICAgbWF4U3RhckR1cmF0aW9uOiAwLFxuICAgICAgICBtaW5TdGFyRHVyYXRpb246IDAsXG4gICAgICAgIC8vIOWcsOmdouiKgueCue+8jOeUqOS6juehruWumuaYn+aYn+eUn+aIkOeahOmrmOW6plxuICAgICAgICBncm91bmQ6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICAvLyBwbGF5ZXIg6IqC54K577yM55So5LqO6I635Y+W5Li76KeS5by56Lez55qE6auY5bqm77yM5ZKM5o6n5Yi25Li76KeS6KGM5Yqo5byA5YWzXG4gICAgICAgIHBsYXllcjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHNjb3JlIGxhYmVsIOeahOW8leeUqFxuICAgICAgICBzY29yZURpc3BsYXk6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5b6X5YiG6Z+z5pWI6LWE5rqQXG4gICAgICAgIHNjb3JlQXVkaW86IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbnN0IGtleUNvZGVzIGxlbmd0aCA9IFwiICsgQ29uc3Qua2V5Q29kZXMubGVuZ3RoKTtcbiAgICAgICAgLy8g6I635Y+W5Zyw5bmz6Z2i55qEIHkg6L205Z2Q5qCHXG4gICAgICAgIHRoaXMuZ3JvdW5kWSA9IHRoaXMuZ3JvdW5kLnkgKyB0aGlzLmdyb3VuZC5oZWlnaHQgLyAyO1xuICAgICAgICAvLyDliJ3lp4vljJborqHml7blmahcbiAgICAgICAgdGhpcy50aW1lciA9IDA7XG4gICAgICAgIHRoaXMuc3RhckR1cmF0aW9uID0gMDtcbiAgICAgICAgLy8g5Yid5aeL5YyW6K6h5YiGXG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICAvL1xuICAgICAgICB0aGlzLmtleUNvZGUgPSAwO1xuICAgICAgICAvL1xuICAgICAgICB0aGlzLmxldHRlclRpbWVyID0gMDtcblxuICAgICAgICB0aGlzLmFkZEtleUxpc3RlbmVyKCk7XG4gICAgfSxcbiAgICByYW5kb21LZXlDb2RlOiBmdW5jdGlvbiByYW5kb21LZXlDb2RlKCkge1xuICAgICAgICB2YXIgaW5kZXggPSBNYXRoLmZsb29yKGNjLnJhbmQoKSkgJSBDb25zdC5rZXlDb2Rlcy5sZW5ndGg7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmFuZG9tOlwiICsgaW5kZXgpO1xuICAgICAgICByZXR1cm4gQ29uc3Qua2V5Q29kZXNbaW5kZXhdO1xuICAgIH0sXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgdGhpcy50aW1lciArPSBkdDtcbiAgICAgICAgLy/lrZfmr43nlJ/miJBcbiAgICAgICAgdGhpcy5sZXR0ZXJUaW1lciArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMubGV0dGVyVGltZXIgPiAyLjApIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTGV0dGVyKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMubGV0dGVyVGltZXI6XCIgKyB0aGlzLmxldHRlclRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMubGV0dGVyVGltZXIgPSAwO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRTY29yZTogZnVuY3Rpb24gZ2V0U2NvcmUobGV2ZWwpIHtcbiAgICAgICAgc3dpdGNoIChsZXZlbCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxO1xuICAgIH0sXG5cbiAgICBhZGRTY29yZTogZnVuY3Rpb24gYWRkU2NvcmUobGV2ZWwpIHtcbiAgICAgICAgdGhpcy5zY29yZSArPSB0aGlzLmdldFNjb3JlKGxldmVsKTtcbiAgICAgICAgdGhpcy5zY29yZURpc3BsYXkuc3RyaW5nID0gJ1Njb3JlOiAnICsgdGhpcy5zY29yZS50b1N0cmluZygpO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc2NvcmVBdWRpbywgZmFsc2UpO1xuICAgIH0sXG5cbiAgICBnYW1lT3ZlcjogZnVuY3Rpb24gZ2FtZU92ZXIoKSB7XG4gICAgICAgIHRoaXMucGxheWVyLnN0b3BBbGxBY3Rpb25zKCk7IC8v5YGc5q2iIHBsYXllciDoioLngrnnmoTot7Pot4PliqjkvZxcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICAgfSxcblxuICAgIGNyZWF0ZUxldHRlcjogZnVuY3Rpb24gY3JlYXRlTGV0dGVyKCkge1xuICAgICAgICAvL+eUn+aIkOS4gOS4quWtl+avjVxuICAgICAgICAvLyDkvb/nlKjnu5nlrprnmoTmqKHmnb/lnKjlnLrmma/kuK3nlJ/miJDkuIDkuKrmlrDoioLngrlcbiAgICAgICAgdmFyIGxldHRlciA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGV0dGVyUHJlZmFiKTtcbiAgICAgICAgLy/lsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobGV0dGVyKTtcbiAgICAgICAgbGV0dGVyLnNldFBvc2l0aW9uKHRoaXMucmFuZG9tTGV0dGVyUG9zaXRpb24oKSk7XG4gICAgICAgIHZhciBsZXRDb21wb25lbnQgPSBsZXR0ZXIuZ2V0Q29tcG9uZW50KCdMZXR0ZXInKTtcbiAgICAgICAgbGV0Q29tcG9uZW50LmluaXQodGhpcy5yYW5kb21LZXlDb2RlKCksIDEsIHRoaXMpO1xuICAgIH0sXG5cbiAgICByYW5kb21MZXR0ZXJQb3NpdGlvbjogZnVuY3Rpb24gcmFuZG9tTGV0dGVyUG9zaXRpb24oKSB7XG4gICAgICAgIHZhciByYW5kWCA9IGNjLnJhbmRvbU1pbnVzMVRvMSgpICogKHRoaXMubm9kZS53aWR0aCAvIDIpO1xuICAgICAgICByZXR1cm4gY2MucChyYW5kWCwgdGhpcy5ub2RlLmhlaWdodCAvIDIpO1xuICAgIH0sXG4gICAgYWRkS2V5TGlzdGVuZXI6IGZ1bmN0aW9uIGFkZEtleUxpc3RlbmVyKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5LRVlCT0FSRCxcbiAgICAgICAgICAgIG9uS2V5UHJlc3NlZDogZnVuY3Rpb24gb25LZXlQcmVzc2VkKGtleUNvZGUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5rZXlDb2RlID0ga2V5Q29kZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRvIGtleUNvZGU6XCIgKyBrZXlDb2RlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbktleVJlbGVhc2VkOiBmdW5jdGlvbiBvbktleVJlbGVhc2VkKGtleUNvZGUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5rZXlDb2RlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5ub2RlKTtcbiAgICB9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnODA3ZjgzZmk0bEE0YjFnNFY3aHVBUUUnLCAnTGV0dGVyJyk7XG4vLyBzY3JpcHRzXFxMZXR0ZXIuanNcblxuXG52YXIgQ29uc3QgPSByZXF1aXJlKFwiQ29uc3RcIik7XG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGV0dGVyTGFiZWw6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubGV0S2V5Q29kZSA9IC0xO1xuICAgICAgICB0aGlzLmxldmVsID0gMTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gdHJ1ZTtcbiAgICB9LFxuICAgIGdldExldHRlcjogZnVuY3Rpb24gZ2V0TGV0dGVyKGtleUNvZGUpIHtcbiAgICAgICAgcmV0dXJuIENvbnN0LmtleU1hcFtrZXlDb2RlXTtcbiAgICB9LFxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoa2V5Q29kZSwgbGV2ZWwsIGdhbWUpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImtleUNvZGU9PT09PT09OlwiLGtleUNvZGUpO1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmxldEtleUNvZGUgPSBrZXlDb2RlO1xuICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sZXR0ZXJMYWJlbC5zdHJpbmcgPSB0aGlzLmdldExldHRlcih0aGlzLmxldEtleUNvZGUpO1xuICAgICAgICB0aGlzLnNwZWVkID0gQ29uc3QubGV0U3BlZWRzW3RoaXMubGV2ZWwgLSAxXTtcbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5hZGRTY29yZSh0aGlzLmxldmVsKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZG9QaWNrQWN0aW9uOiBmdW5jdGlvbiBkb1BpY2tBY3Rpb24oKSB7XG4gICAgICAgIHZhciBzY2FsZSA9IGNjLnNjYWxlVG8oMC4wNSwgMik7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNjLmNhbGxGdW5jKHRoaXMuZGVzdHJveSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2Uoc2NhbGUsIGNhbGxiYWNrKSk7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgfSxcbiAgICBkb0xvc2VBY3Rpb246IGZ1bmN0aW9uIGRvTG9zZUFjdGlvbigpIHtcbiAgICAgICAgdmFyIHNjYWxlID0gY2Muc2NhbGVUbygwLjA1LCAwLjEpO1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBjYy5jYWxsRnVuYyh0aGlzLmRlc3Ryb3ksIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKHNjYWxlLCBjYWxsYmFjaykpO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMgbGV0S2V5Q29kZTpcIiArIHRoaXMubGV0S2V5Q29kZSArXCIgIGtleUNvZGU6XCIrdGhpcy5nYW1lLmtleUNvZGUpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5rZXlDb2RlID09PSB0aGlzLmxldEtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvUGlja0FjdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5rZXlDb2RlID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHRoaXMubm9kZS55IC0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUueSA8IC0zMjApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvTG9zZUFjdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc2YzY4OHY3MlFkT0thbUNHQ1QreGFBZCcsICdQbGF5ZXInKTtcbi8vIHNjcmlwdHNcXFBsYXllci5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8g5Li76KeS6Lez6LeD6auY5bqmXG4gICAgICAgIGp1bXBIZWlnaHQ6IDAsXG4gICAgICAgIC8vIOS4u+inkui3s+i3g+aMgee7reaXtumXtFxuICAgICAgICBqdW1wRHVyYXRpb246IDAsXG4gICAgICAgIC8vIOacgOWkp+enu+WKqOmAn+W6plxuICAgICAgICBtYXhNb3ZlU3BlZWQ6IDAsXG4gICAgICAgIC8vIOWKoOmAn+W6plxuICAgICAgICBhY2NlbDogMCxcbiAgICAgICAgLy8g6Lez6LeD6Z+z5pWI6LWE5rqQXG4gICAgICAgIGp1bXBBdWRpbzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldEp1bXBBY3Rpb246IGZ1bmN0aW9uIHNldEp1bXBBY3Rpb24oKSB7XG4gICAgICAgIC8vIOi3s+i3g+S4iuWNh1xuICAgICAgICB2YXIganVtcFVwID0gY2MubW92ZUJ5KHRoaXMuanVtcER1cmF0aW9uLCBjYy5wKDAsIHRoaXMuanVtcEhlaWdodCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSk7XG4gICAgICAgIC8vIOS4i+iQvVxuICAgICAgICB2YXIganVtcERvd24gPSBjYy5tb3ZlQnkodGhpcy5qdW1wRHVyYXRpb24sIGNjLnAoMCwgLXRoaXMuanVtcEhlaWdodCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcbiAgICAgICAgLy8g5re75Yqg5LiA5Liq5Zue6LCD5Ye95pWw77yM55So5LqO5Zyo5Yqo5L2c57uT5p2f5pe26LCD55So5oiR5Lus5a6a5LmJ55qE5YW25LuW5pa55rOVXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNjLmNhbGxGdW5jKHRoaXMucGxheUp1bXBTb3VuZCwgdGhpcyk7XG4gICAgICAgIC8vIOS4jeaWremHjeWkje+8jOiAjOS4lOavj+asoeWujOaIkOiQveWcsOWKqOS9nOWQjuiwg+eUqOWbnuiwg+adpeaSreaUvuWjsOmfs1xuICAgICAgICByZXR1cm4gY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShqdW1wVXAsIGp1bXBEb3duLCBjYWxsYmFjaykpO1xuICAgIH0sXG5cbiAgICBwbGF5SnVtcFNvdW5kOiBmdW5jdGlvbiBwbGF5SnVtcFNvdW5kKCkge1xuICAgICAgICAvLyDosIPnlKjlo7Dpn7PlvJXmk47mkq3mlL7lo7Dpn7NcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmp1bXBBdWRpbywgZmFsc2UpO1xuICAgIH0sXG5cbiAgICBzZXRJbnB1dENvbnRyb2w6IGZ1bmN0aW9uIHNldElucHV0Q29udHJvbCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvL2FkZCBrZXlib2FyZCBpbnB1dCBsaXN0ZW5lciB0byBqdW1wLCB0dXJuTGVmdCBhbmQgdHVyblJpZ2h0XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5LRVlCT0FSRCxcbiAgICAgICAgICAgIC8vIHNldCBhIGZsYWcgd2hlbiBrZXkgcHJlc3NlZFxuICAgICAgICAgICAgb25LZXlQcmVzc2VkOiBmdW5jdGlvbiBvbktleVByZXNzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuYTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjTGVmdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gdW5zZXQgYSBmbGFnIHdoZW4ga2V5IHJlbGVhc2VkXG4gICAgICAgICAgICBvbktleVJlbGVhc2VkOiBmdW5jdGlvbiBvbktleVJlbGVhc2VkKGtleUNvZGUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLmE6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY0xlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5kOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzZWxmLm5vZGUpO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgLy8g5Yid5aeL5YyW6Lez6LeD5Yqo5L2cXG4gICAgICAgIHRoaXMuanVtcEFjdGlvbiA9IHRoaXMuc2V0SnVtcEFjdGlvbigpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHRoaXMuanVtcEFjdGlvbik7XG5cbiAgICAgICAgLy8g5Yqg6YCf5bqm5pa55ZCR5byA5YWzXG4gICAgICAgIHRoaXMuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgIC8vIOS4u+inkuW9k+WJjeawtOW5s+aWueWQkemAn+W6plxuICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XG5cbiAgICAgICAgLy8g5Yid5aeL5YyW6ZSu55uY6L6T5YWl55uR5ZCsXG4gICAgICAgIHRoaXMuc2V0SW5wdXRDb250cm9sKCk7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIC8vIOagueaNruW9k+WJjeWKoOmAn+W6puaWueWQkeavj+W4p+abtOaWsOmAn+W6plxuICAgICAgICBpZiAodGhpcy5hY2NMZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLnhTcGVlZCAtPSB0aGlzLmFjY2VsICogZHQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hY2NSaWdodCkge1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgKz0gdGhpcy5hY2NlbCAqIGR0O1xuICAgICAgICB9XG4gICAgICAgIC8vIOmZkOWItuS4u+inkueahOmAn+W6puS4jeiDvei2hei/h+acgOWkp+WAvFxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54U3BlZWQpID4gdGhpcy5tYXhNb3ZlU3BlZWQpIHtcbiAgICAgICAgICAgIC8vIGlmIHNwZWVkIHJlYWNoIGxpbWl0LCB1c2UgbWF4IHNwZWVkIHdpdGggY3VycmVudCBkaXJlY3Rpb25cbiAgICAgICAgICAgIHRoaXMueFNwZWVkID0gdGhpcy5tYXhNb3ZlU3BlZWQgKiB0aGlzLnhTcGVlZCAvIE1hdGguYWJzKHRoaXMueFNwZWVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOagueaNruW9k+WJjemAn+W6puabtOaWsOS4u+inkueahOS9jee9rlxuICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnhTcGVlZCAqIGR0O1xuICAgICAgICBpZiAodGhpcy5ub2RlLnggPCAtNDgwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IDQ4MDtcbiAgICAgICAgICAgIHRoaXMueFNwZWVkID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5vZGUueCA+IDQ4MCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnggPSAtNDgwO1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSAwO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyJdfQ==
