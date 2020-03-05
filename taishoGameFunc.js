/*
* Game: Taisho
* Author: Adam M. Deaton
* Version: 0.1 
* Date: 2020-03-04
* Copyright: All rights reserved: Adam M. Deaton 2020
*/ 
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var id = 0;
var treasure = 0; //gold for procuring units

//Images
//Sidebar Images
imgSidebar = new Image();
imgSidebar.src = "sidebar.png";
function loadSidebar(x,y){
    imgSidebar.onload = function(){
	ctx.drawImage(imgSidebar, x, y);
    }
}
//Unit Images
var UnitPlacedflag = 0;
imgKenshiBlue = new Image();
imgKenshiBlue.src = "kenshiBlue.png";
imgKenshiRed = new Image();
imgKenshiRed.src = "kenshiRed.png";
imgSoheiRed = new Image();
imgSoheiRed.src = "soheiRed.png";
imgSohei = new Image();
imgSohei.src = "sohei.png";
imgArcherRed = new Image();
imgArcherRed.src = "archerRed.png";
imgArcher = new Image();
imgArcher.src = "archer.png";
imgNinjaRed = new Image();
imgNinjaRed.src = "ninjaRed.png";
imgNinja = new Image();
imgNinja.src = "ninja.png";
imgAshiRed = new Image();
imgAshiRed.src = "ashigaruRed.png";
imgAshiBlue = new Image();
imgAshiBlue.src = "ashigaruBlue.png";
imgMedBlue = new Image();
imgMedBlue.src = "medicBlue.png";
imgMedRed = new Image();
imgMedRed.src = "medicRed.png";
imgCavBlue = new Image();
imgCavBlue.src = "cavalryBlue.png";
imgCavRed = new Image();
imgCavRed.src = "cavalryRed.png";
imgTaishoBlue = new Image();
imgTaishoBlue.src = "taishoBlue.png";
imgTaishoRed = new Image();
imgTaishoRed.src = "taishoRed.png";

//Terrain Sprites
imgForest = new Image();
imgTanbo = new Image();
imgTemple = new Image();
imgWater = new Image();
imgCastle = new Image();
imgHill = new Image();
imgPlain = new Image();
imgVillage = new Image();
imgVillage.src = "village.png";
imgPlain.src = "plains.png";
imgCastle.src = "castle.png";
imgHill.src = "hill.png";
imgForest.src = "forestTemp.png";
imgTanbo.src = "tanbo.png";
imgTemple.src = "temple.png";
imgWater.src = "water.png";
/* Back up function for loading  images
function loadForest(x, y){
    imgForest.onload = function(){
    	ctx.drawImage(imgForest, x, y);
    }
}
function loadTanbo(x,y){
    imgTanbo.onload = function(){
	ctx.drawImage(imgTanbo, x, y);
    }
}
function loadTemple(x,y){
    imgTemple.onload = function(){
	ctx.drawImage(imgTemple, x, y);
    }
}
*/

//Variables for terrain layout and mouse functions
var terrRowCount = 10;
var terrColumnCount = 10;
var terrWidth = 74;
var terrHeight = 74;
var terrPadding = 5;
var terrOffsetTop = 5;
var terrOffsetLeft = 5;
var terrainID = -1; //Store clicked terrain ID
var terrainIDX = -1; //Store clicked terrainX
var terrainIDY = -1; //Store clicked terrainY

//Display board Terrain block area ceilings at corners
var disCeiling = [75, 155, 235, 315, 395, 475, 555, 635, 715, 795];  

//X and Y variables for mouse select
var x = 0;
var y = 0;
var Mousex = 0;
var Mousey = 0;

//Unit types
var unitTypes = ["ashigaru", "archer", "medic", "kenshi", "cavalry", "monk", "ninja"]; //plus taisho
//var unitCosts = [15, 15, 8, 30, 24, 40, 26];
var numUnitTypes = 7; //available unit types

