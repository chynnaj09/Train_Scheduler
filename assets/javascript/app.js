// Initialize Firebase
var config = {
    apiKey: "AIzaSyC2_wv6JhouC5pWVhCg7X0YIzEsUbUqWYI",
    authDomain: "train-scheduler-468a4.firebaseapp.com",
    databaseURL: "https://train-scheduler-468a4.firebaseio.com",
    projectId: "train-scheduler-468a4",
    storageBucket: "",
    messagingSenderId: "703102436385"
};
firebase.initializeApp(config);
// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var trainTime = 0;
var frequency = "";

// Capture Button Click
$("#submitBtn").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#trainName").val().trim();
    destination = $("#destinationInput").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequencyInput").val().trim();

    // Code for handling the push
    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    });

    //Clears text box after user submits info
    $("#trainName").val("");
    $("#destinationInput").val("");
    $("#trainTime").val("");
    $("#frequencyInput").val("");

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;

    var timeConvert = moment(trainTime, "hh:mm").subtract(1, "years");

    var currentTime = moment();

    var difference = currentTime.diff(moment(timeConvert), "minutes");

    var remainder = difference % frequency;

    var minutesAway = frequency - remainder;

    var nextTrain = currentTime.add(minutesAway, "minutes");

    var nextArrival = moment(nextTrain).format("hh:mm");

    $("#tableEntry").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
