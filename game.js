let characters = {
  player: {
    character: 'mario',
    characterImgs: ['/assets/mario.png', 0, 0],
    healthStatus: 100,
  },
  enemy: {
    character: 'hand',
    healthStatus: 100,
    characterImgs: ['assets/hand.png', 0, 0]
  },
  items: {
    GreenShell: 1.1,
    RedShell: 1.25,
    Star: 100
  },
  attacks: {
    punch: -1,
    kick: -5,
    fireball: -10,
    heal: 5
  }
}

function reset() {
  characters.player.healthStatus = 100;
  characters.enemy.healthStatus = 100;
  characters.attacks.punch = -1;
  characters.attacks.kick = -5;
  characters.attacks.fireball = -10;
  characters.attacks.heal = 5
  drawHealth();
}

console.log(Object.values(characters.attacks))

function itemMultiplier(item) {
  let multiplier = characters.items[item];
  let newArr = Object.values(characters.attacks).map(change => {
    return change * multiplier;
  })
  characters.attacks.punch = newArr[0]
  characters.attacks.kick = newArr[1]
  characters.attacks.fireball = newArr[2]
}

function changeHealth(character, attack) {
  let change = characters.attacks[attack]
  let health = characters[character].healthStatus

  if (health > 0 && Math.abs(change) > health) {
    characters[character].healthStatus = 0
    drawHealth()
  }
  else if (health > 0) {
    (document.getElementById("health")).value = (characters[character].healthStatus += change).toFixed(1)
    drawHealth()
  }
  if (characters[character].healthStatus == 0) {
    (document.getElementById("health")).value = 0;
    console.log('Game Over.')
    drawHealth()
  }
}
console.log(((document.getElementById("health")).value))

function drawHealth() {
  document.getElementById('health1').innerText = characters.player.healthStatus.toFixed(1);
  document.getElementById('health2').innerText = characters.enemy.healthStatus.toFixed(1);
}
