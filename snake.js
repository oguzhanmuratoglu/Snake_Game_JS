const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", tusHareketleri);

let canvasWidth = canvas.clientWidth;
let canvasHeight = canvas.clientHeight;
let x = 10;
let y = 10;
let elmaX = 5;
let elmaY = 5;
let hareketX = 0;
let hareketY = 0;
let konum =20;
let boyut = 18;
let yilanUzunlugu = 1;
let yilanParcalari = [];
let skor = 0;
let hiz = 1;
let hizSkoru = 1;
let can = 3;
let yilanUzunluguDeneme = 0;
let hizSayisi = 0;

class YilanParcasi{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function oyunuCiz(){
    ekraniTemizle();
    yilaniCiz();
    elmayiCiz();
    yilanHareketiniGuncelle();
    elmaninKonumunuGuncelle();
    skoruCiz();
    hiziCiz();
    caniCiz();

    const sonuc = oyunBittiMi();

    if(sonuc){

        caniCiz();
        return;
    }


    setTimeout(oyunuCiz, 100/hiz);
}

function ekraniTemizle(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvasWidth,
        canvasHeight);
}


function yilaniCiz(){

    ctx.fillStyle = "green";

    for(let i of yilanParcalari){
        ctx.fillRect(i.x * konum, i.y*konum, boyut, boyut)
    }

    yilanParcalari.push(new YilanParcasi(x,y));
    if(yilanParcalari.length > yilanUzunlugu){
        yilanParcalari.shift();
    }


    ctx.fillStyle="white";
    ctx.fillRect(x*konum,y*konum,boyut,
    boyut);
}


function elmayiCiz(){
    ctx.fillStyle= "red";
    ctx.fillRect(elmaX*konum,elmaY*konum,boyut,boyut);
}


function tusHareketleri(e){

    switch (e.keyCode) {
        case 37: //sol
        if(hareketX===1)return;
            hareketX=-1;
            hareketY = 0;
        break;
        case 38: //yukarı
        if(hareketY===1)return;
            hareketY=-1;
            hareketX = 0;
        break;
        case 39: //sağ
        if(hareketX===-1)return;
            hareketX=1;
            hareketY = 0;
        break;
        case 40: //aşağı
        if(hareketY===-1)return;
            hareketY=1;
            hareketX = 0;
        break;
    }
}


    function yilanHareketiniGuncelle(){

    let sonucX = x+hareketX;
    let sonucY = y+hareketY;

    if(sonucY < 0){
        sonucY=konum-1;
    } else if(sonucY >= konum){
        sonucY = 0;
    }

    if(sonucX <0){
        sonucX=konum-1;
    } else if (sonucX >= konum){
        sonucX =0;
    }

    x= sonucX;
    y=sonucY;
    }

    

    function elmaninKonumunuGuncelle(){

        if(x===elmaX && elmaY===y){

            elmaX = Math.floor(Math.random() * konum);
            elmaY = Math.floor(Math.random()*konum);
      

        let elmaKonumuMusaitMi = false;
        while (!elmaKonumuMusaitMi) {

            elmaKonumuMusaitMi = true;

            for(let parca of yilanParcalari){

                if(parca.x===elmaX && parca.y===elmaY){
                    elmaX = Math.floor(Math.random() * konum);
                    elmaY = Math.floor(Math.random()*konum);
                    elmaKonumuMusaitMi = false;
                    break;
                }
            }
        }

        
        yilanUzunlugu++;
        skor +=10;
            
        if(yilanUzunlugu %4 === 0){
            hiz+=0.25;
            hizSkoru ++;
        }
    }    

}

    


    function skoruCiz(){
    ctx.fillStyle = "white";
    ctx.font = "20px verdena";
    ctx.fillText(`Skor: ${skor}`, canvasWidth - 80,30);
    }

    function hiziCiz(){

        ctx.fillStyle = "white";
        ctx.font = "20px verdena";
        ctx.fillText(`Hız: ${hizSkoru}`, canvasWidth - 160,30);
    }

    function oyunBittiMi(){

        let oyunBitti = false;

        if (hareketX === 0 && hareketY === 0) return;

        for(let index in yilanParcalari){

            let parca = yilanParcalari[index];
            if(parca.x ===x && parca.y===y)
            {
                can--;
                if(can===0)
                {
                    oyunBitti=true;
                    break;
                }

                yilanParcalari.splice(0, index);
                yilanUzunlugu = yilanParcalari.length;
                skor = yilanUzunlugu*10;
                hizSkoru = Math.floor(skor / 40) + 1;
                hiz = 1 + (hizSkoru - 1) * 0.25;
                break;
            }
        }

        if(oyunBitti){
            ctx.fillStyle = "white";
            ctx.font = "50px verdena";
            ctx.fillText(`Game Over!`, canvasWidth / 4.5, canvasHeight / 2);
        }
        return oyunBitti;

    }

    function caniCiz(){
        ctx.fillStyle = "white";
        ctx.font = "20px verdena";
        ctx.fillText(`Can: ${can}`, canvasWidth - 230, 30);
    }

    function yeniOyun() {
        document.location.reload();
    }


oyunuCiz();