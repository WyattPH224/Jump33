class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }

    preload(){
        this.load.path = './assets/';
        this.load.spritesheet('cats','sleeping_cat_animation.png', { frameWidth: 300, frameHeight: 300 });
        this.load.image('studio','StudioName.png');
    }

    create() {

        this.graphics = this.add.graphics();


        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRect(0,0,1920,1080);

        var studio = this.add.image(1000,-500,'studio')
            .setScale(2);
        
        this.cat = this.add.sprite(1000,500,'cats')
            .setScale(1.5);


        this.tweens.add({
            targets: studio,
            x:1000,
            y: 200,
            alpha: 1,
            duration: 3000,
            ease: 'Sine.in',
            });

        this.anims.create({
            key: 'cat sleeping',
            frames: this.anims.generateFrameNumbers('cats', {start:0, end: 3}),
            duration:4000,
            framerate: 10,
            repeat: -1

        });    
        this.cat.play('cat sleeping');       
        this.cat.setInteractive();
        this.cat.on('pointerdown', () => this.scene.start('load'));
    }
}

class Load extends Phaser.Scene{
    constructor(){
        super('load');
    }
    
    player;
    preload() {

        this.graphics = this.add.graphics();

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(800, 510, 320, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(810, 520, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });


        this.load.path = './assets/'
        this.load.image('fullScreen','FullScreenV2.png')
        this.load.image('firstBG','titlePageBlackWhite.png');
        this.load.image('secondBG','titlePageWhiteBlack.png');
        this.load.image('backB','backButtonBlack.png');
        this.load.image('jumps','StudioName.png');
        this.load.image('playB','playBlack.png');
        this.load.image('playW','playWhite.png');
        this.load.image('settingsW','settingsWhite.png')
        this.load.image('settingsB','settingsBlack.png');
        this.load.image('creditsB','creditBlack.png');
        this.load.image('creditsW','creditsWhite.png');
        this.load.image('exitB','exitBlack.png');
        this.load.image('exitW','exitWhite.png');
        this.load.image('musicOn','musicOn.png');
        this.load.image('musicOff','musicOff.png');
        this.load.audio('BGMusic','bgMusic.mp3');

        //dont need
        
        for (var i = 0; i < 500; i++) {
            this.load.image('jumps'+i, 'StudioName.png');
        }
    }

