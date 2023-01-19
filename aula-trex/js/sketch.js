// criar variaveis para os cactos e as imagens dos cactos
var cacto1, cacto2, cacto3;
var cacto1Img, cacto2Img, cacto3Img;

//nuvem, fim de jogo, chão
var nuvem1, nuvem2;
var nuvem1Img, nuvem2Img;

var fimDeJogo, fimDeJogoImg;
var chao, chaoImg;

var chaoInvisivel;

var tRex;
var tRexImg;

var grupoCactos, grupoNuvens;

//estado inicial para o jogo
var estadoJogo = "play";
//funcao serve pra carregar arquivos pra dentros da variavel
function preload(){
    tRexImg = loadAnimation("img/tRex1.png","img/tRex2.png","img/tRex3.png");

    //carregar todos as imagens
    cacto1Img = loadImage("img/cacto1.png");
    cacto2Img = loadImage("img/cacto2.png");
    cacto3Img = loadImage("img/cacto3.png");

    nuvem1Img = loadImage("img/nuvem.png");
    nuvem2Img = loadImage("img/nuvem2.png");

    fimDeJogoImg = loadImage("img/game-over.png");

    chaoImg = loadImage("img/ground2.png");
}

//função de criação 
function setup(){
    //crie o tamanho da tela
    createCanvas(600,200);

    //crie o corpo do dinossauro
    tRex = createSprite(100,100,20,20);
    tRex.addAnimation("tRex",tRexImg);
    //altera tamanho 
    tRex.scale = 0.5;
    //alterar um posição esepecifica
    tRex.x = 50;

    //configuração o chao 
    chao = createSprite(100,140,150,20);
    chao.addImage("chao", chaoImg);
    chaoInvisivel = createSprite(80, 155, 100, 20);
    chaoInvisivel.visible = false;

   //imagem fim de jogo
   fimDeJogo = createSprite(300,100);
   fimDeJogo.addImage(fimDeJogoImg);
   fimDeJogo.scale = 0.2;
   fimDeJogo.visible = false; // para a imagem nao aparecer no inicio do jogo
    //criando grupos
    grupoCactos = new Group();
    grupoNuvens = new Group();
}

//função de execução desenho
function draw(){

    background("#BFBFBF");

    if (estadoJogo==="play")
    {
        //movimento pro chão e renicia o chão
        chao.velocityX = -2;
        if(chao.x<0)
        {
            chao.x = chao.width/2;
        } 

        //pular quando a tecla espaço for pressionada
        if(keyDown("space"))
        {
            //o que acontece se a condição for verdadeira
            tRex.velocityY = -10;
        }

        //adicionar gravidade ao tRex
        tRex.velocityY = tRex.velocityY + 0.8;
        tRex.collide(chaoInvisivel);

        //chama função
        criaNuvens();
        criaCactos();

        if(grupoCactos.isTouching(tRex)){
            estadoJogo = "end";
        }
    }

    else if(estadoJogo==="end")
    {
        //parar a velocidade
        chao.velocityX = 0;
        tRex.velocityY = 0;

        //parar grupo
        grupoCactos.setVelocityXEach(0);
        grupoNuvens.setVelocityXEach(0);

        //exibe novamente a imagem de fim de jogo
        fimDeJogo.visible = true;

        //mensagem na tela
        fill("black"); //cor da letra
        text("Pressione espaço para reiniciar.", 220, 170);

        if(keyDown("space"))
        {
         estadoJogo = "play";
         grupoCactos.destroyEach();
         grupoNuvens.destroyEach(); 
         
         //não exibe a imagem de fim de jogo
         fimDeJogo.visible = false;
        }
    }

    drawSprites();
}
//função de nuvens
function criaNuvens (){
    if(frameCount % 50 === 0){
        
        var nuvem = createSprite(700,90,40,10);
        nuvem.velocityX = -2;
        
        //gera imagem aleatória
        var num = Math.round(random(1,2));

        switch(num){
            case 1:nuvem.addImage(nuvem1Img);
            break;
            case 2:nuvem.addImage(nuvem2Img);
            break;
            default: break;
        }

        nuvem.scale = 0.05;
        nuvem.y = Math.round(random(15,70));
        //math.round é uma funcao do biblioteca p5.js que arredonda um numero
        //random = função que gera numero aleatíorio
        nuvem.lifetime = 500;

        //adiciona nuvem no grupo
       grupoNuvens.add(nuvem);

    }
}
//desfio nao é obrigatorio entregar, é para voces treinarem
//criar a função dos cactos
//e colocar as imagens para gera aleatório
//função de nuvens
function criaCactos (){
    if(frameCount % 70 === 0){
        
        var cacto = createSprite(750,130,40,10);
        cacto.velocityX = -7;
        
        //gera imagem aleatória
        var num = Math.round(random(1,2,3));

        switch(num){
            case 1:cacto.addImage(cacto1Img);
            break;
            case 2:cacto.addImage(cacto2Img);
            break;
            case 3:cacto.addImage(cacto3Img);
            break;
            default: break;
        }

        cacto.scale = 0.07;
        cacto.lifetime = 500;
        //adiciona cacto no grupo
       grupoCactos.add(cacto);  
    }
}