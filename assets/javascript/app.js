$(document).ready(function(){

});

var questTimer;
var timerInteraval;
var timerCount = 0;
var questCount = 0;
var time = 0;
var timeRemaining;
var timerStatus = 0;
var wrongAnswer = 0;
var correctAnswer = 0;
var unAnswered = 0;
var bSingleGame = true;
var gameData = [
        {question:"While used often in Sherlock Holmes movies, this line doesn't appear in any Doyle-written Holmes book.", 
        	ans1:"The games afoot ", ans2:"Elementary, My dear Watson ", ans3:"When you have eliminated the impossible, whatever remains, however improbable, must be the truth", 
        	answer:"1", explanation:"Holmes does say 'Elementary' but never says 'My dear Watson'"},
		{question:"How many Sherlockian societies are in existence?", ans1:"Between 100 and 400 ", 
			ans2:"Between 400 and  800 ", ans3:"Over 800", answer:"2", explanation:"There are at least 900 known societies dedicated to all-things Homes."},
		{question:"What kind of doctor was Sherlock’s crimefighting cohort Dr. John Watson, originally?", 
			ans1:"Internist ", ans2:"Rheumatist ", ans3:"Army surgeon ", answer:"2", explanation:"Watson is retired from the Army."},
		{question:"The double-brimmed, houndstooth-patterned hat Sherlock famously wore (in the movies) is known as a what?", 
			ans1:"Deerstalker ", ans2:"Monmouth ", ans3:"Cavalier ", answer:"0", explanation:"The deerstalker cap was originally worn on-stage. He actually wore a Victorian cloth cap in Doyle's stories."},
		{question:"What was the name of the street toughs who serve as informants and errand boys for Holmes and Watson?", 
			ans1:"The Baker Street Irregulars", ans2:"The Scarlet Street Singulars", ans3:"The Criminal Kids", answer:"0", explanation: "The group appears numerous times to aid Holmes."},
		{question:"In the 1890 mystery “The Sign of the Four”, Sherlock employs what bit of evidence two years before a real-world police department would?", 
			ans1:"Blood spatter analysis ", ans2:"Fingerprints ", ans3:"Handwriting analysis", answer:"1", explanation: "Scotland Yard began analyzing fingerprints in 1901.  The first recorded use of fingerprints in a criminal investigation was 1893 in Argentina."},
		{question:"What British actor starred in 14 Sherlock Holmes films between 1939 and 1946?", 
			ans1:"Peter Finch", ans2:"Alec Guinness", ans3:"Basil Rathbone", answer:"2", explanation: "Basil Rathbone "},
		{question:"Who directed the recent action-comedy Sherlock Holmes films?", 
			ans1:"Guy Ritchie", ans2:"Quentin Tarintino", ans3:"Justing Lin", answer:"0", explanation: "These starred Robert Downey Jr."},
		{question:"What happens in the 1893 short story—although only temporarily?", 
			ans1:"Watson is committed to the London Sanitarium for the Criminally Insane ", ans2:"Sherlock and Watson become a vaudeville act ", 
			ans3:"Sherlock dies", answer:"2", explanation: "He was killed off at the end of The Memoirs of Sherlock.  He came back to life in The Return of Sherlock Holmes."},
		{question:"In the short story “His Last Bow”, Sherlock retires and takes up what hobby?", 
			ans1:"Beekeeping ", ans2:"Making jam ", ans3:"Making soap ", answer:"0", explanation: "On a small farm in Sussex Downs."},
			];


// TODO: Use jQuery to run "startGame" when we click the "start" button.
$('body').on('click', '#start', startGame);
$('body').on('click', '#startOne', startGameOne);
$('body').on('click', '#done', timedOut);
$('body').on('click', '#restart', restartGame);
$('body').on('click', "input[name=radioOptions]", nextQuestion);

function restartGame() {

	resetGame();
	if(bSingleGame){
		startGameOne();
	}
	else {
		startGame();
	}
}

function startGame() {


	bSingleGame = false;
	time = gameData.length * 15;	//15 seconds per question
	showQuestions();}

function startGameOne() {


	bSingleGame = true;
	time = 15;	//15 seconds per question
	questCount = 0;
	showQuestion();	
}

function resetGame(){
	$(".game").empty();

	//set/reset values
	timerCount = 0;

	wrongAnswer = 0;
	correctAnswer = 0;	
	unAnswered = 0;
}

