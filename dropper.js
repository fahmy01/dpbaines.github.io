var dropper = document.querySelector('#main-canvas');
var ctx = dropper.getContext('2d');

var gravity = 200; // pixel/s^2
var timescale = 1 / 120; // period
var gravityCutoff = 20;
var friction = 40;

var particleSpeed = 50;

class Bounds {
    constructor(x0, x1, y0, y1) {
        this.x0 = x0;
        this.y0 = y0;
    
        this.x1 = x1;
        this.y1 = y1;
    }

    testXBounds(x) {
        return x > this.x0 && x < this.x1;
    }

    testYBounds(y) {
        return y > this.y0 && y < this.y1;
    }

    isOnFloor(y) {
        return y > this.y1 - 5;
    }
} 

class TextObject {
    constructor(text, bounds, initialX, initialVX, initialVY) {
        this.vx = initialVX;
        this.vy = initialVY;
        
        this.x = initialX;
        this.y = 0;
        
        this.width = ctx.measureText(text);
        this.height = 48;
        this.centerXGravity = this.width / 2;

        this.ang_vel = 0;
        this.rotation = 0;

        this.bounce = 0.3;
        this.bounds = bounds;

        this.text = text;
    }

    clampXVelocity() {
        if (Math.abs(this.vx) < 5) this.vx = 0;
    }

    calcImpact() {

    }

    update() {
        this.x += this.vx * timescale;
        this.y += this.vy * timescale;

        if (!this.bounds.testXBounds(this.x)) {
            // Need to bounce opposite
            this.x -= this.vx * timescale;
            this.vx = -this.bounce * this.vx;
        }

        if (!this.bounds.testYBounds(this.y)) {
            // Need to bounce opposite
            this.y -= this.vy * timescale;
            this.vy = -this.bounce * this.vy;
        }

        if (this.bounds.isOnFloor(this.y)) {
            var isGoingRight = this.vx > 0;
            var isStopped = this.vx == 0;
            if (!isStopped) this.vx += isGoingRight ? -friction * timescale : friction * timescale;
            this.clampXVelocity();
        }

        if (!(this.vy > gravityCutoff && this.bounds.isOnFloor(this.y))) this.vy += gravity * timescale;

        this.rotation += this.ang_vel;
    }
}

function init_dropper() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.fillStyle = 'white';
    ctx.font = '32px Merriweather';    
}

let test = new TextObject('Testing 123', new Bounds(0, window.innerWidth, 0, window.innerHeight), 400, 300, 400);

function update_dropper() {
    test.update();
    ctx.save();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.rotate(test.rotation);
    ctx.fillText(test.text, test.x, test.y);

    ctx.restore();
}

class Particle {
    constructor(y, r, g, b, rad) {
       this.y = y;
       this.x = 0;
       this.rgb = {red: r, green: g, blue: b};

       this.vx = particleSpeed;
       this.radius = rad;
    }

    update() {
        this.x += this.vx * timescale;
    }
}

let test_particle = new Particle(150, 193, 255, 215, 10);

function init_particle() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.filter = 'blur(5px)';
}

function getFillStyleString(p) {
    return 'rgb(' + p.rgb['red'] + ', ' + p.rgb['green'] + ', ' + p.rgb['blue'] + ', 0.5)';
}

function update_particles() {
    test_particle.update();

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = getFillStyleString(test_particle);
    ctx.beginPath();
    ctx.arc(test_particle.x, test_particle.y, test_particle.radius, 0, 2*Math.PI);
    ctx.fill();
}

// init_dropper();
// setInterval(update_dropper, timescale * 1000);

init_particle();
setInterval(update_particles, timescale * 1000);