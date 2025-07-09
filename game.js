const player = document.getElementById('player');
const game = document.querySelector('.game');
const platforms = document.querySelectorAll('.platform');
const coins = document.querySelectorAll('.coin');
const enemy = document.getElementById('enemy');
const enemy2 = document.querySelector('#enemy2');
const countNumb = document.querySelector('.countNumb');
const hard1 = document.querySelector('.hard1');
const hard2 = document.querySelector('.hard2');
const hard3 = document.querySelector('.hard3');
const popupbg = document.querySelector('.popupbg');
const popupMenu = document.querySelector('.popup-bg');
const btnStart = document.querySelector('.btnStart');
const popupWin = document.querySelector('.popupWin');
let hards = document.querySelectorAll('.hard');
const countbg = document.querySelector('.countbg');
const imgCastle = document.querySelector('.imgCastle');
const imgCastleCount = document.querySelector('.imgCastleCount');
const sword = document.querySelector('.sword');
const bullet = document.querySelector('.bullet');
const audioGame = document.querySelector('.audioGame');
const audioWin = document.querySelector('.audioWin');
const platformSekret = document.querySelector('.platformSekret');
const coinHiden = document.querySelectorAll('.coinHiden');
const player2 = document.querySelector('.player2');
const imgBullet = document.querySelector('.imgBulet');
const hardsSonic = document.querySelectorAll('.hardsSon');
const countNumbSonic = document.querySelector('.countNumbS');
const dragonBoss = document.querySelector('.dragonBoss');
const bulletFier = document.querySelector('.bulletFier');
const dragonHards = document.querySelectorAll('.dragonHard');
const dead = document.querySelector('.dead');
const dead2 = document.querySelector('.dead2');
const centerLefeDragons = document.querySelector('.center');


let currentLife = hards.length;
let currentLifeSonic = hardsSonic.length;
let currentLifeDragon = dragonHards.length;
let isHit = false;
let isHitSonic = false;
let deadMario = false;
let deadSonic = false;
let deadDragon = false;

let start = true;
let isFaceRightMario = true;
let isFaceRightSonic = true;

countNumb.textContent = countNumb.textContent.length;
countNumbSonic.textContent = countNumbSonic.textContent.length;
let totalCoins = [];
let touchSonic = true;
let gameOverSonic = false;
let gameOverMario = false;
let isDragons = false;

popupMenu.classList.add('menutransletY');
btnStart.addEventListener('click', () => {
       popupMenu.classList.add('active');
       update();
       audioGame.play();
});

function darkBackground() {
    game.style.backgroundImage = 'linear-gradient(to top, black)';
    countNumb.style.color = '#fff';
    countbg.style.color = '#fff';
}

            //  Управление и атака Марио

let position = { x: 50, y: 100 };
let velocity = { x: 0, y: 0 };
let gravity = 0.5;
let onGround = false;
let enemyDirection = 1;
let enemyDirection2 = 1;

        //  Sonic

let positionSonic = { x: 100, y: 100 };
let velocitySonic = {x: 0, y: 0};
let gravitySonic = 0.5;
let onGroundSonic = false;
let enemyDirectionSonic = 1;
let enemyDirectionSonic2 = 1;

            //Dragons
let positionDragons = {x: 500, y: 80};



function runs() {
   player.style.animation = 'run .5s steps(5) infinite';
};

function runSonic() {
    player2.style.animation = 'runSonic .3s steps(3) infinite';
};

                // Атака пули и мечь

