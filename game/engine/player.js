export class Player{

    constructor(x,y){

        this.x = x;
        this.y = y;

        this.width = 48;
        this.height = 48;

        this.speed = 4;

        this.life = 100;
        this.maxLife = 100;

        this.level = 1;
        this.xp = 0;

        this.coins = 0;
        this.keys = 0;

        this.direction = "down";

    }

    update(keys,map){

        let oldX = this.x;
        let oldY = this.y;

        // movimiento

        if(keys["w"]){

            this.y -= this.speed;
            this.direction = "up";

        }

        if(keys["s"]){

            this.y += this.speed;
            this.direction = "down";

        }

        if(keys["a"]){

            this.x -= this.speed;
            this.direction = "left";

        }

        if(keys["d"]){

            this.x += this.speed;
            this.direction = "right";

        }

        // =========================
        // LIMITES DEL MAPA
        // =========================

        if(this.x < 0){

            this.x = 0;

        }

        if(this.y < 0){

            this.y = 0;

        }

        if(this.x + this.width > map.width){

            this.x = map.width - this.width;

        }

        if(this.y + this.height > map.height){

            this.y = map.height - this.height;

        }

        // =========================
        // COLISION MUROS
        // =========================

        map.walls.forEach(wall=>{

            if(

                this.x < wall.x + wall.width &&
                this.x + this.width > wall.x &&
                this.y < wall.y + wall.height &&
                this.y + this.height > wall.y

            ){

                this.x = oldX;
                this.y = oldY;

            }

        });

    }

    draw(ctx,camera){

        let x = this.x - camera.x;
        let y = this.y - camera.y;

        // sombra

        ctx.fillStyle = "rgba(0,0,0,0.35)";

        ctx.beginPath();

        ctx.ellipse(
            x+24,
            y+54,
            22,
            10,
            0,
            0,
            Math.PI*2
        );

        ctx.fill();

        // piernas

        ctx.fillStyle = "#5e3b1b";

        ctx.fillRect(x+12,y+32,10,18);
        ctx.fillRect(x+26,y+32,10,18);

        // cuerpo

        ctx.fillStyle = "#ffcc00";

        ctx.fillRect(x+8,y+10,32,30);

        // capa

        ctx.fillStyle = "#8b0000";

        ctx.fillRect(x+14,y+14,20,24);

        // cabeza

        ctx.fillStyle = "#f1c27d";

        ctx.beginPath();

        ctx.arc(
            x+24,
            y+2,
            11,
            0,
            Math.PI*2
        );

        ctx.fill();

        // espada

        ctx.fillStyle = "#cccccc";

        if(this.direction === "right"){

            ctx.fillRect(x+42,y+20,22,4);

        }

        if(this.direction === "left"){

            ctx.fillRect(x-18,y+20,22,4);

        }

        if(this.direction === "up"){

            ctx.fillRect(x+22,y-18,4,22);

        }

        if(this.direction === "down"){

            ctx.fillRect(x+22,y+42,4,22);

        }

        // vida fondo

        ctx.fillStyle = "#000";

        ctx.fillRect(
            x,
            y-16,
            48,
            6
        );

        // vida

        ctx.fillStyle = "lime";

        ctx.fillRect(
            x,
            y-16,
            48 * (this.life / this.maxLife),
            6
        );

    }

}