    create() {

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.add.image(1850,950, "fullScreen")
            .setDepth(110)
            .setScale(.2)
            //.setStyle({ fontSize: `${2 * this.s}px`, color: '#880808'})
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        this.sound.unlock();
        musicVolume.BGMusic = this.sound.add('BGMusic');

        if(!this.sound.locked) {
            musicVolume.BGMusic.play({
                loop:true,
                volume: musicVolume.masterVol
            });
        }
        else {
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                musicVolume.BGMusic.play({
                    loop:true,
                    volume:musicVolume.masterVol
                });
            });
        }






        let audioImageOn = true;
        let audioImageOff = false; 

        var titleBGV1 = this.add.image(960,540,'firstBG');
        titleBGV1.setDepth(0);
        titleBGV1.setScale(1920/titleBGV1.width,1080/titleBGV1.height);

        
        var titleBGV2 = this.add.image(960,540,'secondBG');
        titleBGV2.setVisible(false);
        titleBGV2.setScale(1920/titleBGV2.width,1080/titleBGV2.height);

       // const layerBG = this.add.layer();

        //layerBG.add([titleBGV1,titleBGV2]);
        //layerBG.setDepth(0);
        this.settingsBox = this.add.graphics();
        this.settingsBox.setVisible(false);
        this.settingsBox.setDepth(101);
        this.settingsBox.fillStyle(0x000000, 1);
        this.settingsBox.fillRect(475,175,975,750);

        this.volBar=this.add.rectangle(600,600,80,600, 0x00ffff)
        this.volBar.setVisible(false);
        this.volBar.setDepth(103);
        this.slider=this.add.rectangle(600,musicVolume.sliderGlobal,160,80,0xffff00);
        this.slider.setDepth(103);
        this.slider.setVisible(false);
        


        this.slider.setInteractive({draggable: true});

        this.input.on('drag', (pointer,gameObject,dragX,dragY)=> {
            //  By clamping dragX we can keep it within
            //  whatever bounds we need
            dragY = Phaser.Math.Clamp(dragY, 300, 900);

            //  By only applying the dragX we can limit the drag
            //  to be horizontal only
            gameObject.y = dragY;
            musicVolume.sliderGlobal = gameObject.y;
        });


        musicVolume.musicOn = this.add.image(1000,550,'musicOn');
        musicVolume.musicOn.setVisible(false);
        musicVolume.musicOn.setScale(600/musicVolume.musicOn.width,600/musicVolume.musicOn.height);
        musicVolume.musicOn.setDepth(103);

        musicVolume.musicOff = this.add.image(1000,550,'musicOff');
        musicVolume.musicOff.setVisible(false);
        musicVolume.musicOff.setScale(600/musicVolume.musicOff.width,600/musicVolume.musicOff.height);
        musicVolume.musicOff.setDepth(103);

        
        var backSettingsBlack = this.add.image(975,875,'backB');
        backSettingsBlack.setScale(100/backSettingsBlack.width,100/backSettingsBlack.height);
        backSettingsBlack.setVisible(false);
        backSettingsBlack.setDepth(102);

             
        musicVolume.MusicOnTxt = this.add.text(900,200,'MUSIC ON',{font:'40px monospace',color: '#FFFFFF'});
        musicVolume.MusicOnTxt.setVisible(false);
        musicVolume.MusicOnTxt.setDepth(101);

        musicVolume.MusicOffTxt = this.add.text(900,200,'MUSIC OFF',{font:'40px monospace',color: '#FFFFFF'});
        musicVolume.MusicOffTxt.setVisible(false);
        musicVolume.MusicOffTxt.setDepth(101);


        let playBlack = this.add.image(700,700,'playB');
        playBlack.setVisible(false);
        playBlack.setScale(200/playBlack.width,200/playBlack.height);
        playBlack.setDepth(100);

        let settingsBlack = this.add.sprite(1200,700,'settingsB');
       settingsBlack.setScale(200/settingsBlack.width,200/settingsBlack.height);
       settingsBlack.setDepth(100);
       settingsBlack.setInteractive();
       settingsBlack.on('pointerdown', () => {
            musicVolume.settingsOpen = true;
            this.settingsBox.setVisible(true);
            backSettingsBlack.setVisible(true);
            this.volBar.setVisible(true);
            this.slider.setVisible(true);
            if(audioImageOn == true){
                musicVolume.musicOn.setVisible(true);
                musicVolume.MusicOnTxt.setVisible(true);
            }
            else{
                musicVolume.musicOff.setVisible(true);
                musicVolume.MusicOffTxt.setVisible(true);
            }
       });

        var creditsBlack = this.add.image(700,800,'creditsB');
        creditsBlack.setVisible(false);
        creditsBlack.setScale(100/creditsBlack.width,100/creditsBlack.height);
        creditsBlack.setDepth(100);

        let exitBlack = this.add.image(1200,800,'exitB');
        exitBlack.setVisible(true);
        exitBlack.setScale(100/exitBlack.width,100/exitBlack.height);
        exitBlack.setDepth(100);

          
        let playWhite = this.add.image(700,700,'playW');
        playWhite.setScale(200/playWhite.width,200/playWhite.height);
        playWhite.setDepth(100);

        var settingsWhite = this.add.image(1200,700,'settingsW');
        settingsWhite.setVisible(false);
        settingsWhite.setScale(200/settingsWhite.width,200/settingsWhite.height);

        let creditsWhite = this.add.image(700,800,'creditsW');
        //creditsWhite.setVisible(true);
        creditsWhite.setScale(100/creditsWhite.width,100/creditsWhite.height);
        creditsWhite.setDepth(100);

        var exitWhite = this.add.image(1200,800,'exitW');
        exitWhite.setVisible(false);
        exitWhite.setScale(100/exitWhite.width,100/exitWhite.height);
        exitWhite.setDepth(100);

        


       settingsWhite.setInteractive()
       settingsWhite.on('pointerdown', () => {
            musicVolume.settingsOpen = true;
            this.volBar.setVisible(true);
            this.slider.setVisible(true);
            this.settingsBox.setVisible(true);
            backSettingsBlack.setVisible(true);
            if(audioImageOn == true){
                musicVolume.musicOn.setVisible(true);
                musicVolume.MusicOnTxt.setVisible(true);
            }
            else{
                musicVolume.musicOff.setVisible(true);
                musicVolume.MusicOffTxt.setVisible(true);
            }
        });

       backSettingsBlack.setInteractive()
       backSettingsBlack.on('pointerdown', () => {
            musicVolume.settingsOpen = false
            this.settingsBox.setVisible(false);
            backSettingsBlack.setVisible(false);
            this.volBar.setVisible(false);
            this.slider.setVisible(false);
            musicVolume.musicOn.setVisible(false);
            musicVolume.musicOff.setVisible(false);
            musicVolume.MusicOnTxt.setVisible(false);
            musicVolume.MusicOffTxt.setVisible(false);
       });

       musicVolume.musicOn.setInteractive()
       musicVolume.musicOn.on('pointerdown', () => {
            musicVolume.muteVol = musicVolume.masterVol;
            musicVolume.muteSlider = musicVolume.sliderGlobal;
            musicVolume.masterVol = 0;
            this.slider.y = 900;
            musicVolume.sliderGlobal = 900;
            musicVolume.BGMusic.volume = 0;
           // musicVolume.musicOn.setVisible(false);
           // musicVolume.MusicOnTxt.setVisible(false);
          // musicVolume.MusicOffTxt.setVisible(true);
            audioImageOn = false;
          //  musicVolume.musicOff.setVisible(true);
            audioImageOff = true
            titleBGV1.setVisible(false);
            titleBGV2.setVisible(true);
            settingsBlack.setVisible(false);
            exitBlack.setVisible(false);
            playWhite.setVisible(false);
            creditsWhite.setVisible(false);
            settingsWhite.setVisible(true);
            exitWhite.setVisible(true);
            playBlack.setVisible(true);
            creditsBlack.setVisible(true);
       });

       musicVolume.musicOff.setInteractive()
       musicVolume.musicOff.on('pointerdown', () => {
        musicVolume.masterVol = musicVolume.muteVol;
        musicVolume.sliderGlobal = musicVolume.muteSlider;
        musicVolume.BGMusic.volume = musicVolume.masterVol;
        this.slider.y = musicVolume.muteSlider;
        //musicVolume.musicOn.setVisible(true);
       // musicVolume.MusicOnTxt.setVisible(true);
       // musicVolume.MusicOffTxt.setVisible(false);
        audioImageOn = true;
       // musicVolume.musicOff.setVisible(false);
        audioImageOff = false;        
        titleBGV1.setVisible(true);
        titleBGV2.setVisible(false);
        settingsBlack.setVisible(true);
        exitBlack.setVisible(true);
        playWhite.setVisible(true);
        creditsWhite.setVisible(true);
        settingsWhite.setVisible(false);
        exitWhite.setVisible(false);
        playBlack.setVisible(false);
        creditsBlack.setVisible(false);
       });

       playWhite.setInteractive()
       .on('pointerdown', () =>{
        musicVolume.BGMusic.pause();
        this.scene.start('level1')
       });


        playBlack.setInteractive()
        .on('pointerdown', () => {
            musicVolume.BGMusic.pause();
            this.scene.start('level1') 
        });

        creditsWhite.setInteractive()
        .on('pointerdown', () =>{
         musicVolume.BGMusic.pause();
         this.scene.start('Credits')
        });

        creditsBlack.setInteractive()
        .on('pointerdown', () =>{
         musicVolume.BGMusic.pause();
         this.scene.start('Credits')
        });





    }


    update()
    {
        musicVolume.masterVol = (900-this.slider.y)/600;
        musicVolume.BGMusic.volume = musicVolume.masterVol;
        if(musicVolume.sliderGlobal < 900 && musicVolume.settingsOpen == true){
            console.log('music on',musicVolume.sliderGlobal,musicVolume.settingsOpen);
            musicVolume.musicOn.setVisible(true);
            musicVolume.MusicOnTxt.setVisible(true);
            musicVolume.musicOff.setVisible(false);
            musicVolume.MusicOffTxt.setVisible(false);

        }
        else if(musicVolume.sliderGlobal >=900 && musicVolume.settingsOpen== true){
            console.log('music off',this.slider.y,musicVolume.sliderGlobal,musicVolume.settingsOpen);
            musicVolume.musicOn.setVisible(false);
            musicVolume.MusicOnTxt.setVisible(false);
            musicVolume.musicOff.setVisible(true);
            musicVolume.MusicOffTxt.setVisible(true);
        }
    }
    

}
/*
class Settings extends Phaser.Scene{
    constructor(){
        super('load');


class Credits extends Phaser.Scene{
    constructor(){
        super('load');

        
class Exit extends Phaser.Scene{
    constructor(){
        super('load');

*/

