// size of each grid tile
let squareSize = 20;

// number of tiles across
let numAcross = 10;

// controls
let sizeSlider; //The variable that stores the grid size slider
let speedSlider; //The variable that stores the speed slider

let circleCheckbox; //This variable stores the circles checkbox
let squareCheckbox; //This variable stores the squares checkbox

// show/hide shapes
let showCircles = true; //True means circles are visible 
let showSquares = true; //If true, squares are also visible

// colours
let circleColor; //This stores the circles colour picker
let squareColor; //This stores the squares colour picker


// SETUP

function setup() { //Setup function runs once when the project starts

  createCanvas(800, 800); //Creates a drawing area with a width and height of 800

  // calculate tile size
  squareSize = width / numAcross; //Tile size is calculated to 80 pixels because the width (800) is divided by 10 which is the numver of rows and columns across 

  // animation speed
  frameRate(4); //Animation speed is set to 4 frames every second

  // CONTROL PANEL

  createP("GRID SIZE"); //This acts like a label which creates the text on the page 

  sizeSlider = createSlider(5, 25, 10); //Creates a grid size slider with the minimum being 5 rows and columns, maximum being 25 rows and columns and the starting value being 10 rows and columns

  createP("ANIMATION SPEED"); //Adds the text label "Animation speed"

  speedSlider = createSlider(1, 20, 4); //The slider for animation speed is minimum 1 frame per second, maximum 20 frames per second and starting value at 4 frames per second

  createP("SHOW SHAPES"); //Adds the text label "Show Shapes"

  circleCheckbox = createCheckbox(" Circles", true); //Text is set to circles and checks if the circleCheckbox is true

  squareCheckbox = createCheckbox(" Squares", true); //Text is set to squares and checks if the squareCheckbox is true

  createP("COLOURS"); //Creates the text label for colours

  circleColor = createColorPicker("#f0e800"); //Colour picker for circles is originally set to yellow

  squareColor = createColorPicker("#0050ff"); //Colour picker for squares is originally set to blue
} 


// DRAW 

function draw() { //This is the draw function which repeats forever 

  background(0); //Every frame the screen clears to black

  // get slider values
  numAcross = sizeSlider.value(); //Gets the current slider value and stores it in numAcross

  frameRate(speedSlider.value()); //This changes the animation speed live

  // recalculate tile size
  squareSize = width / numAcross; //If the grid changes then the tile size changes too

  // get checkbox values
  showCircles = circleCheckbox.checked(); //Returns true or false depending on if the circles checkbox is checked

  showSquares = squareCheckbox.checked(); //Checks if the square checkbox is checked

  // draw grid
  for (let j = 0; j < numAcross; j++) { //For loop which creates rows 

    for (let i = 0; i < numAcross; i++) { //For loop which creates columns

      // random shape
      let whichTile = floor(random(2)); //random 2 gives a value from 0 to 1.9 and floor () removes the decimals so the values are 0 and 1

      // circle
      if (whichTile == 0 && showCircles) { //If statement checks if circles are enabled if so random number must be 0

        makeTile1( //This sends the x and y position and the tile size into function which draws the circle tiles
          i * squareSize,
          j * squareSize,
          squareSize
        );
      }

      // square
      else if (whichTile == 1 && showSquares) { //Else if statement checks if the squares are enabled, if so random number is 1

        makeTile2( //This draws the square tiles
          i * squareSize,
          j * squareSize,
          squareSize
        );
      }
    }
  }
}


// CIRCLE TILE 

function makeTile1(x, y, tileSize) { //Creates a function for circles with inputs x, y and tile size

  push(); //Push saves the current drawing's state

  translate( //Moves the drawing origin to center of the tile
    x + tileSize / 2,
    y + tileSize / 2
  );

  fill(circleColor.color()); //Gets the chosen colour from the picker

  noStroke(); //Removes any outlines

  circle(0, 0, tileSize); //Circle is drawn at 0, 0

  pop(); //Restores the old drawing settings 
}


// SQUARE TILE 

function makeTile2(x, y, tileSize) { //This creates the square tile function 

  push(); //Push saves the current drawing's state

  translate( //Moves the drawing origin to center of the tile
    x + tileSize / 2,
    y + tileSize / 2
  );

  fill(squareColor.color()); //Gets the chosen colour from the picker

  noStroke(); //Removes any outlines

  square( //Contains parameters with negative values to center the squares correctly
    tileSize * -0.25,
    tileSize * -0.25,
    tileSize * 0.35
  );

  pop(); //Restores the old drawing settings 
}
