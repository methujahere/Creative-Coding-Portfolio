// Stores the starting name
let nameText = "Oscar Wilde";

// Stores the full hidden quote
let fullQuote =
"Most people are other people, their thoughts are someone else's opinion, their lives a mimicry, their passions a quotation";

// Array that stores all quote words
let words = [];

// Array for burning fire particles
let burnParticles = [];

// Array for background particles
let particles = [];

// Controls when reveal starts
let revealStarted = false;

// Stops fire particles later
let burnFinished = false;

function setup() {

  // Creates the canvas size
  createCanvas(900, 900);

  // Centers all text
  textAlign(CENTER, CENTER);

  // Splits quote into separate words
  let splitWords = fullQuote.split(" ");

  // Loops through every word
  for (let i = 0; i < splitWords.length; i++) {

    // Creates rows of words
      let lineNum = floor(i / 4);

    // Creates columns of words
      let col = i % 4;

    // X position for each word
      let x = width/2 - 260 + col * 180;

    // Y position for each word
      let y = 180 + lineNum * 80;

    // Adds a new word object
    words.push({

      // Stores the word text
      text: splitWords[i],

      // Current X position
      x: x,

      // Current Y position
      y: y,

      // Original X position
      baseX: x,

      // Original Y position
      baseY: y,

      // Horizontal speed
      vx: 0,

      // Vertical speed
      vy: 0,

      // Rotation amount
      angle: 0,

      // Transparency
      alpha: 0
    });
  }

  // Creates background particles
  for (let i = 0; i < 140; i++) {

    // Adds a new particle object
    particles.push({

      // Random X position
      x: random(width),

      // Random Y position
      y: random(height),

      // Random particle size
      size: random(2, 5),

      // Random falling speed
      speedY: random(0.2, 1)
    });
  }
}

