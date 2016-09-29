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