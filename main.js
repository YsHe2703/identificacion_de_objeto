detector = "";
img = "";
objetos = [];
estatus = "";

function preload(){
    img = loadImage('dog_cat.jpg');
}
 function setup(){
    canvas = createCanvas(600, 450 );
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 450);
    detector = ml5.objectDetector('cocossd',modelloded);
    document.getElementById("status").innerHTML = "Estado: Detectando objetos";
    video.hide();
 }

 function modelloded(){
    console.log("Este modelo se ha activado");
    estatus = true;
 }

 function gotResoult(error, resoults){
    if(error){
        console.log(error);
    }
    console.log(resoults);
    objetos = resoults;
 }

 function draw(){
    image(video,0,0,600,450);
    if(estatus != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        detector.detect(video, gotResoult);
        for (var i = 0; i<objetos.length;i++){

            document.getElementById("status").innerHTML = "Estado: objetos detectados";
            fill(r, g, b);
            porcentaje = floor(objetos[i].confidence * 100);
            text(objetos[i].label + porcentaje + "%",objetos[i].x+15, objetos[i].y+15);
            noFill();
            stroke(r, g, b);
            rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height);          
        }
    }
 }