function attackBullet() {
  if(deadMario) return;

  let audioBullet = document.createElement('audio');
  audioBullet.setAttribute('src', 'audio/sfx-17.mp3');
  audioBullet.play();

  let bullet = document.createElement('img');
  bullet.setAttribute('src', 'img/bullet2.jpeg');
  bullet.style.position = 'absolute';
  bullet.style.width = '20px';
  bullet.style.height = '20px';
  bullet.style.borderRadius = '50%';
  bullet.style.backgroundColor = 'orange';
  bullet.style.zIndex = 1000;

  // Направление
  let speedX = isFaceRightMario ? 7 : -7;
  let bulletX = position.x + (isFaceRightMario ? 60 : -10);
  let bulletY = position.y + 60;

  bullet.style.left = bulletX + 'px';
  bullet.style.bottom = bulletY + 'px';

  // Добавить пулю в DOM
  game.appendChild(bullet);

   setTimeout(() => {
    bullet.remove();
   }, 1600);

  let speedY = -7;
  let gravity = 0.4;

  let bulletInterval = setInterval(() => {
    bulletX += speedX;
    speedY -= gravity;
    bulletY += speedY;

    if (bulletY <= 100) {
      bulletY = 100;
      speedY = 6;
    }
    

    bullet.style.left = bulletX + 'px';
    bullet.style.bottom = bulletY + 'px';

    const bulletRect = bullet.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();
    const enemyRect2 = enemy2.getBoundingClientRect();
    const dragonRect = dragonBoss.getBoundingClientRect();
    const bulletMarioRect = bullet.getBoundingClientRect();

    if (bulletMarioRect.right > dragonRect.left  &&
        bulletMarioRect.left < dragonRect.right &&
        bulletMarioRect.bottom > dragonRect.top &&
        bulletMarioRect.top < dragonRect.bottom
    ) {

       if (currentLifeDragon <= 1) {
           deadDragon = true;
           dragonBoss.style.display = 'none';
           dead.style.display = 'flex';

           setTimeout(() => {
                dead2.style.display = 'flex';
           }, 200);
       }
         if (currentLifeDragon > 0) {
            currentLifeDragon--;
            dragonHards[currentLifeDragon].style.display = 'none';
         }
            bullet.remove();
            return;
    }

    // Столкновения
    if (
      bulletRect.right > enemyRect.left &&
      bulletRect.left < enemyRect.right &&
      bulletRect.bottom > enemyRect.top &&
      bulletRect.top < enemyRect.bottom &&
      enemy.style.display !== 'none'
    ) {
      enemy.style.display = 'none';
      bullet.remove();
      clearInterval(bulletInterval);
      setTimeout(() => {
        enemy.style.display = 'flex';
     },4000);
    }

    if (
      bulletRect.right > enemyRect2.left &&
      bulletRect.left < enemyRect2.right &&
      bulletRect.bottom > enemyRect2.top &&
      bulletRect.top < enemyRect2.bottom &&
      enemy2.style.display !== 'none'
    ) {
      enemy2.style.display = 'none';
      bullet.remove();
      clearInterval(bulletInterval);
      setTimeout(() => {
        enemy2.style.display = 'flex';
     },4000);
    }

    if (bulletX < 0 || bulletX > window.innerWidth) {
      bullet.remove();
      clearInterval(bulletInterval);
    }
  }, 30);
}

function attackSword() {
    let audioSword = document.createElement('audio');
    audioSword.setAttribute('src', 'audio/promah-pri-boe-na-mechah.mp3');
    game.appendChild(audioSword);
    audioSword.play();
    let div = document.createElement('div');
    div.setAttribute('class', 'sword');
    sword.style.display = 'flex';
    sword.style.animation = 'attack .2s linear';
    player.appendChild(sword);
    setTimeout(() => {
        sword.style.display = 'none'
    }, 500);

    const dragonRect = dragonBoss.getBoundingClientRect();
    const swordRect = sword.getBoundingClientRect();

    if (
        swordRect.right > dragonRect.left  &&
        swordRect.left < dragonRect.right &&
        swordRect.bottom > dragonRect.top &&
        swordRect.top < dragonRect.bottom
    ) {

       if (currentLifeDragon <= 1) {
           deadDragon = true;
           dragonBoss.style.display = 'none';
           dead.style.display = 'flex';

           setTimeout(() => {
                dead2.style.display = 'flex';
           }, 200);
       } 
         if (currentLifeDragon > 0) {
            currentLifeDragon--;
            dragonHards[currentLifeDragon].style.display = 'none';
         }
    }

};

