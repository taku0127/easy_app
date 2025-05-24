import {Animation} from './breath/animation.js';
import {Breathing} from './breath/breath.js';


document.addEventListener('DOMContentLoaded', function() {
    const start5Btn = document.getElementsByClassName('js-start5Btn')[0];
    const start10Btn = document.getElementsByClassName('js-start10Btn')[0];
    const stop = document.getElementsByClassName('js-stop')[0];
    const circle = document.getElementsByClassName('js-animation')[0];
    const animator = new Animation(circle);
    const times = {
        'inhale': 4000,
        'hold' : 7000,
        'exhale' : 8000,
    }
    let breathing5minutes = new Breathing(animator,times,5);
    let breathing10minutes = new Breathing(animator,times,10);
    // ボタンを押したら
    start5Btn.addEventListener('click',function(){
        if(breathing10minutes) breathing10minutes.stop();
        breathing5minutes.start();
    })
    start10Btn.addEventListener('click',function(){
        if(breathing5minutes) breathing5minutes.stop();
        breathing10minutes.start();
    })
    stop.addEventListener('click' ,() => {
        if(breathing5minutes) breathing5minutes.stop();
        if(breathing10minutes) breathing10minutes.stop();
    } )
});
