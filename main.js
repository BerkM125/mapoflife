var player;
var texturesclass = document.getElementsByClassName("texture");
var textures = new Array(texturesclass.length);
var gctx;

function beginGame() {
    gamearea.start();
    player = new component(50, 50, 100, 100, 20);
    alert("Game began!");
}

var gamearea = {
  canvas : document.getElementById("gcanvas"),
  start : function() {
    var canvas = this.canvas;
    gctx = canvas.getContext("2d");
    canvas.width  = window.innerWidth+200;
    canvas.height = window.innerHeight;
    gctx = canvas.getContext("2d");
    gctx.beginPath();
    gctx.rect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < texturesclass.length; i++) {
        textures[i] = gctx.createPattern(texturesclass[i], 'repeat');
    }
    gctx.fillStyle = textures[1];
    gctx.fill();
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  clear : function() {
    var canvas = this.canvas;
    gctx = canvas.getContext("2d");
    gctx.beginPath();
    gctx.rect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < texturesclass.length; i++) {
        textures[i] = gctx.createPattern(texturesclass[i], 'repeat');
    }
    gctx.fillStyle = textures[1];
    gctx.fill();
  }
}

function component(width, height, x, y, speed) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.update = function(){
    ctx = gctx;
    ctx.drawImage(texturesclass[2], this.x, this.y);
  }
  ctx = gctx;
  ctx.drawImage(texturesclass[2], this.x, this.y);
}

document.onkeydown = function(e) {
  switch(e.keyCode) {
    case 37:
      player.x -= player.speed; 
      break;
    case 38:
      player.y -= player.speed;
      break;
    case 39:
      player.x += player.speed;
      break;
    case 40:
      player.y += player.speed;
      break;
  }
  updateGameArea();
}

function updateGameArea() {
  gamearea.clear();
  player.update();
}