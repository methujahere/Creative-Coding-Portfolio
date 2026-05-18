// Creates an empty array to store all shapes
let particles = [];

// Stores the current interaction mode
let mode = 0;

function setup() {

  // Creates the canvas size
  createCanvas(800, 800);


  // CREATE SHAPES

  // Loops 200 times to create 200 shapes
  for (let i = 0; i < 200; i++) {

    // Adds a new shape object into the array
    particles.push({

      // Random X position near the centre
      x: width / 2 + random(-80, 80),

      // Random Y position near the centre
      y: height / 2 + random(-80, 80),

      // Horizontal movement speed
      speedX: 0,

      // Vertical movement speed
      speedY: 0,

      // Random shape size
      size: random(50, 100),

      // Random starting rotation
      angle: random(TWO_PI),

      // Random rotation speed
      rotationSpeed: random(-0.03, 0.03),

      // Random red colour value
      r: random(255),

      // Random green colour value
      g: random(255),

      // Random blue colour value
      b: random(255),

      // Random shape type (0, 1, or 2)
      type: int(random(3))
    });
  }
}

function draw() {

  // Black background
  background(0);

  // Centre X position of orb
  let centerX = width / 2;

  // Centre Y position of orb
  let centerY = height / 2 - 20;


  // SHAPES

  // Loops through every shape
  for (let p of particles) {

    // Rotates the shape every frame
    p.angle += p.rotationSpeed;

    // Finds distance between mouse and shape
    let d = dist(mouseX, mouseY, p.x, p.y);

   
    // MOUSE INTERACTION

    // Runs interaction if mouse is close
    if (d < 150) {

      // Finds angle away from mouse
      let angle = atan2(p.y - mouseY, p.x - mouseX);

      // Creates stronger force when closer
      let force = map(d, 0, 150, 5, 0);

     
      // PUSH MODE

      // Pushes shapes away from mouse
      if (mode == 0) {

        // Moves shape horizontally away
        p.x += cos(angle) * force;

        // Moves shape vertically away
        p.y += sin(angle) * force;
      }

     
      // JITTER MODE

      // Random shaking movement
      else if (mode == 1) {

        // Random horizontal shake
        p.x += random(-force, force);

        // Random vertical shake
        p.y += random(-force, force);
      }

     
      // MAGNET MODE

      // Pulls shapes toward mouse
      else if (mode == 2) {

        // Pulls shape horizontally inward
        p.x -= cos(angle) * force;

        // Pulls shape vertically inward
        p.y -= sin(angle) * force;
      }

      // Light glow colour near mouse
      fill(255, 180, 180);
    }

    
    // RETURN TO ORB

    // Runs when mouse is far away
    else {

      // Slowly returns shape to centre
      p.x = lerp(p.x, centerX, 0.02);

      // Slowly returns shape vertically
      p.y = lerp(p.y, centerY, 0.02);

      // Uses original random colours
      fill(p.r, p.g, p.b);
    }

    // Removes outlines from shapes
    noStroke();

    
    // DRAW SHAPES

    // Saves current drawing settings
    push();

    // Moves drawing position
    translate(p.x, p.y);

    // Rotates the shape
    rotate(p.angle);

    
    // CIRCLE

    // Draws a circle if type is 0
    if (p.type == 0) {

      // Draws the circle
      ellipse(0, 0, p.size);
    }

    
    // SQUARE

    // Draws a square if type is 1
    else if (p.type == 1) {

      // Makes rectangle draw from centre
      rectMode(CENTER);

      // Draws the square
      rect(0, 0, p.size, p.size);
    }

    
    // TRIANGLE

    // Draws a triangle if type is 2
    else {

      // Draws the triangle points
      triangle(

        // Top point
        0, -p.size / 2,

        // Bottom left point
        -p.size / 2, p.size / 2,

        // Bottom right point
        p.size / 2, p.size / 2
      );
    }

    // Restores original drawing settings
    pop();
  }

 
  // INSTRUCTION PANEL

  // Dark panel colour
  fill(15, 15, 15, 220);

  // Draws instruction box
  rect(10, height - 80, width - 20, 70, 15);

  // Blue glowing line
  fill(100, 180, 255);

  // Draws top glowing line
  rect(10, height - 80, width - 20, 5, 15);

  // White text colour
  fill(255);

  // Text size
  textSize(16);

  // First instruction text
  text(
    "Move mouse near the orb to disturb the shapes",
    25,
    height - 48
  );

  // Second instruction text
  text(
    "Click mouse to switch interaction modes",
    25,
    height - 23
  );

  
  // MODE DISPLAY

  // Dark mode box colour
  fill(40);

  // Draws mode display box
  rect(width - 220, height - 65, 180, 35, 10);

  // White text colour
  fill(255);

  
  // PUSH MODE TEXT

  // Shows PUSH mode text
  if (mode == 0) {

    // Red mode colour
    fill(255, 120, 120);

    // Draws PUSH text
    text("MODE: PUSH", width - 190, height - 42);
  }


  // JITTER MODE TEXT

  // Shows JITTER mode text
  else if (mode == 1) {

    // Yellow mode colour
    fill(255, 220, 120);

    // Draws JITTER text
    text("MODE: JITTER", width - 190, height - 42);
  }


  // MAGNET MODE TEXT

  // Shows MAGNET mode text
  else if (mode == 2) {

    // Green mode colour
    fill(120, 255, 180);

    // Draws MAGNET text
    text("MODE: MAGNET", width - 190, height - 42);
  }
}

// CHANGE MODES

function mousePressed() {

  // Adds 1 to the mode number
  mode++;

  // Resets mode back to 0
  if (mode > 2) {

    mode = 0;
  }
}