/*
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
*/

/*
let upScoreButton = Phaser.GameObjects.Text;
let keyA;
let keyD;
let keyW;
let keyS;
let keySpace;
let spaceDown;
*/
let power;          //power of jump
let currentX = 100; //current position of player
let currentY = 800; //current position of player    
let currentVelX = 0;    //current velocity of player
let currentVelY = 0;    //current velocity of player
let inAir = false;    //is the player in the air
let isClicking = false; //is the player clicking

class Level extends Phaser.Scene {
    constructor(key, name, num) {
        super(key);
        this.name = name;
        this.currentLevel = num;
    }

    preload(){
        this.load.image('fullScreen','assets/FullScreenV2.png')
        this.load.image('setGear','assets/settings gear.jpg')
        this.load.image('backB','backButtonBlack.png');
        this.load.image('musicOn','musicOn.png');
        this.load.image('musicOff','musicOff.png');
        this.load.audio('BGMusic','bgMusic.mp3');
        this.load.audio('jump', 'assets/jump.wav');
        this.load.audio('land', 'assets/land.wav');
        

        this.load.image('player', 'assets/queen1.png');
        this.load.image('tiles', 'assets/tilesets/ActualChessTileset.png');
         // Load the export Tiled JSON
        this.loadMap();
    }
    
