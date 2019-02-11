
//set tracking variables
var isPlaying = false;
var wins = 0;
var guessesRemaining;
var currentWord;
var wordStatus = [];
var showBadGuess = [];

// Creates array of possible words
var wordSet = ["duke","boss","sport","king","nutmeg","atari","rendevouz"]; 


function startGame(letterGuess){
    // reset wordStatus
    wordStatus = [];
    showBadGuess = [];
    guessesRemaining = 10;
    document.getElementById("notify").innerHTML = "Currently playing";
    document.getElementById("turnsLeft").innerHTML = guessesRemaining; 

    //check for a match
    var match1 = false;   

    //set and check currentWord
    currentWord = wordSet[Math.floor(Math.random() * 8)]; 
       
    isPlaying = true;
    //console.log(isPlaying);

    //create an empty array of proper length
    //console.log(currentWord.length);
    for(var i=0; i<currentWord.length; i++){
        wordStatus[i] = "_";        
    }  

    // if first guess hits 
    for(var j=0; j<currentWord.length; j++){
        if(letterGuess === currentWord[j]){
            match1 = true;
            wordStatus[j] = letterGuess;
            console.log("from startGame" + wordStatus.join(""));
        }     
    }

    // change remaining guesses if no match
    if(!match1){
        guessesRemaining--; 
       document.getElementById("turnsLeft").innerHTML = guessesRemaining;  

        showBadGuess.push(letterGuess);
        document.getElementById("alreadyGuessed").innerHTML = showBadGuess.join("");           
    }

    // show result
    document.getElementById("showGuess").innerHTML = wordStatus.join("");
}

function playGame(letterGuess){

    // console.log(guessesRemaining);
    // check variable is inherited
    console.log("from playGame word current is " + currentWord.toString());
    console.log("from playGame word status is " + wordStatus.toString());


    // check for match
    var match2 = false;
    for(var i=0; i<currentWord.length; i++){
        //console.log("check current letter guess" + letterGuess);
        if(letterGuess === currentWord[i]){
            match2 = true;
            wordStatus[i] = letterGuess;
            console.log(wordStatus.toString());            
        }               
    }
  
    // check for win
    if(wordStatus.join("") === currentWord){
        wins++;        
        console.log("You Win");
        document.getElementById("notify").innerHTML = "You win! Press any letter to start again";
        document.getElementById("showWins").innerHTML = wins;
        isPlaying = false;

    // no match and check for loss
    } else if(!match2){
        guessesRemaining--;

        // show bad guesses and turns remaining
        document.getElementById("turnsLeft").innerHTML = guessesRemaining; 
        showBadGuess.push(letterGuess);        
        document.getElementById("alreadyGuessed").innerHTML = showBadGuess.join("");
        console.log(guessesRemaining);        

        if(guessesRemaining === 0){
        console.log("You lose!");
        document.getElementById("notify").innerHTML = "You lose! Press any letter to start again";
        isPlaying = false;
        }
    } 
    
    // show result
    document.getElementById("showGuess").innerHTML = wordStatus.join("");
    

}

// captures keyboard input
document.onkeyup = function(event) {

    // Captures the key press, converts it to lowercase, and saves it to a variable.
    var letterGuess = event.key.toLowerCase();
    console.log(letterGuess);  

    // check for valide character
    if(letterGuess.charCodeAt(0) > 96 && letterGuess.charCodeAt() < 123){
    
        // call functions to play game
        if(!isPlaying){
            startGame(letterGuess);
        } else if(isPlaying){
            playGame(letterGuess);    
        }
    }
}
