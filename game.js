var gamePattern=[];
var buttonColours = ["red","blue","green","yellow"];
var userChosenColor;
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function(){
          if(started===false){
			console.log(level);
		    $("h1").text("Level "+level);
			started = true;
			nextSequence();
		  }
})

function nextSequence(){
	level++;
	$("h1").text("Level "+level);
	var randomNum = Math.round(Math.random()*3);
	var randomChosenColor = buttonColours[randomNum];
	gamePattern.push(randomChosenColor);
	audioPlayer(randomChosenColor);
	$("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(".btn").click(function(){
	    animateClick(this.id);
	    userChosenColor = this.id;
		audioPlayer(this.id);
		userClickedPattern.push(userChosenColor);
		checkAnswer(userClickedPattern.length-1);
});


function animateClick(clickedButton){
	$("#"+clickedButton).addClass("pressed");
	setTimeout(function(){$("#"+clickedButton).removeClass("pressed");},100);
}
function audioPlayer(colorClicked){
    var audioToBePlayed = "sounds/"+colorClicked+".mp3";
	var audio = new Audio(audioToBePlayed);
	audio.play();
}
function checkAnswer(currentLevel){
	console.log(gamePattern.length);
	console.log(userClickedPattern.length);
	if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){ 	 	
		console.log("sucess");
		if(gamePattern.length === userClickedPattern.length){
			userClickedPattern = [];
			setTimeout(function(){nextSequence();},1000);
		}
	}
	else{
	    audioPlayer("wrong");
		$("body").addClass("game-over");
		setTimeout(function(){$("body").removeClass("game-over");},200);
		$("h1").text("Game Over, Press Any Key to Restart");
		resetValues();
		
	}
}
function resetValues(){
	started = false;
	level = 0;
	gamePattern=[];
	userClickedPattern=[];
}
