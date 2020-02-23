/*
* Game: Taisho
* Author: Adam M. Deaton
* Version: 0.1 
* Date: 2020-02-20
* Copyright: All rights reserved: Adam M. Deaton 2020
*/  

//Unit Class takes unique id and type name
class Unit{
    constructor(id, type, color){
	this.id = id;
	this.type = type;
	this.color = color;
	if(type == "kenshi"){
	    this.att = 10;
	    this.attMax = 10;
            this.def = 10;
            this.hp = 10;
	    this.hpMax = 10;
	    this.mov = 1;
	    this.movMax = 1;
            this.melee = 0;
            this.meleeDis = 0;
            this.dan = 0;
	    this.cost = 30;
	    this.kills = 0;
	}
	else if(type == "ninja"){
	    this.att = 8;
	    this.attMax = 8;
            this.def = 5;
            this.hp = 8;
	    this.hpMax = 8;
	    this.mov = 2;
	    this.movMax = 2;
            this.melee = 0;
            this.meleeDis = 0;
            this.dan = 0;
	    this.cost = 26;
	    this.kills = 0;
	}
	else if(type == "cavalry"){
	    this.att = 12;
	    this.attMax = 12;
            this.def = 8;
            this.hp = 15;
	    this.hpMax = 15;
	    this.mov = 2;
	    this.movMax = 2;
            this.melee = 0;
            this.meleeDis = 0;
            this.dan = 0;
	    this.cost = 40;
	    this.kills = 0;
	}
	else if(type == "archer"){
            this.att = 2;
	    this.attMax = 2;
            this.def = 2;
            this.hp = 5;
	    this.hpMax = 5;
	    this.mov = 1;
	    this.movMax = 1;
            this.melee = 5;
            this.meleeDis = 1;
            this.dan = 0;
	    this.cost = 15;
	    this.kills = 0;
	}
	else if(type == "taisho"){
	    //New to modify this unit
	    this.att = 15;
	    this.attMax = 15;
            this.def = 15;
            this.hp = 20;
	    this.hpMax = 20;
	    this.mov = 1;
	    this.movMax = 1;
            this.melee = 0;
            this.meleeDis = 0;
            this.dan = 0;
	    this.cost = 0;
	    this.kills = 0;
	}
	else if(type == "ashigaru"){
	    this.att = 5;
	    this.attMax = 5;
            this.def = 5;
            this.hp = 5;
	    this.hpMax = 5;
	    this.mov = 1;
	    this.movMax = 1;
            this.melee = 0;
            this.meleeDis = 0;
            this.dan = 0;
	    this.cost = 15;
 	    this.kills = 0;
	}
	else if(type == "medic"){
	    this.att = 1;
	    this.attMax = 1;
            this.def = 1;
            this.hp = 5;
	    this.hpMax = 5;
	    this.mov = 1;
	    this.movMax = 1;
            this.melee = 0;
            this.meleeDis = 0;
            this.dan = 0;
	    this.cost = 8;
	    this.kills = 0;
	}
	else if(type == "monk"){
	    this.att = 8;
	    this.attMax = 8;
            this.def = 8;
            this.hp = 8;
	    this.hpMax = 8;
	    this.mov = 1;
            this.movMax = 1;
            this.melee = 0;
            this.meleeDis = 0;
            this.dan = 0;
	    this.cost = 24;
	    this.kills = 0;
	}
	else{
		alert("ERROR: Unit type not recognized.");
	}
    }
    //medic special ability
    useMedic(unit, thisLocationID, targetX, targetY){
	if(this.type == "medic" && this.mov > 0){
	    let x = thisLocationID % 10;
	    let y = Math.floor(thisLocationID / 10);
            let diffX = targetX - x;
	    let diffY = targetY - y;
	    //Check for positive value
	    if(diffX < 0){
	        diffX = diffX * -1;
	    }
	    if(diffY < 0){
	    	diffY = diffY * -1;
	    }
	    if(1 >= diffX && 1 >= diffY && ((diffX + diffY) != 0)){
		unit.hp = unit.hp + (unit.hpMax * 0.25);
		unit.hp = Math.floor(unit.hp);
    		this.mov = this.mov - 1;
	        if(unit.hp > unit.hpMax){
		    unit.hp = unit.hpMax;
		}
	    }
        }
    }
    //archer special ability
    meleeAttack(unit, thisLocationID, targetX, targetY){
	if(this.type == "archer" && this.mov > 0){
	    let x = thisLocationID % 10;
	    let y = Math.floor(thisLocationID / 10);
	    let diffX = targetX - x;
	    let diffY = targetY - y;
	    //Check for positive value
	    if(diffX < 0){
		diffX = diffX * -1;
	    }
	    if(diffY < 0){
		diffY = diffY * -1;
	    }
	    if(this.meleeDis >= diffX && this.meleeDis >= diffY){
	    	unit.hp = unit.hp - this.melee;
	    	this.mov = this.mov - 1;
	    }
	    else{
		alert("Target out of range. This archer's range is " + this.meleeDis + " squares.");
	    }
	}
	if(unit.hp <= 0){
	   this.kills++;
	   return "dead";
	}
	else{
	   return "alive";
	}
    }
    //assassinate is a ninja special ability
    //ninja and target unit are destroyed
    assassinate(unit, thisLocationsID, targetX, targetY){
	if(this.type == "ninja" && this.mov > 0){
	    let x = thisLocationsID % 10;
	    let y = Math.floor(thisLocationsID / 10);
            let diffX = targetX - x;
	    let diffY = targetY - y;
	    //Check for positive value
	    if(diffX < 0){
	        diffX = diffX * -1;
	    }
	    if(diffY < 0){
	    	diffY = diffY * -1;
	    }
	    if(1 >= diffX && 1 >= diffY && ((diffX + diffY) != 0)){
	    	this.hp = 0;
	    	unit.hp = 0;
		return "dead";
            }
	    else{
		alert("Target out of range.");
		return "alive";
	    }
        }
	else{
		return "alive";
	}
    }
    //Kenshi special ability
    iaijutsu(thisLocationsID, board){
	if(this.type == "kenshi" && this.mov > 0){
	    let x = thisLocationsID % 10;
	    let y = Math.floor(thisLocationsID / 10);
            //north
	    if(board[y - 1][x].soldier != null){
	        if(board[y - 1][x].soldier.color != this.color){
		    this.mov = this.mov - 1;
		    board[y - 1][x].soldier.hp = board[y - 1][x].soldier.hp - (Math.floor(this.att / 2));
	        }
		if((board[y - 1][x].soldier.type) == "taisho"){
			this.hp = this.hp - (board[y - 1][x].soldier.att);
		}
		if(board[y - 1][x].soldier.hp <= 0){
			board[y - 1][x].soldier = null;
			this.kills++;
		}
            }
	    //Northwest
	    if(board[y - 1][x - 1].soldier != null){
	        if(board[y - 1][x - 1].soldier.color != this.color){
		    this.mov = this.mov - 1;
		    board[y - 1][x - 1].soldier.hp = board[y - 1][x - 1].soldier.hp - (Math.floor(this.att / 2));
	        }
		if((board[y - 1][x - 1].soldier.type) == "taisho"){
			this.hp = this.hp - (board[y - 1][x - 1].soldier.att);
		}
		if(board[y - 1][x - 1].soldier.hp <= 0){
			board[y - 1][x - 1].soldier = null;
			this.kills++;
		}
            }
	    //Northeast
	    if(board[y - 1][x + 1].soldier != null){
	        if(board[y - 1][x + 1].soldier.color != this.color){
		    this.mov = this.mov - 1;
		    board[y - 1][x + 1].soldier.hp = board[y - 1][x + 1].soldier.hp - (Math.floor(this.att / 2));
	        }
		if((board[y - 1][x + 1].soldier.type) == "taisho"){
			this.hp = this.hp - (board[y - 1][x + 1].soldier.att);
		}
		if(board[y - 1][x + 1].soldier.hp <= 0){
			board[y - 1][x + 1].soldier = null;
			this.kills++;
		}
            }
 	    //South
	    if(board[y + 1][x].soldier != null){
	        if(board[y + 1][x].soldier.color != this.color){
		    this.mov = this.mov - 1;
		    board[y + 1][x].soldier.hp = board[y + 1][x].soldier.hp - (Math.floor(this.att / 2));
	        }
		if(board[y + 1][x].soldier.type == "taisho"){
			this.hp = this.hp - (board[y + 1][x].soldier.att);
		}
		if(board[y + 1][x].soldier.hp <= 0){
			board[y + 1][x].soldier = null;
			this.kills++;
		}
            }
	    //Southwest
	    if(board[y + 1][x - 1].soldier != null){
	        if(board[y + 1][x - 1].soldier.color != this.color){
		    this.mov = this.mov - 1;
		    board[y + 1][x - 1].soldier.hp = board[y + 1][x - 1].soldier.hp - (Math.floor(this.att / 2));
	        }
		if(board[y + 1][x - 1].soldier.type == "taisho"){
			this.hp = this.hp - (board[y + 1][x - 1].soldier.att);
		}
		if(board[y + 1][x - 1].soldier.hp <= 0){
			board[y + 1][x - 1].soldier = null;
			this.kills++;
		}
            }
	    //Southeast
	    if(board[y + 1][x + 1].soldier != null){
	        if(board[y + 1][x + 1].soldier.color != this.color){
		    this.mov = this.mov - 1;
		    board[y + 1][x + 1].soldier.hp = board[y + 1][x + 1].soldier.hp - (Math.floor(this.att / 2));
	        }
		if(board[y + 1][x + 1].soldier.type == "taisho"){
			this.hp = this.hp - (board[y + 1][x + 1].soldier.att);
		}
		if(board[y + 1][x + 1].soldier.hp <= 0){
			board[y + 1][x + 1].soldier = null;
			this.kills++;
		}
            }
	    //West
	    if(board[y][x - 1].soldier != null){
	        if(board[y][x - 1].soldier.color != this.color){
		    this.mov = this.mov - 1;
		    board[y][x - 1].soldier.hp = board[y][x - 1].soldier.hp - (Math.floor(this.att / 2));
	        }
		if(board[y][x - 1].soldier.type == "taisho"){
			this.hp = this.hp - (board[y][x - 1].soldier.att);
		}
		if(board[y][x - 1].soldier.hp <= 0){
			board[y][x - 1].soldier = null;
			this.kills++;
		}
            }
	    //East
	    if(board[y][x + 1].soldier != null){
	        if(board[y][x + 1].soldier.color != this.color){
		    this.mov = this.mov - 1;
		    board[y][x + 1].soldier.hp = board[y][x + 1].soldier.hp - (Math.floor(this.att / 2));
	        }
		if(board[y][x + 1].soldier.type == "taisho"){
			this.hp = this.hp - (board[y][x + 1].soldier.att);
		}
		if(board[y][x + 1].soldier.hp <= 0){
			board[y][x + 1].soldier = null;
			this.kills++;
		}
            }
        }
     }
     okyou(unit){
	    if(this.type == "monk" && this.mov > 0){
	    	unit.hp = unit.hp + (unit.hpMax * 0.1);
		unit.hp = Math.floor(unit.hp);
    		this.mov = this.mov - 1;
		if(unit.hp > unit.hpMax){
		    unit.hp = unit.hpMax;
		}
		unit.att = unit.att + 3;
	    }    
    }
}