function attackBulletSonic() {
    if(deadSonic) return;
    
    let audioBulet = document.createElement('audio');
    audioBulet.setAttribute('src', 'audio/sfx-19.mp3');
    game.appendChild(audioBulet);
    audioBulet.play();
    let imgBullet = document.createElement('img');
    imgBullet.setAttribute('src', 'img/bullet2.jpeg');
    imgBullet.setAttribute('class', 'bulet');
    imgBullet.style.position = 'absolute';
    imgBullet.style.width = '20px';
    imgBullet.style.height = '20px';
    imgBullet.style.borderRadius = '50%';
    imgBullet.style.zIndex = 1000;

    let speedX = isFaceRightSonic ? 7 : -7;
    let bulletX = positionSonic.x + (isFaceRightSonic ? 60 : -10);
    let bulletY = positionSonic.y + 60;
    game.appendChild(imgBullet);

    let speedY = -7;
    let gravity = 0.4;

    let bulletInterval = setInterval(() => {
    bulletX += speedX;
    speedY -= gravity;
    bulletY += speedY;

    if (bulletY <= 100) {
      bulletY = 100;
      speedY = 6;
    }

    const bulletSonicRect = imgBullet.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();
    const enemy2Rect = enemy2.getBoundingClientRect();
    const dragonRect = dragonBoss.getBoundingClientRect();

     if (bulletSonicRect.right > dragonRect.left  &&
         bulletSonicRect.left < dragonRect.right &&
         bulletSonicRect.bottom > dragonRect.top &&
         bulletSonicRect.top < dragonRect.bottom
     ) {

        if (currentLifeDragon <= 1) {
            deadDragon = true;
            dragonBoss.style.display = 'none';
            dead.style.display = 'flex';
            setTimeout(() => {
                 dead2.style.display = 'flex';
            }, 200);
        }  
          if (currentLifeDragon > 0) {
            currentLifeDragon--;
            dragonHards[currentLifeDragon].style.display = 'none';
          }
            imgBullet.remove();
     }

    if (bulletSonicRect.right > enemyRect.left &&
        bulletSonicRect.left < enemyRect.right &&
        bulletSonicRect.bottom > enemyRect.top &&
        bulletSonicRect.top < enemyRect.bottom 
    ) {
        enemy.style.display = 'none';
        imgBullet.remove();
        setTimeout(() => {
            enemy.style.display = 'flex';
        }, 4000)
    }

    if (bulletSonicRect.right > enemy2Rect.left && 
        bulletSonicRect.left < enemy2Rect.right &&
        bulletSonicRect.bottom > enemy2Rect.top &&
        bulletSonicRect.top < enemy2Rect.bottom
    ) {
        enemy2.style.display = 'none';
        imgBullet.remove();
        setTimeout(() => {
            enemy2.style.display = 'flex';
        }, 4000)
    }

    setTimeout(() => {
        imgBullet.style.display = 'none';
    }, 1600)

  
    imgBullet.style.left = bulletX + 'px';
    imgBullet.style.bottom = bulletY + 'px';

    if (bulletX < 0 || bulletX > 1920) {
        imgBullet.remove();
        clearInterval(bulletInterval);
      }

  }, 30);

};

                //player2 - Sonic

document.addEventListener('keydown', (e) => {
    if (deadSonic) return;

    if (e.key === 'ArrowRight') {
        isFaceRightSonic = true;
        player2.style.transform = 'rotateY(0)';
        runSonic();
        velocitySonic.x = 3;
     };
    
    if (e.key === 'ArrowLeft') {
        isFaceRightSonic = false;
        player2.style.transform = 'rotateY(180deg)';
        runSonic();
        velocitySonic.x = -3;
    }
  
    if (e.key === 'ArrowDown' && onGroundSonic === true) {
        let audio = document.createElement('audio');
       audio.setAttribute('src', 'audio/sfx-14.mp3');
       velocitySonic.y = 10;
       onGroundSonic = false;
       audio.play();
    }

    if (e.key === 'ArrowUp') {
        attackBulletSonic();
    }
});

document.addEventListener('keyup', (e) => {
    if (deadSonic) return;

    if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        velocitySonic.x = 0;
        player2.style.animation = 'none';
    }
});

 //   Игрок Марио