//Function to find terrain block ID via X,Y coordinates
function getTerrainID(TerrainX, TerrainY){
    var tens = 0;
    var ones = 0;
    for(let i = 75; i < 800; i = i + 80){
	if(TerrainX < i){
	    TerrainX = i;
	    i = 2000; //escape loop
	}
    }
    for(let i = 75; i < 800; i = i + 80){
	if(TerrainY < i){
	    TerrainY = i;
	    i = 2000; //escape loop
	}
    }
    for(let i = 0; i < 10; i++){
	if(disCeiling[i] == TerrainX){
	    ones = i;    
	}
	if(disCeiling[i] == TerrainY){
	    tens = i;   
	}
    }
    terrainIDX = ones;
    terrainIDY = tens;
    tens = tens * 10;
    return tens + ones;
}

//Get mouse click coordinates
function getMousePosition(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    Mousex = event.clientX - rect.left; 
    Mousey = event.clientY - rect.top; 
    console.log("coorX: " + Mousex + " coorY: " + Mousey);
    if(Mousex < 800){
    	return getTerrainID(Mousex, Mousey);
    }
    else if(Mousex > 800 && Mousey < 700 && Mousey > 610){
	terrainIDX = 10;
	terrainIDY = 9;
	return 950; //ESC
    }
    //End turn coord 10 , 10
    else if(Mousex > 800 && Mousey > 700){
        terrainIDX = 10;
	terrainIDY = 10;
	return 900; //END TURN
    }
    else if(Mousex > 800 && Mousex < 900 && Mousey < 600 && Mousey > 500){
        terrainIDX = 10;
	terrainIDY = 8;
	return 920; //MOVE
    }
    else if(Mousex > 900 && Mousex < 1000 && Mousey < 600 && Mousey > 500){
        terrainIDX = 11;
	terrainIDY = 8;
	return 920; //SPECIAL
    }
    return 1000; //ERROR
} 
 /*Back up code for possible later use
let canvasElem = document.querySelector("canvas"); 
          
canvasElem.addEventListener("mousedown", function(e){ 
    terrainID = getMousePosition(canvasElem, e); 
    console.log(terrainIDY);
}); */

//Function takes board as a parameter and displays appropriate terrain image
function drawTerrain(board) { 
  var castleFlag = 0; // ensure only one castle per side of board 
  ctx.clearRect(0, 0, canvas.width - 205, canvas.height);
  for(var c = 0; c < terrColumnCount; c++) {
    for(var r = 0; r < terrRowCount; r++) {
        var terrX = (r * (terrWidth+terrPadding))+terrOffsetLeft;
        var terrY = (c * (terrHeight+terrPadding))+terrOffsetTop;
        ctx.beginPath();
	if(board[c][r].type != "forest" && board[c][r].type != "rice field" && board[c][r].type != "temple" && board[c][r].type != "water" && board[c][r].type != "castle" && board[c][r].type != "hill" && board[c][r].type != "plain" && board[c][r].type != "village"){
            ctx.rect(terrX, terrY, terrWidth, terrHeight);
	}
	if(board[c][r].type == "hill"){
		//ctx.fillStyle = "#6E2C00";
		ctx.drawImage(imgHill, terrX - 0, terrY - 0);
	}
	else if(board[c][r].type == "castle" && castleFlag == 0){
		//ctx.fillStyle = "#85929E"; 
		ctx.drawImage(imgCastle, terrX - 0, terrY - 0);
		castleFlag++;
	}
	else if(board[c][r].type == "forest"){
		//ctx.fillStyle = "#145A32";
		ctx.drawImage(imgForest, terrX - 0, terrY - 0);
	}
	else if(board[c][r].type == "water"){
		//ctx.fillStyle = "#3498DB"; 
		ctx.drawImage(imgWater, terrX - 0, terrY - 0);
	}
	else if(board[c][r].type == "temple"){
		//ctx.fillStyle = "#6C3483"; 
		ctx.drawImage(imgTemple, terrX - 0, terrY - 0);
	}
	else if(board[c][r].type == "village"){
		//ctx.fillStyle = "#E74C3C"; 
		ctx.drawImage(imgVillage, terrX - 0, terrY - 0);
	}
	else if(board[c][r].type == "rice field"){
		//ctx.fillStyle = "#FFF59D"; 
	/*
		if(terrainPlaceFlag == 1){
		    loadTanbo(terrX - 0, terrY - 0);
		}
		else{*/
		    ctx.drawImage(imgTanbo, terrX - 0, terrY - 0);
		//} 

	}
	else if(board[c][r].type == "plain"){
		//ctx.fillStyle = "#2ECC71"; //plains
		ctx.drawImage(imgPlain, terrX - 0, terrY - 0);
	}
	else{
	    //Place no image
	    castleFlag++;
	    if(castleFlag > 3){
	    	castleFlag = 0;
            }
        }
	//terrainPlaceFlag = 0;

        ctx.fill();
        ctx.closePath();
    }
  }
}