// Squad of Units
class Kumi{
    constructor(name, color, id){
	this.name = name;
	this.tai = new Array(15);
	this.taisho = new Unit(id, "taisho", color);
	this.tai[0] = this.taisho;
	this.count = 1; //count number of units in kumi
    }
    info(j){
	console.log(
	    this.name + " " +
	    " Type: " + this.tai[j].type +
	    " ID: " + this.tai[j].id + 
	    " Attack: " + this.tai[j].att +
            " Defense: " + this.tai[j].def +
            " Current HP: " + this.tai[j].hp +
	    " Max HP: " + this.tai[j].hpMax +
	    " Max Moves: " + this.tai[j].movMax +
	    " Moves: " + this.tai[j].mov +
            " Melee Attack: " + this.tai[j].melee +
            " Melee Distance: " + this.tai[j].meleeDis +
            " Dan: " + this.tai[j].dan + 
	    " Kills: " + this.tai[j].kills);
     }
     upgrade(){
	for(var i = 0; i < this.count; i++){
	    if(this.tai[i].kills >= 3 && this.tai[i].dan == 0){
		this.tai[i].hpMax = this.tai[i].hpMax + 1;
		this.tai[i].hp = this.tai[i].hpMax;
		this.tai[i].attMax = this.tai[i].attMax + 1;
		this.tai[i].att = this.tai[i].attMax;
		this.tai[i].def = this.tai[i].def + 1;
		this.tai[i].dan = this.tai[i].dan + 1;
	    }
	    if(this.tai[i].kills >= 6 && this.tai[i].dan == 1){
		this.tai[i].hpMax = this.tai[i].hpMax + 1;
		this.tai[i].hp = this.tai[i].hpMax;
		this.tai[i].attMax = this.tai[i].attMax + 1;
		this.tai[i].att = this.tai[i].attMax;
		this.tai[i].def = this.tai[i].def + 1;
		this.tai[i].dan = this.tai[i].dan + 1;
	    }
	    if(this.tai[i].kills >= 10 && this.tai[i].dan == 2){
		this.tai[i].hpMax = this.tai[i].hpMax + 1;
		this.tai[i].hp = this.tai[i].hpMax;
		this.tai[i].attMax = this.tai[i].attMax + 1;
		this.tai[i].att = this.tai[i].attMax;
		this.tai[i].def = this.tai[i].def + 1;
		this.tai[i].dan = this.tai[i].dan + 1;
	    }
	}
    }
}

