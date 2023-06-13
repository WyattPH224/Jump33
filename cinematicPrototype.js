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
        this.input.on('pointerdown', () => this.scene.start('load'));
    }
}

class Load extends Phaser.Scene{
    constructor(){
        super('load');
    }
    cursors;
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
        this.load.image('chess','chessBoard.png');
        this.load.image('jumps','StudioName.png');
        this.load.image('queen','Idle_South_0.png');
        this.load.spritesheet('runLeft','Run_West_StripSheet.png',{ frameWidth: 24, frameHeight: 32}); 
        this.load.spritesheet('runRight','Run_East_StripSheet.png',{ frameWidth: 24, frameHeight: 32}); 
        this.load.spritesheet('idle','Idle_South_0.png',{ frameWidth: 24, frameHeight: 32}); 
        this.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 });
        for (var i = 0; i < 5000; i++) {
            this.load.image('jumps'+i, 'StudioName.png');
        }
    }

    create() {

        var queen = this.add.image(1000,500,'queen')
        queen.setScale(10);

        var board = this.add.image(900,600,'chess');
        board.setScale(0.7);

        this.graphics = this.add.graphics();

        var playButton = this.add.graphics();
        var settingsButton = this.add.graphics();
        var creditsButton = this.add.graphics();
        var exitButton = this.add.graphics();

        playButton.fillStyle(0xffffff, 1);
        settingsButton.fillStyle(0xffffff, 1);
        creditsButton.fillStyle(0xffffff, 1);
        exitButton.fillStyle(0xffffff, 1);

        playButton.fillRect(-400,200,320,50);
        settingsButton.fillRect(-400,400,320,50);
        creditsButton.fillRect(-400,600,320,50);
        exitButton.fillRect(-400,800,320,50);



        var play = this.add.text(-200,200,'PLAY',{font:'50px monospace',color: '#000000'});
        var settings = this.add.text(-200,400,'SETTINGS',{font:'50px monospace', color: '#000000'});
        var credits = this.add.text(-200,600,'CREDITS',{font:'50px monospace', color: '#000000'});
        var exit = this.add.text(-200,800,'EXIT',{font:'50px monospace', color: '#000000'});
        var title = this.add.text(800,100,'LEAP \n QUEEN',{font:'300px monospace',color: '#ffffff'});


       
        this.tweens.chain({
            tweens: [
                {
                   targets: playButton,
                   x: 600,
                   duration: 300,
                   ease:'Sine.out' 
                },
                {
                    targets: settingsButton,
                    x: 600,
                    duration: 300,
                    ease:'Sine.out' 
                 },
                 {
                    targets: creditsButton,
                    x: 600,
                    duration: 300,
                    ease:'Sine.out' 
                 },
                 {
                    targets: exitButton,
                    x: 600,
                    duration: 300,
                    ease:'Sine.out' 
                 },
                {
                    targets: play,
                    x: 295,
                    duration: 1000,
                    ease:'cubic.out',
                },
                {
                targets: settings,
                x: 240,
                duration: 1000,
                ease:'cubic.out',
                },
                  {
                targets: credits,
                x: 245,
                duration: 1000,
                ease:'cubic.out',
                },
                {
                targets: exit,
                x: 295,
                duration: 1000,
                ease:'cubic.out',
                },
            ]
        });

        
        play.setInteractive()

        play.on('pointerdown', () => {
            this.gotoScene('play');
        })



        this.input.on('pointerdown', () => this.scene.start('intro'));
    }

}
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        pixelArt: true,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    scene: [Intro,Load],
    title: "Cinematic",
});