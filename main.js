status = "";
input = "";
objects = "";
function preload(){

}
function setup(){
canvas = createCanvas(480, 380);
canvas.center();
video = createCapture(VIDEO);
video.size(480, 380);
video.hide();
}
function start(){
    objectdetector = objectDetector('cocossd', modelLoaded);
    document.getElementsByClassName("status").innerHTML = "Status = Detecting Object";
    input = document.getElementById("name").value;
    console.log(input);
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectdetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status-id").innerHTML = "Status = Objects Detected";
            fill("#33cc33")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#33cc33");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == input){
                video.stop();
                objectdetector.detect(gotResult);
                document.getElementById("found-id").innerHTML = input + " found";
                var synth = window.speechSynthesis;
          speak_data = input + " found";
          var utterThis = new SpeechSynthesisUtterance(speak_data);
          synth.speak(utterThis);
          speak_data = " ";
            }
        }
    }
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}