function draw() {

  // Dark background colour
  background(5, 5, 12);

  
  // BACKGROUND PARTICLES

  // Loops through every particle
  for (let p of particles) {

    // Soft white colour
    fill(255, 255, 255, 60);

    // Removes outlines
    noStroke();

    // Draws particle circles
    ellipse(p.x, p.y, p.size);

    // Moves particles downward
    p.y += p.speedY;

    // Resets particles back to top
    if (p.y > height) {

      p.y = 0;

      p.x = random(width);
    }
  }

  // Finds distance from mouse to centre
  let d =
  dist(mouseX, mouseY, width/2, height/2);

  // Starts reveal if mouse gets close
  if (d < 220) {

    revealStarted = true;
  }


  // BEFORE REVEAL

  // Shows Oscar Wilde first
  if (!revealStarted) {

    // Floating movement
    let floatingY =
    sin(frameCount * 0.03) * 10;

    // Adds glow blur
    drawingContext.shadowBlur = 35;

    // Orange glow colour
    drawingContext.shadowColor =
    "rgba(255,140,80,0.9)";

    // Orange text colour
    fill(255, 140, 80);

    // Name text size
    textSize(48);

    // Draws Oscar Wilde
    text(
      nameText,
      width/2,
      height/2 + floatingY
    );
  }

  
  // AFTER REVEAL STARTS

  else {

    // Stops burning particles later
    if (frameCount > 300) {

      burnFinished = true;
    }


    // FIRE PARTICLES

    // Creates fire particles
    if (!burnFinished) {

      // Creates particles every 2 frames
      if (frameCount % 2 == 0) {

        burnParticles.push({

          // Random X position
          x: width/2 + random(-80, 80),

          // Random Y position
          y: height/2 + random(-20, 20),

          // Horizontal movement
          vx: random(-4, 4),

          // Upward movement
          vy: random(-5, -1),

          // Particle size
          size: random(4, 8),

          // Transparency
          alpha: 255
        });
      }
    }


    // FADING NAME

    // Slowly fades the name away
    let fade =
    map(frameCount, 0, 300, 255, 0);

    // Keeps fade value controlled
    fade = constrain(fade, 0, 255);

    // Orange glow blur
    drawingContext.shadowBlur = 30;

    // Glow colour
    drawingContext.shadowColor =
    "rgba(255,100,50,0.8)";

    // Fading orange text
    fill(255, 120, 80, fade);

    // Text size
    textSize(48);

    // Draws fading name
    text(
      nameText,
      width/2,
      height/2
    );


    // DRAW FIRE PARTICLES

    // Loops backwards through particles
    for (let i = burnParticles.length - 1; i >= 0; i--) {

      // Gets current particle
      let b = burnParticles[i];

      // Fire colour
      fill(255, 120, 50, b.alpha);

      // Removes outline
      noStroke();

      // Draws fire particle
      ellipse(
        b.x,
        b.y,
        b.size
      );

      // Moves particle horizontally
      b.x += b.vx;

      // Moves particle vertically
      b.y += b.vy;

      // Slowly fades particle
      b.alpha -= 4;

      // Removes invisible particles
      if (b.alpha <= 0) {

        burnParticles.splice(i, 1);
      }
    }


    // QUOTE WORDS

    // Loops through every word
    for (let i = 0; i < words.length; i++) {

      // Gets current word
      let w = words[i];

      // Slowly fades words in
      if (frameCount > 120 + i * 10) {

        w.alpha += 4;
      }

      // Keeps alpha controlled
      w.alpha = constrain(w.alpha, 0, 255);

      // Finds distance from mouse to word
      let wd =
      dist(mouseX, mouseY, w.x, w.y);


      // PUSH WORDS AWAY

      // Pushes words if mouse gets close
      if (wd < 140) {

        // Finds angle away from mouse
        let angle =
        atan2(w.y - mouseY, w.x - mouseX);

        // Push force strength
        let force =
        map(wd, 0, 140, 2.5, 0);

        // Adds horizontal movement
        w.vx += cos(angle) * force;

        // Adds vertical movement
        w.vy += sin(angle) * force;

        // Rotates words
        w.angle += 0.03;
      }


      // WORD MOVEMENT

      // Moves word horizontally
      w.x += w.vx;

      // Moves word vertically
      w.y += w.vy;

      // Slows horizontal movement
      w.vx *= 0.92;

      // Slows vertical movement
      w.vy *= 0.92;

      // Returns words back together
      w.x = lerp(w.x, w.baseX, 0.02);

      // Returns words vertically
      w.y = lerp(w.y, w.baseY, 0.02);

      // Stops rotation slowly
      w.angle =
      lerp(w.angle, 0, 0.03);


      // FLOATING EFFECT

      // Floating movement
      let floatOffset =
      sin(frameCount * 0.03 + i) * 5;


      // SHAKE EFFECT

      // Shake variables
      let shakeX = 0;
      let shakeY = 0;

      // Only shakes while fading in
      if (w.alpha < 255) {

        // Shake strength
        let shakeAmount =
        map(w.alpha, 0, 255, 12, 0);

        // Random horizontal shake
        shakeX =
        random(-shakeAmount, shakeAmount);

        // Random vertical shake
        shakeY =
        random(-shakeAmount, shakeAmount);
      }


      // GLOWING WORDS

      // Pulsing glow effect
      let glowPulse =
      sin(frameCount * 0.05) * 10 + 20;

      // Glow blur amount
      drawingContext.shadowBlur =
      glowPulse;

      // Glow colour
      drawingContext.shadowColor =
      "rgba(220,220,255,0.9)";

      // Soft glowing text colour
      fill(
        220,
        220,
        255,
        w.alpha
      );

      // Word text size
      textSize(30);


      // DRAW WORD

      // Starts isolated movement
      push();

      // Moves and shakes words
      translate(
        w.x + shakeX,
        w.y + floatOffset + shakeY
      );

      // Rotates words
      rotate(w.angle);

      // Draws the word
      text(w.text, 0, 0);

      // Resets movement settings
      pop();
    }
  }

  // Turns glow off
  drawingContext.shadowBlur = 0;

  // INSTRUCTION PANEL

  // Dark panel colour
  fill(15, 15, 20, 230);

  // Draws instruction box
  rect(
    20,
    height - 90,
    width - 40,
    70,
    20
  );

  // Orange glowing line
  fill(255, 120, 80);

  // Draws top line
  rect(
    20,
    height - 90,
    width - 40,
    5,
    20
  );

  // White instruction text
  fill(255);

  // Instruction text size
  textSize(16);

  // First instruction
  text(
    "Move your mouse toward Oscar Wilde",
    width/2,
    height - 58
  );

  // Second instruction
  text(
    "Push the quote apart and watch it reform together",
    width/2,
    height - 32
  );
}