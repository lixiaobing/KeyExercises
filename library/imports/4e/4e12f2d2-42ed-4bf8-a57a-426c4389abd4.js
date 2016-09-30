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
        this.againButton.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.director.loadScene('game');
        });
        this.backButton.node.on(cc.Node.EventType.TOUCH_START, function (event) {
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
        }
        this.keyCode = 0;
    },
    removeLetter: function removeLetter(letter) {
        ArrayUtils.remove(this.letterList, letter);
    }

});