let particles = []; //This creates an empty list called particles which stores all the shapes
let mode = 0; // This stores what behaviour mode is currently active

function setup() { //Run once when the project starts
  createCanvas(800, 800); //Canvas size is 800 by 800 pixels

  // Create shapes
  for (let i = 0; i < 100; i++) { 

    particles.push({ //This adds a new object in the particles array

      // Position
      x: random(width), //Gives a shape a random position in the x axis
      y: random(height), //Gives a shape a random position in the y axis

      // Floating movement
      speedX: random(-1, 1), //Random horizontal movement speed
      speedY: random(-1, 1), //Random vertical movement speed

      // Shape size
      size: random(20, 70), //Random shape size is between 20 and 70

      // Rotation
      angle: random(TWO_PI), //Starting rotation angle
      rotationSpeed: random(-0.03, 0.03), //Controls how fast the shapes rotate and in what direction

      // Random RGB colours 
      r: random(255), 
      g: random(255),
      b: random(255),

      // Shape type circle, square and rectangle
      type: int(random(3))
    });
  }
}

function draw() { //Draw function runs continuously
  background(0); //Background is painted to black so circles stand out


  // SHAPES
  for (let p of particles) { //For loop goes through every shape one by one, p is the current particle

    // FLOATING MOVEMENT
    p.x += p.speedX; //Moves shapes horizontally
    p.y += p.speedY; //Moves shapes vertically

    // Bounce off walls
    if (p.x < 0 || p.x > width) { //Checks if shape hits the left or right walls
      p.speedX *= -1; //If hit, the direction is reversed
    }

    if (p.y < 0 || p.y > height - 70) { //Checks if shape hits the top or bottom walls
      p.speedY *= -1; //If hit, the direction is reversed
    }

    // ROTATION
    p.angle += p.rotationSpeed;//Makes the shapes spin by changing the rotation every frame

    // Distance from mouse
    let d = dist(mouseX, mouseY, p.x, p.y); //Calculates the distance between the mouse and shapes

    // Mouse interaction range
    if (d < 120) { //Only affects shapes within 120 pixels, any further is not affected

      let angle = atan2(p.y - mouseY, p.x - mouseX); //Finds the direction from mouse to shapes which helps move shapes away                                                               correctly

      let force = map(d, 0, 120, 6, 0); //Changes the movement strength based on the distance

      // MODE 1 - PUSH
      if (mode == 0) { //Checks if mode 0 is active
        p.x += cos(angle) * force; //Moves the shapes horizontally away from the mouse
        p.y += sin(angle) * force; //Moves the shapes vertically away from the mouse
      }

      // MODE 2 - JITTER
      else if (mode == 1) { //Checks if the jitter mode is active
        p.x += random(-force, force); //Moves randomly left and right
        p.y += random(-force, force); //Moves randomly up and down
      }

      // MODE 3 - MAGNET
      else if (mode == 2) { //Checks if magnet mode is active
        p.x -= cos(angle) * force; //Collects the shapes together horizontally
        p.y -= sin(angle) * force; //Collects the shapes together vertically
      }

      // Glow colour
      fill(255, 180, 180); //Changes the shape's colour near the mouse to a light red

    } else {

      // Normal colour
      fill(p.r, p.g, p.b); //Otherwise remains the original colour they were
    }

    noStroke(); //Removes any outlines


    // ROTATING SHAPES
    push(); //Saves the current drawing state for rotation

    // Move drawing point to shape
    translate(p.x, p.y); 

    // Rotate shape
    rotate(p.angle); //Uses the current angle

    // CIRCLE
    if (p.type == 0) { 

      ellipse(0, 0, p.size); //Draws circle at the translated position

    }

    // SQUARE
    else if (p.type == 1) {
      //Draws a rectangle (square) from the center
      rectMode(CENTER); 
      rect(0, 0, p.size, p.size);

    }

    // TRIANGLE
    else {
      //Defines the three corners of the triangle
      triangle(
        0, -p.size/2,
        -p.size/2, p.size/2,
        p.size/2, p.size/2
      );
    }

    pop(); //Stops one shape's rotation from affecting the other by restoring previous drawing settings
  }


  // INSTRUCTION PANEL

  fill(0, 180); //Set to a semi transparent black colour
  rect(0, height - 70, width, 70); //Draws an instruction box at the bottom

  fill(255); //Fills with white text
  textSize(16); //Text size is set to 16
  
  //Displays the instructions text
  text("Move mouse to disturb the shapes", 20, height - 40); 
  text("Click mouse to switch behaviour modes", 20, height - 15); 

  // Current mode display
  if (mode == 0) { //Checks the current mode for push
    text("Current Mode: PUSH", 500, height - 28); //shows the push mode text
  }

  else if (mode == 1) { //Checks for jitter mode
    text("Current Mode: JITTER", 500, height - 28);  //shows the jitter mode text
  }

  else if (mode == 2) { //Checks for magnet mode
    text("Current Mode: MAGNET", 500, height - 28); //shows the magnet mode text
  }
}


// CHANGE MODES

function mousePressed() { //Function runs whenever mouse is clicked

  mode++; //Adds 1 to mode

   // Loop back to 0 after mode 2
  if (mode > 2) { 
    mode = 0;
  }
}