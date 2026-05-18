# Progressive text display

For my third and last project, I decided to do the progressive text display. For my first iteration, I started out very simple with a quote from a famous author and poet Oscar Wilde.

![Screenshot](https://github.com/methujahere/Creative-Coding-Portfolio/blob/main/Screenshot%202026-05-18%20103920.png?raw=true)
![Screenshot](https://github.com/methujahere/Creative-Coding-Portfolio/blob/main/Screenshot%202026-05-18%20103928.png?raw=true)

So the idea for this was to make the quote appear as Oscar Wilde's name dissapears. I also reused the instructions panel from the previous project and recoloured the top to orange. 

```
  let shakeX = 0; 
  let shakeY = 0;

  if (quoteIndex < fullQuote.length) { 

    let shakeAmount = map(
      quoteIndex,
      0,
      fullQuote.length,
      0,
      8
    );

    shakeAmount += interaction * 0.3;

    shakeX = random(-shakeAmount, shakeAmount);
    shakeY = random(-shakeAmount, shakeAmount);
  }

```

Using this code, I added a shaking effect to the quote as it reveals itself, after the quote is done revealing, it just levitates in place. The shake variables for the x and y axis are set to 0 initially and the shake amount gets stronger as the quote grows and the mouse interacts with it.
Other than that, everything else is pretty much normal.

You can also see my first iteration [running here](Progressive_text_display_iteration_1_2026_05_18_08_30_04/index.html)

Moving onto my second iteration, I added a lot more updates to my code. 

![Screenshot](https://github.com/methujahere/Creative-Coding-Portfolio/blob/main/Screenshot%202026-05-18%20105530.png?raw=true)
![Screenshot](https://github.com/methujahere/Creative-Coding-Portfolio/blob/main/Screenshot%202026-05-18%20105556.png?raw=true)

To start of with, I now made the text glow which was a nice addition to make it stand out more. I also added particles in the background because I was going for a sci-fi space theme for this project. Finally the quote is now displayed completely differently because the words are split up so that the user is able to run the mouse across the words as they begin to 
rotate and split apart. 

```
 for (let p of particles) { 

    fill(255, 255, 255, 80); 

    noStroke(); 

    ellipse(p.x, p.y, p.size);

    p.y += p.speedY; 

    if (p.y > height) { 
      p.y = 0; 
      p.x = random(width);
    }
  }
```

This is the code for the background particles. The for loop goes through every particle, each particle has a transparent white colour, similar to stars. The particles move downwards on the y axis and if any particles have left the screen, they get moved back to the top and the cycle repeats.

```

    if (wordDistance < 150) {

      let angle = atan2(w.y - mouseY, w.x - mouseX);

      let force = map(wordDistance, 0, 150, 10, 0);

      w.x += cos(angle) * force;
      w.y += sin(angle) * force;

      w.angle += 0.05;
    }
```

These lines of code allows the user to push the word in the quote away in different directions. Each word can get rotated and pushed if they come near a 150 pixel distance of the mouse.

```
    else {

      w.x = lerp(w.x, w.baseX, 0.03);

      w.y = lerp(w.y, w.baseY, 0.03);

      w.angle = lerp(w.angle, 0, 0.03);
    }

    let floatOffset = sin(frameCount * 0.03 + i) * 5;



    drawingContext.shadowBlur = 20;

    drawingContext.shadowColor = "rgba(200, 200, 255, 0.8)";
```

This bit of code allows the words to return to their fixed positions and slowly stop the rotation. Each word floats individually so out of sync. Additionally I added the glow effect down there with those two lines of code.
As for my final iteration, I decided to animate the glow effect and change the way the quote is animated onto display.

You can also see my second iteration [running here](Progressive_text_display_iteration_2_2026_05_18_08_30_24/index.html)

![Screenshot](https://github.com/methujahere/Creative-Coding-Portfolio/blob/main/Screenshot%202026-05-18%20112024.png?raw=true)

As you can see from this, Oscar Wilde's name no longer just dissapears on its own, but it burns out like a star. As for the quote itself, on my previous iteration, the user had to move the mouse to reveal the words but here they just come into affect as the name burns out.

```
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
```
These lines of code allow the fire particles to be drawn and animated to move vertically and horizontally off the page.

```

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
```

I added a pulsing glow effect to the words so the effect gets bigger then shrinks back and repeats giving the quote a starry feel. 

You can also see my final iteration [running here](Progressive_text_display_iteration_3_2026_05_18_08_30_38/index.html)
