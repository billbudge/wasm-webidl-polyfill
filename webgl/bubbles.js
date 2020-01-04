var   canvas = document.querySelector('canvas'),
         ctx = canvas.getContext('2d'),
   particles = [],
particlesNum = 1000,
           w = 1000,
           h = 1000,
      colors = ['#f35d4f','#f36849','#c0d988','#6ddaf1','#f1e85b'];

// canvas.width = 500;
// canvas.height = 500;
// canvas.style.left = (window.innerWidth - 500)/2+'px';

// if(window.innerHeight>500)
// canvas.style.top = (window.innerHeight - 500)/2+'px';

function Factory(){
  this.x =  Math.round( Math.random() * w);
  this.y =  Math.round( Math.random() * h);
  this.rad = Math.round( Math.random() * 1) + 1;
  this.rgba = colors[ Math.round( Math.random() * 4) ];
  this.vx = Math.round( Math.random() * 3) - 1.5;
  this.vy = Math.round( Math.random() * 3) - 1.5;
}

function draw(){
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';
  ctx.linewidth = 0.5;
  for(var i = 0;i < particlesNum; i++){
    var temp = particles[i];
    var factor = 1;

    ctx.fillStyle = temp.rgba;
    ctx.strokeStyle = temp.rgba;

    for(var j = 0; j<particlesNum; j++){

       var temp2 = particles[j];

       if(temp.rgba == temp2.rgba && findDistance(temp, temp2)<2500){
          ctx.beginPath();
          ctx.moveTo(temp.x, temp.y);
          ctx.lineTo(temp2.x, temp2.y);
          ctx.stroke();
          factor++;
       }
    }

    ctx.beginPath();
    ctx.arc(temp.x, temp.y, temp.rad*factor, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(temp.x, temp.y, (temp.rad+5)*factor, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.stroke();


    temp.x += temp.vx;
    temp.y += temp.vy;

    if(temp.x > w)temp.x = 0;
    if(temp.x < 0)temp.x = w;
    if(temp.y > h)temp.y = 0;
    if(temp.y < 0)temp.y = h;
  }
}

function findDistance(p1,p2){
  let dx = p2.x - p1.x,
      dy = p2.y - p1.y;
  return dx * dx + dy * dy;
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

(function init(){
  for(var i = 0; i < particlesNum; i++){
    particles.push(new Factory);
  }
})();

(function loop(){
  draw();
  requestAnimFrame(loop);
})();




