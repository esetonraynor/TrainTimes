// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD67RHJ5IwN8wxhEhKVZyuvGm2GeDTZZ3Y",
    authDomain: "traintimes-d4014.firebaseapp.com",
    databaseURL: "https://traintimes-d4014.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "99766525984"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName;
  var destination;
  var firstTime;
  var frequency;
  var nextArrival;
  var minutesAway;

  $("#button").on("click", function() {
  	event.preventDefault();

  	trainName = $("#name").val().trim();
  	destination = $("#destination").val().trim();
  	firstTime = $("#firstTime").val().trim();
  	frequency = $("#frequency").val().trim();

  	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  		console.log(firstTimeConverted);

  	var currentTime = moment();
  		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  	var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  		console.log("DIFFERENCE IN TIME: " + timeDiff);

  	var remainder = timeDiff % frequency;
  		console.log("REMAINDER: " + remainder);

  	minutesAway = frequency - remainder;
  		console.log("MINUTES AWAY: " + minutesAway);

  	nextArrival = currentTime.add(minutesAway, "minutes");
    nextArrival = moment(nextArrival).format("hh:mm");
    console.log(nextArrival);

  	database.ref().push({
  		trainName: trainName,
  		destination: destination,
  		frequency: frequency,
  		firstTime: firstTime,
  		nextArrival: nextArrival,
  		minutesAway: minutesAway
  	});

  	$("#name").html("");
  	$("#destination").html("");
  	$("#firstTime").html("");
  	$("#frequency").html("");

  });

database.ref().on("child_added", function(childSnapshot) {

	var row = $("<tr>");

	var column1 = $("<td>");
	 column1.append(childSnapshot.val().trainName);
	 row.append(column1);

	var column2 = $("<td>");
	 column2.append(childSnapshot.val().destination);
	 row.append(column2);

	var column3 = $("<td>");
	 column3.append(childSnapshot.val().frequency);
	 row.append(column3);

	var column4 = $("<td>");
    column4.append(childSnapshot.val().nextArrival);
	 row.append(column4);

	var column5 = $("<td>");
	 column5.append(childSnapshot.val().minutesAway);
	 row.append(column5);

	$("tbody").append(row);


}, function(errorObject) {
	console.log("Errors handled: " + errorObject.code);
});
