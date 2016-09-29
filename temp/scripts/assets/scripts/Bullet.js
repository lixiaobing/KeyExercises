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