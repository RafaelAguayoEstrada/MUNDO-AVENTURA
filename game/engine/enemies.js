export class Enemy{

    constructor(x,y){

        this.x = x;
        this.y = y;

        this.width = 42;
        this.height = 42;

        this.life = 100;
        this.maxLife = 100;

        this.speed = 2;

        this.dead = false;

        // IA

        this.attackCooldown = 0;

        this.damage = 0.3;

    }

    update(player){

        if(this.dead) return;

        let dx = player.x - this.x;
        let dy = player.y - this.y;

        let distance = Math.hypot(dx,dy);

        // persecución avanzada

        if(distance < 700){

            this.x += dx / distance * this.speed;
            this.y += dy / distance * this.speed;

        }

        // ataque

        if(distance < 50){

            if(this.attackCooldown <= 0){

                player.life -= this.damage;

                this.attackCooldown = 20;

            }

        }

        // cooldown

        if(this.attackCooldown > 0){

            this.attackCooldown--;

        }

    }

    draw(ctx,camera){

        if(this.dead) return;

        let x = this.x - camera.x;
        let y = this.y - camera.y;

        // sombra

        ctx.fillStyle = "rgba(0,0,0,0.35)";

        ctx.beginPath();

        ctx.ellipse(
            x+21,
            y+48,
            18,
            10,
            0,
            0,
            Math.PI*2
        );

        ctx.fill();

        // piernas

        ctx.fillStyle = "#2a0a0a";

        ctx.fillRect(x+10,y+28,8,16);
        ctx.fillRect(x+24,y+28,8,16);

        // cuerpo

        ctx.fillStyle = "#7a0000";

        ctx.fillRect(x+8,y+10,26,26);

        // hombros

        ctx.fillStyle = "#500000";

        ctx.fillRect(x+4,y+14,8,10);
        ctx.fillRect(x+30,y+14,8,10);

        // cabeza

        ctx.fillStyle = "#ffb27a";

        ctx.beginPath();

        ctx.arc(
            x+21,
            y+2,
            10,
            0,
            Math.PI*2
        );

        ctx.fill();

        // ojos

        ctx.fillStyle = "red";

        ctx.fillRect(x+16,y,3,3);
        ctx.fillRect(x+23,y,3,3);

        // vida

        ctx.fillStyle = "#000";

        ctx.fillRect(
            x,
            y-14,
            42,
            5
        );

        ctx.fillStyle = "red";

        ctx.fillRect(
            x,
            y-14,
            42 * (this.life / this.maxLife),
            5
        );

    }

}