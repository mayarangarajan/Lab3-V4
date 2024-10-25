//Variables
var gameTime;  //Duration
var totalTargets = 0; //# of targets
var targetsClicked = 0; // # of targets clicked
var missedTargets = 0; // # of targets missed
var targetInterval = null; // Creates targets
var gameTimer = null;  // Game timer
var remainingTime = gameTime; //Remaining time

// Start button, event listener
var startButton = document.getElementById("startGame");
startButton.addEventListener('click', startGame);

// Scoreboard elements
var totalTargetsDisplay = document.getElementById("totalTargets");
var targetsClickedDisplay = document.getElementById("targetsClicked");
var missedTargetsDisplay = document.getElementById("missedTargets");
var finalScoreDisplay = document.getElementById("finalScore");
var scoreboard = document.getElementById("scoreboard");


//Start game function
function startGame() {
    
    var gameTimeInput = document.getElementById("gameTimeInput").value; // Get input value of game time
    gameTime = parseInt(gameTimeInput); // Convert input to a number

    // in case they say game time is less than 0,
    if (isNaN(gameTime) || gameTime <= 0) {
        alert("Please enter a valid game time.");
        return;
    }
    
    
    resetGame();
    targetInterval = setInterval(spawnTarget, 1000);
    gameTimer = setInterval(updateTimer, 1000);
    setTimeout(endGame, gameTime * 1000);
}

//Creating targets
function spawnTarget() {
    totalTargets++;
    var target = document.createElement("div");
    target.classList.add("target");


    //Randomizing target locations
    var maxX = gameArea.offsetWidth - 75; // x in between the area with margin of 75
    var maxY = gameArea.offsetHeight - 75; // y in between the area with margin of 75
    var randomX = randomValue(75, maxX); // randomizes between 75 and x (game area - 75)
    var randomY = randomValue(75, maxY); //randomizes between 75 and y (game area - 75)


    //Target styling
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
    target.style.width = "50px"; // target width 
    target.style.height = "50px"; // target height 
    target.style.backgroundColor = "red"; // target color
    target.style.position = "absolute"; // Ensure targets are positioned absolutely
    target.style.transform = "scale(1)" // scale original
    target.style.transition = "transform 0.5s"; //transition
    target.style.transition = "transform 2s" // transform
    document.body.appendChild(target);

    //Grow target
    setTimeout(() => {
        target.style.transform = "scale(3)";  // 3 times its size
    }, 100);  // Grows 1 seconds

    // Shrink target after growing
    setTimeout(() => {
        target.style.transform = "scale(0.5)";  //  0.5 times its size
    }, 200);  // Shrinks 2 seconds


    // Removing a target once clicked and adding it to makes
    target.addEventListener('click', () => {
        targetsClicked++;
        document.body.removeChild(target);
    });

    // Removing a target once not clicked and adding it to misses
    setTimeout(() => {
        if (document.body.contains(target)) {
            missedTargets++;
            document.body.removeChild(target);
        }
    }, 1100); // Vanishes after 11 seconds
}

//Resetting Game
function resetGame() {
    totalTargets = 0;
    targetsClicked = 0;
    missedTargets = 0;
    clearTargets();

    //Resetting Time
    remainingTime = gameTime;
    document.getElementById("timerDisplay").textContent = `Time left: ${remainingTime}s`;
}


//Ending Games
function endGame() {
    clearTargets();
    displayScore();
    clearInterval(gameTimer);
    clearInterval(targetInterval);
}

//Clearing targets
function clearTargets() {
    var targets = document.querySelectorAll('.target');
    targets.forEach(target => target.remove());
}

//Updating Timer Throughout Game
function updateTimer() {
    remainingTime--;
    document.getElementById("timerDisplay").textContent = `Time left: ${remainingTime}s`;

    //Ending Timer
    if (remainingTime <= 0) {
        clearInterval(gameTimer);
    }
}

//Score display
function displayScore() {

    totalTargetsDisplay.textContent = `Total targets: ${totalTargets}`;
    targetsClickedDisplay.textContent = `Targets clicked: ${targetsClicked}`;
    missedTargetsDisplay.textContent = `Missed targets: ${missedTargets}`;
    finalScoreDisplay.textContent = `Final score (out of 100): ${calculateScore()}`;
    scoreboard.classList.remove("hidden");
}

//Score Calculation
function calculateScore() {
    return Math.floor((100 * targetsClicked / totalTargets));
}

// Random Value Initialization
function randomValue(min, max) {
    return Math.random() * (max - min) + min;
}