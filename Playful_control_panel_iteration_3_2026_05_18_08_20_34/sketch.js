let tileSize; //This stores the pixel size of each grid cell
let gridSize = 10; //This is the initial number of tiles per row and column (10 by 10 grid)

// controls
let sizeSlider; //The variable that stores the grid size slider
let speedSlider; //The variable that stores the speed slider

let circleCheckbox; //This variable stores the circles checkbox
let squareCheckbox; //This variable stores the squares checkbox

// show/hide shapes
let showCircles = true; //True means circles are visible
let showSquares = true; //If true, squares are also visible

let tiles = [];//This is an array which holds every tile object in the grid, each tile stores the position, grid position, shape type, colour and size


function setup() {  //Setup function runs once when the project starts

  createCanvas(800, 800); //Creates a drawing area with a width and height of 800
  frameRate(4); //Animation speed is set to 4 frames every second

  createP("Grid Size"); //This acts like a label which creates the text on the page
  sizeSlider = createSlider(5, 25, 10); //Creates a grid size slider with the minimum being 5 rows and columns, maximum being 25 rows and columns and the starting value being 10 rows and columns

  createP("Animation Speed"); //Adds the text label "Animation speed"
  speedSlider = createSlider(1, 20, 4); //The slider for animation speed is minimum 1 frame per second, maximum 20 frames per second and starting value at 4 frames per second

  createP("Show Shapes"); //Adds the text label "Show Shapes"

  circleCheckbox = createCheckbox(" Circles", true); //Text is set to circles and checks if the circleCheckbox is true
  squareCheckbox = createCheckbox(" Squares", true); //Text is set to squares and checks if the squareCheckbox is true

  createGrid(); //Builds the initial tile grid
}


// DRAW LOOP

function draw() { //This is the draw function which repeats forever 

  background(0); //Every frame the screen clears to black

  gridSize = sizeSlider.value(); //Updates the grid resolution in real time
  frameRate(speedSlider.value()); //This changes the animation speed dynamically
  
//Reads checkbox states each frame
  showCircles = circleCheckbox.checked(); //Returns true or false depending on if the circles checkbox is checked
  showSquares = squareCheckbox.checked(); //Checks if the square checkbox is checked

  tileSize = width / gridSize; //The tile size is the width of the canvas (800) divided by the number of columns and rows (10) so each tile is 80 pixels big

  if (tiles.length !== gridSize * gridSize) { //If loop for if the grid size changes, the number of tiles no longer match the expected count
    createGrid(); //Rebuilds the full grid
  }

  if (frameCount % 10 === 0) { //This allows tile positions to be randomly swapped
    teleportTiles(); //This creates a smooth shuffling effect
  }

  for (let tile of tiles) { //For loop goes through every tile object in a continous loop

    //I converted the grid coordinates to pixel coordinates
    let targetX = tile.gridX * tileSize + tileSize / 2;
    let targetY = tile.gridY * tileSize + tileSize / 2;

    //This moves the tile 20% closer to the target every frame, creating a smooth sliding motion
    tile.x = lerp(tile.x, targetX, 0.2); 
    tile.y = lerp(tile.y, targetY, 0.2);

    if (tile.isCircle && !showCircles) continue; //If circles are disabled, the circle tiles are skipped
    if (!tile.isCircle && !showSquares) continue; //If the squares are disabled, the square tiles are skipped

    drawTile(tile); //Calls the function that renders the shapes

    tile.size = lerp(tile.size, tile.baseSize, 0.08); //After the ripple effect, tiles slowly return to their original size
  }
}


// CREATE GRID

function createGrid() { //This function creates the tiles 

  tiles = []; //Any old tiles are cleared
  tileSize = width / gridSize; //Size is re-adjusted based on the grid resolution

  //Nested for loops creates the rows and columns on the grid
  for (let y = 0; y < gridSize; y++) { //
    for (let x = 0; x < gridSize; x++) {

      let isCircle = random() < 0.5; //50% Chance for a random shape to be moved around

      let tileColor; //Colour placeholder varaible 

      if (isCircle) { //If statement checks if the shape is a circle
        
        tileColor = color(240, 230, 0); //The starting off colour is yellow for the circles
        
      } else {
        
        tileColor = color(0, 80, 255); //If not, the starting off colours for the squares is blue
        
      }

      let tile = { //Creates an object representing one cell

        //Grid position is stored 
        gridX: x,
        gridY: y,

        x: x * tileSize + tileSize / 2, //The shape is moved to the center of the tile horizontally
        y: y * tileSize + tileSize / 2, //The shape is moved to the center of the tile vertically 

        isCircle: isCircle, //This stores whether the shape is a circle or square

        baseSize: tileSize, //This stores the original base size for when the shapes shrink back
        size: tileSize, //Stores the animated size which changes during the ripple effect

        color: tileColor //This stores the chosen colour
      }; //Ends object

      // add tile to array
      tiles.push(tile); //Without this, the tiles will dissapear and nothing will be stored
    }
  }
}


// TELEPORT

function teleportTiles() { //This function randomly swaps tile positions

  //Picks two random tiles
  let a = floor(random(tiles.length)); 
  let b = floor(random(tiles.length));

  //Tile A's position is stored temporarily
  let tempX = tiles[a].gridX; 
  let tempY = tiles[a].gridY;

  //A will take B's grid position
  tiles[a].gridX = tiles[b].gridX;
  tiles[a].gridY = tiles[b].gridY;

  //B will take A's original position
  tiles[b].gridX = tempX;
  tiles[b].gridY = tempY;
}

// DRAW TILE

function drawTile(tile) { //Function renders a single tile

  fill(tile.color); //Sets the colour
  noStroke(); //Outline is removed

  //Draw circle at tile position
  if (tile.isCircle) {
    circle(tile.x, tile.y, tile.size);
  } else {
    
    //Draw square at tile position a bit smaller than a circle
    square(tile.x, tile.y, tile.size * 0.35);
  }
}


// RIPPLE INTERACTION

function mousePressed() { //P5.Js function that runs automatically when the mouse is clicked

  for (let tile of tiles) { //For loop checks every tile

    let distance = dist(mouseX, mouseY, tile.x, tile.y); //Measures the distance between the mouse and the tile center

    if (tile.isCircle && distance < tile.size / 2) { //If statement check if mouse clicked inside a circle
      
      ripple(tile.x, tile.y); //Starts a ripple effect on the clicked circle position
      break; //Break will stop the loop after first click in order to prevent multiple triggers
    }
  }
}


// RIPPLE EFFECT

function ripple(centerX, centerY) { //This is the ripple effect function which recieves center x and y

  for (let tile of tiles) { //For loop checks all the tiles

    let distance = dist(centerX, centerY, tile.x, tile.y); //This measures how far a tile is from the clicked circle 

    if (distance < 200) { // only affect nearby tiles

      let strength = map(distance, 0, 200, 2.5, 1); // bigger effect when closer

      tile.size = tile.baseSize * strength; // grow shape

      tile.color = color( //Creates a new random colour from RGB values, every click creatues a new colour
        random(255),
        random(255),
        random(255)
      );
    }
  }
}