    create(){

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.add.image(1850,950, 'fullScreen')
        .setDepth(110)
        .setScale(.2)
        //.setStyle({ fontSize: `${2 * this.s}px`, color: '#880808'})
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
        // so when we're adding backgrounds they need to load before the level and the player, might need to use a dictionary to track the order of loading?
        //since each background is specific to each level we can just load them in the level class
        this.playerActive = true;

        power = 0;
        /*
        spaceDown = false;
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        */
        //not nessesary anymore
        //create player

        //settings gear

        this.sound.unlock();
       // musicVolume.BGMusic = this.sound.add('BGMusic');
        //alert(musicVolume.masterVol)
        if(!this.sound.locked) {
            musicVolume.BGMusic.resume({
                loop:true,
                volume: musicVolume.masterVol
            });
        }
        else {
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                musicVolume.BGMusic.resume({
                    loop:true,
                    volume: musicVolume.masterVol
                });
            });
        }
    
        let audioImageOn = true;
        let audioImageOff = false; 

        this.settingsBox = this.add.graphics();
        this.settingsBox.setVisible(false);
        this.settingsBox.setDepth(101);
        this.settingsBox.fillStyle(0x000000, 1);
        this.settingsBox.fillRect(475,175,975,750);

        this.volBar=this.add.rectangle(600,600,80,600, 0x00ffff)
        this.volBar.setVisible(false);
        this.volBar.setDepth(103);
        this.slider=this.add.rectangle(600,musicVolume.sliderGlobal,160,80,0xffff00);
        this.slider.setDepth(103);
        this.slider.setVisible(false);
        


        this.slider.setInteractive({draggable: true});

        this.input.on('drag', (pointer,gameObject,dragX,dragY)=> {
            //  By clamping dragX we can keep it within
            //  whatever bounds we need
            dragY = Phaser.Math.Clamp(dragY, 300, 900);

            //  By only applying the dragX we can limit the drag
            //  to be horizontal only
            gameObject.y = dragY;
            musicVolume.sliderGlobal = gameObject.y
        });


        var backSettingsBlack = this.add.image(975,875,'backB');
        backSettingsBlack.setScale(100/backSettingsBlack.width,100/backSettingsBlack.height);
        backSettingsBlack.setVisible(false);
        backSettingsBlack.setDepth(102);

        musicVolume.musicOn = this.add.image(1000,550,'musicOn');
        musicVolume.musicOn.setVisible(false);
        musicVolume.musicOn.setScale(600/musicVolume.musicOn.width,600/musicVolume.musicOn.height);
        musicVolume.musicOn.setDepth(103);

        musicVolume.musicOff = this.add.image(1000,550,'musicOff');
        musicVolume.musicOff.setVisible(false);
        musicVolume.musicOff.setScale(600/musicVolume.musicOff.width,600/musicVolume.musicOff.height);
        musicVolume.musicOff.setDepth(103);

             
        musicVolume.MusicOnTxt = this.add.text(900,200,'MUSIC ON',{font:'40px monospace',color: '#FFFFFF'});
        musicVolume.MusicOnTxt.setVisible(false);
        musicVolume.MusicOnTxt.setDepth(101);

        musicVolume.MusicOffTxt = this.add.text(900,200,'MUSIC OFF',{font:'40px monospace',color: '#FFFFFF'});
        musicVolume.MusicOffTxt.setVisible(false);
        musicVolume.MusicOffTxt.setDepth(101);

        var settingsGear = this.add.image(50,50,'setGear');
        settingsGear.setScale(100/settingsGear.width,100/settingsGear.height);
        settingsGear.setDepth(105)
        settingsGear.setInteractive();
        settingsGear.on('pointerdown', () => {
            musicVolume.settingsOpen = true
            this.playerActive = false;
            this.settingsBox.setVisible(true);
            backSettingsBlack.setVisible(true);
            this.volBar.setVisible(true);
            this.slider.setVisible(true);
            if(audioImageOn == true){
                musicVolume.musicOn.setVisible(true);
                musicVolume.MusicOnTxt.setVisible(true);
            }
            else{
                musicVolume.musicOff.setVisible(true);
                musicVolume.MusicOffTxt.setVisible(true);
            }
       });


       backSettingsBlack.setInteractive()
       backSettingsBlack.on('pointerdown', () => {
            this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this);
            musicVolume.settingsOpen = false
            //this.playerActive = true;
            this.settingsBox.setVisible(false);
            backSettingsBlack.setVisible(false);
            this.volBar.setVisible(false);
            this.slider.setVisible(false);
            musicVolume.musicOn.setVisible(false);
            musicVolume.musicOff.setVisible(false);
            musicVolume.MusicOnTxt.setVisible(false);
            musicVolume.MusicOffTxt.setVisible(false);
       });

       musicVolume.musicOn.setInteractive()
       musicVolume.musicOn.on('pointerdown', () => {
            musicVolume.muteVol = musicVolume.masterVol;
            musicVolume.muteSlider = musicVolume.sliderGlobal;
            musicVolume.masterVol = 0;
            this.slider.y = 900;
            musicVolume.sliderGlobal = 900;
            musicVolume.BGMusic.volume = 0;
            audioImageOn = false;
            //  musicVolume.musicOff.setVisible(true);
              audioImageOff = true
       });

       musicVolume.musicOff.setInteractive()
       musicVolume.musicOff.on('pointerdown', () => {
        musicVolume.masterVol = musicVolume.muteVol;
        musicVolume.sliderGlobal = musicVolume.muteSlider;
        musicVolume.BGMusic.volume = musicVolume.masterVol;
        this.slider.y = musicVolume.muteSlider;
        audioImageOn = true;
        //  musicVolume.musicOff.setVisible(true);
          audioImageOff = false
       });


        this.player = this.physics.add.sprite(currentX, currentY, 'player');
        this.player.body.allowGravity = true;
        this.player.setScale(0.03125); // 1/32th of original size this is causeing issues if i want to change the hitbox size
        this.player.setBounce(0.1);
        this.player.setMaxVelocity(800, 800);
        this.player.setVelocityX(currentVelX); //need to set velocity to current velocity so that the player doesnt stop moving when the scene is changed
        this.player.setVelocityY(currentVelY);
        
        
        this.jump = this.sound.add('jump');
        this.land = this.sound.add('land');

               
        this.onStart();   //call onStart function to set up level

    }
    onEvent(){
        this.playerActive = true;
    }
    update(){

        musicVolume.masterVol = (900-this.slider.y)/600;
        musicVolume.BGMusic.volume = musicVolume.masterVol;
        if(musicVolume.sliderGlobal < 900 && musicVolume.settingsOpen == true){
            console.log('music on',musicVolume.sliderGlobal,musicVolume.settingsOpen);
            musicVolume.musicOn.setVisible(true);
            musicVolume.MusicOnTxt.setVisible(true);
            musicVolume.musicOff.setVisible(false);
            musicVolume.MusicOffTxt.setVisible(false);

        }
        else if(musicVolume.sliderGlobal >=900 && musicVolume.settingsOpen== true){
            console.log('music off',this.slider.y,musicVolume.sliderGlobal,musicVolume.settingsOpen);
            musicVolume.musicOn.setVisible(false);
            musicVolume.MusicOnTxt.setVisible(false);
            musicVolume.musicOff.setVisible(true);
            musicVolume.MusicOffTxt.setVisible(true);
        }

        if(this.playerActive == true){
        if(this.player.y > 1280) {          //if player falls off map, move to last level
            musicVolume.BGMusic.pause();
            this.scene.start(this.lastLevel);
            this.player.y = 0;
            this.player.setVelocityX(currentVelX);
            this.player.setVelocityY(currentVelY);
        }
        if(this.player.y < 0) {             //if player hits top of map, move to next level
            musicVolume.BGMusic.pause();
            console.log("hit top" + this.nextLevel + this.player.y);
            this.scene.start(this.nextLevel);
            this.player.y = 1024 - 64;
            this.player.setVelocityX(currentVelX);
            this.player.setVelocityY(currentVelY);
        }

        if(this.input.activePointer.isDown) {       //if player is clicking, increase power of jump
            this.player.setVelocityX(0);
            isClicking = true;
            //we should add a loading bar here for power of jump somewhere on screen

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

        if(this.player.x < 64){         //if player goes out of map on left side, move to in the map
            this.player.x = 64;
        }

        currentX = this.player.x;       //update current position and velocity of player
        currentY = this.player.y;
        currentVelX = this.player.body.velocity.x;
        currentVelY = this.player.body.velocity.y;
        //console.log(game.input.mousePointer.x + " " + game.input.mousePointer.y);
        //need to compare mouse position to player position for mobile game, so that when the map is clicked the player jumps twards that position
    }
}
    onStart(){
        console.log("Level not implemented yet");
    }

    loadMap() {
        console.log("Map not implemented yet");
    }

    goalHit() {
        musicVolume.BGMusic.pause();
        this.scene.start(this.scene.start('EndCutscene'));
      }
    
}