/* function: showQuestions
	displays all trivia questions on the display at one time;
	starts game timer and sets update interval
*/
function showQuestions() {


		$(".game").addClass("question");
	
		for(i=0;i<gameData.length;i++)
		{
			$(".question").append((i+1) + ". " + gameData[i].question + "<br>");	

			var newDiv = $("<form>");
			newDiv.addClass("option");

			for(var j=0;j<3;j++)
			{
				var options = $("<input>");
				options.attr('type', 'radio');
				options.attr('name', 'radioOptions');
				options.val(j);
				if(j === 0)
				{
					textString = gameData[i].ans1;
				}
				else if(j === 1)
				{
					textString = gameData[i].ans2;
				}
				else
				{
					textString = gameData[i].ans3;
				}
				
				newDiv.append(options);
				newDiv.append(textString);
				newDiv.append("<br>");

			}
			$(".question").append(newDiv);
			$(".question").append("<br>");	


		}
		var newBtn = $("<button>");
		newBtn.attr('id', 'done');
		newBtn.text("Done");
		$(".question").append(newBtn);
		questTimer = setTimeout(timedOut, time * 1000);	
		timerInterval = setInterval(updateTimer, 1000);	
		questCount = gameData.length;

}

/* function: updateTimer
	updates the timer on the display, changing the color to yellow or red when appropriate
*/
function updateTimer(){
	timerCount++;

	timeRemaining = timeConverter((time)-timerCount)

	$(".timer").text(timeRemaining);
	$(".timerYellow").text(timeRemaining);
	$(".timerRed").text(timeRemaining);

	if(((time)-timerCount) < 60 && timerStatus === 0)
	{
		$(".timer").addClass("timerYellow").removeClass("timer");
		timerStatus = 1;
	}
	else if(((time)-timerCount) < 30 && timerStatus === 1)
	{
		$(".timerYellow").addClass("timerRed").removeClass("timerYellow");
		timerStatus = 2;
	}

}

/* timeConverter(t)
	borrowed from stopwatch code in class
*/
function  timeConverter(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }

/* displays one question at a time on the display
*/
function showQuestion(index) {
	var textString;

	$(".game").empty();
	$(".game").addClass("question");
	$(".question").append((questCount+1) + ". " + gameData[questCount].question + "<br>");	

	var newDiv = $("<form>");
	newDiv.addClass("option");
	for(var j=0;j<3;j++)
	{
		var options = $("<input>");
		options.attr('type', 'radio');
		options.attr('name', 'radioOptions');
		options.val(j);
		if(j === 0)
		{
			textString = gameData[questCount].ans1;
		}
		else if(j === 1)
		{
			textString = gameData[questCount].ans2;
		}
		else
		{
			textString = gameData[questCount].ans3;
		}
		//options.append(textString);
		newDiv.append(options);
		newDiv.append(textString);
		newDiv.append("<br>");

	}
	$(".question").append(newDiv);
	$(".question").append("<br>");		
	timerInterval = setInterval(updateTimer, 1000);
	questTimer = setTimeout(timedOut, time * 1000);	
	questCount++;	
	timerCount = 0;
}

/* nextQuestion
	in single question mode, displays the next question and resets the timers and interval;
	does nothing if all questions are displayed
*/
function nextQuestion() {

	if(bSingleGame) {
		var options = $("input[type='radio']:checked");
		clearTimeout(questTimer);
		clearInterval(timerInterval);
		$(".game").empty();

			//Update statistics here
			if(options[0].value === gameData[questCount-1].answer)
			{
				$(".game").addClass("question");
				$(".question").append("Correct" + "<br>");	
				correctAnswer++;
			}
			else
			{
				$(".game").addClass("question");
				$(".question").append("Incorrect" + "<br>");
				wrongAnswer++;
			}
			$(".question").append(gameData[questCount-1].explanation);


			if(questCount < gameData.length)
			{
				questTimer = setTimeout(showQuestion, 5000);
			}
			else
				questTimer = setTimeout(timedOut, 5000);
	}
}

/* timedOut
	called when timer expires; clears and shows next question if single question mode
		or ends the game if all the questions are displayed at once
*/
function timedOut(){
//	val = $('input[name="radioOptions"]:checked', '.option').val();
	if(questCount < gameData.length)
	{
		clearTimeout(questTimer);
		clearInterval(timerInterval);
		showQuestion(questCount);
	}
	else
	{
		updateTimer();
		endGame();
	}
}

/* endGame
	displays correct and wrong answer count on the display and ends the timers;
		displays a restart button that will reset and begin another game
	*/
function endGame()
{
	clearTimeout(questTimer);
	clearInterval(timerInterval);


	if(!bSingleGame)
	{
		var val = [];
		var options = $("input[type='radio']:checked");
		for(i=0;i<options.length;i++)
		{
			if(options[i].value === gameData[i].answer)
				correctAnswer++;
			else
				wrongAnswer++;
		}		
	}

	unAnswered = gameData.length - correctAnswer - wrongAnswer;

	$(".game").empty();
	$(".game").append("<p> Correct Answers: " + correctAnswer + "</p>");
	$(".game").append("<p> Incorrect Answers: " + wrongAnswer + "</p>");
	$(".game").append("<p> Unanswered Questions: " + unAnswered + "</p>");
	
	var newBtn = $("<button>");
	newBtn.attr('id', 'restart');
	newBtn.text("Restart");
	$(".game").append(newBtn);	
}