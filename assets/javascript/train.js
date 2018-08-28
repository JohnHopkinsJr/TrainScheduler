$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyAKqcoiTY63dGoxHWXMThr5PQVaXCb3sQk",
    authDomain: "train-60hop.firebaseapp.com",
    databaseURL: "https://train-60hop.firebaseio.com",
    projectId: "train-60hop",
    storageBucket: "train-60hop.appspot.com",
    messagingSenderId: "4275615876"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrain").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var freq = $("#interval").val().trim();

    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: freq
    });
  });

  database.ref().on("child_added", function (childSnapshot) {

    var newTrain = childSnapshot.val().trainName;
    var newLocation = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFreq = childSnapshot.val().frequency;


    var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    var tRemainder = diffTime % newFreq;
    var minutesTillTrain = newFreq - tRemainder;
  
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

    $("#all-display").append(
      ' <tr><td>' + newTrain +
      ' </td><td>' + newLocation +
      ' </td><td>' + newFreq +
      ' </td><td>' + catchTrain +
      ' </td><td>' + minutesTillTrain + ' </td></tr>');

    $("#trainName, #destination, #firstTrain, #interval").val("");
    return false;
  },

    function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

}); 