document.addEventListener('keydown', (e) => {
  if (deadMario) return;
  
  if (e.key === 'd') {
    isFaceRightMario = true;
    player.style.transform = 'rotateY(0)';
      runs();
      velocity.x = 3;
  }

  if (e.key === 'w') {
     attackSword();
  }

  if (e.key === 's') {
     attackBullet();
  }

  if (e.key === 'a') {
      isFaceRightMario = false;
      player.style.transform = 'rotateY(180deg)';
      runs();
      velocity.x = -3;
  }

  if (e.key === ' ' && onGround) {
      let audio = document.createElement('audio');
      audio.setAttribute('src', 'audio/sfx-13.mp3');
      velocity.y = 10; // Прыжок вверх
      onGround = false;
      audio.play();
  }
});

document.addEventListener('keyup', (e) => {
  if (deadMario) return;

  if (e.key === 'd' || e.key === 'a') {
    velocity.x = 0;
    player.style.animation = 'none';
  } 
});


function fightDragons() {
    dragonBoss.style.display = 'flex';
    centerLefeDragons.style.display = 'flex';
    enemy.style.display = 'none';
    enemy2.style.display = 'none';
    let audioBoss = document.createElement('audio');
    audioBoss.src = 'audio/8e5a1d6a3ca5721.mp3';
    game.appendChild(audioBoss);
    audioGame.pause();
    audioBoss.play();
    
function dragonsBullet() {
    if (deadDragon) {
        audioBoss.pause();
        return;
    }

    let imgFier = document.createElement('img');
    imgFier.src = 'img/fierBullets.webp';
    imgFier.className = 'bulletFier';
    imgFier.style.position = 'absolute';
    imgFier.style.transform = 'rotate(90deg)';
    imgFier.style.width = '40px';
    imgFier.style.height = '40px';
    imgFier.style.zIndex = 1000;

    let speedX = 7; // Можно потом добавить направление
    let bulletX = positionDragons.x;
    let bulletY = positionDragons.y + 100;

    if (!deadDragon) {
        game.appendChild(imgFier);
    }

    let speedY = -5;
    let gravity = 0.4;

    if (currentLife === 0 && currentLifeSonic === 0) {
        deadMario = true;
        deadSonic = true;
        let audioDead = document.createElement('audio');
        audioDead.src = 'audio/mario-smert.mp3';

        imgFier.remove();
        clearInterval(bulletInterval);
        audioGame.pause();
     }

     let audioBulletDragon = document.createElement('audio');
        audioBulletDragon.src = 'audio/73008.mp3';
        game.appendChild(audioBulletDragon);
        audioBulletDragon.play();

    let bulletInterval = setInterval(() => {
        bulletX += speedX;
        speedY -= gravity;
        bulletY += speedY;

        if (bulletY <= 100) {
            bulletY = 100;
            speedY = 6;
        }

        const bulletRect = imgFier.getBoundingClientRect();
        const marioRect = player.getBoundingClientRect();
        const sonicRect = player2.getBoundingClientRect();
        
        enemy.style.display = 'none';
        enemy2.style.display = 'none';
        
        if( bulletRect.right > marioRect.left &&
            bulletRect.left < marioRect.right &&
            bulletRect.bottom > marioRect.top &&
            bulletRect.top < marioRect.bottom
        ) {
            if(currentLife <= 1) {
                let audioDedMario = document.createElement('audio');
                audioDedMario.src = 'audio/73007.mp3';
                game.appendChild(audioDedMario);
                audioDedMario.play();

                deadMario = true;
                player.style.display = 'none';
            }
            imgFier.remove();
            if (currentLife > 0) {
                currentLife--;
                hards[currentLife].style.display = 'none';
            }
        }
        
        if( bulletRect.right > sonicRect.left &&
            bulletRect.left < sonicRect.right &&
            bulletRect.bottom > sonicRect.top &&
            bulletRect.top < sonicRect.bottom
        ) {
            if(currentLifeSonic <= 1) {
                let audioDedMario = document.createElement('audio');
                audioDedMario.src = 'audio/73007.mp3';
                game.appendChild(audioDedMario);
                audioDedMario.play();
                
                deadSonic = true;
                player2.style.display = 'none';
            }
            imgFier.remove();
            if (currentLifeSonic > 0) {
                currentLifeSonic--;
                hardsSonic[currentLifeSonic].style.display = 'none';
            }
        };

        imgFier.style.right = bulletX + 'px';
        imgFier.style.bottom = bulletY + 'px';

        if (bulletX > 1920) {
            imgFier.remove();
            clearInterval(bulletInterval);
        }

    }, 30);
}

setInterval(() => {
    dragonsBullet();
}, 2000);


};

