export class Camera {

    constructor() {

        this.x = 0;
        this.y = 0;

    }

    update(player, canvas) {

        // centrar jugador

        const targetX =
            player.x - canvas.width / 2 + player.width / 2;

        const targetY =
            player.y - canvas.height / 2 + player.height / 2;

        // suavizado cámara

        this.x += (targetX - this.x) * 0.08;
        this.y += (targetY - this.y) * 0.08;

    }

}