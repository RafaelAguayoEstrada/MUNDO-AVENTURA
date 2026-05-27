export class Map {

    constructor() {

        // =========================
        // TAMAÑO MAPA
        // =========================

        this.width = 5000;
        this.height = 5000;

        this.currentWorld = "castle";

        // =========================
        // ÁRBOLES
        // =========================

        this.trees = [];

        for(let i=0;i<120;i++){

            this.trees.push({

                x: Math.random()*this.width,
                y: Math.random()*this.height

            });

        }

        // =========================
        // MONEDAS
        // =========================

        this.coins = [];

        for(let i=0;i<25;i++){

            this.coins.push({

                x:1000 + Math.random()*3000,
                y:1000 + Math.random()*3000,
                collected:false

            });

        }

        // =========================
        // MUROS MAPA
        // =========================

        this.walls = [];

        // =========================
        // PUERTAS
        // =========================

        this.forestDoor = {

            x:4200,
            y:2400,
            width:120,
            height:220

        };

        this.iceDoor = {

            x:2400,
            y:700,
            width:220,
            height:120

        };

        this.dungeonDoor = {

            x:650,
            y:2400,
            width:120,
            height:220

        };

        // =========================
        // LLAVE
        // =========================

        this.key = {

            x:2500,
            y:3000,
            collected:false

        };

    }

    draw(ctx,camera){

        // =========================
        // SUELO
        // =========================

        if(this.currentWorld === "castle"){

            ctx.fillStyle = "#2f6b2f";

        }

        if(this.currentWorld === "forest"){

            ctx.fillStyle = "#1f4d1f";

        }

        if(this.currentWorld === "ice"){

            ctx.fillStyle = "#8fd3ff";

        }

        if(this.currentWorld === "dungeon"){

            ctx.fillStyle = "#1a0000";

        }

        ctx.fillRect(
            -camera.x,
            -camera.y,
            this.width,
            this.height
        );

        // =========================
        // CAMINOS
        // =========================

        ctx.fillStyle = "#9e8358";

        ctx.fillRect(
            2000-camera.x,
            -camera.y,
            1000,
            this.height
        );

        ctx.fillRect(
            -camera.x,
            2000-camera.y,
            this.width,
            1000
        );

        // =========================
        // CASTILLO
        // =========================

        ctx.fillStyle = "#555";

        ctx.fillRect(
            1500-camera.x,
            1500-camera.y,
            2000,
            2000
        );

        // =========================
        // TORRES
        // =========================

        ctx.fillStyle = "#3b3b3b";

        ctx.fillRect(
            1350-camera.x,
            1350-camera.y,
            250,
            250
        );

        ctx.fillRect(
            3400-camera.x,
            1350-camera.y,
            250,
            250
        );

        ctx.fillRect(
            1350-camera.x,
            3400-camera.y,
            250,
            250
        );

        ctx.fillRect(
            3400-camera.x,
            3400-camera.y,
            250,
            250
        );

        // =========================
        // PUERTA FOREST
        // =========================

        ctx.fillStyle = "#3d220f";

        ctx.fillRect(
            this.forestDoor.x-10-camera.x,
            this.forestDoor.y-10-camera.y,
            140,
            240
        );

        ctx.fillStyle = "#145214";

        ctx.fillRect(
            this.forestDoor.x-camera.x,
            this.forestDoor.y-camera.y,
            this.forestDoor.width,
            this.forestDoor.height
        );

        // =========================
        // PUERTA ICE
        // =========================

        ctx.fillStyle = "#3d220f";

        ctx.fillRect(
            this.iceDoor.x-10-camera.x,
            this.iceDoor.y-10-camera.y,
            240,
            140
        );

        ctx.fillStyle = "#5bc0ff";

        ctx.fillRect(
            this.iceDoor.x-camera.x,
            this.iceDoor.y-camera.y,
            this.iceDoor.width,
            this.iceDoor.height
        );

        // =========================
        // PUERTA DUNGEON
        // =========================

        ctx.fillStyle = "#3d220f";

        ctx.fillRect(
            this.dungeonDoor.x-10-camera.x,
            this.dungeonDoor.y-10-camera.y,
            140,
            240
        );

        ctx.fillStyle = "#7a0000";

        ctx.fillRect(
            this.dungeonDoor.x-camera.x,
            this.dungeonDoor.y-camera.y,
            this.dungeonDoor.width,
            this.dungeonDoor.height
        );

        // =========================
        // ÁRBOLES
        // =========================

        this.trees.forEach(tree=>{

            // tronco

            ctx.fillStyle = "#5c3b1e";

            ctx.fillRect(
                tree.x-camera.x,
                tree.y-camera.y,
                12,
                30
            );

            // hojas

            ctx.fillStyle = "#1f5f1f";

            ctx.beginPath();

            ctx.arc(
                tree.x+6-camera.x,
                tree.y-10-camera.y,
                25,
                0,
                Math.PI*2
            );

            ctx.fill();

        });

        // =========================
        // MONEDAS
        // =========================

        this.coins.forEach(coin=>{

            if(coin.collected) return;

            ctx.fillStyle = "gold";

            ctx.beginPath();

            ctx.arc(
                coin.x-camera.x,
                coin.y-camera.y,
                8,
                0,
                Math.PI*2
            );

            ctx.fill();

        });

        // =========================
        // LLAVE
        // =========================

        if(!this.key.collected){

            ctx.fillStyle = "gold";

            ctx.fillRect(
                this.key.x-camera.x,
                this.key.y-camera.y,
                30,
                10
            );

            ctx.beginPath();

            ctx.arc(
                this.key.x+30-camera.x,
                this.key.y+5-camera.y,
                8,
                0,
                Math.PI*2
            );

            ctx.fill();

        }

        // =========================
        // BORDE MAPA
        // =========================

        ctx.strokeStyle = "#000";

        ctx.lineWidth = 20;

        ctx.strokeRect(
            -camera.x,
            -camera.y,
            this.width,
            this.height
        );

    }

}