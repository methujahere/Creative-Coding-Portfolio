#Playful control panel

For my first project, I chose the playful control panel. I decided to go off a little bit of coding work I did in class. 

![Screenshot 2026-05-17 143726.png](https://github.com/methujahere/Creative-Coding-Portfolio/blob/main/Screenshot%202026-05-17%20143726.png?raw=true))

For my first iteration, it didn't have much animation other than the colours changing when I click on the circles. This was the only form of animation because I wanted to start of small and light just to get a grasp of how much further I could go.

![Screenshot 2026-05-18 082105.png](https://github.com/methujahere/Creative-Coding-Portfolio/blob/main/Screenshot%202026-05-18%20082105.png?raw=true)

As you can see from the screenshot I provided, there is a ripple effect with the circles being bigger and having a random colour when I clicked on it. 
Here is the code I used to make the ripples:

```
function rippleEffect(centerX, centerY) { 

  for (let tile of tiles) { 

    let d = dist(centerX, centerY, tile.x, tile.y); 
    if (d < 200) {

      let force = map(d, 0, 200, 2.5, 1);
      tile.size = tile.baseSize * force;

      tile.color = color( 
        random(255), 
        random(255),
        random(255)
      );
```

I did explain every line with comments next to the code so I won't do too much of an explanation here but the main idea is that the function rippleEffect contains a for loop that checks all of the tiles. The distance will measure how far a tile is from the clicked circle. So the only tiles that get affected by the ripple are tiles with a distance of about 200 pixels from the clicked circle. There is a bigger effect for the shapes closer to the clicked circle as they will grow bigger whereas there is a weaker effect to the shapes that are further away. Additionally, tile.color will pick a random  RGB colour for the circles so every click will create a random colour. 

You can also see the control panel experiment 1 [running here](Playful_control_panel_iteration_1_2026_05_18_08_27_11)

Moving onto my second iteration, I went back to the original code I was working on in class and decided to add a control panel to it since the shapes have more movement and animation. 

![Screenshot 2026-05-18 085718.png](https://github.com/methujahere/Creative-Coding-Portfolio/blob/main/Screenshot%202026-05-18%20085718.png?raw=true)

As you can see I added a control panel at the bottom where the user is able to control the grid size, animation speed, shape visibility and colours. 

```
function setup() { 

  createCanvas(800, 800); 

  squareSize = width / numAcross;  

  frameRate(4); 


  createP("GRID SIZE"); 

  sizeSlider = createSlider(5, 25, 10); 

  createP("ANIMATION SPEED"); 

  speedSlider = createSlider(1, 20, 4); 

  createP("SHOW SHAPES"); 

  circleCheckbox = createCheckbox(" Circles", true); 

  squareCheckbox = createCheckbox(" Squares", true); 

  createP("COLOURS"); 

  circleColor = createColorPicker("#f0e800"); 

  squareColor = createColorPicker("#0050ff"); 
} 
```

Now taking a look at the code for the control panel section, I added sliders for each component. To begin with I set the frame rate to 4 as an initial start then later added speedSlider to increase or decrease the speed of the animation. I also added a slider which controls the grid size, as you can see it can be decreased to 5 rows and columns or 25 rows and columns. The circle and square checkboxes run to see if either of the shapes are visible and finally I added two colour pickers, one for the circles and one for the squares which are both initially coloured in yellow and blue. 

You can also see the control panel iteration 2 [running here](Playful_control_panel_variant_2_2026_05_18_08_26_29)

As for my final iteration for the control panel, I decided to go for a blend of both the previous two experiments. I also decided to have a softer animation style rather than the hectic flashing on my second iteration. 

![Screenshot 2026-05-18 090902.png](https://github.com/methujahere/Creative-Coding-Portfolio/blob/main/Screenshot%202026-05-18%20090902.png?raw=true)

So as you can see from my screenshot, I added the control panel at the bottom but I removed the colour picker because I wanted the user to be able to click directly onto the shapes to see the colour change in a ripple effect. This iteration has the combined coding of the previous two but also with a new line of coding for the animation.

```
function teleportTiles() { 

  let a = floor(random(tiles.length)); 
  let b = floor(random(tiles.length));

  let tempX = tiles[a].gridX; 
  let tempY = tiles[a].gridY;

  tiles[a].gridX = tiles[b].gridX;
  tiles[a].gridY = tiles[b].gridY;

  tiles[b].gridX = tempX;
  tiles[b].gridY = tempY;
}

```
The teleportTiles function randomly swaps the tile positions, for example it will pick two random tiles (tile a and b), tile a is stored temporarily but it will take tile B's position so then tile B will have to take tile A's original position. It's just two random tiles swapping positions with one another individually but it creates a nice smooth animation effect.

You can also see the project [running here](Playful_control_panel_iteration_3_2026_05_18_08_20_34)


