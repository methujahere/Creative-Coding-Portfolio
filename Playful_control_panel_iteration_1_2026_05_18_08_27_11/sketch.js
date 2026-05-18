let cols = 10; //let creates variables and cols refer to columns and rows which in this case I wanted a 10 by 10 grid
let tileSize; //This variable stores the size of each square area in the grid

let tiles = []; //This is an array which will allow me to store all of the circles and squares in one place

function setup() { //P5.Js function which runs once when the project starts
  createCanvas(800, 800); //I created an 800 by 800 pixel drawing

  tileSize = width / cols; //The tile size is the width of the canvas (800) divided by the number of columns and rows (10) so each tile is 80 pixels big

  generatePattern(); //This calls another function which creates all of the shapes and tiles
} 

function draw() { //P5.Js function that runs continously 

  background(0); //This clears the screen every new frame so I set the background colour to 0 (black)

  for (let tile of tiles) { //This is a for loop which loops through every tile in the array 

    displayTile(tile); //This runs the display function stored in every tile which draws the shapes

    // slowly shrink back down
    tile.size = lerp(tile.size, tile.baseSize, 0.08); //This creates smooth animation so when a circle gets big it slowly shrinks back down
  } //Ending the loop
} //Ending the draw function

function generatePattern() { //This function creates all of the shapes 

  tiles = []; //This clears the array before rebuilding it

  for (let y = 0; y < cols; y++) { //This is the outer for loop that controls the rows even though it says "cols" it is just a variable for both rows and columns, the y axis can reach a maximum of 10 rows and it starts at 0 and keeps adding one each loop

    for (let x = 0; x < cols; x++) { //This is the inner for loop that controls the columns, the x axis can only reach a maximum of 10 columns and it starts at 0 and keeps adding one each loop

      let px = x * tileSize; //This finds the x position and multiplies it by the tileSize
      let py = y * tileSize; //This finds the y position and multiplies it by the tileSize
      
 // randomly decide if shape is a circle or square
      let isCircle; //This creates a variable which stores a boolean value true or false

      if (random() < 0.5) { //If statement that shows half the time the condition is true 
        isCircle = true; // The shape becomes a circle
      } else { 
        isCircle = false;//Otherwise the shape becomes a square
      }

      // choose color
      let tileColor; //This variable stores the colour

      if (isCircle) { //If statement checks if the shape is a circle

        tileColor = color(240, 230, 0); //The starting off colour is yellow for the circles

      } else {

        tileColor = color(0, 80, 255); //If not, the starting off colours for the squares is blue
      }

      // create tile object
      let tile = { //This creates an object

        x: px + tileSize / 2, //The shape is moved to the center of the tile horizontally
        y: py + tileSize / 2, //The shape is moved to the center of the tile vertically 

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

function displayTile(tile) { //This creates a function that draws one tile

  fill(tile.color); //This sets the fill colour 

  noStroke(); //Removes any outlines

  if (tile.isCircle) { //If statement checks if the tile is a circle

    circle(tile.x, tile.y, tile.size); //Circle is drawn following the parameters x, y and the diameter

  } else {

    rectMode(CENTER); //If not, squares are drawn from the center

    square(tile.x, tile.y, tile.size * 0.3); //The squares are drawn smaller than circles 
  }
}

function mousePressed() { //P5.Js function that runs automatically when the mouse is clicked

  for (let tile of tiles) { //For loop checks every tile

    let d = dist(mouseX, mouseY, tile.x, tile.y); //Measures the distance between the mouse and the tile center

    
    if (tile.isCircle && d < tile.size / 2) { // If statement check if mouse clicked inside a circle

      rippleEffect(tile.x, tile.y); // Starts a ripple effect on the clicked circle position
    }
  }
}

function rippleEffect(centerX, centerY) { //This is the ripple effect function which recieves center x and y

  for (let tile of tiles) { //For loop checks all the tiles

    let d = dist(centerX, centerY, tile.x, tile.y); //This measures how far a tile is from the clicked circle 

    // only affect nearby tiles
    if (d < 200) {

      // bigger effect when closer
      let force = map(d, 0, 200, 2.5, 1);

      // grow shape
      tile.size = tile.baseSize * force;

      // random color
      tile.color = color( //Creates a new random colour from RGB values, every click creates a new colour
        random(255), 
        random(255),
        random(255)
      );
    }
  }
}