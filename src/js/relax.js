document.addEventListener('DOMContentLoaded', function() {
    const start5Btn = document.getElementsByClassName('js-start5Btn')[0];
    const start10Btn = document.getElementsByClassName('js-start10Btn')[0];
    const circle = document.getElementsByClassName('js-animation')[0];
    const animator = new Animation(circle);
    const times = {
        'inhale': 4000,
        'hold' : 7000,
        'exhale' : 8000,
    }
    const breathing5minutes = new Breathing(animator,times,5)
    const breathing10minutes = new Breathing(animator,times,10)
    // ボタンを押したら
    start5Btn.addEventListener('click',function(){
        breathing5minutes.start();
    })
    start10Btn.addEventListener('click',function(){
        breathing10minutes.start();
    })
});

class Animation{
    constructor(element){
        this.element = element;
    }

    //大きくする
    bigger(duration){
        let howBig = '300px';
        const color = '#b4adff';
        this.element.style.transition = `transform ${duration}ms ease-in-out, background-color ${duration}ms ease-in-out , width ${duration}ms ease-in-out,height ${duration}ms ease-in-out`;
        // this.element.style.transform = 'scale(2)';
        this.element.style.width = howBig;
        this.element.style.height = howBig;
        this.element.style.backgroundColor = color;
    }
    // 小さくする
    smaller(duration){
        const howBig = '100px';
        const color = 'rgb(255, 173, 173)';
        this.element.style.transition = `transform ${duration}ms ease-in-out, background-color ${duration}ms ease-in-out , width ${duration}ms ease-in-out,height ${duration}ms ease-in-out`;
        this.element.style.width = howBig;
        this.element.style.height = howBig;
        this.element.style.backgroundColor = color;
    }
}

class Breathing{
    constructor(animation,times,minutes){
        this.animation = animation;
        this.times = times;
        this.minutes = minutes * 60000;
        this.totalTime();
        this.sounds = {
            start : new Sound('sine',0.2, 600),
            hold : new Sound('sine', 0.2 , 400),
            end : new Sound('sine', 0.2 , 300)
        }
    }

    start(){
        this.cycle();
        const interval = setInterval(() => {
            this.cycle();
        }, this.totalTime);
        setTimeout(() => {
            clearInterval(interval);
        }, this.minutes);
    }

    cycle(){
        this.sounds.start.playSound();
        this.animation.bigger(this.times.inhale)
        setTimeout(() => {
                this.sounds.hold.playSound();
                setTimeout(()=>{
                    this.sounds.end.playSound();
                    this.animation.smaller(this.times.exhale);
                },this.times.hold);
            }, this.times.inhale);
    }

    totalTime(){
        let totalTime = 0;
        Object.values(this.times).forEach(time => {
            totalTime += time;
        });
        this.totalTime = totalTime;
    }
}

class Sound{
    constructor(type, time, freq){
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.type = type;
        this.freq = freq;
        this.time = time;
    }
    playSound(){
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        gainNode.gain.value = 0.3;
        oscillator.type = this.type; // 音の波形：sine, square, triangle, sawtooth
        oscillator.frequency.setValueAtTime(this.freq, this.context.currentTime); // 周波数（Hz）
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        oscillator.start();
        oscillator.stop(this.context.currentTime + this.time); // 0.2秒のビープ
    }
}
