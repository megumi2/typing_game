'use strict'

let Question = ["orange", "banana", "apple", "grapefruit", "mango", "rasberry", "avocado", "blueberry", "peach", "lime", "lemon", "yuzu", "pineapple", "coconuts", "cherry", "doriun", "watermelon", "pear", "apricot", "watagashi", "candy", "chocolate"];
let Q_num = Math.floor(Math.random() * Question.length);
let btn = document.querySelector(".btn");
let sentence = document.querySelector('#sentence');
let replay = document.querySelector("#replay");
let mondai = document.querySelector("#mondai");
let current = document.querySelector("#current");
let time = document.querySelector("#time");
let highTime = document.querySelector("#hightime")


var startTime;
//経過時間の変数
var elapsedTime;
//タイマーの変数
var timerId;
//過去の経過時間を記録するためのID
var scoreTime = 0;
var highscoreTime = 1000000000;

btn.addEventListener('click', ()=>{
    btn.remove();
    sentence.textContent = Question[Q_num];
    mondai.style.visibility = 'visible';
    startTime = Date.now();
    countTime()
});
replay.addEventListener('click', ()=>{
    replay.style.visibility = 'hidden';
    let Q_i = 0;
    let Q_l = Question[Q_num].length;
    count=1;
    current.textContent = count;
    sentence.textContent = Question[Q_num];
    startTime = Date.now();
    countTime()
});

let Q_i = 0;
let Q_l = Question[Q_num].length;
//問題数のカウント
let count = 1;

 window.addEventListener('keydown' , pushkey);
 
function pushkey(){
    if(Question[Q_num].charAt(Q_i) == event.key){
        Q_i++;
        new Audio('./sounds/ok.mp3').play();
        sentence.textContent = Question[Q_num].substring(Q_i, Q_l);
    }
    if(Q_l - Q_i == 0){
        new Audio('./sounds/good.mp3').play();
        Q_num = Math.floor(Math.random() * Question.length);
        Q_i = 0;
        Q_l = Question[Q_num].length;
        count++;
        current.textContent = count;

        sentence.textContent = Question[Q_num];

    }
    if(count == 11){
        new Audio('./sounds/all_clear.mp3').play();
        current.textContent = 10;
        sentence.textContent = "クリア！！";
        replay.style.visibility = 'visible';
        //タイマーを止める
        clearInterval(timerId);
        highscore();
    }

}

//タイムの表示
function updateTime(){
    var m = Math.floor(elapsedTime/60000);
    var s = Math.floor((elapsedTime % 60000) / 1000);
    var ms = elapsedTime%1000;

    m = ("0" + m).slice(-2);
    s = ("0" + s).slice(-2);
    ms = ("0" + ms).slice(-2);

    time.textContent = m + ":" + s + ":" + ms;
}

//タイムを測る

function countTime(){
    

    timerId = setTimeout(function(){
        elapsedTime = Date.now() - startTime;
        updateTime();
        countTime();
    }, 10)
    
}

//ハイスコアを記録する
function highscore(){
    if(highscoreTime > elapsedTime){
        highscoreTime = elapsedTime;
        var m = Math.floor(highscoreTime/60000);
    var s = Math.floor((highscoreTime % 60000) / 1000);
    var ms = highscoreTime%1000;

    m = ("0" + m).slice(-2);
    s = ("0" + s).slice(-2);
    ms = ("0" + ms).slice(-2);

    hightime.textContent = m + ":" + s + ":" + ms;
    };
};