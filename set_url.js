//////////////////// 아케인 심볼 세팅 ////////////////////

let ac1 = new Array(20);
let ac2 = new Array(20);
let ac3 = new Array(20);
let ac4 = new Array(20);
let ac5 = new Array(20);
let ac6 = new Array(20);     
let meso_ac = [ac1, ac2, ac3, ac4, ac5, ac6];

//exp 세팅
let exp_ac = new Array(20);
for (let i = 0; i < exp_ac.length - 1; i++) {
    exp_ac[i] = (i + 1) * (i + 1) + 11;
}
exp_ac[19] = 0;

//메소 세팅
let n;
for (let i = 0; i < meso_ac.length; i++) {
    for (let j = 0; j < 20; j++) {
        n = j + 1;
        meso_ac[i][j] = Math.floor((0.1 * n * n * n) + (((i * 2) + 8) * n * n) + (1.1 * n) + ((i + 4) * 22)) * 10000;
    }
}
let ac_total = 2679;

//////////////////// 어센틱 심볼 세팅 ////////////////////
let at1 = new Array(11);
let at2 = new Array(11);
let at3 = new Array(11);
let at4 = new Array(11);
let at5 = new Array(11);
let at6 = new Array(11);    
let meso_at = [at1, at2, at3, at4, at5, at6];

//exp 세팅
let exp_at = new Array(11);
for (let i = 0; i < exp_at.length - 1; i++) {
    exp_at[i] = 9 * (i + 1) * (i + 1) + 20 * (i * 1) + 20;
}
exp_at[10] = 0;
//메소 세팅
for (let i = 0; i < meso_at.length; i++) {
    for (let j = 0; j < 11; j++) {
        n = j + 1;
        meso_at[i][j] = Math.floor((-5.4 * n * n * n) + (((i * 2) + 8) * n * n) + (1.1 * n) + ((i + 4) * 22)) * 10000;
        //필요 성장치 × 1.8 × {(지역상수 + 6) - (레벨 - 1)÷3}
        meso_at[i][j] = Math.floor(exp_at[j] * 1.8 * ((i + 7) - (n - 1) / 3)) * 100000;
    }
}
let at_total = 4565;