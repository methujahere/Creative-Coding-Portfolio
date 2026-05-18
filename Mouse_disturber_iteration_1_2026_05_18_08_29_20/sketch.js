let particles = []; //This creates an empty list called particles which stores all the circles
let mode = 0; // This stores what behaviour mode is currently active

function setup() { //Run once when the project starts
  createCanvas(800, 800); //Canvas size is 800 by 800 pixels

  // Creates a 100 random sized circles
  for (let i = 0; i < 100; i++) { 
    particles.push({ //This adds a new object in the particles array
      x: random(width), //Gives a circle a random position in the x axis
      y: random(height), //Gives a circle a random position in the y axis
      size: random(20, 70),//Random circle size is between 20 and 70
      color: color(random(255), random(255), random(255)) // Random colours are picked for the circles
    });
  }
}

function draw() { //Draw function runs continuously 
  background(0); //Background is painted to black so circles stand out

  // Instructions
  fill(255); //Text colour is set to white
  textSize(16); //Text size is set to 16
  text("Move mouse to disturb shapes", 20, 30); //The text instructions displayed at position (20, 30)
  text("Click to change mode", 20, 50); //The text instructions displayed at position (20, 50)

  for (let p of particles) { //For loop goes through every circle one by one, p is the current particle

    // Distance from mouse
    let d = dist(mouseX, mouseY, p.x, p.y); //Calculates the distance between the mouse and circle

    // Force field range
    if (d < 120) { //Only affects circles within 120 pixels, any further is not affected

      // Angle away from mouse
      let angle = atan2(p.y - mouseY, p.x - mouseX); //Finds the direction from mouse to circle which helps move circles away                                                               correctly

      // Strength of movement
      let force = map(d, 0, 120, 6, 0); //Changes the movement strength based on the distance


      // MODE 1: PUSH AWAY
      if (mode == 0) { //Checks if mode 0 is active
        p.x += cos(angle) * force; //Moves the circle horizontally away from the mouse
        p.y += sin(angle) * force; //Moves the circle vertically away from the mouse
      }

      // MODE 2: SHAKE / JITTER
      else if (mode == 1) { //Checks if the jitter mode is active 
        p.x += random(-force, force); //Moves randomly left and right
        p.y += random(-force, force); //Moves randomly up and down
      }
    
      // MODE 3: ORBIT MOUSE
      else if (mode == 2) { //Checks if orbit mode is active
        p.x += sin(frameCount * 0.05 + angle) * force; //Moves the circle in a wavey motion horizontally
        p.y += cos(frameCount * 0.05 + angle) * force; //Moves the circle vertically to create a wavey effect
      }
    }

    // Keep shapes inside canvas
    p.x = constrain(p.x, 0, width); //Stops the circles from leaving the left and right borders
    p.y = constrain(p.y, 0, height); //Stops the circles from leaving the top and bottom borders

    // Draw shapes
    fill(p.color); //Sets the circles colour
    noStroke(); //Removes any outlines
    ellipse(p.x, p.y, p.size); //Draws the circles
  }
}

// Click mouse to switch behaviour mode
function mousePressed() { //Function runs whenever mouse is clicked
  mode++; //Adds 1 to mode

  // Loop back to 0 after mode 2
  if (mode > 2) { 
    mode = 0;
  }
}