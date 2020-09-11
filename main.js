var player;
var texturesclass = document.getElementsByClassName("texture");
var spritesclass = document.getElementsByClassName("spriteframe");
var textures = new Array(texturesclass.length);
var gctx;
var v = document.getElementById("sprite");
var i;
var playerframe = 0;
var signs = new Array();
var trees = new Array();
var updatecycle = 0;

function beginGame() {
    gamearea.start();
    player = new component(50, 50, 110, 110, 10);
    signs.push(new signclass(285, 110, 51, 56));
    signs.push(new signclass(45, 380, 51, 56));
    signs.push(new signclass(145, 710, 51, 56));
    signs.push(new signclass(295, 545, 51, 56));
    signs.push(new signclass(600, 110, 51, 56));
    signs.push(new signclass(840, 300, 51, 56));
    signs.push(new signclass(1020, 500, 51, 56));
    signs.push(new signclass(1200, 300, 51, 56));
    signs.push(new signclass(1370, 110, 51, 56));
}

var gamearea = {
  canvas : document.getElementById("gcanvas"),
  start : function() {
    var canvas = this.canvas;
    gctx = canvas.getContext("2d");
    canvas.width  = 1500;
    canvas.height = 900;
    gctx = canvas.getContext("2d");
    gctx.beginPath();
    gctx.rect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < texturesclass.length; i++) {
        textures[i] = gctx.createPattern(texturesclass[i], 'repeat');
    }
    gctx.fillStyle = textures[2];
    gctx.fill();
    drawpath();
    updatecycle = 1; 
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear : function() {
    var canvas = this.canvas;
    gctx = canvas.getContext("2d");
    gctx.beginPath();
    gctx.rect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < texturesclass.length; i++) {
        textures[i] = gctx.createPattern(texturesclass[i], 'repeat');
    }
    gctx.fillStyle = textures[2];
    gctx.fill();
    drawpath();
  }
}

function framep () {
  if(playerframe < 14)
    playerframe += 1;
  else
    playerframe = 0;
}

function component(width, height, x, y, speed) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speed = speed;
  var tx, ty;
  this.update = function(){
    ctx = gctx;
    //ctx.drawImage(texturesclass[3], this.x, this.y);
    //gctx.drawImage(v,this.x,this.y);
    gctx.drawImage(spritesclass[playerframe], this.x, this.y);
    for(var a = 0; a < signs.length; a++) {
      for(tx = this.x; tx < this.x+36; tx++) {
        for(ty = this.y; ty < this.y+58; ty++) {
          if(checkCollide(tx, ty, signs[a].x1, signs[a].y1, 51, 65) === 1 && signs[a].state === 0)
            break;
        }
        if(ty < this.y+58) {
          if(a === 8) {
            document.getElementById("endingid").style.display = "block";
            document.getElementById("startover").style.display = "block";
          }
          document.getElementById("modalinfo").innerHTML = document.getElementById("mol"+a).innerHTML;
          document.getElementById("modalimage").src = "images/molimg" + a + ".jpg";
          modal.style.display = "block";
          signs[a].state = 1;
          //alert("Touched a sign");
        }
      }
    }
   
    //clearTimeout(inv);
    
  }
  ctx = gctx;
  //ctx.drawImage(texturesclass[3], this.x, this.y);
  //gctx.drawImage(v,this.x,this.y);
  gctx.drawImage(spritesclass[playerframe], this.x, this.y);
}
var inv = setInterval(() => framep(), 80);
function checkCollide(pointX, pointY, objectx, objecty, objectw, objecth) {
  var oTop = objecty;
  var oLeft = objectx; 
  var oRight = objectx+objectw;
  var oBottom = objecty+objecth; 

  if(pointX > oLeft && pointX < oRight){
       if(pointY > oTop && pointY < oBottom ){
            return 1;
       }
  }
  else
       return 0;
};

function signclass(x1, y1, width, height) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x1+width;
  this.y2 = y1+height;
  this.state = 0;
}

function treeclass(x1, y1) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = this.x1 + 100;
  this.y2 = this.y1 + 100;
}

