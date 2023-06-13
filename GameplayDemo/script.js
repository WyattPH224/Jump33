
class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }
    preload(){
        this.load.audio('music', 'assets/bgMusic.mp3');
    }
    create(){
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Menu\n (Click on where you want to go)', {font: '64px Arial', fill: '#ffffff'});
        
        const startGame = this.add.text(100, 100, 'Start Game', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('level1') );

        const settingButton = this.add.text(100, 200, 'Settings', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('Settings') );

        const creditsButton = this.add.text(100, 300, 'Credits', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('Credits') );


        this.music = this.sound.add('music', {
            volume: 0.25,
            loop: true
        });
        if(this.music.isPlaying == false) {
            this.music.play();
        }

    }
    update(){}
}

let upScoreButton = Phaser.GameObjects.Text;
let keyA;
let keyD;
let keyW;
let keyS;
let keySpace;
let spaceDown;
let power;
let levelList;
let currentX = 100;
let currentY = 800;
let currentVelX = 0;
let currentVelY = 0;
let inAir = false;
let isClicking = false;

class Level extends Phaser.Scene {
    constructor(key, name, num) {
        super(key);
        this.name = name;
        this.currentLevel = num;
    }

    preload(){
        
        this.load.audio('jump', 'assets/jump.wav');
        this.load.audio('land', 'assets/land.wav');

        this.load.image('player', 'assets/queen1.png');
        this.load.image('tiles', 'assets/tilesets/ActualChessTileset.png');
         // Load the export Tiled JSON
        this.loadMap();
    }
    
    create(){

        /*
        upScoreButton = this.add.text(100, 500, `Increase score`, {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => score++ );
        */
        spaceDown = false;
        power = 0;
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //create player
        this.player = this.physics.add.sprite(currentX, currentY, 'player');
        this.player.body.allowGravity = true;
        //this.player.anchor.set(0.5, 0.5);
        this.player.setScale(0.03125); // 1/32th of original size
        this.player.setBounce(0.1);
        this.player.setMaxVelocity(800, 800);
        this.player.setVelocityX(currentVelX);
        this.player.setVelocityY(currentVelY);
        
        
        this.jump = this.sound.add('jump');
        this.land = this.sound.add('land');

        this.onStart();
    }
    update(){


        if(this.player.y > 1280) {
            this.scene.start(this.lastLevel);
            this.player.y = 0;
            this.player.setVelocityX(currentVelX);
            this.player.setVelocityY(currentVelY);
        }
        if(this.player.y < 0) {
            console.log("hit top" + this.nextLevel + this.player.y);
            this.scene.start(this.nextLevel);
            this.player.y = 1024 - 64;
            this.player.setVelocityX(currentVelX);
            this.player.setVelocityY(currentVelY);
        }

        if(this.input.activePointer.isDown) {
            this.player.setVelocityX(0);
            isClicking = true;
            if(power < 100) {
                power+=2;
                console.log(power);
            }
        }

        //leap
        //if player clicked when player.x is less than mouse.x, then player jumps right, else player jumps left
        if(!this.input.activePointer.isDown && isClicking && this.player.body.onFloor()) {
            isClicking = false;
 
            if(this.player.x < this.input.activePointer.x) {
                this.player.setVelocityX(100 + (power * 3));  //need this to also change based on power, so that the player jumps short when the mouse is clicked quickly
                this.player.setVelocityY(-400 - (power * 3));
            }
            else {
                this.player.setVelocityX(-100 - (power * 3));
                this.player.setVelocityY(-400 - (power * 3));
            }
            power = 0;
            this.jump.play();
            inAir = true;
        }

        if(this.player.body.onFloor() && inAir) {
            this.land.play();
            inAir = false;
        }

        currentX = this.player.x;
        currentY = this.player.y;
        currentVelX = this.player.body.velocity.x;
        currentVelY = this.player.body.velocity.y;
        //console.log(game.input.mousePointer.x + " " + game.input.mousePointer.y);
        //need to compare mouse position to player position for mobile game, so that when the map is clicked the player jumps twards that position
    }

    onStart(){
        console.log("Level not implemented yet");
    }

    loadMap() {
        console.log("Map not implemented yet");
    }

    goalHit() {
      }
}

//global variable
let score = 0; 


class Level1 extends Level {
    constructor(){
        super('level1', "Level 1", 0);
    }

