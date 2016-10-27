/* Video game, first start with characters, objects */

// Characters constructor
function human(health,mana,name) {
  this.health = health;
  this.mana = mana;
  this.name = name;
  this.race = "Human";
  this.type = "Humanoid";
  this.flying = false;
  this.inventory = {};
  this.mainWeapon = undefined
}

function baseHuman() {
  return new human(100,100)
}


// Characters list
var soldier = new human(150,0,"Soldier")
var protagonist = new human(100,100,"Me")




// Weapons constructor
function weapon(name, attack,type) {
  this.name = name;
  this.category = "Weapon";
  this.attack = attack;
  this.type = type;
  this.varname = name.replace(/[\'\ \"]/g,'')
}

// Weapons list
var knife = new weapon("Knife",20,"cutting")
var sentosScepter = new weapon("Sento\'s Scepter",250,"arcane")




// Inventory actions
function pickUp(subject, object) {
  subject.inventory[object.varname] = object
}
function equip(subject,object) {
  if (subject.inventory.hasOwnProperty(object.varname) === true) {
    subject.mainWeapon = object
    delete subject.inventory[object.varname]
  }
}


// Attack actions
function attack(subject, target) {
  if (subject.mainWeapon !== undefined) {
    var damage = subject.mainWeapon.attack
    var damageType = subject.mainWeapon.type
    target.health -= damage
    console.log(`You've attacked ${target.name} for ${damage} ${damageType} damage!`)
  } else {
    console.log("You don't have a weapon equipped!")
  }
}






