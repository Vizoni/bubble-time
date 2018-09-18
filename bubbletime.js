function rand(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

class Bubble {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.maxRadius = rand(30, 100);
        this.exploded = false;
        this.points = 0;

        this.velocity = rand(5, 20) / 100;

        this.hue = rand(0, 360);
        this.color = `hsla(${this.hue}, 100%, 35%, 1)`;
    }

    render() {

        if (this.exploded) { return; }

        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.font = `${this.radius - 5}px Arial`;
        this.ctx.fillStyle = `hsla(${this.hue}, 100%, 95%, 1)`;;
        this.ctx.textAlign="center";
        this.ctx.textBaseline="middle";
        this.ctx.fillText(this.points, this.x, this.y);

        this.ctx.strokeStyle = '#ccc';

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.maxRadius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    update() {
        this.radius += this.velocity;
        this.points = Math.floor(this.radius / 0.5);

        if (this.radius >= this.maxRadius) {
            this.kill();
        }
    }

    kill() {
        this.exploded = true;
    }
}

function createBubble(game) {
    let x = rand(game.margin.left, game.width - game.margin.right);
    let y = rand(game.margin.top, game.height - game.margin.bottom);
    return new Bubble(game.ctx, x, y);
}

function updateScore(game) {
    game.ctx.fillStyle = '#ccc';
    game.ctx.fillRect(0, 0, game.width, 50);

    game.ctx.font = '20px Arial';
    game.ctx.fillStyle = '#000';
    game.ctx.textAlign="right";
    game.ctx.textBaseline="middle";
    game.ctx.fillText(game.score, game.width - 30, 26);

    game.score++;
}

function collides(a, b) {
    return
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y;
}


function collidesRadius(a, b) {
    let bw = b.radius;

    // return
    //     a.x < b.x + halfRadius &&
    //     a.x < b.x + halfRadius &&
}

function checkBubbleInCoordinates(game, x, y) {
    // game.entities.forEach(entity => {
        
    // });
}

function clickEvent(event, game) {
    const rect = game.canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    checkBubbleInCoordinates(game, x, y);
}

function update(game) {

    game.time.now = new Date();

    game.ctx.clearRect(0, 0, 500, 400);

    game.entities.forEach(entity => {
        entity.update();
        entity.render();
    });

    updateScore(game);

    if ((game.time.now - game.bubllesTimer) > game.bubblesDelay || !game.entities.length) {
        game.entities.push(createBubble(game));
        game.bubllesTimer = new Date();
    }

    game.time.old = game.time.now;

    window.requestAnimationFrame(() => {
        update(game);
    });
}

function init() {

    const game = {
        time: {
            now: new Date(),
            old: new Date()
        },
        canvas: document.getElementById('canvas'),
        ctx: canvas.getContext('2d'),
        width: 500,
        height: 400,
        background: 'white',
        entities: [],
        bubblesDelay: 3000,
        bubllesTimer: new Date(),
        margin: {
            top: 80,
            right: 50,
            bottom: 50,
            left: 50
        },
        score: 0
    };

    // Set background
    game.ctx.fillStyle = game.background;
    game.ctx.fillRect(0, 0, game.width, game.height);

    game.canvas.addEventListener('click', (event) => {
        clickEvent(event, game);
    });

    update(game);
}

init();