// Terrain for placement in game board
class Terrain{
    constructor(id, type, x, y){
        this.id = id;
	this.type = type;
        this.soldier = null; //empty for units to live
	this.coordX = x;
	this.coordY = y;
	if(type == "forest"){
		this.attMeleeDis = -1; // Only effects archers
		this.attHealing = 0;
		this.attDef = 0;
		this.attMov = 0;
	}
	else if(type == "village"){
	        this.attMeleeDis = 0;
		this.attHealing = 1.25; // Only effects ninja
		this.attDef = 0;
		this.attMov = 0;
	}
	else if(type == "temple"){
	    	this.attMeleeDis = 0;
		this.attHealing = 1.25; // Only effects warrior monks
		this.attDef = 0;
		this.attMov = 0;
	}
	else if(type == "rice field"){
	        this.attMeleeDis = 0;
		this.attHealing = 0;
		this.attDef = 0;
		this.attMov = -1; // Only effects cavalry
	}
	else if(type == "castle"){
		this.attMeleeDis = 1;
		this.attHealing = 1.25;
		this.attDef = 1;
		this.attMov = 0;
	}
	else if(type == "hill"){
		this.attMeleeDis = 1; // Only effects archers
		this.attHealing = 0;
		this.attDef = 1;
		this.attMov = 0;
	}
	else if(type == "water"){
		this.attMeleeDis = 0;
		this.attHealing = 0;
		this.attDef = 0;
		this.attMov = -1; // Only ninja and cavalry can cross
	}
	else if(type == "plain"){
	    	this.attMeleeDis = 0;
		this.attHealing = 0;
		this.attDef = 0;
		this.attMov = 0;
	}
	else{
	    alert("ERROR: Terrain type not recognized.");
	}
    }
    //Units attack each other. Remove if killed
    attack(defender){
	if(defender.type == "ashigaru" && this.type == "cavalry"){
	    this.soldier.hp = this.soldier.hp - (defender.soldier.def * 2);
	    defender.soldier.hp = defender.soldier.hp - this.soldier.att;
	}
	else{
	    this.soldier.hp = this.soldier.hp - defender.soldier.def;
	    defender.soldier.hp = defender.soldier.hp - this.soldier.att;
	}
	if(this.soldier.hp <= 0 && defender.soldier.hp > 0){
	    this.soldier = null;
	    defender.soldier.kills++;
	}
	else if(defender.soldier.hp <= 0 && this.soldier.hp > 0){
	    defender.soldier = null;
	    this.soldier.kills++;
	    this.move(defender, this.soldier)
	}
	else if(defender.soldier.hp <= 0 && this.soldier.hp <= 0){
	    defender.soldier = null;
	    this.soldier = null;
	}
    }
    //Method to move a unit from one terrain square to another
    //Method checks if terrain square moving to is empty first
    move(newLocation, unit){
	if(this.soldier.type != "cavalry" && this.soldier.type != "ninja" && newLocation.type == "water"){
	    alert("Only cavalry and ninja can cross water.");
	}
	else if(newLocation.soldier == null && this.soldier.mov > 0 && (newLocation.id == this.id - 1 || newLocation.id == this.id + 1 || newLocation.id == this.id - 10 || newLocation.id == this.id + 10 || newLocation.id == this.id + 11 || newLocation.id == this.id + 9|| newLocation.id == this.id - 11 || newLocation.id == this.id - 9)){
	    if((this.type == "castle" || this.type == "hill") && unit.type == "archer"){
		unit.meleeDis = unit.meleeDis - this.attMeleeDis;
	    }
	    this.soldier.mov--;
	    newLocation.set(unit);
	    this.soldier = null;
	}
	else if(newLocation.soldier.color != this.soldier.color && this.soldier.mov > 0 && (newLocation.id == this.id - 1 || newLocation.id == this.id + 1 || newLocation.id == this.id - 10 || newLocation.id == this.id + 10 || newLocation.id == this.id + 11 || newLocation.id == this.id + 9|| newLocation.id == this.id - 11 || newLocation.id == this.id - 9)){
	    this.attack(newLocation);
	}
	else if(this.soldier.mov < 1){
	    alert("Unit already moved.");
	}
	else{
	    alert("Illegal Move.");
	}
    }
    set(unit){
	this.soldier = unit;
	if((this.type == "castle" || this.type == "hill") && unit.type == "archer"){
		unit.meleeDis = unit.meleeDis + this.attMeleeDis;
	}
    }
}

