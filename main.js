prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id = 'captured_image' src = '" + data_uri + "'>";
    });
}

console.log("ml5 version is:" + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/yaLmJD58-/model.json",modelLoaded);


function modelLoaded(){
    console.log("model loaded successfuly");
}

function speak(){
    synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " +  prediction_1;
    speak_data2 = "And the second prediction is" + prediction_2;
    utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, result){
     if (error){
         console.error(error);
     }

     else{
         console.log(result);

         document.getElementById("result_emotion_name1").innerHTML = result[0].label;
         document.getElementById("result_emotion_name2").innerHTML = result[1].label;

         prediction_1 = result[0].label;
         prediction_2 = result[1].label;

        speak();

        if (result[0].label == "Happy"){
            document.getElementById("result_emoji1").innerHTML = "&#128512";
        }

        if (result[0].label == "Sad"){
            document.getElementById("result_emoji1").innerHTML = "&#128532";
        }

        if (result[0].label == "Angry"){
            document.getElementById("result_emoji1").innerHTML = "&#128545";
        }

        if (result[0].label == "Shocked"){
            document.getElementById("result_emoji1").innerHTML = "&#128562";
        }

        if (result[1].label == "Happy"){
            document.getElementById("result_emoji2").innerHTML = "&#128512";
        }

        if (result[1].label == "Sad"){
            document.getElementById("result_emoji2").innerHTML = "&#128532";
        }

        if (result[1].label == "Angry"){
            document.getElementById("result_emoji2").innerHTML = "&#128545";
        }

        if (result[1].label == "Shocked"){
            document.getElementById("result_emoji2").innerHTML = "&#128562";
        }
     }
}
