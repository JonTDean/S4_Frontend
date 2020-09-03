let game;

// Loads up the game data
window.onload = function(){
    let gameConfig = {
        type: Phaser.WEBGL,
        width: 800,
        height: 400,
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                // debug: true,
                gravity: {
                    y: 0
                },
                checkCollision: {
                    up: true,
                    down: true,
                    left: true,
                    right: true
                },
                fps: 144,
                isPaused: false
            }
        },
        scene: [PreloadGame, PlayGame],
        parent: document.querySelector('div#mainDiv')// Appends Container to Canvas
    }

    
    
    game = new Phaser.Game(gameConfig);
}