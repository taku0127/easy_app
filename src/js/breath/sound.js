
export class Sound{
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
