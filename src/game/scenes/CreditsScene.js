import { Scene } from 'phaser';
import BaseScene from './BaseScene';

export default class CreditsScene extends Scene {
    constructor() {
        super({ key: 'CreditsScene' });
        this.scrollStarted = false;
        this.initialDelay = 5000; // 5초 대기
    }

    init() {
        const uiScene = this.scene.get('UI');
        if (uiScene && uiScene.hide) {
            uiScene.hide();
        }
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000);
        this.createInitialTexts();
        this.createStarWarsCredits();
        this.setupInput();

        this.time.delayedCall(this.initialDelay, () => {
            this.startCreditsScroll();
        });
    }

    createInitialTexts() {
        this.congratsText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'CONGRATULATIONS!', {
            fontFamily: 'Arial Black',
            fontSize: '48px',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        this.congratsText.alpha = 0;

        this.clearText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'You have completed the game!', {
            fontFamily: 'Arial Black',
            fontSize: '32px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);
        this.clearText.alpha = 0;

        this.menuText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'Press SPACE or Click to Return to Menu', {
            fontFamily: 'Arial Black',
            fontSize: '24px',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
        this.menuText.alpha = 0;

        this.tweens.add({
            targets: [this.congratsText, this.clearText, this.menuText],
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            delay: this.tweens.stagger(500)
        });

        this.time.delayedCall(this.initialDelay, () => {
            this.tweens.add({
                targets: [this.congratsText, this.clearText, this.menuText],
                alpha: 0,
                duration: 1000,
                ease: 'Power2'
            });
        });
    }

    createStarWarsCredits() {
        const gameCanvas = document.querySelector('canvas');
        const canvasRect = gameCanvas.getBoundingClientRect();

        const creditContainer = document.createElement('div');
        creditContainer.style.cssText = `
            position: absolute;
            top: ${canvasRect.top}px;
            left: ${canvasRect.left}px;
            width: ${canvasRect.width}px;
            height: ${canvasRect.height}px;
            display: flex;
            justify-content: center;
            perspective: 1000px;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
            background: #000;
        `;

        // 별들을 담을 컨테이너
        const starsContainer = document.createElement('div');
        starsContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        `;

        // 별들 생성
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 3 + 1;
            const opacity = Math.random() * 0.7 + 0.3;
            
            star.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: white;
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: ${opacity};
                animation: twinkle ${Math.random() * 2 + 1}s infinite alternate;
            `;
            
            starsContainer.appendChild(star);
        }

        const creditsContent = document.createElement('div');
        creditsContent.style.cssText = `
            position: absolute;
            width: 100%;
            color: #ffff00;
            font-family: 'Arial Black';
            font-size: 72px;
            text-align: center;
            transform-origin: 50% 100%;
            transform: scale(2.2) rotateX(45deg) translateY(150vh) translateZ(200px);
            line-height: 3;
            text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.7);
            z-index: 2;
        `;

        const sections = [
            { type: 'title', text: 'GAME CREDITS' },
            { type: 'space', count: 3 },
            { type: 'header', text: 'DEVELOPMENT TEAM' },
            { type: 'content', text: 'Game Developer - Inho Yoo' },
            { type: 'content', text: 'Level Designer - Inho Yoo' },
            { type: 'content', text: 'Map Designer - Inho Yoo' },
            { type: 'space', count: 3 },
            { type: 'header', text: 'GRAPHICS' },
            { type: 'content', text: 'Player Sprite - Kenney' },
            { type: 'content', text: 'Environment Tiles - Kenney' },
            { type: 'content', text: 'Boss Sprite - Kenney' },
            { type: 'space', count: 3 },
            { type: 'header', text: 'SOUND EFFECTS' },
            { type: 'content', text: 'coin.wav - Internet' },
            { type: 'content', text: 'block.ogg - Kenney' },
            { type: 'content', text: 'jump.ogg - Kenney' },
            { type: 'content', text: 'enemy.ogg - Kenney' },
            { type: 'content', text: 'bossdeath.ogg - Kenney' },
            { type: 'space', count: 3 },
            { type: 'header', text: 'SPECIAL THANKS' },
            { type: 'content', text: 'Phaser.js Framework' },
            { type: 'content', text: 'Tiled Map Editor' },
            { type: 'content', text: 'Professor Whitehead and CMPM120 TAs' },
            { type: 'space', count: 3 },
            { type: 'title', text: 'THANK YOU FOR PLAYING!' }
        ];

        sections.forEach(section => {
            const div = document.createElement('div');
            
            if (section.type === 'space') {
                div.style.height = `${section.count * 72}px`; // 폰트 크기만큼의 여백
            } else {
                div.textContent = section.text;
                if (section.type === 'header' || section.type === 'title') {
                    div.style.color = '#00ffff';
                    div.style.fontSize = section.type === 'title' ? '96px' : '84px';
                    div.style.textShadow = '0 0 10px #00ffff';
                }
            }
            
            creditsContent.appendChild(div);
        });

        creditContainer.appendChild(starsContainer);
        creditContainer.appendChild(creditsContent);

        // 게임 캔버스의 부모 요소에 크레딧 컨테이너 추가
        gameCanvas.parentElement.appendChild(creditContainer);

        // 윈도우 리사이즈 이벤트에 대응
        const updatePosition = () => {
            const newRect = gameCanvas.getBoundingClientRect();
            creditContainer.style.top = `${newRect.top}px`;
            creditContainer.style.left = `${newRect.left}px`;
            creditContainer.style.width = `${newRect.width}px`;
            creditContainer.style.height = `${newRect.height}px`;
        };

        window.addEventListener('resize', updatePosition);
        this.creditContainer = creditContainer;
        this.creditsContent = creditsContent;
        
        // cleanup 함수 저장
        this.cleanup = () => {
            window.removeEventListener('resize', updatePosition);
        };
    }

    startCreditsScroll() {
        if (this.scrollStarted) return;
        this.scrollStarted = true;

        this.creditContainer.style.opacity = '1';
        this.creditsContent.style.transition = 'all 240s linear';
        this.creditsContent.style.transform = 'scale(2.2) rotateX(45deg) translateY(-3000vh) translateZ(1000px)';

        // 애니메이션이 끝나면 자동으로 메인 메뉴로 돌아가기
        setTimeout(() => {
            this.returnToMenu();
        }, 241000); // 240초 + 1초 여유
    }

    setupInput() {
        this.spaceKey = this.input.keyboard.addKey('SPACE');
        this.spaceKey.on('down', () => {
            this.returnToMenu();
        });

        this.input.on('pointerdown', () => {
            this.returnToMenu();
        });
    }

    returnToMenu() {
        if (this.cleanup) {
            this.cleanup();
        }
        if (this.creditContainer) {
            this.creditContainer.remove();
        }

        BaseScene.initializeGameState(this.registry);
        this.scene.stop('UI');
        this.scene.start('UI');
        this.scene.start('MainMenu');
    }
}
