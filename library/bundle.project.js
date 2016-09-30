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
                    letSpeeds: new Array(1, 4, 8, 4, 5),
                    keyCodes: new Array(cc.KEY.a, cc.KEY.b, cc.KEY.c, cc.KEY.d, cc.KEY.e, cc.KEY.f, cc.KEY.g, cc.KEY.h, cc.KEY.i, cc.KEY.j, cc.KEY.k, cc.KEY.l, cc.KEY.m, cc.KEY.n, cc.KEY.o, cc.KEY.p, cc.KEY.q, cc.KEY.r, cc.KEY.s, cc.KEY.t, cc.KEY.u, cc.KEY.v, cc.KEY.w, cc.KEY.x, cc.KEY.y, cc.KEY.z),
                    keyMap: {},
                    intervals: [2, 2, 1, 0.5]

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
},{}],"GameData":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a422cpnxwNIL4PQQ6EkfZoy', 'GameData');
// scripts\GameData.js

module.exports = {
    level: 1
};

cc._RFpop();
},{}],"Game":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game');
// scripts\Game.js

var Const = require("Const");
var ArrayUtils = require("ArrayUtils");
var GameData = require("GameData");
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
        levelLabel: {
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
        againButton: {
            "default": null,
            type: cc.Button
        },
        backButton: {
            "default": null,
            type: cc.Button
        }

    },

    // use this for initialization
    onLoad: function onLoad() {

        this.time = 60;
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
        this.level = GameData.level;
        this.interval = Const.intervals[this.level];
        this.levelLabel.string = 'Level:' + this.level;
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

        this.gameOverNode.active = true;
        this.againButton.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.director.loadScene('game');
        });
        this.backButton.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.director.loadScene('menu');
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
        var level = this.randomLetterLevel();
        letComponent.init(this.randomKeyCode(), level, this);
        this.letterList.push(letComponent);
    },
    randomLetterLevel: function randomLetterLevel() {
        var arrays = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 1], [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1]];
        var array = arrays[this.level - 1];

        return array[Math.floor(cc.rand()) % array.length];
    },

    randomLetterPosition: function randomLetterPosition() {
        var randX = cc.randomMinus1To1() * (this.node.width / 2 - 10);
        return cc.p(randX, this.node.height / 2);
    },
    createBullet: function createBullet() {
        var bullet = cc.instantiate(this.bulletPrefab);
        this.node.addChild(bullet);
        bullet.setPosition(cc.p(0, -this.node.height / 2));
        var bulletComponent = bullet.getComponent("Bullet");
        return bulletComponent;
    },
    hitTest: function hitTest(position) {
        if (this.isGameOver !== true) {
            for (var index in this.letterList) {
                var letter = this.letterList[index];
                //console.log("letter="+letter);
                if (letter.hitTest(position)) {
                    var bullet = this.createBullet();
                    letter.setLock(bullet);
                    break;
                }
            }
        }
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

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            //console.log("xxxxxxxxxxxxxxxx"+event);
            var position = event.getLocation();
            position = self.node.convertToNodeSpaceAR(position);
            cc.log("点击全局坐标： ", position.x, position.y);
            self.hitTest(position);
        });
    },
    countdown: function countdown(dt) {
        if (this.time > 0) {
            this.time -= dt;
            if (this.time <= 0.0) {
                this.time = 0;
            }
            var curTime = Math.floor(this.time);
            if (this.timeLabel.time !== curTime) {
                this.timeLabel.string = 'Time:' + curTime + 's';
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
        if (this.timer > this.interval) {
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
            this.keyCode = 0;
        }
    },
    removeLetter: function removeLetter(letter) {
        ArrayUtils.remove(this.letterList, letter);
    }

});

cc._RFpop();
},{"ArrayUtils":"ArrayUtils","Const":"Const","GameData":"GameData"}],"Letter":[function(require,module,exports){
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
        if (this.bullet !== null) {
            return false;
        }
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
    hitTest: function hitTest(position) {
        if (this.bullet !== null) {
            return false;
        }
        var dis = cc.pDistance(position, this.node.getPosition());
        return dis <= 20.0;
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
},{"Const":"Const"}],"Menu":[function(require,module,exports){
"use strict";
cc._RFpush(module, '478d3sqDERC/6PNFesl6JLh', 'Menu');
// scripts\Menu.js

var GameData = require("GameData");
cc.Class({
    "extends": cc.Component,

    properties: {
        btnEasy: {
            "default": null,
            type: cc.Button
        },
        btnNormal: {
            "default": null,
            type: cc.Button
        },
        btnHard: {
            "default": null,
            type: cc.Button
        }
    },
    startGame: function startGame(level) {
        GameData.level = level;
        cc.director.loadScene('game');
    },

    onLoad: function onLoad() {
        var self = this;
        this.btnEasy.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.startGame(1);
        });
        this.btnNormal.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.startGame(2);
        });
        this.btnHard.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.startGame(3);
        });
    }
});

