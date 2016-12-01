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
  this.spellbook = {};
  this.alive = true
}

// Characters list
var soldier = new human(150,0,"Soldier")
var protagonist = new human(100,100,"Me")
var archMage = new human(90,200,"ArchMage")

// make a new creature

var gargoyle = {
  name: "Gargoyle",
  health: 100,
  mana: 100,
  race: "Gargoyle",
  type: "Construct",
  flying: true,
  inventory: [],
  mainWeapon: claw = new weapon("Claw",30,"cutting",false),
  alive: true
}

// Spells constructor

function spell(name, manacost, type, cast, description) {
  this.name = name;
  this.category = "Spell";
  this.type = type;
  this.manacost = manacost;
  this.cast = cast;
  this.description = description
}

function spellCast(mana, manacost) {
  mana -= manacost;
  return mana
}

// Spells list

var shatter = {
  name: "Shatter",
  category: "Spell",
  type: "Evocation",
  manaCost: 50,
  level: 3,
  cast: function(target) {
    var weapon = target.mainWeapon
    target.mainWeapon = {};
    console.log(`${target.name}'s ${weapon.name} has been shattered.`);
  },
  varname: "shatter",
  description: "Shatter's the target's weapon, destroying it entirely."
}

var float = new spell("Float",
                      40,
                      "Alteration",
                      function(target) {
  target.flying = true;
  console.log(`${target.name} is now flying.`);
},
                     "Allows the user to fly.")

var anchor = new spell("Anchor",
                      40,
                      "Alteration",
                      function(target) {
  target.flying = false;
  console.log(`${target.name} can no longer fly.`)
},
                      "Stops the user from flying and brings them to the ground.")




// Weapons constructor
function weapon(name, attack,type, isRanged, description) {
  this.name = name;
  this.category = "Weapon";
  this.attack = attack;
  this.type = type;
  this.isRanged = isRanged;
  this.description = description;
  
  // Make varname match the actual variable name (i.e. undercase first letter, no ' " _ or spaces)
  this.varname = name.replace(/[\'\ \"\_]/g,'');
  this.varname = this.varname.substr(0,1).toLowerCase() + this.varname.substr(1)
}

// Weapons list
var knife = new weapon("Knife",20,"cutting",false,"A simple, metal knife used to shred wood.")

var sentosScepter = new weapon("Sento\'s Scepter",250,"arcane",true,"The last scepter used by the ArchMage Sento. It fires a beam of light from the ruby shard embedded in the tip.")

var bow = new weapon("Bow",40,"piercing",true,"A shortbow used for hunting.")

var sword = new weapon("Sword",50,"cutting",false,"A bronze sword typical of army footsoldiers.")

// Initialize inventories
soldier.mainWeapon = sword
archMage.mainWeapon = sentosScepter
















// Inventory actions
function pickUp(subject, object) {
  subject.inventory[object.varname] = object;
  console.log(`${subject.name} has picked up a ${object.name}.`)
}

function equip(subject,object) {
  if (subject.inventory.hasOwnProperty(object.varname) === true) {
    subject.mainWeapon = object
    delete subject.inventory[object.varname]
    console.log(`${subject.name} has equipped a ${object.name}.`)
  } else {
    console.log(`${subject.name} does not have a ${object.name}.`)
  }
}

// Spellbook actions
function learnSpell(subject, spell) {
  subject.spellbook[spell.varname] = spell;
  console.log(`${subject.name} has learned the ${spell.type} spell, ${spell.name}.`);
}



// Read an item's description
function read(item) {
  console.log(`${item.name}: ${item.description}`)
}




// Attack actions
function attack(subject, target) {
  // do damage
  if (subject.mainWeapon !== undefined) {
    // check if the target is ranged and the weapon is ranged
    if (target.flying !== true || (target.flying === true && subject.mainWeapon.isRanged === true)) {  
    var damage = subject.mainWeapon.attack
      var damageType = subject.mainWeapon.type
      target.health -= damage
      console.log(`${subject.name} has attacked ${target.name} for ${damage} ${damageType} damage!`)
      var killed = isDead(target)
      
      // else if can't reach flying
      } else {
        console.log(`${subject.name} can't reach ${target.name} with ${subject.name}'s ${subject.mainWeapon.name}.`)
      }
    
    // else if no weapon equipped     
  } else {
    console.log("You don't have a weapon equipped!")
  }
    
}

// check to see if character is dead
function isDead(target) {
  if (target.health <= 0) {
    console.log(`${target.name} has died.`)
    target.alive = false
    return true
  } else {
    return false
  }
}