function update() {

     if (totalCoins.length >= 1 && !isDragons) {
         isDragons = true;
         fightDragons();
     }
             //  Игроки умераю оба
    if (deadMario && deadSonic) {
        audioGame.pause();
        player.style.display = 'none';
        player2.style.display = 'none';
        enemy.style.display = 'none';
        enemy2.style.display = 'none';

        let audioDead = document.createElement('audio');
        audioDead.setAttribute('src', 'audio/mario-smert.mp3');
        popupWin.classList.add('active');
    };

    // Применяем гравитацию к Сонику
velocitySonic.y -= gravitySonic;

positionSonic.x += velocitySonic.x;

if (positionSonic.x < 0) positionSonic.x = 0;
if (positionSonic.x > 1860) positionSonic.x = 1860;

// Обновляем позицию по Y
positionSonic.y += velocitySonic.y;
if (positionSonic.y <= 100) {
    positionSonic.y = 100;
    velocitySonic.y = 0;
    onGroundSonic = true;
} else {
    onGroundSonic = false;
}

// Применяем изменения к стилям
player2.style.left = positionSonic.x + 'px';
player2.style.bottom = positionSonic.y + 'px';

  // Применяем гравитацию
  velocity.y -= gravity;

  // Обновляем позицию игрока
  position.x += velocity.x;
  position.y += velocity.y;

  if (position.x < 0) position.x = 0;
  if (position.x > 1860) position.x = 1860;

  // Ограничение по земле
if (position.y <= 100) {
    position.y = 100;
    velocity.y = 0;
    onGround = true;
  } else {
    onGround = false;
  }

      // Платформы
platforms.forEach(platform => {
    const rect = platform.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    const playerRect2 = player2.getBoundingClientRect();
    const gameRect = game.getBoundingClientRect();
    const platformSekretRect = platformSekret.getBoundingClientRect();

        //Секретная платформа

    if ( playerRect.top <= platformSekretRect.bottom &&
        playerRect.top >= platformSekretRect.bottom -10 &&
        playerRect.right > platformSekretRect.left &&
        playerRect.left < platformSekretRect.right 
    ) {
        platformSekret.classList.add('active');
        coinHiden.forEach(coi => {
            coi.classList.add('active');
        });
    }

    if (playerRect.bottom >= platformSekretRect.top &&
        playerRect.bottom <= platformSekretRect.top + 10 &&
        playerRect.right > platformSekretRect.left && 
        playerRect.left < platformSekretRect.right &&
        velocity.y <= 0
    ) {
       position.y = parseInt(platformSekret.style.bottom) + 20;
       velocity.y = 0;
       onGround = true;
    }
    
    if (playerRect2.bottom >= rect.top &&
        playerRect2.bottom <= rect.top + 10 &&
        playerRect2.right > rect.left &&
        playerRect2.left < rect.right &&
        velocitySonic.y <= 0
    ) {
        positionSonic.y = parseInt(platform.style.bottom) + 20;
        velocitySonic.y = 0;
        onGroundSonic = true;
    }

    if (
      playerRect.bottom >= rect.top &&
      playerRect.bottom <= rect.top + 10 &&
      playerRect.right > rect.left &&
      playerRect.left < rect.right &&
      velocity.y <= 0
    ) {
        
      // Приземлился на платформу

      position.y = parseInt(platform.style.bottom) + 20;
      velocity.y = 0;
      onGround = true;
    }
  });

         // Монеты

coins.forEach(coin => {
    if (!coin.style.display || coin.style.display !== 'none') {
      const coinRect = coin.getBoundingClientRect();
      const playerRect = player.getBoundingClientRect();
      const player2Rect = player2.getBoundingClientRect();
     
                //Sonic
       if (
           player2Rect.right > coinRect.left &&
           player2Rect.left < coinRect.right && 
           player2Rect.bottom > coinRect.top &&
           player2Rect.top < coinRect.bottom
       ) {
          let audioCoin = document.createElement('audio');
          audioCoin.setAttribute('src', 'audio/sfx-1.mp3');
          totalCoins.push(1);
          countNumbSonic.textContent++;
          coin.remove();
          audioCoin.play();
       }
            //Mario
      if (
          playerRect.right > coinRect.left &&
          playerRect.left < coinRect.right &&
          playerRect.bottom > coinRect.top &&
          playerRect.top < coinRect.bottom
      ) {
          let audioCoin = document.createElement('audio');
          audioCoin.setAttribute('src', 'audio/sfx-5.mp3');
          totalCoins.push(1);
          countNumb.textContent++;
          coin.remove();
          audioCoin.play();
      }

                //   darkBackground-game

    //  if(countNumb.textContent === '4') {
    //    darkBackground();
    //  };

      if(countNumb.textContent === '6') {
        imgCastleCount.classList.add('active');
      };
      
    };

  });

//   Враг двигается влево и вправо

  let enemyX = parseInt(enemy.style.left);
  enemyX += enemyDirection * 2;
  if (enemyX <= 400 || enemyX >= 700) enemyDirection *= -1;
  enemy.style.left = enemyX + 'px';
  if(enemyX === 400) {
    enemy.style.transform = 'rotateY(180deg)';
  }else if (enemyX === 700) {
    enemy.style.transform = 'rotateY(0)';
  }

  let enemyX2 = parseInt(enemy2.style.left);
  enemyX2 += enemyDirection2 * 2;
  if(enemyX2 <= 850 || enemyX2 >= 1400) enemyDirection2 *= -1;
  enemy2.style.left = enemyX2 + 'px';
  if(enemyX2 === 850) {
     enemy2.style.transform = 'rotateY(180deg)';
  }else if (enemyX2 === 1400) {
    enemy2.style.transform = 'rotateY(0)';
  }

  // Проверка столкновения с врагом

  const enemyRect = enemy.getBoundingClientRect();
  const playerRect = player.getBoundingClientRect();
  const enemyRect2 = enemy2.getBoundingClientRect();
  const swordRect = sword.getBoundingClientRect();
  const player2Rect = player2.getBoundingClientRect();
  const dragonRect = dragonBoss.getBoundingClientRect();


            //  Mario умерат от касания Dragons
    if (playerRect.right > dragonRect.left &&
        playerRect.left < dragonRect.right &&
        playerRect.bottom > dragonRect.top &&
        playerRect.top < dragonRect.bottom
    ) {
        if (currentLife === 0) {
            deadMario = true;
            player.style.display = 'none';
        }

        if (currentLife > 0) {
            currentLife--;
            hards[currentLife].style.display = 'none';
        }
    }
              //  Sonic умерат от касания Dragons
   if (player2Rect.right > dragonRect.left &&
       player2Rect.left < dragonRect.right &&
       player2Rect.bottom > dragonRect.top &&
       player2Rect.top < dragonRect.bottom
    ) {
        if (currentLifeSonic === 0) {
            deadSonic = true;
            player2.style.display = 'none';
        }

        if (currentLifeSonic > 0) {
            currentLifeSonic--;
            hardsSonic[currentLifeSonic].style.display = 'none';
        }
    }

   if (
     swordRect.right > enemyRect.left &&
     swordRect.left < enemyRect.right &&
     swordRect.bottom > enemyRect.top &&
     swordRect.top < enemyRect.bottom
   ) {
     let audipDeadEnemy = document.createElement('audio');
     audipDeadEnemy.setAttribute('src', 'audio/razrezayuschiy-udar-mechom.mp3');
     game.appendChild(audipDeadEnemy);
     enemy.style.display = 'none';
     audipDeadEnemy.play();
     setTimeout(() => {
        enemy.style.display = 'flex';
     },4000);
   };
     
            //  Второй враг

   if (
       swordRect.right > enemyRect2.left &&
       swordRect.left < enemyRect2.right &&
       swordRect.bottom > enemyRect2.top &&
       swordRect.top < enemyRect2.bottom
     ) {
        let audipDeadEnemy = document.createElement('audio');
        audipDeadEnemy.setAttribute('src', 'audio/razrezayuschiy-udar-mechom.mp3');
        game.appendChild(audipDeadEnemy);
        enemy2.style.display = 'none';
        audipDeadEnemy.play();
        setTimeout(() => {
            enemy2.style.display = 'flex';
        }, 4000);
     };

        //Sonic
   if (
      player2Rect.right > enemyRect.left && 
      player2Rect.left < enemyRect.right &&
      player2Rect.bottom > enemyRect.top &&
      player2Rect.top < enemyRect.bottom
   ) {
      let audioAnimSonic = document.createElement('audio');
      player2.classList.add('active');
      game.appendChild(audioAnimSonic);
      audioAnimSonic.play();

      setTimeout(() => {
          player2.classList.remove('active')
      }, 500);
   }

   if (player2Rect.right > enemyRect2.left && 
       player2Rect.left < enemyRect2.right &&
       player2Rect.bottom > enemyRect2.top &&
       player2Rect.top < enemyRect2.bottom
    ) {
        let audioAnimSonic = document.createElement('audio');
        player2.classList.add('active');
        game.appendChild(audioAnimSonic);
        audioAnimSonic.play();
  
        setTimeout(() => {
            player2.classList.remove('active')
        }, 500);
    }
    
        //   Mario
  if (
       playerRect.right > enemyRect.left &&
       playerRect.left < enemyRect.right &&
       playerRect.bottom > enemyRect.top &&
       playerRect.top < enemyRect.bottom
  ) {
       
       player.classList.add('active');
       setTimeout(() => {
           player.classList.remove('active')
       }, 500);
  }

        //   Падают Игроки
        const sonicRect = player2.getBoundingClientRect();
        
        // Проверка столкновения
        const isTouchSonic = (
            sonicRect.right > playerRect.left &&
            sonicRect.left < playerRect.right &&
            sonicRect.bottom > playerRect.top &&
            sonicRect.top < playerRect.bottom 
        );

        const isTouchMario = (
            playerRect.right > sonicRect.left &&
            playerRect.left < sonicRect.right &&
            playerRect.bottom > sonicRect.top &&
            playerRect.top < sonicRect.bottom
        );
        
        if (isTouchSonic) {
            player.style.transform = 'rotate(-80deg) translateX(-22px)';
            setTimeout(() => {
                player.style.transform = 'rotate(0deg) translateX(0)';
            }, 500);
        };

        if (isTouchMario) {
            player2.style.transform = 'rotateX(180deg) rotate(100deg) translateX(-30px)';
            setTimeout(() => {
                player2.style.transform = 'rotateX(0deg) rotate(0deg) translateX(0px)';
            }, 500);
        };

function checkCollision() {
    const enemyRect = enemy.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    const enemyRect2 = enemy2.getBoundingClientRect();
    const castleRect = imgCastle.getBoundingClientRect();
    const sonicRect = player2.getBoundingClientRect();


            //Победа Mario
    
        const touchCastle = (
        playerRect.right > castleRect.left && 
        playerRect.bottom > castleRect.top);
    if(totalCoins.length >= 6 && deadDragon && touchCastle) {
        gameOverMario = true;
        gameOverSonic = true;

        player.style.display = 'none';
        document.querySelector('.playerCastle').classList.add('active');
        let img = document.createElement('img');
        img.setAttribute('class', 'imgCastle');
        img.setAttribute('src', 'img/castleAnim.gif');
        document.querySelector('.castleBground').appendChild(img);

        player.classList.add('playerWins');
        popupbg.classList.add('active');
        enemy.style.display = 'none';
        enemy2.style.display = 'none';
        player2.style.display = 'none';
        audioGame.pause();
        audioWin.play();
    };

         //  Победа Sonic

    const touchCastleSonic = (
        sonicRect.right > castleRect.left &&
        sonicRect.bottom > castleRect.top); 
    if (totalCoins.length >= 6 && deadDragon && touchCastleSonic) {
        gameOverMario = true;
        gameOverSonic = true;
        
        player2.style.display = 'none';
        document.querySelector('.playerSonic').classList.add('active');
        let img = document.createElement('img');
        img.setAttribute('class', 'imgCastle');
        img.setAttribute('src', 'img/castleAnim.gif');
        document.querySelector('.castleBground').appendChild(img);

        player2.classList.add('playerWins');
        popupbg.classList.add('active');
        enemy.style.display = 'none';
        enemy2.style.display = 'none';
        player.style.display = 'none';

        audioGame.pause();
        audioWin.play();
    }

        //   Sonic
        
    const isTouchSonic = (
        sonicRect.right > enemyRect.left &&
        sonicRect.left < enemyRect.right &&
        sonicRect.bottom > enemyRect.top &&
        sonicRect.top < enemyRect.bottom
    )
    const isTouchSonic2 = (
        sonicRect.right > enemyRect2.left &&
        sonicRect.left < enemyRect2.right &&
        sonicRect.bottom > enemyRect2.top &&
        sonicRect.top < enemyRect2.bottom
    )

    if (isTouchSonic && !isHitSonic || isTouchSonic2 && !isHitSonic) {
        isHitSonic = true;
        
        if (currentLifeSonic > 0) {
            let audioAnimMario = document.createElement('audio');
            audioAnimMario.setAttribute('src', 'audio/sfx-19.mp3');
            currentLifeSonic--;
            hardsSonic[currentLifeSonic].style.display = 'none';
            audioAnimMario.play();
          };

          if (currentLifeSonic === 0) {
             gameOverSonic = true;
             let audioDead = document.createElement('audio');
             audioDead.setAttribute('src', 'audio/mario-smert.mp3');
             player2.style.animation = 'dead 3s linear';
             setTimeout(() => {
              player2.style.display = 'none';
             }, 500);
             audioDead.play();
        
          };

          setTimeout(() => {
            isHitSonic = false;
          }, 1000);
    }

            //   Mario

    const isTouch = (
      playerRect.right > enemyRect.left &&
      playerRect.left < enemyRect.right &&
      playerRect.bottom > enemyRect.top &&
      playerRect.top < enemyRect.bottom
    );
    
    const isTouch2 = (
      playerRect.right > enemyRect2.left &&
      playerRect.left < enemyRect2.right &&
      playerRect.bottom > enemyRect2.top &&
      playerRect.top < enemyRect2.bottom
    );
    
    if (isTouch && !isHit || isTouch2 && !isHit) {
      isHit = true;

      if (currentLife > 0) {
        let audioAnimMario = document.createElement('audio');
        audioAnimMario.setAttribute('src', 'audio/sfx-19.mp3');
        currentLife--;
        hards[currentLife].style.display = 'none';
        audioAnimMario.play();
      };
      
      if (currentLife === 0) {
        gameOverMario = true;
        let audioDead = document.createElement('audio');
        audioDead.setAttribute('src', 'audio/mario-smert.mp3');
        player.style.animation = 'dead 3s linear';
        setTimeout(() => {
          player.style.display = 'none';
        }, 500);
        audioDead.play();

      };
    
      // Временно делает игрока "неуязвимым"
      setTimeout(() => {
        isHit = false;
      }, 1000);

    }
  }

  setInterval(checkCollision, 50);

   
    // Второй враг
  if (
    playerRect.right > enemyRect2.left &&
    playerRect.left < enemyRect2.right &&
    playerRect.bottom > enemyRect2.top &&
    playerRect.top < enemyRect2.bottom
  ) {
        player.style.animation = 'redcolor .3s linear infinite';
    setTimeout(() => {
        player.style.animation = 'none';
    }, 500);

  }

  // Обновление позиции игрока
  player.style.left = position.x + 'px';
  player.style.bottom = position.y + 'px';
  
  requestAnimationFrame(update);

};


document.querySelector('.btnWin').addEventListener('click', () => {
    popupWin.classList.remove('active');
    location.reload();
});

document.querySelector('.btnChos').addEventListener('click', () => {
    popupbg.classList.remove('active');
    location.reload();
});




