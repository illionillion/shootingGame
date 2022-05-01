"use strict";
///<reference path="../dist/WWS.js"/>
// console.log("Hello World");
/**
 * 起動時の処理
 */
const setup = () => {
    canvasSize(1200, 720);
    loadImg(0, 'image/bg.png');
};
/**
 * メインループ
 */
const mainloop = () => {
    drawBG(1);
};
let bgX = 0;
/**
 * 背景のスクロール
 * @param spd スピード？
 */
const drawBG = (spd) => {
    console.log(bgX);
    console.log(spd);
    bgX = (bgX + spd) % 1200;
    drawImg(0, -bgX, 0);
    drawImg(0, 1200 - bgX, 0);
};
