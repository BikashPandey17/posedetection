let video;
let poseNet;
let poses = [];
let calc_head_motion = false;
let calc_hand_motion = false;

function setup() {
  const canvas = createCanvas(640, 480);
  background(51);
  canvas.parent('videoContainer');

  // Video capture
  video = createCapture({
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  });
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
    console.log(poses)
  });
  
  // Hide the video element, and just show the canvas
  video.hide();
}
function modelReady(){
    select('#status').html('model Loaded')
  }
function calculate_head(){
  if (calc_head_motion == true){
    calc_head_motion = false;
  }
  else if (calc_head_motion == false){
    calc_head_motion = true;
  }
  
}
function calculate_hand(){
  if (calc_hand_motion == true){
    calc_hand_motion = false;
  }
  else if (calc_hand_motion == false){
    calc_hand_motion = true;
  }
  
}
function draw() {
  image(video, 0, 0, width, height);
  if (calc_head_motion == true){
    draw_shoulder();
  }
  if (calc_hand_motion == true){
    draw_right_hand();
    draw_left_hand();
  }
  // We can call both functions to draw all keypoints and the skeletons
  //drawKeypoints();
  //drawSkeleton();
}
function draw_right_hand(){
  //rightShoulder
  //rightWrist
  //rightElbow
  //leftShoulder
  //leftWrist
  //leftElbow
  let point1 = false;
  let point2 = false;
  let point3 = false;
  for (let i = 0; i < poses.length; i++){
    let pose = poses[i].pose;
    if (pose.score > 0.4){
      //draw rightWrist
      if (pose.rightWrist.confidence > 0.3){
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 10, 10);
        point1 = true
    }
      //draw rigth shoulder
      if (pose.rightShoulder.confidence > 0.3){
        ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 10, 10);
        point2 = true
      }
      //draw rightElbow
      if (pose.rightElbow.confidence > 0.3){
        ellipse(pose.rightElbow.x, pose.rightElbow.y, 10, 10);
        point3 = true
      }
      if(point1 == true && point3 == true){
        line(pose.rightWrist.x, pose.rightWrist.y, pose.rightElbow.x, pose.rightElbow.y);
      }
      if(point3 == true && point2 == true){
        line(pose.rightShoulder.x, pose.rightShoulder.y, pose.rightElbow.x, pose.rightElbow.y);
      }
      if(point1 == true && point2 == true && point3 == true){
        let v0 = createVector(pose.rightElbow.x, pose.rightElbow.y);
        let v1 = createVector(pose.rightWrist.x-pose.rightElbow.x,pose.rightWrist.y-pose.rightElbow.y);
        drawArrow(v0, v1, 'red');
        let v2 = createVector(pose.rightShoulder.x-pose.rightElbow.x, pose.rightShoulder.y-pose.rightElbow.y);
        drawArrow(v0, v2, 'blue');
        let angleBetween = v1.angleBetween(v2);
        noStroke();
        //textFont(inconsolata);
        textSize(20);
        text(
            degrees(angleBetween).toFixed(2) +
            ' degrees',
            pose.rightElbow.x + 10,
            pose.rightElbow.y + 20,
        );
        fill(0, 102, 153);
      }
    }
  }
}
function draw_left_hand(){
  //rightShoulder
  //rightWrist
  //rightElbow
  //leftShoulder
  //leftWrist
  //leftElbow
  let point1 = false;
  let point2 = false;
  let point3 = false;
  for (let i = 0; i < poses.length; i++){
    let pose = poses[i].pose;
    if (pose.score > 0.4){
      //draw rightWrist
      if (pose.leftWrist.confidence > 0.3){
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 10, 10);
        point1 = true
    }
      //draw rigth shoulder
      if (pose.leftShoulder.confidence > 0.3){
        ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 10, 10);
        point2 = true
      }
      //draw rightElbow
      if (pose.leftElbow.confidence > 0.3){
        ellipse(pose.leftElbow.x, pose.leftElbow.y, 10, 10);
        point3 = true
      }
      if(point1 == true && point3 == true){
        line(pose.leftWrist.x, pose.leftWrist.y, pose.leftElbow.x, pose.leftElbow.y);
      }
      if(point3 == true && point2 == true){
        line(pose.leftShoulder.x, pose.leftShoulder.y, pose.leftElbow.x, pose.leftElbow.y);
      }
      if(point1 == true && point2 == true && point3 == true){
        let v0 = createVector(pose.leftElbow.x, pose.leftElbow.y);
        let v1 = createVector(pose.leftWrist.x-pose.leftElbow.x,pose.leftWrist.y-pose.leftElbow.y);
        drawArrow(v0, v1, 'red');
        let v2 = createVector(pose.leftShoulder.x-pose.leftElbow.x, pose.leftShoulder.y-pose.leftElbow.y);
        drawArrow(v0, v2, 'blue');
        let angleBetween = v1.angleBetween(v2);
        noStroke();
        //textFont(inconsolata);
        textSize(20);
        text(
            degrees(angleBetween).toFixed(2) +
            ' degrees',
            pose.leftElbow.x + 10,
            pose.leftElbow.y + 20,
        );
        fill(0, 102, 153);
      }
    }
  }
}
function draw_shoulder(){
    let point1 = false;
    let point2 = false;
    let point3 = false;
    facex = 0;
    facey = 0;
    numberOfFacePoints = 0;
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++){
        let pose = poses[i].pose;
        if (pose.score > 0.4){
        //draw left shoulder
        if (pose.leftShoulder.confidence > 0.5){
            ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 10, 10);
            point1 = true
        }
        //draw rigth shoulder
        if (pose.rightShoulder.confidence > 0.5){
            ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 10, 10);
            point2 = true
        }
        if (pose.leftEye.confidence > 0.5){
            ellipse(pose.leftEye.x, pose.leftEye.y, 10, 10);
            facex = facex + pose.leftEye.x;
            facey = facey + pose.leftEye.y;
            numberOfFacePoints++;
        }
        if (pose.rightEye.confidence > 0.5){
            ellipse(pose.rightEye.x, pose.rightEye.y, 10, 10);
            facex = facex + pose.rightEye.x;
            facey = facey + pose.rightEye.y;
            numberOfFacePoints++;
        }
        if (pose.leftEar.confidence > 0.5){
            ellipse(pose.leftEar.x, pose.leftEar.y, 10, 10);
            facex = facex + pose.leftEar.x;
            facey = facey + pose.leftEar.y;
            numberOfFacePoints++;
        }
        if (pose.rightEar.confidence > 0.5){
            ellipse(pose.rightEar.x, pose.rightEar.y, 10, 10);
            facex = facex + pose.rightEar.x;
            facey = facey + pose.rightEar.y;
            numberOfFacePoints++;
        }
        if (pose.nose.confidence > 0.5){
            ellipse(pose.nose.x, pose.nose.y, 10, 10);
            point3 = true;
            facex = facex + pose.nose.x;
            facey = facey + pose.nose.y;
            numberOfFacePoints++;
        }
        if(point1 == true && point2 == true){
            line(pose.leftShoulder.x, pose.leftShoulder.y, pose.rightShoulder.x, pose.rightShoulder.y);
        }
        if(point3 == true){
            line((pose.leftShoulder.x+pose.rightShoulder.x)/2, (pose.leftShoulder.y+pose.rightShoulder.y)/2, pose.nose.x, pose.nose.y);
        }
        if(point1 == true && point2 == true && point3 == true){
            facex = facex/numberOfFacePoints;
            facey = facey/numberOfFacePoints;
            let v0 = createVector((pose.leftShoulder.x+pose.rightShoulder.x)/2,(pose.leftShoulder.y+pose.rightShoulder.y)/2);
            let v1 = createVector(facex-(pose.leftShoulder.x+pose.rightShoulder.x)/2,facey-(pose.leftShoulder.y+pose.rightShoulder.y)/2);
            drawArrow(v0, v1, 'red');
            let v2 = createVector(pose.leftShoulder.x-(pose.leftShoulder.x+pose.rightShoulder.x)/2, pose.leftShoulder.y-(pose.leftShoulder.y+pose.rightShoulder.y)/2);
            drawArrow(v0, v2, 'blue');
            let angleBetween = v1.angleBetween(v2);
            noStroke();
            //textFont(inconsolata);
            textSize(20);
            text(
                degrees(angleBetween).toFixed(2) +
                ' degrees',
                (pose.leftShoulder.x+pose.rightShoulder.x)/2 + 10,
                (pose.leftShoulder.y+pose.rightShoulder.y)/2 + 20,
            );
            fill(0, 102, 153);
        }
        
    }
}
}
// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }
/*
// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
*/