function setup(){
    canvas = createCanvas(800,400);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
  synth = window.speechSynthesis;
}
function preload(){
  classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas(){
    background("white");
    document.getElementById("sketch").innerHTML = "Your Sketch : ";
    document.getElementById("confi").innerHTML = "Confidence : ";
    document.getElementById("text").innerHTML = "";
}


function draw(){
  strokeWeight(10);
  stroke(5);
  if(mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY);
  }
}
function classifyCanvas(){
  classifier.classify(canvas,gotResult); 
}

function gotResult(error,results){
  if(error){
    console.error(error);
  }
  else if(results){
    console.log(results);
    document.getElementById("sketch").innerHTML = 'label: ' + results[0].label;

    document.getElementById("confi").innerHTML = 'confidence: ' + Math.round(results[0].confidence * 100) + '%'

    utterThis = new SpeechSynthesisUtterance('Its ' + results[0].label  + " and the Confidence is:" + Math.floor(results[0].confidence * 100) + "Percent");
    synth.speak(utterThis);
    document.getElementById("text").innerHTML = "It's " + results[0].label;
  }
}




