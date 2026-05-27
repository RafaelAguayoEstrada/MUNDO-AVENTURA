import { Player } from "./engine/player.js";
import { Camera } from "./engine/camera.js";
import { Enemy } from "./engine/enemies.js";
import { Map } from "./engine/map.js";
import { drawUI } from "./engine/ui.js";

// ==========================
// CANVAS
// ==========================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

// ==========================
// ALERTAS
// ==========================

const alertBox =
document.getElementById("gameAlert");

let alertCooldown = 0;

function showAlert(message, type = "warning") {

    if (alertCooldown > 0) return;

    alertCooldown = 120;

    alertBox.className =
        `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3`;

    alertBox.innerHTML = message;

    alertBox.classList.remove("d-none");

    setTimeout(() => {

        alertBox.classList.add("d-none");

    }, 2000);

}

// ==========================
// GAME OVER
// ==========================

const gameOverScreen =
document.createElement("div");

gameOverScreen.innerHTML = `

<div id="gameOverMenu"
style="
position:fixed;
inset:0;
background:rgba(0,0,0,0.85);
display:none;
justify-content:center;
align-items:center;
z-index:99999;
">

<div style="
width:500px;
background:#1b1b1b;
border:4px solid red;
border-radius:20px;
padding:40px;
text-align:center;
color:white;
">

<h1 style="
font-size:60px;
color:red;
margin-bottom:20px;
">

💀 GAME OVER

</h1>

<button id="restartBtn"
class="btn btn-danger btn-lg mb-3"
style="width:100%;">

Reiniciar Nivel

</button>

<button id="menuBtn"
class="btn btn-warning btn-lg"
style="width:100%;">

Volver al Menú

</button>

</div>

</div>

`;

document.body.appendChild(gameOverScreen);

const gameOverMenu =
document.getElementById("gameOverMenu");

const restartBtn =
document.getElementById("restartBtn");

const menuBtn =
document.getElementById("menuBtn");

// ==========================
// MENU PUERTA
// ==========================

const doorMenu =
document.getElementById("doorMenu");

const continueLevel =
document.getElementById("continueLevel");

const backMenu =
document.getElementById("backMenu");

let pendingLevel = null;

// ==========================
// AUDIO
// ==========================

const worldMusic =
document.getElementById("worldMusic");

worldMusic.volume = 0.35;

worldMusic.play().catch(() => {});

// ==========================
// TECLADO
// ==========================

const keys = {};

window.addEventListener("keydown", (e) => {

    keys[e.key.toLowerCase()] = true;

});

window.addEventListener("keyup", (e) => {

    keys[e.key.toLowerCase()] = false;

});

// ==========================
// OBJETOS
// ==========================

const player = new Player(2400, 2200);

player.life = 90;
player.maxLife = 90;
player.keys = 0;

const camera = new Camera();

const map = new Map();

let enemies = [];

let currentLevel = "castle";

let gameOver = false;

// ==========================
// CREAR ENEMIGOS
// ==========================

function createEnemies(amount, speed, damage) {

    enemies = [];

    for (let i = 0; i < amount; i++) {

        const enemy = new Enemy(

            1000 + Math.random() * 3000,
            1000 + Math.random() * 3000

        );

        enemy.speed = speed;

        enemy.damage = damage;

        enemy.life = 100;
        enemy.maxLife = 100;

        enemies.push(enemy);

    }

}

// ==========================
// ENEMIGOS INICIALES
// ==========================

createEnemies(30, 3.5, 0.8);

// ==========================
// GUARDAR
// ==========================

function saveProgress() {

    localStorage.setItem(
        "playerCoins",
        player.coins
    );

    localStorage.setItem(
        "playerXP",
        player.xp
    );

    localStorage.setItem(
        "playerLevel",
        player.level
    );

}

// ==========================
// MENU PUERTA
// ==========================

function openDoorMenu(levelName) {

    pendingLevel = levelName;

    doorMenu.classList.remove("d-none");

}

continueLevel.addEventListener("click", () => {

    doorMenu.classList.add("d-none");

    if (pendingLevel === "forest") {

        loadForestWorld();

    }

    if (pendingLevel === "ice") {

        loadIceWorld();

    }

    if (pendingLevel === "dungeon") {

        loadDungeonWorld();

    }

});

backMenu.addEventListener("click", () => {

    saveProgress();

    window.location.href =
        "../index.html#menu";

});

// ==========================
// GAME OVER
// ==========================

restartBtn.addEventListener("click", () => {

    gameOver = false;

    gameOverMenu.style.display = "none";

    player.life = player.maxLife;

    if (currentLevel === "castle") {

        player.x = 2400;
        player.y = 2200;

        createEnemies(30, 3.5, 0.8);

    }

    if (currentLevel === "forest") {

        loadForestWorld();

    }

    if (currentLevel === "ice") {

        loadIceWorld();

    }

    if (currentLevel === "dungeon") {

        loadDungeonWorld();

    }

});

menuBtn.addEventListener("click", () => {

    saveProgress();

    window.location.href =
        "../index.html#menu";

});

// ==========================
// ATAQUE
// ==========================

