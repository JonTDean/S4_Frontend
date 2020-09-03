class PreloadGame extends Phaser.Scene{
    constructor(){
        super("PreloadGame");
    }

    preload(){
        // Handles Image Loading
        // NOTE FOR LATER:
        // The paths have to be loaded relative to their location 
        // not from the js file but from the HTML file.
        // Background Images
        this.load.image("bg", "assets/demon_woods/bg.png");
        this.load.image("trees_bg", "assets/demon_woods/demon_trees_bg.png");
        this.load.image("trees_mg", "assets/demon_woods/demon_trees_mg.png");
        this.load.image("trees_fg","assets/demon_woods/demon_trees_fg.png");
        this.load.image("ground", "assets/demon_woods/ground_demon.png")
        this.load.image("ground_full", "assets/demon_woods/ground_demon_full.png")
        this.load.image("gate_front", "assets/gate_front.png");
        this.load.image("gate_back", "assets/gate_back.png");
        
        // Portal Images
        this.load.spritesheet("portal_open", "assets/portal/portal_open.png", {
            frameWidth:64,
            frameHeight:64
        });
        this.load.spritesheet("portal_opening", "assets/portal/portal_opening.png", {
            frameWidth:64,
            frameHeight:64
        });
        this.load.spritesheet("portal_closing", "assets/portal/portal_closing.png", {
            frameWidth:64,
            frameHeight:64
        });

        // Handles SpriteSheet Loading
        // Player Idle
        this.load.spritesheet("playerIdle","assets/warrior_sprites/idle.png",{
            frameWidth:160,
            frameHeight:106
        });
        
        // Player Run
        this.load.spritesheet("playerRun","assets/warrior_sprites/Run.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Player Attack 1
        this.load.spritesheet("playerAttack1","assets/warrior_sprites/Attack1.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Player Attack 2
        this.load.spritesheet("playerAttack2","assets/warrior_sprites/Attack2.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Player Attack 3
        this.load.spritesheet("playerAttack3","assets/warrior_sprites/Attack3.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Player Jump
        this.load.spritesheet("playerJump","assets/warrior_sprites/Jump.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Player Fall
        this.load.spritesheet("playerFall","assets/warrior_sprites/Fall.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Player Get Hit Silhouette
        this.load.spritesheet("playerIsHit","assets/warrior_sprites/Take_Hit_Silhouette.png",{
            frameWidth:160,
            frameHeight:106
        });
        
        // Player Death
        this.load.spritesheet("playerDeath","assets/warrior_sprites/Death.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Enemy Animations
        // Skeleton
        // Idle
        this.load.spritesheet("skeletonIdle", "assets/Monsters_Creatures_Fantasy/Skeleton/Idle.png", {
            frameWidth:150,
            frameHeight:150
        })

        // Walk
        this.load.spritesheet("skeletonWalk", "assets/Monsters_Creatures_Fantasy/Skeleton/Walk.png", {
            frameWidth:150,
            frameHeight:150
        })

        // Attack 1
        this.load.spritesheet("skeletonAttack1", "assets/Monsters_Creatures_Fantasy/Skeleton/Attack1.png", {
            frameWidth:150,
            frameHeight:150
        })

        // Attack 2
        this.load.spritesheet("skeletonAttack2", "assets/Monsters_Creatures_Fantasy/Skeleton/Attack2.png", {
            frameWidth:150,
            frameHeight:150
        })

        // Shield
        this.load.spritesheet("skeletonShield", "assets/Monsters_Creatures_Fantasy/Skeleton/Shield.png", {
            frameWidth:150,
            frameHeight:150
        })

        // Take Hit
        this.load.spritesheet("skeletonTakeHit", "assets/Monsters_Creatures_Fantasy/Skeleton/Take_Hit.png", {
            frameWidth:150,
            frameHeight:150
        })

        // Death
        this.load.spritesheet("skeletonDeath", "assets/Monsters_Creatures_Fantasy/Skeleton/Death.png", {
            frameWidth:150,
            frameHeight:150
        })
    }

    create(){
        this.scene.start("PlayGame");
    }
}