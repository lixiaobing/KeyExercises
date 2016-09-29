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