status="";
objects=[];

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
}
function draw(){
    image(video,0,0,380,380);

    if(status != ""){
        for(i=0; i<objects.length; i++){
            percent= floor(objects[i].confidence *100);
            text(objects[i].label +"" +percent + "%", objects[i].x + 15, objects[i].y +15);
            fill("#f0523a");
            stroke("#f0523a");
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label= object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status_found").innerHTML=object_name+"found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+"found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status_found").innerHTML=object_name +"object mentioned was not found :(";
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
        objects=results;
    }
}