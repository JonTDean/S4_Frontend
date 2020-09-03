class PlayGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }


    create(){
        this.physics.world.setBounds(game.config.width, game.config.height)
        this.animationComplete = true;
        this.facingRight = false;
        this.facingLeft = false;
        this.scene.run('game-ui')
        this.isHit = false;
        this.skeletonHit = false;
        this.timerDate = new Date();
        this.seconds = this.timerDate.getSeconds() / 6000;
        this.timerSeconds = this.timerDate.getSeconds()
        this.playerIsAlive = true;
        this.skeletonIsAlive = true;

        // Backest Background, typeOf::Background
        this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg");
        this.bg_1.setOrigin(0, 0); //set its pivot to top left corner
        this.bg_1.setScrollFactor(0); // Doesn't move with camera only on Update()

        // Background of Trees typeOf::Far_Focus
        this.bg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "trees_bg");
        this.bg_2.setOrigin(0, 0); //set its pivot to top left corner
        this.bg_2.setScrollFactor(0);

        // Background of Trees typeOf::Mid_Focus
        this.bg_3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "trees_mg");
        this.bg_3.setOrigin(0, 0); //set its pivot to top left corner
        this.bg_3.setScrollFactor(0);

        // Background of Trees typeOf::Close_Focus
        this.bg_4 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "trees_fg");
        this.bg_4.setOrigin(0, 0); //set its pivot to top left corner
        this.bg_4.setScrollFactor(0);

        // Castle Gate 
        this.castle_back = this.add.tileSprite(0, 0, 0, 0, "gate_back");
        this.castle_back.setOrigin(0, 0);
        this.castle_back.displayHeight = game.config.height;
        this.castle_back.y = -60;

        this.castle_front = this.add.tileSprite(0, 0, 0, 0, "gate_front");
        this.castle_front.setOrigin(0, 0);
        this.castle_front.displayHeight = game.config.height;
        this.castle_front.y = -60;
        this.castle_front.depth = 2

        // Ground for the player to stand on
        this.ground = this.physics.add.sprite(0, game.config.height *.95, "ground_full");
        // this.physics.add.existing(this.ground); // Add the ground tiles as a physics object.
        this.ground.setImmovable(true);
        this.ground.displayWidth = game.config.width * 3
        this.ground.setOrigin(0, 0);
        this.ground.setSize(this.ground.width, 160);
        // this.ground.setScrollFactor(0);
        // Position the tile at the bottom of the page
        this.ground.y = 24 * 12;

        //Portal Sprite
        this.portal = this.physics.add.sprite(0, 0, "portal_open");
        this.portal.setImmovable(true);
        this.portal.setOrigin(0, 0);
        this.portal.displayHeight = game.config.height;
        this.portal.displayWidth = 128;
        this.portal.x = 2300;
        this.portal.y = -50;

        // Player sprite
        this.player = this.physics.add.sprite(game.config.width * 1.5, game.config.height / 2, "playerIdle");
        this.player.name = "Player";
        this.player.setSize(40, 56, true);
        this.player.body.offset.y = 50; // Adjusts collision box
        this.player.setGravityY(150);
        this.player.x = 75; // Default Player Position
        // this.player.x = 2000;  //  Debug Player Position
        this.player.y = 253;
        // Player Healthbar
        this.player.HPValue = 5000;
        this.player.HPText = this.add.text(0, 0, `Health: ${this.player.HPValue}`, {fontSize: '26px', color: '#fff'});

        this.player.collideWorldBound = true;
        this.physics.collide(this.player, this.worldBounds, () => {
            counsole.log("Player Hit World Bound!");
        });


        // ENEMIES
        this.skeleton = this.physics.add.sprite(2200, 200, 'skeletonIdle');
        this.skeletonName = (this.skeleton.name = "Skeleking");
        this.skeleton.setSize(65, 56, true);
        this.skeleton.setGravityY(100);
        // Skeleton Healthbar
        this.skeleton.HPValue = 47500; // Base 45000
        this.skeleton.HPText = this.add.text(0, 0, `Health: ${this.skeleton.HPValue}`, {fontSize: '26px', color: '#fff'});

        // Colliders
        // Set a collider between the player and the ground
        // this.enemyColliding = function(colliding="false"){
        //     return colliding
        // };
        this.portalCollision = false;
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.portal, function(){
            this.portalCollision = true
        });
        this.physics.add.collider(this.skeleton, this.ground);
        this.physics.add.collider(this.skeleton, this.portal);
        // this.physics.add.collider(this.skeleton, this.player);
        this.physics.add.overlap(this.skeleton, this.player);

  

        // Animations 
        // Player
        // Idle Animation
        this.anims.create({
            key: "playerIdle",
            frames: this.anims.generateFrameNumbers("playerIdle"),
            frameRate: 10,
            repeat: -1
        });

        // Running Animation
        this.anims.create({
            key: "playerRun",
            frames: this.anims.generateFrameNumbers("playerRun"),
            frameRate: 20,
            repeat: -1
        })
        
        // Jumping Animation
        this.anims.create({
            key: "playerJump",
            frames: this.anims.generateFrameNumbers("playerJump"),
            frameRate: 10,
            repeat: -1
        })

        // Falling Animation
        this.anims.create({
            key: "playerFall",
            frames: this.anims.generateFrameNumbers("playerFall"),
            frameRate: 10,
            repeat: -1
        })
        
        // TakeHitAnimation
        this.anims.create({
            key: "playerIsHit",
            frames: this.anims.generateFrameNumbers("playerIsHit"),
            frameRate: 10,
            repeat: -1
        })

        // Light Attack Animation
        this.anims.create({
            key: "playerLightAttack",
            frames: this.anims.generateFrameNumbers("playerAttack1"),
            frameRate: 10,
            repeat: 1
        })

        // Heavy Attack Animation
        this.anims.create({
            key: "playerHeavyAttack",
            frames: this.anims.generateFrameNumbers("playerAttack2"),
            frameRate: 8,
            repeat: 1
        })

        // Super Attack Animation
        this.anims.create({
            key: "playerSuper",
            frames: this.anims.generateFrameNumbers("playerAttack3"),
            frameRate: 8,
            repeat: 1
        })

        // Enemies
        // Skeleton
        // Skeleton Idle Animation
        this.anims.create({
            key: "skeletonIdle",
            frames: this.anims.generateFrameNumbers("skeletonIdle"),
            frameRate: 8,
            repeat: -1
        })

        //Skeleton Walk Animation
        this.anims.create({
            key: "skeletonWalk",
            frames: this.anims.generateFrameNumbers("skeletonWalk"),
            frameRate: 8,
            repeat: -1
        })

        //Skeleton Attack1 Animation
        this.anims.create({
            key: "skeletonAttack1",
            frames: this.anims.generateFrameNumbers("skeletonAttack1"),
            frameRate: 8,
            repeat: -1
        })

        //Skeleton Attack2 Animation
        this.anims.create({
            key: "skeletonAttack2",
            frames: this.anims.generateFrameNumbers("skeletonAttack2"),
            frameRate: 8,
            repeat: -1
        })

        // Environment 
        // Portal
        // Portal Opened Animation
        this.anims.create({
            key: "opened",
            frames: this.anims.generateFrameNumbers("portal_open"),
            frameRate: 10,
            repeat: -1
        });

        // Persistent Animation Area
        // Portal Animation start
        this.portal.play("opened");
           
        // Camera Stuff For Parallax
        // allow key inputs to control the player
        this.cursors = this.input.keyboard.createCursorKeys();
    
        // set workd bounds to allow camera to follow the player
        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

        // making the camera follow the player
        this.myCam.startFollow(this.player);
        // console.dir(this.myCam);

        // Timer Set for game over
        this.timedEvent = 60; // Base: 60
        this.timedEventText = this.add.text(32, 32, `Countdown: ${this.timedEvent}`);
        // console.log(this.myCam)

        // Score for game points
        this.score = 0;
        this.scoreText = this.add.text(64, 64, `Score: ${this.score}`);

        // Text for name
        this.skeletonNameText = this.add.text(64, 64, `${this.skeletonName}`);
    }

    update() {
        // console.log(this.player.body.touching);
        let touching = this.player.body.touching;
        const aLeft = this.input.keyboard.addKey('a');
        // const sDown  = this.input.keyboard.addKey('s');
        const dRight = this.input.keyboard.addKey('d');
        const wUp = this.input.keyboard.addKey('w');
        const o_LightAttack = this.input.keyboard.addKey('o');
        const p_HeavyAttack = this.input.keyboard.addKey('p');
        const k_Super = this.input.keyboard.addKey('k');
        this.playerDamage;
        this.player.setGravityY(150);

        // Distance between skeleton and player
        let skeletonDistance = this.skeleton.x - this.player.x;
        
        // Timer text update
        this.timedEventText.x = this.myCam._scrollX;
        this.timedEventText.y = this.myCam._scrollY;
        this.timedEvent -= this.seconds;
        this.timedEventText.setText(`Countdown: ${(this.timedEvent).toFixed(2)}`);
        
        // Score text update
        this.scoreText.x = this.myCam._scrollX;
        this.scoreText.y = this.myCam._scrollY + 50;
        this.scoreText.setText(`Score: ${this.score}`)

        // console.log(`Event.progress:  ${this.timedEvent.getProgress()}`)
        // console.log(this.myCam._scrollX) // Main X on cam
        // console.log(this.myCam._scrollY) // Main Y on cam

        // Skeleton Health
        this.skeleton.HPText.x = this.skeleton.x - 100;
        this.skeleton.HPText.y = this.skeleton.y - 100;
            // Skeleton Name
            this.skeletonNameText.x = this.skeleton.x - 50;
            this.skeletonNameText.y = this.skeleton.y - 125;

        if(this.skeletonHit == true){
            this.skeleton.HPValue -= this.playerDamage;
            this.skeleton.HPText.setText(`Health: ${this.skeleton.HPValue}`);
            this.skeletonHit == false;
            // console.log(this.skeleton.HPValue)
        }

        if (this.timerSeconds > 2){
            this.skeletonHit = false;
        }

        // Player Health
        this.player.HPText.x = this.player.x - 100
        this.player.HPText.y = this.player.y - 50

        if(this.isHit == true){
            this.player.HPValue -= 1;
            this.player.HPText.setText(`Health: ${this.player.HPValue}`);
            this.isHit == false;
            // console.log(this.player.HPValue)
        }

        // Player Movement
        // move the player when the arrow keys are pressed
        if ((this.cursors.left.isDown || aLeft.isDown) && !touching.left) {
            // console.log(this.player.HPValue);
            this.facingRight = false;
            this.facingLeft = true;
            
            this.animationComplete = false;
            this.player.setVelocityX(-190);       // Moves negatively across the X-axis
            this.player.flipX = true;   // Flips model to the left
            this.player.play("playerRun", true);
            // Edge Check
            if (this.player.x < 50){
                this.player.setVelocityX(0);
            }

            // Jump While Running
            if ((this.cursors.up.isDown  || wUp.isDown) && touching.down){
                this.player.play("playerJump", true)
                this.player.setVelocityY(-140);     // Moves positively across the Y-axis
            }else if (!touching.down){
                this.player.play("playerJump", true)
                if (this.player.body.velocity.y > 0){
                    this.player.play("playerFall", true)
                }
                // console.log(this.player.body.velocity.y)
            }
                                                                         // - 20 to not pass the edge of map
        } else if ((this.cursors.right.isDown || dRight.isDown) && this.player.x < game.config.width * 3 - 20 && !touching.right) {
            this.facingLeft = false;
            this.facingRight = true;

            this.animationComplete = false;
            this.player.setVelocityX(190);       // Moves positively across the X-axis
            this.player.flipX = false;  // Flips model to the right
            this.player.play("playerRun", true);
            // Edge Check
            if (this.player.x >  game.config.width * 3 - 40){
                this.player.setVelocityX(0);
            }

            // Jump While Running
            if ((this.cursors.up.isDown  || wUp.isDown) && touching.down){
                this.player.play("playerJump", true)
                this.player.setVelocityY(-180);     // Moves positively across the Y-axis
            } else if (!touching.down){
                this.player.play("playerJump", true)
                if (this.player.body.velocity.y > 0){
                    this.player.play("playerFall", true)
                }
                // console.log(this.player.body.velocity.y)

            }

        // No Idea what this does
        } else if ((this.cursors.up.isDown  || wUp.isDown) && touching.down){
            this.player.setVelocityY(-140);     // Moves positively across the Y-axis
            
        // No Idea what this does
        } else if (!touching.down){
            this.player.play("playerJump", true)
            if (this.player.body.velocity.y > 0){
                this.player.play("playerFall", true)
            }
            // console.log(this.player.body.velocity.y)

    // ATTACKS================================
        } else if (o_LightAttack.isDown){
            this.animationComplete = false;




            this.player.play("playerLightAttack", true);
            this.player.setVelocityX(0);
            this.player.setSize(100, 56);
            this.player.body.offset.y = 50; // Adjusts collision box
            // Direction Checks
            if (this.facingLeft){
                this.player.body.offset.x = 5;
                // console.log(`Player is Facing Left: ${this.facingLeft}`);
            }else if (this.facingRight){
                this.player.body.offset.x = 50;
                // console.log(`Player is Facing Right: ${this.facingRight}`);
            }

            if (skeletonDistance <= 95){
                this.skeletonHit = true;
                this.playerDamage = 1;
                this.score += 10;
            }

            // console.log("O Pressed");

        }else if (p_HeavyAttack.isDown){
            this.animationComplete = false;



            this.player.play("playerHeavyAttack", true);
            this.player.setVelocityX(0);
            this.player.setSize(130, 56);
            this.player.body.offset.y = 50; // Adjusts collision box
            // Direction Checks
            if (this.facingLeft){
                this.player.body.offset.x = 5;
                // console.log(`Player is Facing Left: ${this.facingLeft}`)
            }else if (this.facingRight){
                this.player.body.offset.x = 27;
                // console.log(`Player is Facing Right: ${this.facingRight}`)
            }

            if (skeletonDistance <= 95){
                this.skeletonHit = true;
                this.playerDamage = 5;
                this.score += 50;
            }

            // console.log("P Pressed");

        } else if (k_Super.isDown){
            this.animationComplete = false;



            this.player.setVelocityY(200);
            this.player.play("playerSuper", true);
            this.player.setVelocityX(0);
            this.player.setSize(130, 124);
            this.player.body.offset.y = -20; // Adjusts collision box
            if (this.facingLeft){
                this.player.body.offset.x = 5;
                // console.log(`Player is Facing Left: ${this.facingLeft}`)
            }else if (this.facingRight){
                this.player.body.offset.x = 27;
                // console.log(`Player is Facing Right: ${this.facingRight}`)
            }

            if (skeletonDistance <= 95){
                this.skeletonHit = true;
                this.playerDamage = 10;
                this.score += 100;
            }

            // console.log("K Pressed");
            
 
        }else if (!this.player.anims.isPlaying && this.isHit == true) {
            this.player.play("playerIsHit"); // Force Player Animation to default to this

        } else if (this.animationComplete == false){
            this.time.addEvent({
                delay: 300,
                callback: () => {
                    this.animationComplete = true;
                    // console.log(this.animationComplete)
                },
                loop: false
            })

        }else if (this.animationComplete == true){
            this.player.setVelocityX(0);
            this.player.play("playerIdle", true);
            this.player.setSize(40, 56, true);
            this.player.body.offset.y = 50; // Adjusts collision box
        }

        if(skeletonDistance > 60 || skeletonDistance*-1 > 60){
            this.isHit = false;
        }
        // console.log(skeletonDistance)

        if ( (skeletonDistance <= 200 && skeletonDistance > 40) || (skeletonDistance*-1 <= 200  && skeletonDistance*-1 > 40)){
            this.skeleton.setSize(40, 56, true); 
            // console.log(`Base: ${skeletonDistance}`);
            // console.log(`
            // Skeleton X: ${this.skeleton.x}
            // Player X: ${this.player.x}
            // Player Y: ${this.player.y}
            // `)

            if (this.skeleton.x < this.player.x){
                this.skeleton.play("skeletonWalk", true);      
                this.skeleton.setVelocityX(100);
                this.skeleton.flipX = false;
                // console.log(`Less Than: ${skeletonDistance}`);

            }else if (this.skeleton.x > this.player.x){
 
                this.skeleton.play("skeletonWalk", true);      
                this.skeleton.setVelocityX(-100);
                this.skeleton.flipX = true; 
                // console.log(`Greater Than: ${skeletonDistance}`);
            
            }

        } else if (skeletonDistance <= 45  && this.player.y > 160){
            // console.log(skeletonDistance)
            // Attack if the player is in range
            this.skeleton.play("skeletonAttack1", true);
            if(this.facingLeft){

                this.time.addEvent({
                    delay: 500,
                    callback: ()=>{
                        this.isHit = true;
                    },
                    loop: false
                })

                this.skeleton.setSize(120, 56);
                this.skeleton.setVelocityX(0)
                this.skeleton.flipX = true;


            }else if(this.facingRight){

                this.time.addEvent({
                    delay: 500,
                    callback: ()=>{
                        this.isHit = true;
                    },
                    loop: false
                })

                this.skeleton.setSize(120, 56);
                this.skeleton.setVelocityX(0);
                this.skeleton.flipX = false; 

            }

        } else if(skeletonDistance <= 60 && this.player.y < 200){
            this.skeleton.play("skeletonAttack2", true);
            this.skeleton.setSize(105, 76);
            this.skeleton.body.offset.y = 23;
            this.skeleton.setVelocityX(0);

            if(this.facingLeft){
                // DELAY EFFECT for DAMAGE

                this.time.addEvent({
                    delay: 500,
                    callback: ()=>{
                        this.isHit = true;
                    },
                    loop: false
                })
                
                this.skeleton.flipX = true;
                this.skeleton.body.offset.x = -10;

            }else if(this.facingRight){
                this.animationComplete == false
                this.time.addEvent({
                    delay: 500,
                    callback: ()=>{
                        this.isHit = true;
                    },
                    loop: false
                })
                this.skeleton.flipX = false;   
                this.skeleton.body.offset.x = 45;

            }
            this.isHit = false;
            // DELAY EFFECT for DAMAGE
            // this.time.addEvent({
            //     delay: 500,
            //     callback: ()=>{
            //         this.skeleton.setSize(120, 56);
            //     },
            //     loop: true
            // })
            
        }else {
            this.skeleton.setVelocityX(0) 
            this.skeleton.setSize(40, 56, true);
            this.skeleton.play("skeletonIdle", true);
            this.isHit = false;
 
        }

        // Win / Fail Conditions
        if(this.skeleton.HPValue == 0){
            console.log("You Win")
            this.skeletonIsAlive = false;
        }

        if(this.player.HPValue == 0){
            console.log("You Lose")
            this.playerIsAlive = false;
        } else if(this.timedEvent <= 0){
            console.log("End of the Time Limit!")
            this.playerIsAlive = false;
        }


        // Player Death Check
        if(!this.playerIsAlive){
            console.log("END SCREEN");
            const scoreForm = document.getElementById("scoreForm");
            const scoreDiv = document.querySelector("div#scoreDiv");
            let inputScore = document.getElementById("score");

            this.sys.game.destroy(true);
            alert("YOU LOST!");
            scoreForm.classList.remove("hidden");
            scoreDiv.classList.remove("hidden");
            // mainDiv.classList.add("hidden");
            inputScore.value = this.score;
            inputScore.readOnly = true;
            ''
        
        // Skeleton Death Check
        }else if(!this.skeletonIsAlive){      
            console.log("END SCREEN");
            const scoreForm = document.getElementById("scoreForm");
            const scoreDiv = document.querySelector("div#scoreDiv");
            let inputScore = document.getElementById("score");

            this.sys.game.destroy(true);
            alert("YOU WON!!!");
            scoreForm.classList.remove("hidden");
            scoreDiv.classList.remove("hidden");

            // mainDiv.classList.add("hidden");
            inputScore.value = this.score + 50000; // Kill Skeletor get 50k bois
            inputScore.readOnly = true;
        }
    
        // scroll the texture of the tilesprites proportionally to the camera scroll
        this.bg_1.tilePositionX = this.myCam.scrollX * .1;
        this.bg_2.tilePositionX = this.myCam.scrollX * .2;
        this.bg_3.tilePositionX = this.myCam.scrollX * .3;
        this.bg_4.tilePositionX = this.myCam.scrollX * .5;
        this.ground.tilePositionX = this.myCam.scrollX;
    
    }
}