function drawSideBar(){
    ctx.beginPath();
    loadSidebar(795, 5);
    ctx.drawImage(imgSidebar, 795, 5);
    ctx.fill();
    ctx.closePath();
}

//Function takes a game object and displays appropriate unit images at current location on board
function displayBoardUnits(myGame){
    ctx.font = "12px Comic Sans MS";
    ctx.textAlign = "center";
    var img = null;
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
	    x = (j * (terrWidth+terrPadding))+terrOffsetLeft + 37;
            y = (i * (terrHeight+terrPadding))+terrOffsetTop + 45;
	    if(myGame.board[i][j].soldier != null){
		ctx.beginPath();
	        ctx.fillStyle = myGame.board[i][j].soldier.color;
		if(myGame.board[i][j].soldier.type == "kenshi" && myGame.board[i][j].soldier.color == "red"){
		    if(UnitPlacedflag == 1){
		        loadKenshiRed(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgKenshiRed, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "kenshi" && myGame.board[i][j].soldier.color == "blue"){
		    if(UnitPlacedflag == 1){
		        loadKenshiBlue(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgKenshiBlue, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "monk" && myGame.board[i][j].soldier.color == "blue"){
		    if(UnitPlacedflag == 1){
		        loadSohei(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgSohei, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "monk" && myGame.board[i][j].soldier.color == "red"){
		    if(UnitPlacedflag == 1){
		        loadSoheiRed(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgSoheiRed, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "archer" && myGame.board[i][j].soldier.color == "blue"){
		    if(UnitPlacedflag == 1){
		        loadArcher(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgArcher, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "archer" && myGame.board[i][j].soldier.color == "red"){
		    if(UnitPlacedflag == 1){
		        loadArcherRed(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgArcherRed, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "ninja" && myGame.board[i][j].soldier.color == "blue"){
		    if(UnitPlacedflag == 1){
		        loadNinja(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgNinja, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "ninja" && myGame.board[i][j].soldier.color == "red"){
		    if(UnitPlacedflag == 1){
		        loadNinjaRed(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgNinjaRed, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "ashigaru" && myGame.board[i][j].soldier.color == "red"){
		    if(UnitPlacedflag == 1){
		        loadAshiRed(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgAshiRed, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "ashigaru" && myGame.board[i][j].soldier.color == "blue"){
		    if(UnitPlacedflag == 1){
		        loadAshiBlue(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgAshiBlue, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "medic" && myGame.board[i][j].soldier.color == "red"){
		    if(UnitPlacedflag == 1){
		        loadMedRed(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgMedRed, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "medic" && myGame.board[i][j].soldier.color == "blue"){
		    if(UnitPlacedflag == 1){
		        loadMedBlue(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgMedBlue, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "cavalry" && myGame.board[i][j].soldier.color == "red"){
		    if(UnitPlacedflag == 1){
		        loadMedRed(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgCavRed, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "cavalry" && myGame.board[i][j].soldier.color == "blue"){
		    if(UnitPlacedflag == 1){
		        loadMedBlue(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgCavBlue, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "taisho" && myGame.board[i][j].soldier.color == "red"){
		    if(UnitPlacedflag == 1){
		        loadMedRed(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgTaishoRed, x - 27, y - 45);
		    }
		}
		else if(myGame.board[i][j].soldier.type == "taisho" && myGame.board[i][j].soldier.color == "blue"){
		    if(UnitPlacedflag == 1){
		        loadMedRed(x - 27, y - 45);
		    }
		    else{
			ctx.drawImage(imgTaishoBlue, x - 27, y - 45);
		    }
		}
		else{
			console.log("Error loading unit image! Piece: " + myGame.board[i][j].soldier.type + " " + myGame.board[i][j].soldier.color);
	        }
		ctx.closePath();
	    }
        }
    }
    UnitPlacedflag = 0;
}

//Function to display victory message
function winConditionWindow(winner){
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    if(winner == "blue"){
	ctx.fillStyle = "white";

    }
    else if(winner == "red"){
	ctx.fillStyle = "red";

    }
    else{
	ctx.fillStyle = "brown";

    }
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.font = "28px Comic Sans MS";
    ctx.textAlign = "center";
    if(winner == "blue"){
        ctx.fillStyle = "blue";
	ctx.fillText("Blue Wins!", 500 , 400);
    }
    else if(winner == "red"){
        ctx.fillStyle = "gold";
	ctx.fillText("Red Wins!", 500 , 400);
    }
    else{
        ctx.fillStyle = "gold";
	ctx.fillText("Draw!", 500 , 400);
    }
    ctx.closePath();
}

//Function takes a unit as a parameter and displays its stats
function printStats(unit){
    drawSideBar();
    ctx.font = "20px Comic Sans MS";
    if(unit.color == "blue"){
    	ctx.fillStyle = "blue";
    }
    else{
	ctx.fillStyle = "red";
    }
    ctx.textAlign = "center";
    ctx.beginPath();
    ctx.fillText(unit.type, 900, 60);
    ctx.fillStyle = "white"
    ctx.font = "14px Comic Sans MS";
    ctx.textAlign = "left";
    ctx.fillText("HP: " + unit.hp + " / " + unit.hpMax, 830, 130);
    ctx.fillText("Attack: " + unit.att, 830, 150);
    ctx.fillText("Defense: " + unit.def, 830, 170);
    ctx.fillText("Moves: " + unit.mov, 830, 190);
    ctx.fillText("Kills: " + unit.kills, 830, 210);
    ctx.closePath();
}

//Function takes a unit as a parameter and displays its special ability for selection
function printOptions(unit, options){
    ctx.font = "20px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.beginPath();
    if(options == 0){
	ctx.fillStyle = "gold";
    }
    else{
	ctx.fillStyle = "white";
    }
    ctx.fillText("MOVE", 845, 565);
    if(options == 1){
	ctx.fillStyle = "gold";
    }
    else{
	ctx.fillStyle = "white";
    }
    if(unit.type == "archer"){
	ctx.fillText("BOW", 945, 565);
    }
    else if(unit.type == "ninja"){
	ctx.fillText("KUNAI", 945, 565);
    }
    else if(unit.type == "medic"){
	ctx.fillText("HEAL", 945, 565);
    }
    else if(unit.type == "kenshi"){
	ctx.fillText("IAI", 945, 565);
    }
    else if(unit.type == "monk"){
	ctx.fillText("OKYO", 945, 565);
    }
    else if(unit.type == "cavalry"){
	ctx.fillText("CHARGE", 945, 565);
    }
    else if(unit.type == "taisho"){
	ctx.fillText("RALLY", 945, 565);
    }
    ctx.closePath();
}

//Currently not utilized
function createKumi(kumi, name){
    kumi = new Kumi(name);
    treasure = 300;
    //Select Units Until Exit
    
}

//Currently not used
function displayCreateKumi(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var r = 0; r < numUnitTypes; r++){
	var terrX = (r * (terrWidth+terrPadding))+terrOffsetLeft;
	ctx.beginPath();
        ctx.rect(terrX, terrPadding + 20, terrWidth, terrHeight);
	ctx.fillStyle = "#85929E";
        ctx.fill();
        ctx.closePath();
    }
//FIX into two rows
    for(var r = 0; r < 15; r++){
	var terrX = (r * (terrWidth - 20 +terrPadding))+terrOffsetLeft;
	ctx.beginPath();
        ctx.rect(terrX, (terrPadding + 65) * 2, terrWidth - 20, terrHeight - 20);
	ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }
    for(var r = 0; r < numUnitTypes; r++){
	var terrX = (r * (terrWidth+terrPadding))+terrOffsetLeft;
	ctx.beginPath();
	ctx.fillStyle = "blue";
	ctx.font = "12px Comic Sans MS";
    	ctx.textAlign = "center";
	ctx.fillText(unitTypes[r], terrX + 37, terrPadding + 35);
        ctx.fill();
        ctx.closePath();
    }
    for(var r = 0; r < numUnitTypes; r++){
	var terrX = (r * (terrWidth+terrPadding))+terrOffsetLeft;
	ctx.beginPath();
	ctx.fillStyle = "blue";
	ctx.font = "12px Comic Sans MS";
    	ctx.textAlign = "center";
	ctx.fillText(unitCosts[r], terrX + 37, terrPadding + 50);
        ctx.fill();
        ctx.closePath();
    }
}

//Function to refresh all units' move allowance per turn
function renewMov(game){
    for(var i = 0; i < game.kumi.count; i++){
	game.kumi.tai[i].mov = game.kumi.tai[i].movMax;
	game.kumi.tai[i].att = game.kumi.tai[i].attMax;
    } 
    for(var i = 0; i < game.enemyKumi.count; i++){
	game.enemyKumi.tai[i].mov = game.enemyKumi.tai[i].movMax;
	game.enemyKumi.tai[i].att = game.enemyKumi.tai[i].attMax;
    } 
}

//Function takes a game object as a parameter and sets board per default
function defaultSetBoard(myGame){
    myGame.board[0][5].set(myGame.kumi.tai[0]); //Taisho
    myGame.board[9][4].set(myGame.enemyKumi.tai[0]);
    let j = 0;
    let i = 0;
    //Create base red units
    for(let i = 0; i < 12; i++){
	j = i;
	if(j > 6){
	    j = 0;
	}
	myGame.kumi.tai[i+1] = new Unit(id++, unitTypes[j], "red")
	myGame.kumi.count++;
    }
    //Create addition units and place red units
    myGame.kumi.tai[13] = new Unit(id++, unitTypes[1], "red"); //Archer
    myGame.kumi.count++;
    myGame.kumi.tai[14] = new Unit(id++, unitTypes[3], "red"); //Kenshi
    myGame.kumi.count++;
    myGame.board[2][3].set(myGame.kumi.tai[2]); //Archer
    myGame.board[2][4].set(myGame.kumi.tai[4]); //Kenshi
    myGame.board[2][5].set(myGame.kumi.tai[14]); //Kenshi
    myGame.board[2][6].set(myGame.kumi.tai[13]); //Archer
    myGame.board[1][1].set(myGame.kumi.tai[7]); //Ninja
    myGame.board[0][0].set(myGame.kumi.tai[8]); //Ashigaru
    myGame.board[0][9].set(myGame.kumi.tai[3]); //Medic
    myGame.board[3][0].set(myGame.kumi.tai[5]); //Cavalry
    myGame.board[1][8].set(myGame.kumi.tai[6]); //Monk
    myGame.board[0][4].set(myGame.kumi.tai[1]); //Ashigaru
    myGame.board[1][4].set(myGame.kumi.tai[9]);
    myGame.board[1][5].set(myGame.kumi.tai[10]);
    myGame.board[1][6].set(myGame.kumi.tai[11]);
    myGame.board[0][6].set(myGame.kumi.tai[12]);
    //Create Base Blue Units
    for(i = 0; i < 12; i++){
	j = i;
	if(j > 6){
	    j = 0;
	}
	myGame.enemyKumi.tai[i+1] = new Unit(id++, unitTypes[j], "blue")
	myGame.enemyKumi.count++;
    }
    myGame.enemyKumi.tai[13] = new Unit(id++, unitTypes[1], "blue");
    myGame.enemyKumi.count++;
    myGame.enemyKumi.tai[14] = new Unit(id++, unitTypes[3], "blue");
    myGame.enemyKumi.count++;
    myGame.board[7][3].set(myGame.enemyKumi.tai[2]);
    myGame.board[7][4].set(myGame.enemyKumi.tai[4]);
    myGame.board[7][5].set(myGame.enemyKumi.tai[14]);
    myGame.board[7][6].set(myGame.enemyKumi.tai[13]);

    myGame.board[8][8].set(myGame.enemyKumi.tai[7]);
    myGame.board[9][9].set(myGame.enemyKumi.tai[8]);
    myGame.board[9][0].set(myGame.enemyKumi.tai[3]);
    myGame.board[6][9].set(myGame.enemyKumi.tai[5]);
    myGame.board[8][1].set(myGame.enemyKumi.tai[6]);
    myGame.board[9][5].set(myGame.enemyKumi.tai[1]);
    myGame.board[8][4].set(myGame.enemyKumi.tai[9]);
    myGame.board[8][5].set(myGame.enemyKumi.tai[10]);
    myGame.board[8][3].set(myGame.enemyKumi.tai[11]);
    myGame.board[9][3].set(myGame.enemyKumi.tai[12]);
}

//Check if taisho is dead
function checkWinState(game){
    if(game.kumi.tai[0].hp <= 0 && game.enemyKumi.tai[0].hp <= 0){
	console.log("draw");
	return "draw";
    }
    else if(game.enemyKumi.tai[0].hp <= 0){
	console.log("Red Wins");
	return "red";
    }
    else if(game.kumi.tai[0].hp <= 0){
	console.log("Blue Wins");
	return "blue";
    }
    else{
	return "battle";
    }
    return 0;
}

//Function to create game and manage flow
function startGame(){
    //Create new game
    let enemyKumi = new Kumi("hitokiri", "blue", id);
    let shinsengumi = new Kumi("shinsengumi", "red", id++);
    let myGame = new Game(shinsengumi, enemyKumi);
    let winner = "battle"; //While no winner
    let curTurn = 1; //red:0, blue:1
    let options = 0; //move: 0, special ability: 1
    let tempX = -1;
    let tempY = -1;
	defaultSetBoard(myGame);
        drawTerrain(myGame.board);
	drawSideBar();
        displayBoardUnits(myGame);
     
        let canvasElem = document.querySelector("canvas"); 
        
	canvasElem.addEventListener("mousedown", function(e){ 
	    if(winner != "battle"){
		location.reload();
	    }
	    console.log("State of game: " + winner);
    	    terrainID = getMousePosition(canvasElem, e);
	    if(tempY == -1){
	        tempY = terrainIDY; 
	        tempX = terrainIDX;
		console.log("X " + tempX + " Y " + tempY);
		//End turn
	     	if(tempX == 10 && tempY == 10){
		    if(curTurn == 1){
			enemyKumi.upgrade();
			curTurn = 0;
			//curTurn = cpuTurn(myGame); //Testing outputs
		    }
		    else{
			shinsengumi.upgrade();
			curTurn = 1;
		    }
		    renewMov(myGame);
		    tempY = -1;
		    tempX = -1;
		    terrainIDY = -1;
		    terrainIDX = -1;
		} 
      		//Protect conditional from error
		else if(tempX < 10){
			//
			if(myGame.board[tempY][tempX].soldier == null || myGame.board[tempY][tempX].soldier.color == "red" && curTurn == 1 || myGame.board[tempY][tempX].soldier.color == "blue" && curTurn == 0){
		    	    tempY = -1;
		    	    tempX = -1;
			}
			else{
		    	    printStats(myGame.board[tempY][tempX].soldier);
		    	    printOptions(myGame.board[tempY][tempX].soldier, options);
			    //No moves remaining reset X, Y
			    if(myGame.board[tempY][tempX].soldier.mov < 1 && myGame.board[tempY][tempX].soldier.type != "cavalry"){
				tempY = -1;
		    	        tempX = -1;
				terrainIDY = -1;
				terrainIDX = -1;
			    }
			}
		}
		
	    }
	    else if(terrainIDX == 10 && terrainIDY == 9){
			tempY = -1;
			tempX = -1;
			terrainIDY = -1;
			terrainIDX = -1;
                        console.log("Esc");
            } 
	    else if(terrainIDX == 10 && terrainIDY == 8){
			options = 0;
			console.log("Move");
		if(myGame.board[tempY][tempX].soldier != null){
		    printOptions(myGame.board[tempY][tempX].soldier, options);
		}
	    }
	    else if(terrainIDX == 11 && terrainIDY == 8){
			options = 1;
			console.log("Special");
		if(tempX < 10 && myGame.board[tempY][tempX].soldier != null){
		    printOptions(myGame.board[tempY][tempX].soldier, options);
		}
		//Charge
		if(myGame.board[tempY][tempX].soldier.type == "cavalry"){
		    console.log("charge");
	  	    myGame.board[tempY][tempX].soldier.charge();
		    options = 0;
		}
		else if(myGame.board[tempY][tempX].soldier.type == "taisho"){
		    console.log("rally");
		    if(curTurn == 1){
	  	    	myGame.board[tempY][tempX].soldier.rally(enemyKumi);
		    }
		    else{
			myGame.board[tempY][tempX].soldier.rally(shinsengumi);
		    }
		    options = 0;
		}	
	    }
	    //if tempX > 9 then tempX is not a moveable unit
	    else if(tempX < 10){
		if(options == 0){
			console.log("option 0: tempX, tempY: " + tempX + "," + tempY);
			if(myGame.board[tempY][tempX].soldier != null){
			    myGame.board[tempY][tempX].move(myGame.board[terrainIDY][terrainIDX], myGame.board[tempY][tempX].soldier);
			}
		}
		else if(options == 1){
			//Bow - melee attack
			if(myGame.board[tempY][tempX].soldier.type == "archer"){
			    console.log("melee option" + myGame.board[tempY][tempX].soldier.meleeDis);
				
			    if(myGame.board[tempY][tempX].soldier.meleeAttack(myGame.board[terrainIDY][terrainIDX].soldier, myGame.board[tempY][tempX].id, terrainIDX, terrainIDY) == "dead"){
				    myGame.board[terrainIDY][terrainIDX].soldier = null; //Remove unit from board
			    }
			}
			//Assassinate
			else if(myGame.board[tempY][tempX].soldier.type == "ninja"){
			    console.log("assassinate");
		
			    if(myGame.board[tempY][tempX].soldier.assassinate(myGame.board[terrainIDY][terrainIDX].soldier, myGame.board[tempY][tempX].id, terrainIDX, terrainIDY) == "dead"){
				myGame.board[terrainIDY][terrainIDX].soldier = null; //Remove unit from board
				myGame.board[tempY][tempX].soldier = null; //Remove unit from board
			    }
			}
			//Heal
			else if(myGame.board[tempY][tempX].soldier.type == "medic"){
			    console.log("heal");
			    myGame.board[tempY][tempX].soldier.useMedic(myGame.board[terrainIDY][terrainIDX].soldier, myGame.board[tempY][tempX].id, terrainIDX, terrainIDY)
			}
                        //IAIjutsu
			else if(myGame.board[tempY][tempX].soldier.type == "kenshi"){
			    console.log("iaijutsu");
			    myGame.board[tempY][tempX].soldier.iaijutsu(myGame.board[tempY][tempX].id, myGame.board);
			    if(myGame.board[tempY][tempX].soldier.hp <= 0){
				myGame.board[tempY][tempX].soldier = null;
			    }
			}
			//Okyou
			else if(myGame.board[tempY][tempX].soldier.type == "monk"){
			    console.log("okyou");
			    myGame.board[tempY][tempX].soldier.okyou(myGame.board[terrainIDY][terrainIDX].soldier);
			}
		}
		tempX = -1;
		tempY = -1;
		terrainIDY = -1;
		terrainIDX = -1;
	    }
	    drawTerrain(myGame.board);
            displayBoardUnits(myGame);
	    winner = checkWinState(myGame);
	    if(winner == "draw" || winner == "blue" || winner == "red"){
		winConditionWindow(winner);
	    }
	    else{
		console.log("No winner keep fighting.");
	    }
            
	}); 
}
startGame();