cc._RFpop();
},{"GameData":"GameData"}],"Player":[function(require,module,exports){
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
},{}]},{},["Bullet","Menu","Game","Player","Letter","Const","GameData","ArrayUtils"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9zY3JpcHRzL0FycmF5VXRpbHMuanMiLCJhc3NldHMvc2NyaXB0cy9CdWxsZXQuanMiLCJhc3NldHMvc2NyaXB0cy9Db25zdC5qcyIsImFzc2V0cy9zY3JpcHRzL0dhbWVEYXRhLmpzIiwiYXNzZXRzL3NjcmlwdHMvR2FtZS5qcyIsImFzc2V0cy9zY3JpcHRzL0xldHRlci5qcyIsImFzc2V0cy9zY3JpcHRzL01lbnUuanMiLCJhc3NldHMvc2NyaXB0cy9QbGF5ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdkY2EwZmo3c1NOSUxMT204eUczRzZFbCcsICdBcnJheVV0aWxzJyk7XG4vLyBzY3JpcHRzXFxBcnJheVV0aWxzLmpzXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8v5Yig6Zmk5pWw57uE6YeM55qE5YWD57SgXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoYXJyYXksIG9iamVjdCkge1xuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBpZiAoYXJyYXlbaW5kZXhdID09PSBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicmVtb3ZlPVwiLGluZGV4KTtcbiAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59O1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNDY0NGYwbTJXdEFCWVJ5K3BuNmRPYUcnLCAnQnVsbGV0Jyk7XG4vLyBzY3JpcHRzXFxCdWxsZXQuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNwZWVkOiAxMFxuICAgIH0sXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAzMDtcbiAgICB9LFxuICAgIGRlc3Rvcnk6IGZ1bmN0aW9uIGRlc3RvcnkoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGlzLm5vZGU6XCIrdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZm9sbG93OiBmdW5jdGlvbiBmb2xsb3cobGV0dGVyTm9kZSkge1xuICAgICAgICB2YXIgc3JjUG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIHZhciB0YXJnZXRQb3MgPSBsZXR0ZXJOb2RlLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBkaXMgPSBjYy5wRGlzdGFuY2UodGFyZ2V0UG9zLCBzcmNQb3MpO1xuICAgICAgICBpZiAoZGlzID4gdGhpcy5zcGVlZCAvIDIpIHtcbiAgICAgICAgICAgIHZhciB0aW1lID0gTWF0aC5hYnMoZGlzIC8gdGhpcy5zcGVlZCk7XG4gICAgICAgICAgICB2YXIgeF9kaXMgPSB0YXJnZXRQb3MueCAtIHNyY1Bvcy54O1xuICAgICAgICAgICAgdmFyIHlfZGlzID0gdGFyZ2V0UG9zLnkgLSBzcmNQb3MueTtcbiAgICAgICAgICAgIHZhciB4X3NwZWVkID0geF9kaXMgLyB0aW1lO1xuICAgICAgICAgICAgdmFyIHlfc3BlZWQgPSB5X2RpcyAvIHRpbWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IHRoaXMubm9kZS54ICsgeF9zcGVlZDtcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gdGhpcy5ub2RlLnkgKyB5X3NwZWVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnOGU0NDRRTmdlbEFtcGpzeGhYYktTSEcnLCAnQ29uc3QnKTtcbi8vIHNjcmlwdHNcXENvbnN0LmpzXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgICAgICAgICAgICAgICBsZXRTcGVlZHM6IG5ldyBBcnJheSgxLCA0LCA4LCA0LCA1KSxcbiAgICAgICAgICAgICAgICAgICAga2V5Q29kZXM6IG5ldyBBcnJheShjYy5LRVkuYSwgY2MuS0VZLmIsIGNjLktFWS5jLCBjYy5LRVkuZCwgY2MuS0VZLmUsIGNjLktFWS5mLCBjYy5LRVkuZywgY2MuS0VZLmgsIGNjLktFWS5pLCBjYy5LRVkuaiwgY2MuS0VZLmssIGNjLktFWS5sLCBjYy5LRVkubSwgY2MuS0VZLm4sIGNjLktFWS5vLCBjYy5LRVkucCwgY2MuS0VZLnEsIGNjLktFWS5yLCBjYy5LRVkucywgY2MuS0VZLnQsIGNjLktFWS51LCBjYy5LRVkudiwgY2MuS0VZLncsIGNjLktFWS54LCBjYy5LRVkueSwgY2MuS0VZLnopLFxuICAgICAgICAgICAgICAgICAgICBrZXlNYXA6IHt9LFxuICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbHM6IFsyLCAyLCAxLCAwLjVdXG5cbn07XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmFdID0gXCJBXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmJdID0gXCJCXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmNdID0gXCJDXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmRdID0gXCJEXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmVdID0gXCJFXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmZdID0gXCJGXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmddID0gXCJHXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmhdID0gXCJIXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmldID0gXCJJXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmpdID0gXCJKXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmtdID0gXCJLXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLmxdID0gXCJMXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLm1dID0gXCJNXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLm5dID0gXCJOXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLm9dID0gXCJPXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnBdID0gXCJQXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnFdID0gXCJRXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnJdID0gXCJSXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnNdID0gXCJTXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnRdID0gXCJUXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnVdID0gXCJVXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnZdID0gXCJWXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnddID0gXCJXXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnhdID0gXCJYXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnldID0gXCJZXCI7XG5tb2R1bGUuZXhwb3J0cy5rZXlNYXBbY2MuS0VZLnpdID0gXCJaXCI7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdhNDIyY3BueHdOSUw0UFFRNkVrZlpveScsICdHYW1lRGF0YScpO1xuLy8gc2NyaXB0c1xcR2FtZURhdGEuanNcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbGV2ZWw6IDFcbn07XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc0ZTEyZkxTUXUxTCtLVjZRbXhEaWF2VScsICdHYW1lJyk7XG4vLyBzY3JpcHRzXFxHYW1lLmpzXG5cbnZhciBDb25zdCA9IHJlcXVpcmUoXCJDb25zdFwiKTtcbnZhciBBcnJheVV0aWxzID0gcmVxdWlyZShcIkFycmF5VXRpbHNcIik7XG52YXIgR2FtZURhdGEgPSByZXF1aXJlKFwiR2FtZURhdGFcIik7XG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGV0dGVyUHJlZmFiOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICBidWxsZXRQcmVmYWI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOWcsOmdouiKgueCue+8jOeUqOS6juehruWumuaYn+aYn+eUn+aIkOeahOmrmOW6plxuICAgICAgICBncm91bmQ6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICAvLyBwbGF5ZXIg6IqC54K577yM55So5LqO6I635Y+W5Li76KeS5by56Lez55qE6auY5bqm77yM5ZKM5o6n5Yi25Li76KeS6KGM5Yqo5byA5YWzXG4gICAgICAgIHBsYXllcjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHNjb3JlIGxhYmVsIOeahOW8leeUqFxuICAgICAgICBzY29yZURpc3BsYXk6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5pe26Ze0IGxhYmVsIOeahOW8leeUqFxuICAgICAgICB0aW1lTGFiZWw6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgbGV2ZWxMYWJlbDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICAvLyDlvpfliIbpn7PmlYjotYTmupBcbiAgICAgICAgc2NvcmVBdWRpbzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICAvLyDml7bpl7QgbGFiZWwg55qE5byV55SoXG4gICAgICAgIGdhbWVPdmVyTm9kZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGFnYWluQnV0dG9uOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvblxuICAgICAgICB9LFxuICAgICAgICBiYWNrQnV0dG9uOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG5cbiAgICAgICAgdGhpcy50aW1lID0gNjA7XG4gICAgICAgIC8vIOWIneWni+WMluiuoeaXtuWZqFxuICAgICAgICB0aGlzLnRpbWVyID0gMi4wO1xuICAgICAgICAvLyDliJ3lp4vljJborqHliIZcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIC8vXG4gICAgICAgIHRoaXMua2V5Q29kZSA9IDA7XG4gICAgICAgIC8v5aKe5Yqg5oyJ6ZKu5LqL5Lu2XG4gICAgICAgIHRoaXMuYWRkS2V5TGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5sZXR0ZXJMaXN0ID0gW107XG4gICAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxldmVsID0gR2FtZURhdGEubGV2ZWw7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBDb25zdC5pbnRlcnZhbHNbdGhpcy5sZXZlbF07XG4gICAgICAgIHRoaXMubGV2ZWxMYWJlbC5zdHJpbmcgPSAnTGV2ZWw6JyArIHRoaXMubGV2ZWw7XG4gICAgfSxcbiAgICByYW5kb21LZXlDb2RlOiBmdW5jdGlvbiByYW5kb21LZXlDb2RlKCkge1xuICAgICAgICB2YXIgaW5kZXggPSBNYXRoLmZsb29yKGNjLnJhbmQoKSkgJSBDb25zdC5rZXlDb2Rlcy5sZW5ndGg7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJyYW5kb206XCIrIGluZGV4KSAgO1xuICAgICAgICByZXR1cm4gQ29uc3Qua2V5Q29kZXNbaW5kZXhdO1xuICAgIH0sXG5cbiAgICBnZXRTY29yZTogZnVuY3Rpb24gZ2V0U2NvcmUobGV2ZWwpIHtcbiAgICAgICAgc3dpdGNoIChsZXZlbCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxO1xuICAgIH0sXG5cbiAgICBhZGRTY29yZTogZnVuY3Rpb24gYWRkU2NvcmUobGV2ZWwpIHtcbiAgICAgICAgdGhpcy5zY29yZSArPSB0aGlzLmdldFNjb3JlKGxldmVsKTtcbiAgICAgICAgdGhpcy5zY29yZURpc3BsYXkuc3RyaW5nID0gJ1Njb3JlOiAnICsgdGhpcy5zY29yZS50b1N0cmluZygpO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuc2NvcmVBdWRpbywgZmFsc2UpO1xuICAgIH0sXG5cbiAgICBnYW1lT3ZlcjogZnVuY3Rpb24gZ2FtZU92ZXIoKSB7XG5cbiAgICAgICAgdGhpcy5nYW1lT3Zlck5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZ2FpbkJ1dHRvbi5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYmFja0J1dHRvbi5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ21lbnUnKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNyZWF0ZUxldHRlcjogZnVuY3Rpb24gY3JlYXRlTGV0dGVyKCkge1xuICAgICAgICAvL+eUn+aIkOS4gOS4quWtl+avjVxuICAgICAgICAvLyDkvb/nlKjnu5nlrprnmoTmqKHmnb/lnKjlnLrmma/kuK3nlJ/miJDkuIDkuKrmlrDoioLngrlcbiAgICAgICAgdmFyIGxldHRlciA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGV0dGVyUHJlZmFiKTtcbiAgICAgICAgLy/lsIbmlrDlop7nmoToioLngrnmt7vliqDliLAgQ2FudmFzIOiKgueCueS4i+mdolxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobGV0dGVyKTtcbiAgICAgICAgbGV0dGVyLnNldFBvc2l0aW9uKHRoaXMucmFuZG9tTGV0dGVyUG9zaXRpb24oKSk7XG4gICAgICAgIHZhciBsZXRDb21wb25lbnQgPSBsZXR0ZXIuZ2V0Q29tcG9uZW50KCdMZXR0ZXInKTtcbiAgICAgICAgdmFyIGxldmVsID0gdGhpcy5yYW5kb21MZXR0ZXJMZXZlbCgpO1xuICAgICAgICBsZXRDb21wb25lbnQuaW5pdCh0aGlzLnJhbmRvbUtleUNvZGUoKSwgbGV2ZWwsIHRoaXMpO1xuICAgICAgICB0aGlzLmxldHRlckxpc3QucHVzaChsZXRDb21wb25lbnQpO1xuICAgIH0sXG4gICAgcmFuZG9tTGV0dGVyTGV2ZWw6IGZ1bmN0aW9uIHJhbmRvbUxldHRlckxldmVsKCkge1xuICAgICAgICB2YXIgYXJyYXlzID0gW1sxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAyLCAyLCAzXSwgWzIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDIsIDMsIDMsIDFdLCBbMywgMywgMywgMywgMywgMywgMywgMywgMywgMywgMywgMywgMywgMywgMiwgMiwgMV1dO1xuICAgICAgICB2YXIgYXJyYXkgPSBhcnJheXNbdGhpcy5sZXZlbCAtIDFdO1xuXG4gICAgICAgIHJldHVybiBhcnJheVtNYXRoLmZsb29yKGNjLnJhbmQoKSkgJSBhcnJheS5sZW5ndGhdO1xuICAgIH0sXG5cbiAgICByYW5kb21MZXR0ZXJQb3NpdGlvbjogZnVuY3Rpb24gcmFuZG9tTGV0dGVyUG9zaXRpb24oKSB7XG4gICAgICAgIHZhciByYW5kWCA9IGNjLnJhbmRvbU1pbnVzMVRvMSgpICogKHRoaXMubm9kZS53aWR0aCAvIDIgLSAxMCk7XG4gICAgICAgIHJldHVybiBjYy5wKHJhbmRYLCB0aGlzLm5vZGUuaGVpZ2h0IC8gMik7XG4gICAgfSxcbiAgICBjcmVhdGVCdWxsZXQ6IGZ1bmN0aW9uIGNyZWF0ZUJ1bGxldCgpIHtcbiAgICAgICAgdmFyIGJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UHJlZmFiKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGJ1bGxldCk7XG4gICAgICAgIGJ1bGxldC5zZXRQb3NpdGlvbihjYy5wKDAsIC10aGlzLm5vZGUuaGVpZ2h0IC8gMikpO1xuICAgICAgICB2YXIgYnVsbGV0Q29tcG9uZW50ID0gYnVsbGV0LmdldENvbXBvbmVudChcIkJ1bGxldFwiKTtcbiAgICAgICAgcmV0dXJuIGJ1bGxldENvbXBvbmVudDtcbiAgICB9LFxuICAgIGhpdFRlc3Q6IGZ1bmN0aW9uIGhpdFRlc3QocG9zaXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuaXNHYW1lT3ZlciAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy5sZXR0ZXJMaXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGxldHRlciA9IHRoaXMubGV0dGVyTGlzdFtpbmRleF07XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImxldHRlcj1cIitsZXR0ZXIpO1xuICAgICAgICAgICAgICAgIGlmIChsZXR0ZXIuaGl0VGVzdChwb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGxldCA9IHRoaXMuY3JlYXRlQnVsbGV0KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldHRlci5zZXRMb2NrKGJ1bGxldCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGRLZXlMaXN0ZW5lcjogZnVuY3Rpb24gYWRkS2V5TGlzdGVuZXIoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHtcbiAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJELFxuICAgICAgICAgICAgb25LZXlQcmVzc2VkOiBmdW5jdGlvbiBvbktleVByZXNzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmtleUNvZGUgPSBrZXlDb2RlO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkbyBrZXlDb2RlPT09PTpcIitrZXlDb2RlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbktleVJlbGVhc2VkOiBmdW5jdGlvbiBvbktleVJlbGVhc2VkKGtleUNvZGUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5rZXlDb2RlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5ub2RlKTtcblxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ4eHh4eHh4eHh4eHh4eHh4XCIrZXZlbnQpO1xuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gc2VsZi5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvc2l0aW9uKTtcbiAgICAgICAgICAgIGNjLmxvZyhcIueCueWHu+WFqOWxgOWdkOagh++8miBcIiwgcG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XG4gICAgICAgICAgICBzZWxmLmhpdFRlc3QocG9zaXRpb24pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNvdW50ZG93bjogZnVuY3Rpb24gY291bnRkb3duKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUgLT0gZHQ7XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lIDw9IDAuMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY3VyVGltZSA9IE1hdGguZmxvb3IodGhpcy50aW1lKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVMYWJlbC50aW1lICE9PSBjdXJUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID0gJ1RpbWU6JyArIGN1clRpbWUgKyAncyc7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lTGFiZWwudGltZSA9IGN1clRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLmlzR2FtZU92ZXIgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZVJ1bm5pbmcoZHQpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnYW1lUnVubmluZzogZnVuY3Rpb24gZ2FtZVJ1bm5pbmcoZHQpIHtcbiAgICAgICAgdGhpcy5jb3VudGRvd24oZHQpO1xuICAgICAgICBpZiAodGhpcy50aW1lIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmdhbWVPdmVyKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWVvdmVyXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8v5a2X5q+N55Sf5oiQIDLnp5Lpkp/nlJ/miJDkuIDmrKFcbiAgICAgICAgdGhpcy50aW1lciArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMudGltZXIgPiB0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUxldHRlcigpO1xuICAgICAgICAgICAgdGhpcy50aW1lciA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy/mo4Dmn6VcbiAgICAgICAgaWYgKHRoaXMua2V5Q29kZSAhPT0gMCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy5sZXR0ZXJMaXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGxldHRlciA9IHRoaXMubGV0dGVyTGlzdFtpbmRleF07XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImxldHRlcj1cIitsZXR0ZXIpO1xuICAgICAgICAgICAgICAgIGlmIChsZXR0ZXIuaXNQaWNrKHRoaXMua2V5Q29kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGxldCA9IHRoaXMuY3JlYXRlQnVsbGV0KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldHRlci5zZXRMb2NrKGJ1bGxldCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMua2V5Q29kZSA9IDA7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZUxldHRlcjogZnVuY3Rpb24gcmVtb3ZlTGV0dGVyKGxldHRlcikge1xuICAgICAgICBBcnJheVV0aWxzLnJlbW92ZSh0aGlzLmxldHRlckxpc3QsIGxldHRlcik7XG4gICAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzgwN2Y4M2ZpNGxBNGIxZzRWN2h1QVFFJywgJ0xldHRlcicpO1xuLy8gc2NyaXB0c1xcTGV0dGVyLmpzXG5cblxudmFyIENvbnN0ID0gcmVxdWlyZShcIkNvbnN0XCIpO1xuLy9cbnZhciBTVEFURSA9IHsgTk9STUFSOiAxLCBEQU5HRVI6IDIgfTtcbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsZXR0ZXJMYWJlbDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9XG4gICAgfSxcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5sZXRLZXlDb2RlID0gLTE7XG4gICAgICAgIHRoaXMubGV2ZWwgPSAxO1xuICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICAgICAgdGhpcy5lbmFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmJ1bGxldCA9IG51bGw7XG4gICAgfSxcbiAgICBnZXRMZXR0ZXI6IGZ1bmN0aW9uIGdldExldHRlcihrZXlDb2RlKSB7XG4gICAgICAgIHJldHVybiBDb25zdC5rZXlNYXBba2V5Q29kZV07XG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGtleUNvZGUsIGxldmVsLCBnYW1lKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJrZXlDb2RlPT09PT09PTpcIixrZXlDb2RlKTtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5sZXRLZXlDb2RlID0ga2V5Q29kZTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMubGV0dGVyTGFiZWwuc3RyaW5nID0gdGhpcy5nZXRMZXR0ZXIodGhpcy5sZXRLZXlDb2RlKTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IENvbnN0LmxldFNwZWVkc1t0aGlzLmxldmVsIC0gMV07XG4gICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURS5OT1JNQVI7XG4gICAgfSxcbiAgICBkZXN0cm95UGljazogZnVuY3Rpb24gZGVzdHJveVBpY2soKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5hZGRTY29yZSh0aGlzLmxldmVsKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIGRlc3Ryb3lMb3NlOiBmdW5jdGlvbiBkZXN0cm95TG9zZSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgZG9QaWNrQWN0aW9uOiBmdW5jdGlvbiBkb1BpY2tBY3Rpb24oKSB7XG4gICAgICAgIHZhciBzY2FsZSA9IGNjLnNjYWxlVG8oMC4wNSwgMik7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNjLmNhbGxGdW5jKHRoaXMuZGVzdHJveVBpY2ssIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKHNjYWxlLCBjYWxsYmFjaykpO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdhbWUucmVtb3ZlTGV0dGVyKHRoaXMpO1xuICAgICAgICB0aGlzLmRlc3RvcnlCdWxsZXQoKTtcbiAgICB9LFxuICAgIGRvTG9zZUFjdGlvbjogZnVuY3Rpb24gZG9Mb3NlQWN0aW9uKCkge1xuICAgICAgICB2YXIgc2NhbGUgPSBjYy5zY2FsZVRvKDAuMDUsIDAuMSk7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNjLmNhbGxGdW5jKHRoaXMuZGVzdHJveUxvc2UsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKHNjYWxlLCBjYWxsYmFjaykpO1xuICAgICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdhbWUucmVtb3ZlTGV0dGVyKHRoaXMpO1xuICAgICAgICB0aGlzLmRlc3RvcnlCdWxsZXQoKTtcbiAgICB9LFxuICAgIGlzUGljazogZnVuY3Rpb24gaXNQaWNrKGtleUNvZGUpIHtcbiAgICAgICAgaWYgKHRoaXMuYnVsbGV0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubGV0S2V5Q29kZSA9PSBrZXlDb2RlO1xuICAgIH0sXG4gICAgc2V0TG9jazogZnVuY3Rpb24gc2V0TG9jayhidWxsZXQpIC8v6KKr5a2Q5by56ZSB5a6aXG4gICAge1xuICAgICAgICB0aGlzLmJ1bGxldCA9IGJ1bGxldDtcbiAgICB9LFxuICAgIGRlc3RvcnlCdWxsZXQ6IGZ1bmN0aW9uIGRlc3RvcnlCdWxsZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmJ1bGxldCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5idWxsZXQuZGVzdG9yeSgpO1xuICAgICAgICAgICAgdGhpcy5idWxsZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzZXRTdGF0ZTogZnVuY3Rpb24gc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IHN0YXRlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBTVEFURS5OT1JNQVI6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU1RBVEUuREFOR0VSOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmJsaW5rKDIsIDEwKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjaGVja0Rhbmdlcm91czogZnVuY3Rpb24gY2hlY2tEYW5nZXJvdXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBTVEFURS5OT1JNQVIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUueSA8IC0yMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKFNUQVRFLkRBTkdFUik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGhpdFRlc3Q6IGZ1bmN0aW9uIGhpdFRlc3QocG9zaXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuYnVsbGV0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRpcyA9IGNjLnBEaXN0YW5jZShwb3NpdGlvbiwgdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4gZGlzIDw9IDIwLjA7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0aGlzIGxldEtleUNvZGU6XCIgKyB0aGlzLmxldEtleUNvZGUgK1wiICBrZXlDb2RlOlwiK3RoaXMuZ2FtZS5rZXlDb2RlKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gdGhpcy5ub2RlLnkgLSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgaWYgKHRoaXMubm9kZS55IDwgLTMyMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Mb3NlQWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGVja0Rhbmdlcm91cygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVsbGV0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVsbGV0LmZvbGxvdyh0aGlzLm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9QaWNrQWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc0NzhkM3NxREVSQy82UE5GZXNsNkpMaCcsICdNZW51Jyk7XG4vLyBzY3JpcHRzXFxNZW51LmpzXG5cbnZhciBHYW1lRGF0YSA9IHJlcXVpcmUoXCJHYW1lRGF0YVwiKTtcbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBidG5FYXN5OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvblxuICAgICAgICB9LFxuICAgICAgICBidG5Ob3JtYWw6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uXG4gICAgICAgIH0sXG4gICAgICAgIGJ0bkhhcmQ6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHN0YXJ0R2FtZTogZnVuY3Rpb24gc3RhcnRHYW1lKGxldmVsKSB7XG4gICAgICAgIEdhbWVEYXRhLmxldmVsID0gbGV2ZWw7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmJ0bkVhc3kubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLnN0YXJ0R2FtZSgxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYnRuTm9ybWFsLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgc2VsZi5zdGFydEdhbWUoMik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJ0bkhhcmQubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLnN0YXJ0R2FtZSgzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc2YzY4OHY3MlFkT0thbUNHQ1QreGFBZCcsICdQbGF5ZXInKTtcbi8vIHNjcmlwdHNcXFBsYXllci5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8g5Li76KeS6Lez6LeD6auY5bqmXG4gICAgICAgIGp1bXBIZWlnaHQ6IDAsXG4gICAgICAgIC8vIOS4u+inkui3s+i3g+aMgee7reaXtumXtFxuICAgICAgICBqdW1wRHVyYXRpb246IDAsXG4gICAgICAgIC8vIOacgOWkp+enu+WKqOmAn+W6plxuICAgICAgICBtYXhNb3ZlU3BlZWQ6IDAsXG4gICAgICAgIC8vIOWKoOmAn+W6plxuICAgICAgICBhY2NlbDogMCxcbiAgICAgICAgLy8g6Lez6LeD6Z+z5pWI6LWE5rqQXG4gICAgICAgIGp1bXBBdWRpbzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldEp1bXBBY3Rpb246IGZ1bmN0aW9uIHNldEp1bXBBY3Rpb24oKSB7XG4gICAgICAgIC8vIOi3s+i3g+S4iuWNh1xuICAgICAgICB2YXIganVtcFVwID0gY2MubW92ZUJ5KHRoaXMuanVtcER1cmF0aW9uLCBjYy5wKDAsIHRoaXMuanVtcEhlaWdodCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSk7XG4gICAgICAgIC8vIOS4i+iQvVxuICAgICAgICB2YXIganVtcERvd24gPSBjYy5tb3ZlQnkodGhpcy5qdW1wRHVyYXRpb24sIGNjLnAoMCwgLXRoaXMuanVtcEhlaWdodCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcbiAgICAgICAgLy8g5re75Yqg5LiA5Liq5Zue6LCD5Ye95pWw77yM55So5LqO5Zyo5Yqo5L2c57uT5p2f5pe26LCD55So5oiR5Lus5a6a5LmJ55qE5YW25LuW5pa55rOVXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNjLmNhbGxGdW5jKHRoaXMucGxheUp1bXBTb3VuZCwgdGhpcyk7XG4gICAgICAgIC8vIOS4jeaWremHjeWkje+8jOiAjOS4lOavj+asoeWujOaIkOiQveWcsOWKqOS9nOWQjuiwg+eUqOWbnuiwg+adpeaSreaUvuWjsOmfs1xuICAgICAgICByZXR1cm4gY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShqdW1wVXAsIGp1bXBEb3duLCBjYWxsYmFjaykpO1xuICAgIH0sXG5cbiAgICBwbGF5SnVtcFNvdW5kOiBmdW5jdGlvbiBwbGF5SnVtcFNvdW5kKCkge1xuICAgICAgICAvLyDosIPnlKjlo7Dpn7PlvJXmk47mkq3mlL7lo7Dpn7NcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmp1bXBBdWRpbywgZmFsc2UpO1xuICAgIH0sXG5cbiAgICBzZXRJbnB1dENvbnRyb2w6IGZ1bmN0aW9uIHNldElucHV0Q29udHJvbCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvL2FkZCBrZXlib2FyZCBpbnB1dCBsaXN0ZW5lciB0byBqdW1wLCB0dXJuTGVmdCBhbmQgdHVyblJpZ2h0XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5LRVlCT0FSRCxcbiAgICAgICAgICAgIC8vIHNldCBhIGZsYWcgd2hlbiBrZXkgcHJlc3NlZFxuICAgICAgICAgICAgb25LZXlQcmVzc2VkOiBmdW5jdGlvbiBvbktleVByZXNzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuYTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjTGVmdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NSaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gdW5zZXQgYSBmbGFnIHdoZW4ga2V5IHJlbGVhc2VkXG4gICAgICAgICAgICBvbktleVJlbGVhc2VkOiBmdW5jdGlvbiBvbktleVJlbGVhc2VkKGtleUNvZGUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLmE6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY0xlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5kOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzZWxmLm5vZGUpO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgLy8g5Yid5aeL5YyW6Lez6LeD5Yqo5L2cXG4gICAgICAgIHRoaXMuanVtcEFjdGlvbiA9IHRoaXMuc2V0SnVtcEFjdGlvbigpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHRoaXMuanVtcEFjdGlvbik7XG5cbiAgICAgICAgLy8g5Yqg6YCf5bqm5pa55ZCR5byA5YWzXG4gICAgICAgIHRoaXMuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgIC8vIOS4u+inkuW9k+WJjeawtOW5s+aWueWQkemAn+W6plxuICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XG5cbiAgICAgICAgLy8g5Yid5aeL5YyW6ZSu55uY6L6T5YWl55uR5ZCsXG4gICAgICAgIHRoaXMuc2V0SW5wdXRDb250cm9sKCk7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIC8vIOagueaNruW9k+WJjeWKoOmAn+W6puaWueWQkeavj+W4p+abtOaWsOmAn+W6plxuICAgICAgICBpZiAodGhpcy5hY2NMZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLnhTcGVlZCAtPSB0aGlzLmFjY2VsICogZHQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hY2NSaWdodCkge1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgKz0gdGhpcy5hY2NlbCAqIGR0O1xuICAgICAgICB9XG4gICAgICAgIC8vIOmZkOWItuS4u+inkueahOmAn+W6puS4jeiDvei2hei/h+acgOWkp+WAvFxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54U3BlZWQpID4gdGhpcy5tYXhNb3ZlU3BlZWQpIHtcbiAgICAgICAgICAgIC8vIGlmIHNwZWVkIHJlYWNoIGxpbWl0LCB1c2UgbWF4IHNwZWVkIHdpdGggY3VycmVudCBkaXJlY3Rpb25cbiAgICAgICAgICAgIHRoaXMueFNwZWVkID0gdGhpcy5tYXhNb3ZlU3BlZWQgKiB0aGlzLnhTcGVlZCAvIE1hdGguYWJzKHRoaXMueFNwZWVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOagueaNruW9k+WJjemAn+W6puabtOaWsOS4u+inkueahOS9jee9rlxuICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnhTcGVlZCAqIGR0O1xuICAgICAgICBpZiAodGhpcy5ub2RlLnggPCAtNDgwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IDQ4MDtcbiAgICAgICAgICAgIHRoaXMueFNwZWVkID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5vZGUueCA+IDQ4MCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnggPSAtNDgwO1xuICAgICAgICAgICAgdGhpcy54U3BlZWQgPSAwO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyJdfQ==
