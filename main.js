status = "";
objects = [];
loadingIcon = document.getElementById("loader");
siren = "";


function setup(){
    canvas = createCanvas(600, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(600, 380);

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Person" ;
}
function preload(){
    siren.loadSound("Siren.mp3");
}

function draw(){
    image(video, 0, 0, 600, 380);

    objectDetector.detect(video, gotResult);


    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Person Detected";

            fill(r, g, b);
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + "  |  " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);         
            if(objects[i].label == "person"){
                document.getElementById("number_of_objects").innerHTML = "Person Found!!";
                loadingIcon.style.display = "none";
                siren.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "Baby Found!!";
                loadingIcon.style.display = "none";
                siren.play();
            }
        }
    }

} 

function modelLoaded(){
    console.log("MODEL LOADED!!");
    status = true;

}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
     
    }
}

