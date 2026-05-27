export function drawUI(ctx,player){

    ctx.fillStyle = "rgba(0,0,0,0.45)";

    ctx.fillRect(20,20,360,210);

    ctx.strokeStyle = "#c9a227";

    ctx.lineWidth = 4;

    ctx.strokeRect(20,20,360,210);

    ctx.fillStyle = "#ffd700";

    ctx.font = "bold 28px Arial";

    ctx.fillText("MUNDO AVENTURA",40,55);

    ctx.fillStyle = "white";

    ctx.font = "24px Arial";

    ctx.fillText("❤️ Vida: " + Math.floor(player.life),40,95);
    ctx.fillText("⭐ Nivel: " + player.level,40,125);
    ctx.fillText("✨ XP: " + player.xp,40,155);
    ctx.fillText("🪙 Monedas: " + player.coins,40,185);
    ctx.fillText("🔑 Llaves: " + player.keys,40,215);

}