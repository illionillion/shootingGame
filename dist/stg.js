"use strict";
///<reference path="../dist/WWS.js"/>
/**
 * 起動時の処理
 */
const setup = () => {
    canvasSize(1200, 720);
    loadImg(0, 'image/bg.png');
    loadImg(1, 'image/spaceship.png');
    loadImg(2, 'image/missile.png');
    initSShip();
};
/**
 * メインループ
 */
const mainloop = () => {
    drawBG(1);
    // drawBG(5)//大きくなると速くなる
    moveSShip();
    moveMissile();
};
/**
 * 1200になったら0にリセット
 * される
 */
let bgX = 0;
/**
 * 背景のスクロール
 * @param spd スピード？
 */
const drawBG = (spd) => {
    // console.log(bgX)
    // console.log(spd)
    bgX = (bgX + spd) % 1200;
    drawImg(0, -bgX, 0);
    drawImg(0, 1200 - bgX, 0);
};
// 自機の管理
let ssX = 0;
let ssY = 0;
/**
 * 船の生成
 */
const initSShip = () => {
    ssX = 400;
    ssY = 360;
};
/**
 * 船の動作
 */
const moveSShip = () => {
    if (key[37] > 0 && ssX > 60)
        ssX -= 20;
    if (key[39] > 0 && ssX < 1000)
        ssX += 20;
    if (key[38] > 0 && ssY > 40)
        ssY -= 20;
    if (key[40] > 0 && ssY < 680)
        ssY += 20;
    if (key[32] === 1)
        setMissile(ssX + 40, ssY, 40, 0);
    drawImgC(1, ssX, ssY);
};
//自機が打つ弾の管理
let mslX, mslY, mslXp, mslYp;
let mslF = false;
/**
 * ミサイルのセット
 * @param x mslX
 * @param y mslY
 * @param xp mslXp
 * @param yp mslYp
 */
const setMissile = (x, y, xp, yp) => {
    if (!mslF) {
        mslX = x;
        mslY = y;
        mslXp = xp;
        mslYp = yp;
        mslF = true;
    }
};
/**
 * ミサイルの動き
 */
const moveMissile = () => {
    if (mslF) {
        mslX += mslXp;
        mslY += mslYp;
        drawImgC(2, mslX, mslY);
        if (mslX > 1200)
            mslF = false;
    }
};
