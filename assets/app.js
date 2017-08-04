var config = {
  apiKey: "AIzaSyD_aelC07Jaqkb5JZBtlRheig85gfJKt7E",
  authDomain: "in-class-demo-1de2f.firebaseapp.com",
  databaseURL: "https://in-class-demo-1de2f.firebaseio.com",
  projectId: "in-class-demo-1de2f",
  storageBucket: "in-class-demo-1de2f.appspot.com",
  messagingSenderId: "963233840627"
};
firebase.initializeApp(config);

var database = firebase.database();
var trainName;
var destination;
var startTime;
var frequency;
var nextTrain;


function timeToTrain()
{
	var firstTimeConverted = moment(startTime, "hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var trainArrive = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    nextTrain = moment(trainArrive).format("hh:mm");
    console.log("next" + nextTrain);
    return nextTrain;
}

$("#submit").on("click", function(event) 
{
	event.preventDefault();
	nextTrain = timeToTrain();
	console.log("do you work?");
	trainName = $("#train-name").val().trim();
	destination = $("#destination").val().trim();
	startTime = $("#start-time").val().trim();
	frequency = $("#frequency").val().trim();
	console.log(nextTrain);
	database.ref().push({
		trainName: trainName,
		destination: destination,
		startTime: startTime,
		frequency: frequency,
		nextTrain: nextTrain,
	});
});

database.ref().on("child_added", function(snapshot) 
{
	var newPost = snapshot.val();
	trainName = newPost.trainName;
	destination = newPost.destination;
	startTime = newPost.startTime;
	frequency = newPost.frequency;
	nextTrain = newPost.nextTrain;
	//console.log(prevChildKey);
	var tr = $("<tr>");
	var tdName = $("<td>").html(trainName);
	var tdDest = $("<td>").html(destination);
	var tdsTime = $("<td>").html(startTime);
	var tdFreq = $("<td>").html(frequency);
	var tdNext = $("<td>").html(nextTrain);
	tr.append(tdName, tdDest, tdsTime, tdFreq, tdNext);
	$(".table").append(tr);
});