window.addEventListener("keydown", (e) => {

    if (e.code === "Space") {

        enemies.forEach(enemy => {

            if (enemy.dead) return;

            let dx = enemy.x - player.x;
            let dy = enemy.y - player.y;

            let distance =
                Math.hypot(dx, dy);

            if (distance < 100) {

                enemy.life -= 25;

                if (enemy.life <= 0) {

                    enemy.dead = true;

                    // MENOS PUNTOS

                    player.coins += 2;

                    player.xp += 8;

                    showAlert(
                        "⚔️ Enemigo derrotado",
                        "success"
                    );

                    // SUBIR NIVEL

                    if (player.xp >= 100) {

                        player.level++;

                        player.xp = 0;

                        player.maxLife += 8;

                        player.life =
                            player.maxLife;

                        showAlert(
                            "⭐ Subiste de nivel",
                            "primary"
                        );

                    }

                }

            }

        });

    }

});

// ==========================
// COLISION
// ==========================

function checkCollision(a, b) {

    return (

        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y

    );

}

// ==========================
// WORLDS
// ==========================

function resetCoins() {

    map.coins.forEach(coin => {

        coin.collected = false;

    });

}

// ==========================
// FOREST
// ==========================

function loadForestWorld() {

    currentLevel = "forest";

    map.currentWorld = "forest";

    player.x = 2500;
    player.y = 2500;

    // LLAVE

    map.key.collected = false;

    map.key.x = 3200;
    map.key.y = 3400;

    resetCoins();

    createEnemies(50, 4.5, 1.1);

    showAlert(
        "🌲 FOREST WORLD",
        "success"
    );

}

// ==========================
// ICE
// ==========================

function loadIceWorld() {

    currentLevel = "ice";

    map.currentWorld = "ice";

    player.x = 2500;
    player.y = 2500;

    // LLAVE

    map.key.collected = false;

    map.key.x = 3800;
    map.key.y = 2500;

    resetCoins();

    createEnemies(75, 5.5, 1.7);

    showAlert(
        "❄️ ICE WORLD",
        "info"
    );

}

// ==========================
// DUNGEON
// ==========================

function loadDungeonWorld() {

    currentLevel = "dungeon";

    map.currentWorld = "dungeon";

    player.x = 2500;
    player.y = 2500;

    // LLAVE

    map.key.collected = false;

    map.key.x = 4200;
    map.key.y = 4200;

    resetCoins();

    createEnemies(100, 6.5, 2.5);

    showAlert(
        "🔥 DUNGEON WORLD",
        "danger"
    );

}

// ==========================
// UPDATE
// ==========================

function update() {

    if (gameOver) return;

    if (alertCooldown > 0) {

        alertCooldown--;

    }

    // PLAYER

    player.update(keys, map);

    // CAMERA

    camera.update(player, canvas);

    // ENEMIGOS

    enemies.forEach(enemy => {

        enemy.update(player);

        if (enemy.dead) return;

        let dx = player.x - enemy.x;
        let dy = player.y - enemy.y;

        let distance =
            Math.hypot(dx, dy);

        if (distance < 45) {

            player.life -=
                enemy.damage * 0.025;

        }

    });

    // MUERTE

    if (player.life <= 0) {

        player.life = 0;

        gameOver = true;

        gameOverMenu.style.display =
            "flex";

    }

    // MONEDAS

    map.coins.forEach(coin => {

        if (coin.collected) return;

        let dx = coin.x - player.x;
        let dy = coin.y - player.y;

        let distance =
            Math.hypot(dx, dy);

        if (distance < 40) {

            coin.collected = true;

            player.coins += 1;

        }

    });

    // LLAVE

    if (!map.key.collected) {

        let dx = map.key.x - player.x;
        let dy = map.key.y - player.y;

        let distance =
            Math.hypot(dx, dy);

        if (distance < 50) {

            map.key.collected = true;

            player.keys++;

            showAlert(
                "🔑 Nueva llave",
                "success"
            );

        }

    }

    // ==========================
    // FOREST
    // ==========================

    if (

        map.currentWorld === "castle" &&
        checkCollision(player, map.forestDoor)

    ) {

        if (player.keys >= 1) {

            openDoorMenu("forest");

        }

    }

    // ==========================
    // ICE
    // ==========================

    if (

        map.currentWorld === "forest" &&
        checkCollision(player, map.iceDoor)

    ) {

        if (player.keys >= 2) {

            openDoorMenu("ice");

        }

    }

    // ==========================
    // DUNGEON
    // ==========================

    if (

        map.currentWorld === "ice" &&
        checkCollision(player, map.dungeonDoor)

    ) {

        if (player.keys >= 3) {

            openDoorMenu("dungeon");

        }

    }

}

// ==========================
// RENDER
// ==========================

function render() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // MAPA

    map.draw(ctx, camera);

    // ENEMIGOS

    enemies.forEach(enemy => {

        enemy.draw(ctx, camera);

    });

    // PLAYER

    player.draw(ctx, camera);

    // NIEBLAS

    if (map.currentWorld === "forest") {

        ctx.fillStyle =
            "rgba(0,40,0,0.35)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }

    if (map.currentWorld === "ice") {

        ctx.fillStyle =
            "rgba(180,220,255,0.25)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }

    if (map.currentWorld === "dungeon") {

        ctx.fillStyle =
            "rgba(120,0,0,0.45)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }

    // UI

    drawUI(ctx, player);

}

// ==========================
// LOOP
// ==========================

function loop() {

    update();

    render();

    requestAnimationFrame(loop);

}

loop();