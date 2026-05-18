# Mouse Disturber 

For my second project, I chose to do the mouse disturber. As for my first iteration, I wanted to explore the very basics of what I could do with the mouse. 

![Screenshot](https://github.com/methujahere/Creative-Coding-Portfolio/blob/main/Screenshot%202026-05-18%20095705.png?raw=true)

So it does look very bland with only circles but I did add three different settings for the user to test with the mouse. These modes are pushing the objects, shaking the objects or getting the objects to orbit around the mouse. 

```
    // Force field range
    if (d < 120) { 

      // Angle away from mouse
      let angle = atan2(p.y - mouseY, p.x - mouseX); 

      // Strength of movement
      let force = map(d, 0, 120, 6, 0); 


      // MODE 1: PUSH AWAY
      if (mode == 0) { 
        p.x += cos(angle) * force; 
        p.y += sin(angle) * force; 
      }

      // MODE 2: SHAKE / JITTER
      else if (mode == 1) { 
        p.x += random(-force, force); 
        p.y += random(-force, force); 
      }
    
      // MODE 3: ORBIT MOUSE
      else if (mode == 2) { 
        p.x += sin(frameCount * 0.05 + angle) * force; 
        p.y += cos(frameCount * 0.05 + angle) * force; 
      }
    }
```

This is the important part of the code because this allows the mouse to do a couple of things. Every time you left click, the mouse will switch between one of these modes. These modes will then affect the circles. Now a couple of things, this only affects a range of around 120 pixels, any further isn't affected as you can see by the first if statement.
Additionally, the strength will be affected by distance of the mouse from a circle. The push away mode moves the circles horizontally and vertically away from the mouse.The shake and jitter mode moves the circles randomly up,down,left and right. Finally the orbit mode move the circles in a wavey motion to go around the mouse.

You can also see my first iteration [running here](Mouse_disturber_iteration_1_2026_05_18_08_29_20/index.html) 

Moving onto iteration 2, I added a lot more and changed a couple of things up. 

![Screenshot](https://github.com/methujahere/Creative-Coding-Portfolio/blob/main/Screenshot%202026-05-18%20101122.png?raw=true)

As you can see, I added more shapes than just circles. I also added the instructions panel to the bottom and made it look much more neater. Additionally, I replaced the orbit mode with a new magnet mode, so instead of the shapes just orbiting around the mouse, they are directly attracted to the mouse. Furthermore, if a shape does come in contact with the mouse, 
then the shape will be highlighted in a light red tone. 

```
    push();

    // Move drawing point to shape
    translate(p.x, p.y); 

    // Rotate shape
    rotate(p.angle); 

    // CIRCLE
    if (p.type == 0) { 
      ellipse(0, 0, p.size); 

    }

    // SQUARE
    else if (p.type == 1) {
      rectMode(CENTER); 
      rect(0, 0, p.size, p.size);

    }

    // TRIANGLE
    else {
      triangle(
        0, -p.size/2,
        -p.size/2, p.size/2,
        p.size/2, p.size/2
      );
    }

    pop();
  }
```

Also, I added further movement to the shapes so they float and rotate on their own even if I don't interact with them. 

You can also see the second iteration [running here](Mouse_disturber_iteration_2_2026_05_18_08_29_30/index.html) 

As for my final iteration, I wanted to do the opposite of what I did with my second iteration, where instead of having the shapes float about on their own, they're all stuck together in one massive ball, almost like an atom. 

![Screenshot](https://github.com/methujahere/Creative-Coding-Portfolio/blob/main/Screenshot%202026-05-18%20102316.png?raw=true)
![Screenshot](https://github.com/methujahere/Creative-Coding-Portfolio/blob/main/Screenshot%202026-05-18%20102259.png?raw=true)

So all of the shapes collect at one point in the center, and when my mouse interacts with it, the shapes either get pushed away, pulled together or start vibrating.

```
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
```

So as you can see from this code, when the mouse is far from the shapes, they return back and collect at the centre. Each of the shapes remain rotating at the middle untill another interaction is made. Furthermore, I upgraded the instructions panel to look much more nicer. 

```
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
```
Most of is it the same as iteration 2, but I made the corners more round so the box is more pleasing to look at. I also colour coded the different modes such as push being red and magnetic being etc. Colour coding really helps the text stand out. 

You can also see my final iteration [running here](Mouse_disturber_iteration_3_2026_05_18_08_42_15/index.html) 
