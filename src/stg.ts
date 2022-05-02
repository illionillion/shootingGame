///<reference path="../dist/WWS.js"/>

/**
 * 起動時の処理
 */
const setup = () => {
    canvasSize(1200, 720)
    loadImg(0, 'image/bg.png');
    loadImg(1, 'image/spaceship.png');
    initSShip()
}

/**
 * メインループ
 */
const mainloop = () => {
    drawBG(1)
    // drawBG(5)//大きくなると速くなる
    moveSShip()
}

/**
 * 1200になったら0にリセット
 * される
 */
let bgX : number = 0
/**
 * 背景のスクロール
 * @param spd スピード？
 */
const drawBG = (spd : number) => {
    // console.log(bgX)
    // console.log(spd)
    bgX = (bgX + spd) % 1200
    drawImg(0, - bgX, 0)
    drawImg(0, 1200 - bgX, 0)
}

// 自機の管理
let ssX :number = 0
let ssY :number = 0

const initSShip = () => {
    ssX = 400
    ssY = 360
}

const moveSShip = () => {
    if(key[37] > 0 && ssX > 60) ssX -= 20
    if(key[39] > 0 && ssX < 1000) ssX += 20
    if(key[38] > 0 && ssY > 40) ssY -= 20
    if(key[40] > 0 && ssY < 680) ssY += 20
    drawImgC(1, ssX, ssY)
}