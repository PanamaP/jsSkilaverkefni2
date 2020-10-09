
const para = document.getElementById('goodCount');
const paraEvil = document.getElementById('evilCount')
let count = 0;
let countEvil = 0;

var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');


const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Fengið fá Canvas API, breytt til að virka við þennan kóða.
function imageDraw() {
    var ctx = document.getElementById('tutorial').getContext('2d');
    var img = new Image();
    img.onload = function() {
          ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = 'sky.jpg';
  }

function random(min, max){
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

class Shape {
    constructor(x, y, velX, velY, exists) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }
}


class Ball extends Shape {
    constructor(x, y, velX, velY, exists, color, size) {
        super(x, y, velX, velY, exists);
        this.color = color;
        this.size = size;
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        //ctx.arc(this.x, this.y, this.size, 0, 3 * Math.PI);
        ctx.rect(this.x, this.y, this.size, 30);
        ctx.stroke();
    }
    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size && balls[j].exists) {
                    balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                }
            }
        }
    }
}

class EvilCircle extends Shape{
    constructor(x, y, exists){
        super(x, y, exists);
        this.velX = 5;
        this.velY = 5;
        this.color = "white";
        this.size = 10;
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.rect(this.x, this.y, this.size+15, 0, 2 * Math.PI);
        ctx.stroke();

    }
    checkBounds() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;

        //this.y += this.velY;
    }
    collisionDetect() {
        for(let j = 0; j < balls.length; j++) {
            if( balls[j].exists ) {
              const dx = this.x - balls[j].x;
              const dy = this.y - balls[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
        
              if (distance < this.size + balls[j].size) {
                balls[j].exists = false;
                count--;
                para.textContent = 'Good count: ' + count;
                
                //Evil breytir um hegðun þegar ball deyr.
                this.velX = -(this.velX);

                //hradi eykst ef evil drepur hægra megin
                //en hægist á þegar drepið er vinstra megin
                this.velX -= 10;
    
                
                }
            }
        }
    }
}



const balls = [];

while (balls.length < 25) {
  let size = random(10,20);
  let ball = new Ball(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    true,
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );

  balls.push(ball);
  count++;
  para.textContent = 'Good count: ' + count;
};

const evilBalls = [];

while (evilBalls.length < 4){
    let size = random(2, 8);
    let evil = new EvilCircle(width/size, height/size, true);

    evilBalls.push(evil);
    countEvil++;
    paraEvil.textContent = 'Evil count: ' + countEvil;
}

function loop() {
    imageDraw();
    //ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    //ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) {
        if(balls[i].exists) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }

    for (let j = 0; j < evilBalls.length; j++){
        
        evilBalls[j].draw();
        evilBalls[j].checkBounds();
        evilBalls[j].collisionDetect();
    }

    requestAnimationFrame(loop);
  }


loop();



