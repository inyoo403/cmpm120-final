import { Game, AUTO, Scale } from 'phaser';
import Boot from './game/scenes/Boot';
import Preloader from './game/scenes/Preloader';
import MainMenu from './game/scenes/MainMenu';
import GameScene from './game/scenes/Game';
import Level1 from './game/scenes/Level1';
import Level2 from './game/scenes/Level2';
import Level3 from './game/scenes/Level3';
import Level4 from './game/scenes/Level4';
import GameOver from './game/scenes/GameOver';
import UI from './game/scenes/UI';
import CreditsScene from './game/scenes/CreditsScene';
import './style.css';

const config = {
    type: AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        GameScene,
        Level1,
        Level2,
        Level3,
        Level4,
        GameOver,
        UI,
        CreditsScene
    ]
};

new Game(config); 