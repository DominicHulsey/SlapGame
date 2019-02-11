let characters = {
  player: {
    character: 'mario',
    characterImgs: {
      default: 'assets/mario.png',
      kick: 'assets/Kick.png',
      punch: 'assets/MarioPunch.png',
      fireball: 'assets/MarioFireball.png',
      heal: 'assets/MarioHeal.png'
    },
    healthStatus: 100,
    attacks: {
      punch: -1,
      kick: -5,
      fireball: -10,
      heal: 5
    },
    items: {
      GreenShell: 1.1,
      RedShell: 1.25,
      Star: 100
    },
  },
  enemy: {
    character: 'hand',
    healthStatus: 100,
    characterImgs: {
      default: 'assets/hand.png',
      flick: 'assets/Master_Hand.png',
      pinch: 'assets/Master_Hand.png',
      slap: 'assets/Master_Hand.png',
      heal: 'assets/Master_Hand.png'
    }, attacks: {
      flick: -5,
      pinch: -10,
      slap: -20,
      heal: 5
    },
    attackIndex: {
      0: 'flick',
      1: 'pinch',
      2: 'slap',
      3: 'heal'
    },
    items: {
      powerUp: 1.1,
      mushroom: 1.25,
      Star: 100
    }
  }
}

function reset() {
  characters.player.healthStatus = 100;
  characters.enemy.healthStatus = 100;
  characters.player.attacks.punch = -1;
  characters.player.attacks.kick = -5;
  characters.player.attacks.fireball = -10;
  characters.enemy.attacks.flick = -1;
  characters.enemy.attacks.pinch = -5;
  characters.enemy.attacks.kick = -10;
  drawHealth();
  (document.getElementById('playerHealthBar')).value = characters.player.healthStatus;
  (document.getElementById('enemyHealthBar')).value = characters.enemy.healthStatus;
}

function itemMultiplier(character, item) {
  let multiplier = characters[character].items[item];
  let newArr = Object.values(characters[character].attacks).map(change => {
    return change * multiplier;
  })
  if (character == 'player') {
    characters[character].attacks.punch = newArr[0]
    characters[character].attacks.kick = newArr[1]
    characters[character].attacks.fireball = newArr[2]
  }
  else {
    characters[character].attacks.flick = newArr[0]
    characters[character].attacks.pinch = newArr[1]
    characters[character].attacks.slap = newArr[2]
  }
}

function changeHealth(attacker, victim, attack) {
  let change = characters[attacker].attacks[attack]
  let health = characters[victim].healthStatus

  if (health > 0 && Math.abs(change) > health) {
    characters[victim].healthStatus = 0
  }
  else if (health > 0 && health < 101) {
    characters[victim].healthStatus += change;
    if (characters[victim].healthStatus > 100) {
      characters[victim].healthStatus == 100
    }
  }
  if (characters[victim].healthStatus == 0) {
    if (`${victim}` == 'player') {
      alert('You lose!')
    }
    else {
      alert('You Win!')
    }
    drawHealth(victim)
  }
  drawHealth(victim);
  (document.getElementById(`${victim}HealthBar`)).value = health
}

function tempDraw(attack, character) {
  console.log(`${character}Img`)
  document.getElementById(`${character}Img`).src = characters[character].characterImgs[attack];
  let damage = Math.abs(characters[`${character}`].attacks[`${attack}`]).toFixed(0)
  document.getElementById(`${character}Action`).innerText = `${character.toUpperCase()} uses ${attack.toUpperCase()} and does ${damage} damage!`
  setTimeout(function picChange() {
    document.getElementById(`${character}Img`).src = characters[character].characterImgs.default;
    document.getElementById(`${character}Action`).innerText = ''
  }, 1500);
  if (character == 'player') {
    enemyAttack()
  }
}

function enemyAttack() {
  setTimeout(function attack() {
    let attackIndex = Math.floor(Math.random() * 3)
    let attack = characters.enemy.attackIndex[attackIndex]
    changeHealth('enemy', 'player', attack)
    tempDraw(attack, 'enemy')
  }, 2500)
}

function drawHealth(character) {

  if (characters.player.healthStatus == 100) {
    document.getElementById('health2').innerText = characters.enemy.healthStatus.toFixed(1).toString();
  }
  else {
    document.getElementById('health2').innerText = characters.enemy.healthStatus.toFixed(1);
  }
  if (characters.player.healthStatus == 100) {
    document.getElementById('health1').innerText = characters.player.healthStatus.toFixed(1).toString();
  }
  else {
    document.getElementById('health1').innerText = characters.player.healthStatus.toFixed(1);
  }
}
