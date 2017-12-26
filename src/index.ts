// inject global phaser variables
import 'pixi.js';
import 'p2';
import 'phaser';

import LazurImage from './assets/thorn_lazur.png'
import MummySprite from './assets/metalslug_mummy37x45.png'


const game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', 
  { preload: preload, create: create, update: update });

function preload() {

    game.load.image('lazur', LazurImage);
    game.load.spritesheet('mummy', MummySprite, 37, 45, 18);

}

let back;
let mummy;
let anim;
let loopText;

function create() {

    back = game.add.image(0, -400, 'lazur');
    back.scale.set(2);
    back.smoothed = false;

    mummy = game.add.sprite(200, 360, 'mummy', 5);
    mummy.scale.set(4);
    mummy.smoothed = false;
    anim = mummy.animations.add('walk');

    anim.onStart.add(animationStarted, this);
    anim.onLoop.add(animationLooped, this);
    anim.onComplete.add(animationStopped, this);

    anim.play(10, true);

}

function animationStarted(sprite, animation) {

    game.add.text(32, 32, 'Animation started', { fill: 'white' });

}

function animationLooped(sprite, animation) {

    if (animation.loopCount === 1)
    {
        loopText = game.add.text(32, 64, 'Animation looped', { fill: 'white' });
    }
    else
    {
        loopText.text = 'Animation looped x2';
        animation.loop = false;
    }

}

function animationStopped(sprite, animation) {

    game.add.text(32, 64+32, 'Animation stopped', { fill: 'white' });

}

function update() {

    if (anim.isPlaying)
    {
        back.x -= 1;
    }

}
