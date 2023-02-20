
// Tile Representation ========================================================

class Tile{
    constructor(tileType){
        this.tileType = tileType;
    }

    isHonorTile(){
        return this.tileType == "HonorTile";
    }
}

class SuitTile extends Tile{
    constructor(suit, value){
        super("SuitTile");
        //if (!(suit in ["Dot", "Bamboo", "Character"]))
        //    throw "Invalid Suit";
        this.suit = suit;
        //if (!(value in [1,2,3,4,5,6,7,8,9]))
        //    throw "Invalid Value";
        this.value = value;
        this.id = suit[0] + value;
        this.image = new Image();
        this.image.src = "./Assets/" + this.id + ".svg";
    }
}

class HonorTile extends Tile{
    constructor(honorTileType){
        super("HonorTile");
        this.honorTileType = honorTileType;
    }
}

class WindTile extends HonorTile{
    constructor(direction){
        super("WindTile");
        //if (!(direction in ["East", "South", "West", "North"]))
        //    throw "Invalid Direction";
        this.direction = direction;
        this.id = "W" + direction[0];
        this.image = new Image();
        this.image.src = "./Assets/" + this.id + ".svg";
    }
}

class DragonTile extends HonorTile{
    constructor(color){
        super("DragonTile");
        //if (!(color in ["Red", "White", "Green"]))
        //    throw "Invalid Color";
        this.color = color;
        this.id = "D" + color[0];
        this.image = new Image();
        this.image.src = "./Assets/" + this.id + ".svg";
    }
}

// Tile Creation ==============================================================

let allUniqueTiles = [];

let suits = ["Carts", "Bamboo", "Numbers"];
let suitValues = [1,2,3,4,5,6,7,8,9];
for(let suit of suits){
    for(let suitValue of suitValues){
        allUniqueTiles.push(new SuitTile(suit, suitValue));
    }
}

let windDirections = ["East", "South", "West", "North"];
for(let windDirection of windDirections){
    allUniqueTiles.push(new WindTile(windDirection));
}

let dragonColors = ["Red", "White", "Green"];
for(let dragonColor of dragonColors){
    allUniqueTiles.push(new DragonTile(dragonColor));
}

const allTiles = [].concat(...Array(4).fill(allUniqueTiles))

//Classic Fisher Yates Random Subset Selection
//https://stackoverflow.com/a/11935263/6342516
function fisherYates(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function newHand(){
    hand = fisherYates(allTiles, 13);
    handDiv = document.getElementById("hand");
    handDiv.innerHTML = "";
    for(let i = 0; i < hand.length; i++){
        let tileImage = hand[i].image.cloneNode();
        tileImage.classList.add("tile");
        handDiv.appendChild(tileImage);
    }
}



