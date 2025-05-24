import {Sound} from './sound.js';

export class Breathing{
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
        this.interval = null;
        this.inhaleTimeout = null;
        this.holdTimeout = null;
    }

    start(){
        this.stop();
        this.cycle();
        this.interval = setInterval(() => {
            this.cycle();
        }, this.totalTime);
        setTimeout(() => {
            clearInterval(this.interval);
        }, this.minutes);
    }

    cycle(){
        this.sounds.start.playSound();
        this.animation.bigger(this.times.inhale)
        this.inhaleTimeout = setTimeout(() => {
                this.sounds.hold.playSound();
                this.holdTimeout = setTimeout(()=>{
                    this.sounds.end.playSound();
                    this.animation.smaller(this.times.exhale);
                },this.times.hold);
            }, this.times.inhale);
    }

    stop(){
        clearInterval(this.interval);
        clearInterval(this.inhaleTimeout);
        clearInterval(this.holdTimeout);
        this.animation.smaller(this.times.exhale);
    }

    totalTime(){
        let totalTime = 0;
        Object.values(this.times).forEach(time => {
            totalTime += time;
        });
        this.totalTime = totalTime;
    }
}
