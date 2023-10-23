let zoom = 300;
let objects = [];

function preload() {
  // Load the sounds
  sound1 = loadSound('happy birthday.mp3');
  sound2 = loadSound('heart race.mp3');
  sound3 = loadSound('keyboard.mp3');
   sound1.setVolume(0);
  sound2.setVolume(0);
  sound3.setVolume(0);
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  background(0, 0);
  canvas.elt.oncontextmenu = () => false; // Disable the context menu

  // Create separate objects for each image
  objects.push(createImageObject('couch 1.png', 0, 0, 0, 0.01, sound1,2));
  objects.push(createImageObject('couch 2.png', -150, 50, 0, 0.02,sound2));
  objects.push(createImageObject('couch color.png', 0, 25, 0, 0.005,sound3, 1.5));
}

function draw() {
  background(220);

  // Camera control
  orbitControl(); // Enable camera controls for panning and zooming

  // Get camera position
  let cameraX = mouseX; // Replace with your camera's x-coordinate
  let cameraY = mouseY; // Replace with your camera's y-coordinate
  let cameraZ = zoom; // Assuming 'zoom' controls the camera's distance

  // Display and update each object
  for (let obj of objects) {
    push();
    translate(obj.x, obj.y, obj.z);
    
    // Calculate the distance between camera and object
    let d = dist(cameraX, cameraY, cameraZ, obj.x, obj.y, obj.z);

    // Adjust sound volume based on distance
    let volume = map(d, 0, 300, 1, 0); // Adjust the range as needed

    // Set the sound volume
    obj.sound.setVolume(volume);

    // Apply rotation to the image
    rotateY(frameCount * obj.rotationSpeed);
    texture(obj.img);
    plane(obj.scale * 100, obj.scale * 100);
    pop();
  }
}

function createImageObject(imageSource, x, y, z, rotationSpeed,sound,scale = 1) {
  return {
    img: loadImage(imageSource),
    x,
    y,
    z,
    rotationSpeed,
    sound,
    scale,
     // Associate the sound with the image
  };
}

function mouseWheel(event) {
  // Adjust zoom based on mouse wheel
  zoom += event.delta;
  return false; // Prevent the page from scrolling
}