// Game class to run game content
class Game{
    constructor(kumi, enemy){
	this.board = new Array(10);
	this.kumi = kumi;
	this.enemyKumi = enemy;
	//this.turn = ["red","white"];
	for (var i = 0; i < 10; i++){
    	    this.board[i] = new Array(10);
	}
	//First square bottom right corner coordinates
	var x = 75;
	var y = 75;
	var countID = 0;
	let tempTerrain = ["rice field", "rice field", "rice field", "hill", "castle", "castle", "hill", "forest", "forest", "forest",
				"rice field", "village", "rice field", "hill", "castle", "castle", "hill", "forest", "temple", "forest",
				"rice field", "rice field", "rice field", "hill", "hill", "hill", "hill", "forest", "forest", "forest",
				"plain", "plain", "plain", "plain", "plain", "plain", "plain", "forest", "forest", "forest",
				"water", "water", "water", "plain", "plain", "plain", "plain", "forest", "forest", "forest",
				"forest", "forest", "forest", "plain", "plain", "plain", "plain", "water", "water", "water",
				"forest", "forest", "forest", "plain", "plain", "plain", "plain", "plain", "plain", "plain", 
				"forest", "forest", "forest", "hill", "hill", "hill", "hill", "rice field", "rice field", "rice field",
				"forest", "temple", "forest", "hill", "castle", "castle", "hill", "rice field", "village", "rice field",
				"forest", "forest", "forest", "hill", "castle", "castle", "hill", "rice field", "rice field", "rice field"];
				
	for(let i = 0; i < 10; i++){
	    for(let j = 0; j < 10; j++){
		this.board[i][j] = new Terrain(countID, tempTerrain[countID], x, y);
		x = x + 80;
		countID++;
	    }
	    x = 75;
	    y = y + 80;
	}
    }
}