
export class Animation{
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
