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