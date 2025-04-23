document.addEventListener('DOMContentLoaded', function() {
    eventTest();
    let add_button = document.getElementsByClassName("c-button")[0];
    let content = document.getElementsByClassName("c-content");
    function eventTest() {
      let input_gram = document.getElementsByClassName("js-gram");
      let input_yen = document.getElementsByClassName("js-yen");
      let input_atari = document.getElementsByClassName("js-atari");
      let sum = document.getElementsByClassName("js-sum");
      
      const products = [];
      // 入力されたら数字を取得する
      [...input_gram].forEach((element, index) => {
        const product = new Product();
        products.push(product);
        const calc = new Calc(product);
        let result_text = sum[index];

        element.addEventListener("input", function (e) {
          product.gram = e.target.value;
          result_text.textContent = calc.calculate();
        });
        input_yen[index].addEventListener("input", function (e) {
          product.yen = e.target.value;
          result_text.textContent = calc.calculate();
        });
        input_atari[index].addEventListener("input", function (e) {
          calc.atari = e.target.value;
          result_text.textContent = calc.calculate();
        });
      });
    }
    // ボタン押されたら増やす
    add_button.addEventListener('click',function(){
        content[content.length - 1].insertAdjacentElement('afterend',content[0].cloneNode(true));
        eventTest();
    })
    
});

class Product{
    constructor(gram = 0, yen = 0){
        this._gram = gram;
        this._yen = yen;
    }
    get gram(){
        return this._gram;
    }

    set gram(value){
        this._gram = Number(value);
    }

    get yen(){
        return this._yen;
    }

    set yen(value){
        this._yen = Number(value);
    }

}

class Calc{
    constructor(product,atari=0){
        this._product = product;
        this._atari = atari;
    }

    set atari(value){
        this._atari = Number(value);
    }
    calculate(){
        if(this._product._gram > 0 && this._product._yen > 0){
            let unitPrice = this._product._yen / this._product._gram;
            if(this._atari > 0){
                unitPrice = unitPrice * this._atari;
            }
            return unitPrice;
        }
    }
}