class Level1 extends Level {
    constructor(){
        super('level1', "Level 1", 0);
    }

    loadMap() {
        this.load.tilemapTiledJSON('map', 'assets/levels/lvl1.json');
        //this.load.image('bg', 'assets/levels/bg1.png')
        //this is where i tried to load backgrounds, but it covered the player sprite since loadmap is run last in create()
        this.load.image('goal', 'assets/goal.png');

    }

    onStart(){


        const map = this.make.tilemap({key: 'map'});                                //load map
        const tileset = map.addTilesetImage('chessTiles', 'tiles');   //load tileset for map
        const platforms = map.createLayer('platforms', tileset, 0, 0);        //create platforms layer
        platforms.setCollisionByExclusion(-1, true);                                //set collision for platforms layer
        this.physics.add.collider(this.player, platforms);
        this.nextLevel = 'level2';
        this.lastLevel = 'Menu';


        //make the goal for the end of the game
        const goal = this.physics.add.sprite(1680, 800, 'goal');
        goal.setScale(0.03125); // 1/32th of original size
        this.physics.add.overlap(this.player, goal, this.goalHit, null, this);
        this.physics.add.collider(goal, platforms);

        


       

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

//make this nicer
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
        .on('pointerdown', () => this.scene.start('load') );    //we should seperate the menu fronm the loading bar idk why its like this

    }
    update(){}
}

/*
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
*/

class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }
    preload(){
        this.load.path = './assets/'
        this.load.image('credit','credit.png');
        this.load.image('backWhite','backWhite.png');
        this.load.image('backBlack','backBlack.png');
        this.load.video('chess','Chess.mov',);
        
    }
    create(){
//        this.BGMusic.stop();
        this.add.image(960,540,'credit');
        
        var chess = this.add.video(700,820,'chess');
        chess.play();

        var backButton = this.add.image(1200,820,'backWhite');
        backButton.setScale(100/backButton.width,100/backButton.height);
        backButton.setDepth(100);
        backButton.setInteractive()
        .on('pointerdown', () => this.scene.start('load'));
    }
    update(){}
}


const musicVolume = {
    masterVol:0.5,
    sliderGlobal: 600,
    muteVol: 0,
    settingsOpen: false
}


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
    scene: [Intro, Load, Level1, Level2, Level3, EndCutscene, Credits],
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 1000 },
          
            debug: false,
        },
    }
}

let game = new Phaser.Game(config);




