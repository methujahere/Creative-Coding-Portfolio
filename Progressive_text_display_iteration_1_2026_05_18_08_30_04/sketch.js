// Starting name
let nameText = "Oscar Wilde"; //Variable stores the starting text 

// Full quote
let fullQuote = "Most people are other people, their thoughts are someone else's opinion, their lives a mimicry, their passions a quotation"; //This stores the full hidden quote

// Keeps track of how many letters of quote are visible
let quoteIndex = 0;

// Stores how many letters of name remain
let nameLength;

// Final displayed quote
let visibleQuote = ""; //Starts of as an empty string then letters gradually get added to it

function setup() { //Runs once when the sketch starts

  createCanvas(900, 900); //Canvas size 900 by 900 pixels

  textAlign(CENTER, CENTER); //Centers the text horizontally and vertically 

  textSize(30); //Sets the default text size to 30

  // Start with full name visible
  nameLength = nameText.length; //Counts how many letters are in Oscar Wilde, this becomes the starting amount of visible letters
}

function draw() { //Draw function runs continuously

  background(0); //Background colour set to black

  
  // DISTANCE FROM MOUSE

  let d = dist(mouseX, mouseY, width/2, height/2); //Calculates distance between mouse and the center of the screen

  // Interaction strength
  let interaction = map(d, 0, 300, 25, 0); //Distance is converted into interaction strength, the closer the mouse, the stronger the effect and the further the mouse, the weaker the effect

  interaction = constrain(interaction, 0, 25); //Prevents the values from becoming too small or too large 

  
  // TEXT TRANSFORMATION

  // Mouse close enough
  if (d < 200) { //Only reveal the quote when the mouse is close enough

    // Every few frames
    if (frameCount % 4 == 0) { //Runs every 4 frames and slows down the reveal speed

      // Remove letters from Oscar Wilde
      if (nameLength > 0) { //Checks if letters still remain 

        nameLength--; //Removes a letter until nothing is left 
      }

      // Add letters to quote
      if (quoteIndex < fullQuote.length) { //Checks if the quote is completely revealed yet

        visibleQuote += fullQuote[quoteIndex]; //Adds one new letter into the visible quote 

        quoteIndex++; //Moves to the next letter 
      }
    }
  }

  // Current visible name
  let visibleName = nameText.substring(0, nameLength); //Only shows part of Oscar Wilde based on nameLength


  // FLOATING MOVEMENT

  let floatingY = sin(frameCount * 0.03) * 10; //Creates a smooth levitation movement


  // DRAW NAME

  // Burning colour
  fill(255, 120, 80); //Sets an orange-red colour to Oscar Wilde's name to create a burning appearance

  textSize(40); //Makes the name larger than the quote

  text(
    visibleName, //Draws the shortened version of Oscar Wilde

    width/2 + random(-interaction, interaction), //Adds horizontal shaking effect

    height/2 - 120 + floatingY //Adds a floating motion and positions the text higher on the screen
  );

 
  // QUOTE SHAKE EFFECT

  let shakeX = 0; //Shake variables set to 0 as they start with no shaking
  let shakeY = 0;

  // Only shake while revealing the quote
  if (quoteIndex < fullQuote.length) { 

    // Shake gets stronger as quote grows
    let shakeAmount = map(
      quoteIndex,
      0,
      fullQuote.length,
      0,
      8
    );

    // Extra mouse interaction shake
    shakeAmount += interaction * 0.3;

    // Random shake positions
    shakeX = random(-shakeAmount, shakeAmount);
    shakeY = random(-shakeAmount, shakeAmount);
  }


  // DRAW QUOTE

  fill(220, 220, 255); //Sets a soft white purple colour to contrast the intensity of the shaking 

  textSize(28); //Text size is set to 28

  textAlign(CENTER, CENTER); //Quote is centered

  // Space between lines
  textLeading(40);

  // Wrapped quote text
  text(
    visibleQuote,

    width/2 - 300 + shakeX, //Positions the quote horizontally and adds shake movement

    height/2 - 40 + floatingY + shakeY, //Positions the quote vertically and adds floating and shaking movement

    //Creates a text box to create automatic line wrapping, otherwise the text would go off-screen 
    600,
    200
  );


  // INSTRUCTION PANEL

  // Panel background
  fill(20, 20, 20, 220);
  rect(20, height - 80, width - 40, 60, 15); //Draws an instruction box at the bottom

  // Top glowing line
  fill(255, 120, 80); //I set it to a firey orange colour to match Oscar Wilde's name
  rect(20, height - 80, width - 40, 5, 15); //Draws the glowing top line

  // Instructions
  fill(255); //Fills with white text

  textSize(16); //Text size is set to 16

  //Instructions are displayed
  text(
    "Move your mouse toward the text to reveal the hidden quote",
    width/2,
    height - 50
  );

  text(
    "As the quote appears, the name slowly burns away",
    width/2,
    height - 28
  );
}