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

    properties: {
        speed: 10
    },
    onLoad: function onLoad() {
        this.speed = 30;
    },
    destory: function destory() {
        //console.log("this.node:"+this.node);
        this.node.destroy();
    },

    follow: function follow(letterNode) {
        var srcPos = this.node.getPosition();
        var targetPos = letterNode.getPosition();
        var dis = cc.pDistance(targetPos, srcPos);
        if (dis > this.speed / 2) {
            var time = Math.abs(dis / this.speed);
            var x_dis = targetPos.x - srcPos.x;
            var y_dis = targetPos.y - srcPos.y;
            var x_speed = x_dis / time;
            var y_speed = y_dis / time;
            this.node.x = this.node.x + x_speed;
            this.node.y = this.node.y + y_speed;
        } else {
            return true;
        }
        return false;
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
        // 时间 label 的引用
        timeLabel: {
            "default": null,
            type: cc.Label
        },
        // 得分音效资源
        scoreAudio: {
            "default": null,
            url: cc.AudioClip
        },
        // 时间 label 的引用
        gameOverNode: {
            "default": null,
            type: cc.Node
        },
        startButton: {
            "default": null,
            type: cc.Button
        }

    },

    // use this for initialization
    onLoad: function onLoad() {

        this.time = 30;
        // 初始化计时器
        this.timer = 2.0;
        // 初始化计分
        this.score = 0;
        //
        this.keyCode = 0;
        //增加按钮事件
        this.addKeyListener();
        this.letterList = [];
        this.isGameOver = false;
    },
    randomKeyCode: function randomKeyCode() {
        var index = Math.floor(cc.rand()) % Const.keyCodes.length;
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
        //this.player.stopAllActions(); //停止 player 节点的跳跃动作

        this.gameOverNode.active = true;

        this.startButton.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            console.log("按钮按下");
            cc.director.loadScene('game');
        });
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
        var bulletComponent = bullet.getComponent("Bullet");
        return bulletComponent;
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
    countdown: function countdown(dt) {
        if (this.time > 0) {
            this.time -= dt;
            if (this.time <= 0.0) {
                this.time = 0;
            }
            var curTime = Math.floor(this.time);
            if (this.timeLabel.time !== curTime) {
                this.timeLabel.string = "time:" + curTime + "s";
                this.timeLabel.time = curTime;
            }
        }
    },
    // called every frame
    update: function update(dt) {
        if (this.isGameOver !== true) {
            this.gameRunning(dt);
        }
    },
    gameRunning: function gameRunning(dt) {
        this.countdown(dt);
        if (this.time <= 0) {
            this.isGameOver = true;
            this.gameOver();
            console.log("gameover");
            return;
        }
        //字母生成 2秒钟生成一次
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
                    var bullet = this.createBullet();
                    letter.setLock(bullet);
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
//
var STATE = { NORMAR: 1, DANGER: 2 };
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
        this.bullet = null;
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
        this.state = STATE.NORMAR;
    },
    destroyPick: function destroyPick() {
        this.game.addScore(this.level);
        this.node.destroy();
    },
    destroyLose: function destroyLose() {
        this.node.destroy();
    },

    doPickAction: function doPickAction() {
        var scale = cc.scaleTo(0.05, 2);
        var callback = cc.callFunc(this.destroyPick, this);
        this.node.runAction(cc.sequence(scale, callback));
        this.enable = false;
        this.game.removeLetter(this);
        this.destoryBullet();
    },
    doLoseAction: function doLoseAction() {
        var scale = cc.scaleTo(0.05, 0.1);
        var callback = cc.callFunc(this.destroyLose, this);
        this.node.runAction(cc.sequence(scale, callback));
        this.enable = false;
        this.game.removeLetter(this);
        this.destoryBullet();
    },
    isPick: function isPick(keyCode) {
        return this.letKeyCode == keyCode;
    },
    setLock: function setLock(bullet) //被子弹锁定
    {
        this.bullet = bullet;
    },
    destoryBullet: function destoryBullet() {
        if (this.bullet !== null) {
            this.bullet.destory();
            this.bullet = null;
        }
    },
    setState: function setState(state) {
        if (this.state !== state) {
            switch (state) {
                case STATE.NORMAR:
                    break;
                case STATE.DANGER:
                    this.node.runAction(cc.blink(2, 10));
                    break;
            }
            this.state = state;
        }
    },
    checkDangerous: function checkDangerous() {
        if (this.state === STATE.NORMAR) {
            if (this.node.y < -200) {
                this.setState(STATE.DANGER);
            }
        }
    },
    update: function update(dt) {
        if (this.enable === true) {
            // console.log("this letKeyCode:" + this.letKeyCode +"  keyCode:"+this.game.keyCode);
            this.node.y = this.node.y - this.speed;
            if (this.node.y < -320) {
                this.doLoseAction();
                return;
            }
            this.checkDangerous();
            if (this.bullet !== null) {
                if (this.bullet.follow(this.node)) {
                    this.doPickAction();
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9zY3JpcHRzL0FycmF5VXRpbHMuanMiLCJhc3NldHMvc2NyaXB0cy9CdWxsZXQuanMiLCJhc3NldHMvc2NyaXB0cy9Db25zdC5qcyIsImFzc2V0cy9zY3JpcHRzL0dhbWUuanMiLCJhc3NldHMvc2NyaXB0cy9MZXR0ZXIuanMiLCJhc3NldHMvc2NyaXB0cy9QbGF5ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZGNhMGZqN3NTTklMTE9tOHlHM0c2RWwnLCAnQXJyYXlVdGlscycpO1xuLy8gc2NyaXB0c1xcQXJyYXlVdGlscy5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvL+WIoOmZpOaVsOe7hOmHjOeahOWFg+e0oFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBvYmplY3QpIHtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgaWYgKGFycmF5W2luZGV4XSA9PT0gb2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInJlbW92ZT1cIixpbmRleCk7XG4gICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzQ2NDRmMG0yV3RBQllSeStwbjZkT2FHJywgJ0J1bGxldCcpO1xuLy8gc2NyaXB0c1xcQnVsbGV0LmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzcGVlZDogMTBcbiAgICB9LFxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnNwZWVkID0gMzA7XG4gICAgfSxcbiAgICBkZXN0b3J5OiBmdW5jdGlvbiBkZXN0b3J5KCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhpcy5ub2RlOlwiK3RoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIGZvbGxvdzogZnVuY3Rpb24gZm9sbG93KGxldHRlck5vZGUpIHtcbiAgICAgICAgdmFyIHNyY1BvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgdGFyZ2V0UG9zID0gbGV0dGVyTm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgZGlzID0gY2MucERpc3RhbmNlKHRhcmdldFBvcywgc3JjUG9zKTtcbiAgICAgICAgaWYgKGRpcyA+IHRoaXMuc3BlZWQgLyAyKSB7XG4gICAgICAgICAgICB2YXIgdGltZSA9IE1hdGguYWJzKGRpcyAvIHRoaXMuc3BlZWQpO1xuICAgICAgICAgICAgdmFyIHhfZGlzID0gdGFyZ2V0UG9zLnggLSBzcmNQb3MueDtcbiAgICAgICAgICAgIHZhciB5X2RpcyA9IHRhcmdldFBvcy55IC0gc3JjUG9zLnk7XG4gICAgICAgICAgICB2YXIgeF9zcGVlZCA9IHhfZGlzIC8gdGltZTtcbiAgICAgICAgICAgIHZhciB5X3NwZWVkID0geV9kaXMgLyB0aW1lO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnggPSB0aGlzLm5vZGUueCArIHhfc3BlZWQ7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHRoaXMubm9kZS55ICsgeV9zcGVlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzhlNDQ0UU5nZWxBbXBqc3hoWGJLU0hHJywgJ0NvbnN0Jyk7XG4vLyBzY3JpcHRzXFxDb25zdC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0U3BlZWRzOiBuZXcgQXJyYXkoMSwgMiwgMywgNCwgNSksXG4gICAgICAgICAgICAgICAgICAgIGtleUNvZGVzOiBuZXcgQXJyYXkoY2MuS0VZLmEsIGNjLktFWS5iLCBjYy5LRVkuYywgY2MuS0VZLmQsIGNjLktFWS5lLCBjYy5LRVkuZiwgY2MuS0VZLmcsIGNjLktFWS5oLCBjYy5LRVkuaSwgY2MuS0VZLmosIGNjLktFWS5rLCBjYy5LRVkubCwgY2MuS0VZLm0sIGNjLktFWS5uLCBjYy5LRVkubywgY2MuS0VZLnAsIGNjLktFWS5xLCBjYy5LRVkuciwgY2MuS0VZLnMsIGNjLktFWS50LCBjYy5LRVkudSwgY2MuS0VZLnYsIGNjLktFWS53LCBjYy5LRVkueCwgY2MuS0VZLnksIGNjLktFWS56KSxcbiAgICAgICAgICAgICAgICAgICAga2V5TWFwOiB7fVxuXG59O1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5hXSA9IFwiQVwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5iXSA9IFwiQlwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5jXSA9IFwiQ1wiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5kXSA9IFwiRFwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5lXSA9IFwiRVwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5mXSA9IFwiRlwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5nXSA9IFwiR1wiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5oXSA9IFwiSFwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5pXSA9IFwiSVwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5qXSA9IFwiSlwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5rXSA9IFwiS1wiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5sXSA9IFwiTFwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5tXSA9IFwiTVwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5uXSA9IFwiTlwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5vXSA9IFwiT1wiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5wXSA9IFwiUFwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5xXSA9IFwiUVwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5yXSA9IFwiUlwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS5zXSA9IFwiU1wiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS50XSA9IFwiVFwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS51XSA9IFwiVVwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS52XSA9IFwiVlwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS53XSA9IFwiV1wiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS54XSA9IFwiWFwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS55XSA9IFwiWVwiO1xubW9kdWxlLmV4cG9ydHMua2V5TWFwW2NjLktFWS56XSA9IFwiWlwiO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNGUxMmZMU1F1MUwrS1Y2UW14RGlhdlUnLCAnR2FtZScpO1xuLy8gc2NyaXB0c1xcR2FtZS5qc1xuXG52YXIgQ29uc3QgPSByZXF1aXJlKFwiQ29uc3RcIik7XG52YXIgQXJyYXlVdGlscyA9IHJlcXVpcmUoXCJBcnJheVV0aWxzXCIpO1xuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxldHRlclByZWZhYjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgYnVsbGV0UHJlZmFiOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICAvLyDlnLDpnaLoioLngrnvvIznlKjkuo7noa7lrprmmJ/mmJ/nlJ/miJDnmoTpq5jluqZcbiAgICAgICAgZ3JvdW5kOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgLy8gcGxheWVyIOiKgueCue+8jOeUqOS6juiOt+WPluS4u+inkuW8uei3s+eahOmrmOW6pu+8jOWSjOaOp+WItuS4u+inkuihjOWKqOW8gOWFs1xuICAgICAgICBwbGF5ZXI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICAvLyBzY29yZSBsYWJlbCDnmoTlvJXnlKhcbiAgICAgICAgc2NvcmVEaXNwbGF5OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOaXtumXtCBsYWJlbCDnmoTlvJXnlKhcbiAgICAgICAgdGltZUxhYmVsOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOW+l+WIhumfs+aViOi1hOa6kFxuICAgICAgICBzY29yZUF1ZGlvOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOaXtumXtCBsYWJlbCDnmoTlvJXnlKhcbiAgICAgICAgZ2FtZU92ZXJOb2RlOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnRCdXR0b246IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcblxuICAgICAgICB0aGlzLnRpbWUgPSAzMDtcbiAgICAgICAgLy8g5Yid5aeL5YyW6K6h5pe25ZmoXG4gICAgICAgIHRoaXMudGltZXIgPSAyLjA7XG4gICAgICAgIC8vIOWIneWni+WMluiuoeWIhlxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5rZXlDb2RlID0gMDtcbiAgICAgICAgLy/lop7liqDmjInpkq7kuovku7ZcbiAgICAgICAgdGhpcy5hZGRLZXlMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmxldHRlckxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5pc0dhbWVPdmVyID0gZmFsc2U7XG4gICAgfSxcbiAgICByYW5kb21LZXlDb2RlOiBmdW5jdGlvbiByYW5kb21LZXlDb2RlKCkge1xuICAgICAgICB2YXIgaW5kZXggPSBNYXRoLmZsb29yKGNjLnJhbmQoKSkgJSBDb25zdC5rZXlDb2Rlcy5sZW5ndGg7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJyYW5kb206XCIrIGluZGV4KSAgO1xuICAgICAgICByZXR1cm4gQ29uc3Qua2V5Q29kZXNbaW5kZXhdO1xuICAgIH0sXG5cbiAgICBnZXRTY29yZTogZnVuY3Rpb24gZ2V0U2NvcmUobGV2ZWwpIHtcbiAgICAgICAgc3dpdGNoIChsZXZlbCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxO1xuICAgIH0sXG5cbiAgICBhZGRTY29yZTogZnVuY3Rpb24gYWRkU2NvcmUobGV2ZWwpIHtcbiAgICAgICAgdGhpcy5zY29yZSArPSB0aGlzLmdldFNjb3JlKGxldmVsKTtcbiAgICAgICAgdGhpcy5zY29yZURpc3BsYXkuc3RyaW5nID0gJ1Njb3JlOiAnICsgdGhpcy5zY29yZS50b1N0cmluZygpO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc2NvcmVBdWRpbywgZmFsc2UpO1xuICAgIH0sXG5cbiAgICBnYW1lT3ZlcjogZnVuY3Rpb24gZ2FtZU92ZXIoKSB7XG4gICAgICAgIC8vdGhpcy5wbGF5ZXIuc3RvcEFsbEFjdGlvbnMoKTsgLy/lgZzmraIgcGxheWVyIOiKgueCueeahOi3s+i3g+WKqOS9nFxuXG4gICAgICAgIHRoaXMuZ2FtZU92ZXJOb2RlLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zdGFydEJ1dHRvbi5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5oyJ6ZKu5oyJ5LiLXCIpO1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjcmVhdGVMZXR0ZXI6IGZ1bmN0aW9uIGNyZWF0ZUxldHRlcigpIHtcbiAgICAgICAgLy/nlJ/miJDkuIDkuKrlrZfmr41cbiAgICAgICAgLy8g5L2/55So57uZ5a6a55qE5qih5p2/5Zyo5Zy65pmv5Lit55Sf5oiQ5LiA5Liq5paw6IqC54K5XG4gICAgICAgIHZhciBsZXR0ZXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmxldHRlclByZWZhYik7XG4gICAgICAgIC8v5bCG5paw5aKe55qE6IqC54K55re75Yqg5YiwIENhbnZhcyDoioLngrnkuIvpnaJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGxldHRlcik7XG4gICAgICAgIGxldHRlci5zZXRQb3NpdGlvbih0aGlzLnJhbmRvbUxldHRlclBvc2l0aW9uKCkpO1xuICAgICAgICB2YXIgbGV0Q29tcG9uZW50ID0gbGV0dGVyLmdldENvbXBvbmVudCgnTGV0dGVyJyk7XG4gICAgICAgIGxldENvbXBvbmVudC5pbml0KHRoaXMucmFuZG9tS2V5Q29kZSgpLCAxLCB0aGlzKTtcbiAgICAgICAgdGhpcy5sZXR0ZXJMaXN0LnB1c2gobGV0Q29tcG9uZW50KTtcbiAgICB9LFxuXG4gICAgcmFuZG9tTGV0dGVyUG9zaXRpb246IGZ1bmN0aW9uIHJhbmRvbUxldHRlclBvc2l0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZFggPSBjYy5yYW5kb21NaW51czFUbzEoKSAqICh0aGlzLm5vZGUud2lkdGggLyAyKTtcbiAgICAgICAgcmV0dXJuIGNjLnAocmFuZFgsIHRoaXMubm9kZS5oZWlnaHQgLyAyKTtcbiAgICB9LFxuICAgIGNyZWF0ZUJ1bGxldDogZnVuY3Rpb24gY3JlYXRlQnVsbGV0KCkge1xuICAgICAgICB2YXIgYnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5idWxsZXRQcmVmYWIpO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoYnVsbGV0KTtcbiAgICAgICAgYnVsbGV0LnNldFBvc2l0aW9uKGNjLnAoMCwgLXRoaXMubm9kZS5oZWlnaHQgLyAyKSk7XG4gICAgICAgIHZhciBidWxsZXRDb21wb25lbnQgPSBidWxsZXQuZ2V0Q29tcG9uZW50KFwiQnVsbGV0XCIpO1xuICAgICAgICByZXR1cm4gYnVsbGV0Q29tcG9uZW50O1xuICAgIH0sXG5cbiAgICBhZGRLZXlMaXN0ZW5lcjogZnVuY3Rpb24gYWRkS2V5TGlzdGVuZXIoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHtcbiAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJELFxuICAgICAgICAgICAgb25LZXlQcmVzc2VkOiBmdW5jdGlvbiBvbktleVByZXNzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmtleUNvZGUgPSBrZXlDb2RlO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkbyBrZXlDb2RlPT09PTpcIitrZXlDb2RlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbktleVJlbGVhc2VkOiBmdW5jdGlvbiBvbktleVJlbGVhc2VkKGtleUNvZGUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5rZXlDb2RlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5ub2RlKTtcbiAgICB9LFxuICAgIGNvdW50ZG93bjogZnVuY3Rpb24gY291bnRkb3duKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUgLT0gZHQ7XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lIDw9IDAuMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY3VyVGltZSA9IE1hdGguZmxvb3IodGhpcy50aW1lKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVMYWJlbC50aW1lICE9PSBjdXJUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID0gXCJ0aW1lOlwiICsgY3VyVGltZSArIFwic1wiO1xuICAgICAgICAgICAgICAgIHRoaXMudGltZUxhYmVsLnRpbWUgPSBjdXJUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy5pc0dhbWVPdmVyICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVSdW5uaW5nKGR0KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2FtZVJ1bm5pbmc6IGZ1bmN0aW9uIGdhbWVSdW5uaW5nKGR0KSB7XG4gICAgICAgIHRoaXMuY291bnRkb3duKGR0KTtcbiAgICAgICAgaWYgKHRoaXMudGltZSA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmlzR2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5nYW1lT3ZlcigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lb3ZlclwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvL+Wtl+avjeeUn+aIkCAy56eS6ZKf55Sf5oiQ5LiA5qyhXG4gICAgICAgIHRoaXMudGltZXIgKz0gZHQ7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyID4gMi4wKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUxldHRlcigpO1xuICAgICAgICAgICAgdGhpcy50aW1lciA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy/mo4Dmn6VcbiAgICAgICAgaWYgKHRoaXMua2V5Q29kZSAhPT0gMCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy5sZXR0ZXJMaXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGxldHRlciA9IHRoaXMubGV0dGVyTGlzdFtpbmRleF07XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImxldHRlcj1cIitsZXR0ZXIpO1xuICAgICAgICAgICAgICAgIGlmIChsZXR0ZXIuaXNQaWNrKHRoaXMua2V5Q29kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGxldCA9IHRoaXMuY3JlYXRlQnVsbGV0KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldHRlci5zZXRMb2NrKGJ1bGxldCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleUNvZGUgPSAwO1xuICAgIH0sXG4gICAgcmVtb3ZlTGV0dGVyOiBmdW5jdGlvbiByZW1vdmVMZXR0ZXIobGV0dGVyKSB7XG4gICAgICAgIEFycmF5VXRpbHMucmVtb3ZlKHRoaXMubGV0dGVyTGlzdCwgbGV0dGVyKTtcbiAgICB9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnODA3ZjgzZmk0bEE0YjFnNFY3aHVBUUUnLCAnTGV0dGVyJyk7XG4vLyBzY3JpcHRzXFxMZXR0ZXIuanNcblxuXG52YXIgQ29uc3QgPSByZXF1aXJlKFwiQ29uc3RcIik7XG4vL1xudmFyIFNUQVRFID0geyBOT1JNQVI6IDEsIERBTkdFUjogMiB9O1xuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxldHRlckxhYmVsOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmxldEtleUNvZGUgPSAtMTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IDE7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAxO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuYnVsbGV0ID0gbnVsbDtcbiAgICB9LFxuICAgIGdldExldHRlcjogZnVuY3Rpb24gZ2V0TGV0dGVyKGtleUNvZGUpIHtcbiAgICAgICAgcmV0dXJuIENvbnN0LmtleU1hcFtrZXlDb2RlXTtcbiAgICB9LFxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoa2V5Q29kZSwgbGV2ZWwsIGdhbWUpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImtleUNvZGU9PT09PT09OlwiLGtleUNvZGUpO1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmxldEtleUNvZGUgPSBrZXlDb2RlO1xuICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sZXR0ZXJMYWJlbC5zdHJpbmcgPSB0aGlzLmdldExldHRlcih0aGlzLmxldEtleUNvZGUpO1xuICAgICAgICB0aGlzLnNwZWVkID0gQ29uc3QubGV0U3BlZWRzW3RoaXMubGV2ZWwgLSAxXTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFLk5PUk1BUjtcbiAgICB9LFxuICAgIGRlc3Ryb3lQaWNrOiBmdW5jdGlvbiBkZXN0cm95UGljaygpIHtcbiAgICAgICAgdGhpcy5nYW1lLmFkZFNjb3JlKHRoaXMubGV2ZWwpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgZGVzdHJveUxvc2U6IGZ1bmN0aW9uIGRlc3Ryb3lMb3NlKCkge1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICBkb1BpY2tBY3Rpb246IGZ1bmN0aW9uIGRvUGlja0FjdGlvbigpIHtcbiAgICAgICAgdmFyIHNjYWxlID0gY2Muc2NhbGVUbygwLjA1LCAyKTtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gY2MuY2FsbEZ1bmModGhpcy5kZXN0cm95UGljaywgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2Uoc2NhbGUsIGNhbGxiYWNrKSk7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2FtZS5yZW1vdmVMZXR0ZXIodGhpcyk7XG4gICAgICAgIHRoaXMuZGVzdG9yeUJ1bGxldCgpO1xuICAgIH0sXG4gICAgZG9Mb3NlQWN0aW9uOiBmdW5jdGlvbiBkb0xvc2VBY3Rpb24oKSB7XG4gICAgICAgIHZhciBzY2FsZSA9IGNjLnNjYWxlVG8oMC4wNSwgMC4xKTtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gY2MuY2FsbEZ1bmModGhpcy5kZXN0cm95TG9zZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2Uoc2NhbGUsIGNhbGxiYWNrKSk7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2FtZS5yZW1vdmVMZXR0ZXIodGhpcyk7XG4gICAgICAgIHRoaXMuZGVzdG9yeUJ1bGxldCgpO1xuICAgIH0sXG4gICAgaXNQaWNrOiBmdW5jdGlvbiBpc1BpY2soa2V5Q29kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5sZXRLZXlDb2RlID09IGtleUNvZGU7XG4gICAgfSxcbiAgICBzZXRMb2NrOiBmdW5jdGlvbiBzZXRMb2NrKGJ1bGxldCkgLy/ooqvlrZDlvLnplIHlrppcbiAgICB7XG4gICAgICAgIHRoaXMuYnVsbGV0ID0gYnVsbGV0O1xuICAgIH0sXG4gICAgZGVzdG9yeUJ1bGxldDogZnVuY3Rpb24gZGVzdG9yeUJ1bGxldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYnVsbGV0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmJ1bGxldC5kZXN0b3J5KCk7XG4gICAgICAgICAgICB0aGlzLmJ1bGxldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNldFN0YXRlOiBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gc3RhdGUpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFNUQVRFLk5PUk1BUjpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURS5EQU5HRVI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MuYmxpbmsoMiwgMTApKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNoZWNrRGFuZ2Vyb3VzOiBmdW5jdGlvbiBjaGVja0Rhbmdlcm91cygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IFNUQVRFLk5PUk1BUikge1xuICAgICAgICAgICAgaWYgKHRoaXMubm9kZS55IDwgLTIwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU1RBVEUuREFOR0VSKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRoaXMgbGV0S2V5Q29kZTpcIiArIHRoaXMubGV0S2V5Q29kZSArXCIgIGtleUNvZGU6XCIrdGhpcy5nYW1lLmtleUNvZGUpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSB0aGlzLm5vZGUueSAtIHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlLnkgPCAtMzIwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0xvc2VBY3Rpb24oKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoZWNrRGFuZ2Vyb3VzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5idWxsZXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idWxsZXQuZm9sbG93KHRoaXMubm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb1BpY2tBY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzZjNjg4djcyUWRPS2FtQ0dDVCt4YUFkJywgJ1BsYXllcicpO1xuLy8gc2NyaXB0c1xcUGxheWVyLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyDkuLvop5Lot7Pot4Ppq5jluqZcbiAgICAgICAganVtcEhlaWdodDogMCxcbiAgICAgICAgLy8g5Li76KeS6Lez6LeD5oyB57ut5pe26Ze0XG4gICAgICAgIGp1bXBEdXJhdGlvbjogMCxcbiAgICAgICAgLy8g5pyA5aSn56e75Yqo6YCf5bqmXG4gICAgICAgIG1heE1vdmVTcGVlZDogMCxcbiAgICAgICAgLy8g5Yqg6YCf5bqmXG4gICAgICAgIGFjY2VsOiAwLFxuICAgICAgICAvLyDot7Pot4Ppn7PmlYjotYTmupBcbiAgICAgICAganVtcEF1ZGlvOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0SnVtcEFjdGlvbjogZnVuY3Rpb24gc2V0SnVtcEFjdGlvbigpIHtcbiAgICAgICAgLy8g6Lez6LeD5LiK5Y2HXG4gICAgICAgIHZhciBqdW1wVXAgPSBjYy5tb3ZlQnkodGhpcy5qdW1wRHVyYXRpb24sIGNjLnAoMCwgdGhpcy5qdW1wSGVpZ2h0KSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKTtcbiAgICAgICAgLy8g5LiL6JC9XG4gICAgICAgIHZhciBqdW1wRG93biA9IGNjLm1vdmVCeSh0aGlzLmp1bXBEdXJhdGlvbiwgY2MucCgwLCAtdGhpcy5qdW1wSGVpZ2h0KSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpO1xuICAgICAgICAvLyDmt7vliqDkuIDkuKrlm57osIPlh73mlbDvvIznlKjkuo7lnKjliqjkvZznu5PmnZ/ml7bosIPnlKjmiJHku6zlrprkuYnnmoTlhbbku5bmlrnms5VcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gY2MuY2FsbEZ1bmModGhpcy5wbGF5SnVtcFNvdW5kLCB0aGlzKTtcbiAgICAgICAgLy8g5LiN5pat6YeN5aSN77yM6ICM5LiU5q+P5qyh5a6M5oiQ6JC95Zyw5Yqo5L2c5ZCO6LCD55So5Zue6LCD5p2l5pKt5pS+5aOw6Z+zXG4gICAgICAgIHJldHVybiBjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGp1bXBVcCwganVtcERvd24sIGNhbGxiYWNrKSk7XG4gICAgfSxcblxuICAgIHBsYXlKdW1wU291bmQ6IGZ1bmN0aW9uIHBsYXlKdW1wU291bmQoKSB7XG4gICAgICAgIC8vIOiwg+eUqOWjsOmfs+W8leaTjuaSreaUvuWjsOmfs1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuanVtcEF1ZGlvLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIHNldElucHV0Q29udHJvbDogZnVuY3Rpb24gc2V0SW5wdXRDb250cm9sKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vYWRkIGtleWJvYXJkIGlucHV0IGxpc3RlbmVyIHRvIGp1bXAsIHR1cm5MZWZ0IGFuZCB0dXJuUmlnaHRcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHtcbiAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJELFxuICAgICAgICAgICAgLy8gc2V0IGEgZmxhZyB3aGVuIGtleSBwcmVzc2VkXG4gICAgICAgICAgICBvbktleVByZXNzZWQ6IGZ1bmN0aW9uIG9uS2V5UHJlc3NlZChrZXlDb2RlLCBldmVudCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5hOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5kOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NMZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyB1bnNldCBhIGZsYWcgd2hlbiBrZXkgcmVsZWFzZWRcbiAgICAgICAgICAgIG9uS2V5UmVsZWFzZWQ6IGZ1bmN0aW9uIG9uS2V5UmVsZWFzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuYTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLmQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNlbGYubm9kZSk7XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICAvLyDliJ3lp4vljJbot7Pot4PliqjkvZxcbiAgICAgICAgdGhpcy5qdW1wQWN0aW9uID0gdGhpcy5zZXRKdW1wQWN0aW9uKCk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24odGhpcy5qdW1wQWN0aW9uKTtcblxuICAgICAgICAvLyDliqDpgJ/luqbmlrnlkJHlvIDlhbNcbiAgICAgICAgdGhpcy5hY2NMZWZ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWNjUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgLy8g5Li76KeS5b2T5YmN5rC05bmz5pa55ZCR6YCf5bqmXG4gICAgICAgIHRoaXMueFNwZWVkID0gMDtcblxuICAgICAgICAvLyDliJ3lp4vljJbplK7nm5jovpPlhaXnm5HlkKxcbiAgICAgICAgdGhpcy5zZXRJbnB1dENvbnRyb2woKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgLy8g5qC55o2u5b2T5YmN5Yqg6YCf5bqm5pa55ZCR5q+P5bin5pu05paw6YCf5bqmXG4gICAgICAgIGlmICh0aGlzLmFjY0xlZnQpIHtcbiAgICAgICAgICAgIHRoaXMueFNwZWVkIC09IHRoaXMuYWNjZWwgKiBkdDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFjY1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnhTcGVlZCArPSB0aGlzLmFjY2VsICogZHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6ZmQ5Yi25Li76KeS55qE6YCf5bqm5LiN6IO96LaF6L+H5pyA5aSn5YC8XG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnhTcGVlZCkgPiB0aGlzLm1heE1vdmVTcGVlZCkge1xuICAgICAgICAgICAgLy8gaWYgc3BlZWQgcmVhY2ggbGltaXQsIHVzZSBtYXggc3BlZWQgd2l0aCBjdXJyZW50IGRpcmVjdGlvblxuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSB0aGlzLm1heE1vdmVTcGVlZCAqIHRoaXMueFNwZWVkIC8gTWF0aC5hYnModGhpcy54U3BlZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5qC55o2u5b2T5YmN6YCf5bqm5pu05paw5Li76KeS55qE5L2N572uXG4gICAgICAgIHRoaXMubm9kZS54ICs9IHRoaXMueFNwZWVkICogZHQ7XG4gICAgICAgIGlmICh0aGlzLm5vZGUueCA8IC00ODApIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS54ID0gNDgwO1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm9kZS54ID4gNDgwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IC00ODA7XG4gICAgICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7Il19
