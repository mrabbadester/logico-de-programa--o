//declaração variáveis
var cacto1, cacto2, cacto3;
var cacto1Img, cacto2Img, cacto3Img;

var nuvem1, nuvem2;
var nuvem1Img, nuvem2Img;

var fimDeJogo, fimDeJogoImg;
var chao, chaoImg;
var chaoInvisivel;

var tRex;
var tRexImg;

//variáveis de grupos
var grupoCacto, grupoNuvem;

//responsável por carregar todos os arquivos
function preload()
{
    tRexImg = loadAnimation("img/tRex1.png", "img/tRex2.png", "img/tRex3.png");

    //Carrega imagens Cactos
    cacto1Img = loadImage("img/cacto1.png");
    cacto2Img = loadImage("img/cacto2.png");
    cacto3Img = loadImage("img/cacto3.png");

    //Carrega imagens nuvens
    nuvem1Img = loadImage("img/nuvem.png");
    nuvem2Img = loadImage("img/nuvem2.png");

    //Carrega imagem fim do jogo
    fimDeJogoImg = loadImage("img/game-over.png");

    //carrega imagem chão
    chaoImg = loadImage("img/ground2.png");
}

//função que inicializa o código
function setup()
{
    //cria tela de fundo
    createCanvas(600,200);

    //configurações do dinossauro
    tRex = createSprite(100,100,20,20);
    tRex.addAnimation("tRex", tRexImg);
    //altera o tamanho
    tRex.scale = 0.5;
    //alterar um posição esepecífica
    tRex.x = 50;

    //configurações o chão
    chao = createSprite(100,140,150,20);
    chao.addImage("chao", chaoImg);
    chaoInvisivel = createSprite(80, 155, 100, 20);
    chaoInvisivel.visible = false;

    //--------------------------aula 18/01
    //criar grupos 
    grupoCacto = new Group();
    grupoNuvem = new Group();
}

//função que executa enquanto o código estiver funcionando
function draw()
{

    background("#BFBFBF");

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

    //--------------------------aula 18/01
    //condição para fim de jogo
    if(grupoCacto.isTouching(tRex)){

        //para velocidade
        chao.velocityX = 0;
        tRex.velocityY = 0;

        //para velocidade dos grupos
        grupoCacto.setVelocityXEach(0);
        grupoNuvem.setVelocityXEach(0);

        //imagem fim de jogo
        fimDeJogo = createSprite(300,100);
        fimDeJogo.addImage(fimDeJogoImg);
        fimDeJogo.scale = 0.2;

        //mensagem de reinicio
        fill("black");
        text("Pressione espaço para reiniciar", 220, 170);   
    }

    //chama função
    criaNuvens();
    
    //chama função
    criaCactos();

    drawSprites();
}

//função de nuvens
function criaNuvens()
{
    if(frameCount % 50 === 0)
    {
       var nuvem = createSprite(700,90,40,10);
       nuvem.velocityX = -2;

       //gera imagem aleatória
       var num = Math.round(random(1,2));
    
       switch(num){
        case 1: nuvem.addImage(nuvem1Img);
        break;
        case 2: nuvem.addImage(nuvem2Img);
        break;
        default: break;
       }

       
       nuvem.scale = 0.05;
       nuvem.y = Math.round(random(15,70));
       //Math.round é uma função do biblioteca p5.js que arredonda um numero
       //random = função que gera numero aleatório
       nuvem.lifetime = 500;   
       
       //adiciona nuvem no grupo
       grupoNuvem.add(nuvem);
    }
}

//criar a função dos cactos
function criaCactos()
{
    if(frameCount % 70 === 0)
    {
       var cacto = createSprite(700,130,40,10);
       cacto.velocityX = -7;

       //gera imagem aleatória
       var num = Math.round(random(1,3));
    
       switch(num){
        case 1: cacto.addImage(cacto1Img);
        break;
        case 2: cacto.addImage(cacto2Img);
        break;
        case 3: cacto.addImage(cacto3Img);
        break;
        default: break;
       }

       cacto.scale = 0.07;
       cacto.lifetime = 500; 
       
       //adiciona cacto no grupo
       grupoCacto.add(cacto);

    }
}