function drawpath () {
  drawTrees(16, 2, 10, 10, 100, 100);
  drawTrees(3, 2, 10, 175, 100, 100);
  drawTrees(3, 2, 10, 265, 100, 100);
  drawTrees(5, 1, 370, 90, 100, 100);
  drawTrees(3, 2, 100, 430, 100, 100);
  drawTrees(7, 2, 10, 770, 100, 100);
  drawTrees(2, 1, 100, 515, 100, 100);
  drawTrees(3, 2, 190, 600, 100, 100);
  drawTrees(7, 1, 550, 175, 100, 100);
  drawTrees(1, 2, 640, 175, 100, 100);
  drawTrees(6, 1, 730, 175, 100, 100);
  drawTrees(5, 1, 910, 100, 100, 100);
  drawTrees(7, 2, 820, 600, 100, 100);
  drawTrees(6, 1, 1090, 175, 100, 100);
  drawTrees(5, 1, 1265, 100, 100, 100);
  //Tree stump 1
  gctx.drawImage(texturesclass[8], 155, 480, 180, 180);
  //Tree stump 2
  gctx.drawImage(texturesclass[8], 600, 300, 180, 180);
  //Tree stump 3
  gctx.drawImage(texturesclass[8], 980, 650, 180, 180);

  //Log 1
  gctx.drawImage(texturesclass[9], 800, 630);

  //Honeycomb 1
  gctx.drawImage(texturesclass[11], 640, 260);
  gctx.drawImage(texturesclass[12], 655, 310, 30, 30);
  gctx.drawImage(texturesclass[12], 690, 290, 30, 30);
  //Honeycomb 2
  gctx.drawImage(texturesclass[11], 1130, 690);
  gctx.drawImage(texturesclass[12], 1150, 720, 30, 30);
  gctx.drawImage(texturesclass[12], 1190, 700, 30, 30);

  //Sign 1
  gctx.drawImage(texturesclass[4], 285, 110);
  //Sign 2
  gctx.drawImage(texturesclass[4], 45, 380);
  //Sign 3
  gctx.drawImage(texturesclass[4], 145, 710);
  //Sign 4
  gctx.drawImage(texturesclass[4], 295, 545);
  //Sign 5
  gctx.drawImage(texturesclass[4], 600, 110);
  //Sign 6
  gctx.drawImage(texturesclass[4], 840, 300);
  //Sign 7
  gctx.drawImage(texturesclass[4], 1020, 500);
  //Sign 8
  gctx.drawImage(texturesclass[4], 1200, 300);
  //Final sign
  gctx.drawImage(texturesclass[13], 1370, 110);
}

function drawTrees(num, o, x, y, width, height) {
  var n, tx, ty, tmp;
  tx = x;
  ty = y;
  gctx.beginPath();
  for(n = 0; n < num; n++) {
    /*if(getRandomInt(0,2) === 1) tmp = 0;
    else tmp = 10;*/
    if(n%4 === 0)
      tmp = 10;
    else
      tmp = 0;
    gctx.drawImage(texturesclass[tmp], tx, ty, width, height);
    if(updatecycle === 0)
      trees.push(new treeclass(tx, ty));
    if(o === 1)
      ty += height*0.85;
    else
      tx += width*0.9;
  }
}

function drawTrails(num, o, x, y) {

}

document.onkeydown = function(e) {
  var a, k;
  k = e.keyCode;
  switch(e.keyCode) {
    case 37:
      e.preventDefault();
      player.x -= player.speed;
      break;
    case 38:
      e.preventDefault();
      player.y -= player.speed;
      break;
    case 39:
      e.preventDefault();
      player.x += player.speed;
      break;
    case 40:
      e.preventDefault();
      player.y += player.speed;
      break;
  }
  for(a = 0; a < trees.length; a++) {
    for(tx = player.x; tx < player.x+36; tx++) {
      for(ty = player.y; ty < player.y+58; ty++) {
        if(checkCollide(tx, ty, trees[a].x1+30, trees[a].y1+30, 50, 50) === 1)
          break;
      }
      if(ty < player.y+58) {
        switch(k) {
          case 37:
            e.preventDefault();
            player.x += player.speed;
            updateGameArea();
            return;
          case 38:
            e.preventDefault();
            player.y += player.speed;
            updateGameArea();
            return;
          case 39:
            e.preventDefault();
            player.x -= player.speed;
            updateGameArea();
            return;
          case 40:
            e.preventDefault();
            player.y -= player.speed;
            updateGameArea();
            return;
        }
      }
    }
  }
  
}

function updateGameArea() {
  gamearea.clear();
  player.update();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
} 
  
var modal = document.getElementById("descriptionModal");
var span = document.getElementsByClassName("close")[1]; 

span.onclick = function() {
  modal.style.display = "none";
}     
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var intromodal = document.getElementById("startupModal");
var span2 = document.getElementsByClassName("close")[0]; 

span2.onclick = function() {
  intromodal.style.display = "none";
}     
window.onclick = function(event) {
  if (event.target == intromodal) {
    intromodal.style.display = "none";
  }
}
