Webcam.set({
    width:350,
    height:250,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera").value;

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"></img>';
    });
}

console.log("ml5 version : ",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/4FRRHgw76/model.json",modelLoaded);

function modelLoaded(){
    console.log("model loaded !");
}
function check(){
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error , result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_object_name")=result[0].label;
        document.getElementById("result_object_accuracy")=result[0].confidence.toFixed(3);
    }
}