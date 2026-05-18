// Starting name
let nameText = "Oscar Wilde"; //Variable stores the starting text 

// Full quote
let fullQuote = "Most people are other people, their thoughts are someone else's opinion, their lives a mimicry, their passions a quotation"; //This stores the full hidden quote

// Keeps track of how many letters of quote are visible
let quoteIndex = 0;


// Stores how many letters of name remain
let nameLength;
let visibleQuote = ""; //Starts of as an empty string then letters gradually get added to it

// Split quote into words
let words = []; 

// Background particles
let particles = []; //Particle array which stores all of the background particles

function setup() { //Runs once when the project starts

  createCanvas(900, 900); //Canvas size 900 by 900

  textAlign(CENTER, CENTER); //Centers the text horizontally and vertically 

  textSize(30); //Sets the default text size to 30

  // Full name visible at start
  nameLength = nameText.length; //Counts how many letters are in Oscar Wilde, this becomes the starting amount of visible letters

  // Splits the quote into separate words
  let splitWords = fullQuote.split(" "); 

  // Create word objects
  for (let i = 0; i < splitWords.length; i++) {

    // Create better paragraph layout
    let row = floor(i / 4);

    let col = i % 4; //Creates columns of 4 so the words are spaces horizontally 

    let x = width/2 - 220 + col * 150; //Positions the words across the screen

    let y = 140 + row * 70; //Moves words downwards into rows

    words.push({

      text: splitWords[i], //This stores the actual word

      // Stores the original home position so the words return to this position later
      baseX: x,
      baseY: y,

      // Stores the current moving position
      x: x,
      y: y,

      // Rotation
      angle: 0 //Stores the rotation amount
    });
  }

  // Creates 80 background particles
  for (let i = 0; i < 80; i++) {

    particles.push({ //Adds a particle object 
      
      //Places particles randomly on the x and y axis
      x: random(width),
      y: random(height),

      size: random(2, 6), //Random particle size

      speedY: random(0.2, 1) //Different randomised falling speeds
    });
  }
}

function draw() { //Draw function runs continuously

  background(10); //Background colour set to a darker grey / lighter black 


  // BACKGROUND PARTICLES

  for (let p of particles) { //Loops through every particle

    fill(255, 255, 255, 80); //Creates soft and transparent white particles 

    noStroke(); //Removes any outlines from the particles

    ellipse(p.x, p.y, p.size); //Draws particle circles

    p.y += p.speedY; //Moves the particles downwards on the y axis

    // Reset particle
    if (p.y > height) { //Checks if the particle has left the screen
      
      //Moves the particles back to top
      p.y = 0; 
      p.x = random(width);
    }
  }


  // MOUSE DISTANCE

  let d = dist(mouseX, mouseY, width/2, height/2);  //Calculates distance between mouse and the center of the screen

  
  // REVEAL QUOTE

  if (d < 200) { //Only reveal the quote when the mouse is close enough

    if (frameCount % 4 == 0) { //Runs every 4 frames and slows down the reveal speed

      // Remove letters from name
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

  // Visible name
  let visibleName = nameText.substring(0, nameLength); //Only shows part of Oscar Wilde based on nameLength

  // Floating movement
  let floatingY = sin(frameCount * 0.03) * 10; //Creates a smooth levitation movement


    // DRAW NAME

    // Add glow effect
    drawingContext.shadowBlur = 25; //Adds a glow blur effect

    drawingContext.shadowColor = "rgba(255, 140, 100, 0.9)"; //Sets an orange glow colour to the name Oscar Wilde

    // Name colour
    fill(255, 140, 100); //Sets an orange-red text colour

    textSize(40); //Text size is set to 40

    text(
      visibleName,
      width/2,
      height/2 - 140 + floatingY //Adds a floating motion to the text
    );

// Turn glow off after drawing
drawingContext.shadowBlur = 0; 


  // DRAW SCATTERING WORDS

  textSize(28); 

  fill(220, 220, 255);

  // Split currently visible quote
  let currentWords = visibleQuote.split(" ");

  for (let i = 0; i < currentWords.length; i++) {

    // Skip empty words
    if (currentWords[i] == "") {
      continue;
    }

    let w = words[i];

    // Distance from mouse to word
    let wordDistance = dist(mouseX, mouseY, w.x, w.y);


    // PUSH WORDS AWAY

    if (wordDistance < 150) {

      // Direction away from mouse
      let angle = atan2(w.y - mouseY, w.x - mouseX);

      // Push force
      let force = map(wordDistance, 0, 150, 10, 0);

      // Move word away
      w.x += cos(angle) * force;
      w.y += sin(angle) * force;

      // Rotate word
      w.angle += 0.05;
    }

  
    // RETURN TO POSITION

    else {

      // Smooth movement back
      w.x = lerp(w.x, w.baseX, 0.03);

      w.y = lerp(w.y, w.baseY, 0.03);

      // Slowly stop rotation
      w.angle = lerp(w.angle, 0, 0.03);
    }

    // Floating effect
    let floatOffset = sin(frameCount * 0.03 + i) * 5;


    // GLOW EFFECT

    drawingContext.shadowBlur = 20;

    drawingContext.shadowColor = "rgba(200, 200, 255, 0.8)";

    
    // DRAW WORD

    push();

    translate(w.x, w.y + floatOffset);

    rotate(w.angle);

    text(currentWords[i], 0, 0);

    pop();
  }

  // Remove glow from other shapes
  drawingContext.shadowBlur = 0;

 
  // INSTRUCTION PANEL

  fill(20, 20, 20, 220);

  rect(20, height - 85, width - 40, 65, 18);

  // Glowing top line
  fill(255, 120, 80);

  rect(20, height - 85, width - 40, 5, 18);

  // Instructions
  fill(255);

  textSize(16);

  text(
    "Move your mouse close to push and rotate the words",
    width/2,
    height - 52
  );

  text(
    "Move away and the quote reforms together",
    width/2,
    height - 28
  );
}