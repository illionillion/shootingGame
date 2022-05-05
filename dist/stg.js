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
    initMissile();
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
 * 1200になったら0にリセットされる
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
    if (key[32] === 1) {
        key[32]++;
        setMissile(ssX + 40, ssY, 40, 0);
    }
    drawImgC(1, ssX, ssY);
};
//自機が打つ弾の管理
let MSL_MAX = 100; //ミサイル(配列)の総数
let mslX = new Array(MSL_MAX);
let mslY = new Array(MSL_MAX);
let mslXp = new Array(MSL_MAX);
let mslYp = new Array(MSL_MAX);
let mslF = new Array(MSL_MAX);
let mslNum = 0;
/**
 * ミサイル処理の初期化
 */
const initMissile = () => {
    for (let i = 0; i < MSL_MAX; i++)
        mslF[i] = false;
    mslNum = 0;
};
/**
 * ミサイルのセット
 * @param x mslX
 * @param y mslY
 * @param xp mslXp
 * @param yp mslYp
 */
const setMissile = (x, y, xp, yp) => {
    mslX[mslNum] = x; //船の位置からミサイル発射
    mslY[mslNum] = y;
    mslXp[mslNum] = xp;
    mslYp[mslNum] = yp;
    mslF[mslNum] = true;
    mslNum = (mslNum + 1) % MSL_MAX; //ミサイルカウント増加 & 100になったらリセット
};
/**
 * ミサイルの動き
 */
const moveMissile = () => {
    for (let i = 0; i < MSL_MAX; i++) {
        if (mslF[i]) {
            mslX[i] += mslXp[i];
            mslY[i] += mslYp[i];
            drawImgC(2, mslX[i], mslY[i]);
            if (mslX[i] > 1200)
                mslF[i] = false; //弾が画面外に行ったら次が打てる
        }
    }
};