    loadMap() {
        this.load.tilemapTiledJSON('map', 'assets/levels/lvl1.json');
        //this.load.image('bg', 'assets/levels/bg1.png')

    }

    onStart(){
        //const jumpButton = this.add.text(100, 100, 'Jump up to next level', {font: '64px Arial', fill: '#ffffff'})
        //.setInteractive()
       // .on('pointerdown', () => this.scene.start('level2') );


        const map = this.make.tilemap({key: 'map'});                                //load map
        const tileset = map.addTilesetImage('chessTiles', 'tiles');   //load tileset for map
        const platforms = map.createLayer('platforms', tileset, 0, 0);        //create platforms layer
        platforms.setCollisionByExclusion(-1, true);                                //set collision for platforms layer
        this.physics.add.collider(this.player, platforms);
        this.nextLevel = 'level2';
        this.lastLevel = 'Menu';
        
        


       

    }

}

class Level2 extends Level {
    constructor(){
        super('level2', "Level 2", 1);
    }

    loadMap() {
        this.load.tilemapTiledJSON('map2', 'assets/levels/lvl2.json');

    }

    onStart(){
        //const jumpButton = this.add.text(100, 100, 'Jump up to next level', {font: '64px Arial', fill: '#ffffff'})
        //.setInteractive()
       // .on('pointerdown', () => this.scene.start('level2') );

       const map = this.make.tilemap({key: 'map2'});                                //load map
       const tileset = map.addTilesetImage('chessTiles', 'tiles');   //load tileset for map
       const platforms = map.createLayer('platforms', tileset, 0, 0);        //create platforms layer
       platforms.setCollisionByExclusion(-1, true);                                //set collision for platforms layer
       this.physics.add.collider(this.player, platforms);
       this.nextLevel = 'level3';
       this.lastLevel = 'level1';


    }

}

class Level3 extends Level {
    constructor(){
        super('level3', "Level 3", 2);
    }

    loadMap() {
        this.load.tilemapTiledJSON('map3', 'assets/levels/lvl3.json');

    }

    onStart(){
        //const jumpButton = this.add.text(100, 100, 'Jump up to next level', {font: '64px Arial', fill: '#ffffff'})
        //.setInteractive()
       // .on('pointerdown', () => this.scene.start('level2') );

       const map = this.make.tilemap({key: 'map3'});                                //load map
       const tileset = map.addTilesetImage('chessTiles', 'tiles');   //load tileset for map
       const platforms = map.createLayer('platforms', tileset, 0, 0);        //create platforms layer
       const icePlatforms = map.createLayer('icePlatforms', tileset, 0, 0);        //create platforms layer
       platforms.setCollisionByExclusion(-1, true);                                //set collision for platforms layer
       icePlatforms.setCollisionByExclusion(-1, true);                                //set collision for platforms layer
       this.physics.add.collider(this.player, platforms);
       this.physics.add.collider(this.player, icePlatforms);

       this.nextLevel = 'level3'; //should never get here
       this.lastLevel = 'level2';


    }

}


class EndCutscene extends Phaser.Scene {
    constructor() {
        super('EndCutscene');
    }
    preload(){

    }
    create(){
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'You win!', {font: '64px Arial', fill: '#ffffff'});

        
        const backButton = this.add.text(100, 100, 'Back to menu', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('Menu') );

        this.add.text(100, 200, `Score: ${score}`, {font: '64px Arial', fill: '#ffffff'});
        score= 0;


    }
    update(){}
}


class Settings extends Phaser.Scene {
    constructor() {
        super('Settings');
    }
    preload(){

    }
    create(){
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Settings page!', {font: '64px Arial', fill: '#ffffff'});

        const backButton = this.add.text(100, 100, 'Back to menu', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('Menu') );
    }
    update(){}
}


class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }
    preload(){

    }
    create(){
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Credits page!', {font: '64px Arial', fill: '#ffffff'});

        const backButton = this.add.text(100, 100, 'Back to menu', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('Menu') );
    }
    update(){}
}

//Create empty game scene


//move on to next level


//set up config and game object
let config = {
    type: Phaser.AUTO,
    parent: 'game',

    scale: {
        mode: Phaser.Scale.FIT,
        pixelArt: true,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1024,
    },
    backgroundColor: 0x000000,
    scene: [Menu, Level1, Level2, Level3, EndCutscene, Settings, Credits],
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 1000 },
          
            debug: true,
        },
    }
}

let game = new Phaser.Game(config);




