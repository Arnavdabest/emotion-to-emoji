p1 = "";
p2 = "";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri) { document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'; }); 
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded);

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotresult)
}

function gotresult(error, result){
if(error){
    console.error("error")
}
else{
    console.log(result)
    document.getElementById("result_emotion_name").innerHTML = result[0].label;
    document.getElementById("result_emotion_name2").innerHTML = result[1].label;
    p1 = result[0].label; 
    p2 = result[1].label;
    speak();
    if(p1 == "happy"){
        document.getElementById("update_emoji").innerHTML = "&#128522;";
    }
    if(p1 == "sad"){
        document.getElementById("update_emoji").innerHTML = "&#128532;";
    }
    if(p1 == "angry"){
        document.getElementById("update_emoji").innerHTML = "&#128548;";
    }

    if(p2 == "happy"){
        document.getElementById("update_emoji2").innerHTML = "&#128522;";
    }
    if(p2 == "sad"){
        document.getElementById("update_emoji2").innerHTML = "&#128532;";
    }
    if(p2 == "angry"){
        document.getElementById("update_emoji2").innerHTML = "&#128548;";
    }
}
}
function speak(){ 
    var synth = window.speechSynthesis;
     speak_data_1 = "The first prediction is " + p1;
 speak_data_2 = "And the second prediction is " + p2; 
 var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2); 
 synth.speak(utterThis); 
}

function modelLoaded(){};