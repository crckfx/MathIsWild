function m3e5() {
    var headsOrTails = ["heads", "tails"];

    var player1_score = 0;
    var player2_score = 0;
    var player1_matches = 0;
    var player2_matches = 0;
    var total_heads = 0;
    var total_tails = 0;
    var total_games = 0;
    
    var consecutiveFlips = 0;
    var previousFlip = "";
    
    var stopgame = false;
    
    for(j=0; j<5000; j++) {
        player1_score = 0;
        player2_score = 0;
    
        for(i=0; i<10; i++) {
            if (stopgame == false) {
                total_games++;
                var random = Math.floor(Math.random() * 2);
                var flipResult = headsOrTails[random];
                console.log(flipResult);
    
                if (flipResult == "heads") {
                    player1_score++;
                    total_heads++;
                    currentFlip = "heads";
                }
                else if (flipResult == "tails") {
                    player2_score++;
                    total_tails++;
                    currentFlip = "tails";
                }
    
                // COMPARE PREVIOUS TO CURRENT
                if (previousFlip == currentFlip) {
                    consecutiveFlips++
                }
                else if (previousFlip != currentFlip) {
                    consecutiveFlips = 0;
                }
    
                if(consecutiveFlips == 5) {
                    stopgame = true;
                    console.log(`It's taken ${total_games} games to get 5 x consecutive flips of ${currentFlip}`);
                    break
                }
    
                previousFlip = currentFlip;
    
    
                if (player1_score == 5) {
                    player1_matches++;
                    console.log( `Player1: ${player1_score}  Player2: ${player2_score}`   );
                    console.log( `Player1 is the winner!`   );
                    break
                }
                else if (player2_score == 5) {
                    player2_matches++;
                    console.log( `Player1: ${player1_score}  Player2: ${player2_score}`   );
                    console.log( `Player2 is the winner!`   );
                    break
                }
                console.log( `Player1: ${player1_score}  Player2: ${player2_score}`   );
            }
        }
    
    }
    
    
    console.log("Matches Won:");
    console.log(`Player1: ${player1_matches}  Player2: ${player2_matches}`);
    
    console.log(`Total Games: ${total_games}`);
    console.log(`Total Heads: ${total_heads}`);
    console.log(`Total Tails: ${total_tails}`);
    
    var percentage_tails = Math.round( (total_tails / total_games) * 100) + "%";
    var percentage_heads = Math.round( (total_heads / total_games) * 100) + "%";
    
    console.log(`Tails percentage = ${percentage_tails}` );
    console.log(`Heads percentage = ${percentage_heads}` );
}
// m3e5();

    let cpuOutcome = '';
    let playerChoice = '';
    let cpuWins = 0;
    let playerWins = 0;
    let resultDraw = 0;
    
    function scissorsPaperRock(playerChoice) {
        const game = ['Scissors', 'Paper', 'Rock'];
        
        // let selectOption = document.querySelectorAll(".drawColumn");
        let playerPoints = document.querySelector(".playerPoints");
        let cpuPoints = document.querySelector(".cpuPoints");
        let playerSelection = document.querySelector(".playerSelection");
        let cpuSelection = document.querySelector(".cpuSelection");
        let drawPoints = document.querySelector(".drawPoints");
        // playerChoice = selectOption.value;
        

            let random = Math.floor(Math.random() * 3);
            cpuOutcome = game[random]
            console.log(cpuOutcome);

            // Cpu Has Randomized Scissors
            if(playerChoice === 'Scissors' && cpuOutcome === 'Scissors') {
                console.log('Tie');
                resultDraw++
            } else if(playerChoice === 'Paper' && cpuOutcome === 'Scissors') {
                console.log('Player Loses');
                cpuWins++
            } else if(playerChoice === 'Rock' && cpuOutcome === 'Scissors') {
                console.log('Player Wins');
                playerWins++
                // Cpu Has Randomized Paper
            } else if(playerChoice === 'Scissors' && cpuOutcome === 'Paper') {
                console.log('Win');
                playerWins++
            } else if(playerChoice === 'Paper' && cpuOutcome === 'Paper') {
                console.log('Tie');
                resultDraw++
            } else if(playerChoice === 'Rock' && cpuOutcome === 'Paper') {
                console.log('Loss');
                cpuWins++
            }
            // Cpu Has Randomized Rock
            else if(playerChoice === 'Scissors' && cpuOutcome === 'Rock') {
                console.log('Loss');
                cpuWins++
            } else if(playerChoice === 'Paper' && cpuOutcome === 'Rock') {
                console.log('Win');
                playerWins++
            } else if(playerChoice === 'Rock' && cpuOutcome === 'Rock') {
                console.log('Tie');
                resultDraw++
            }  else {
                console.log(null);
            }

            let playerCounter = playerWins;
            let cpuCounter = cpuWins;
            let drawCounter = resultDraw;
            let cpuResult = cpuOutcome;
            let playerResult = playerChoice;
            drawPoints.innerText = drawCounter;
            playerPoints.innerText = playerCounter;
            cpuPoints.innerText = cpuCounter;
            cpuSelection.innerText = cpuResult;
            playerSelection.innerText = playerResult;
          
}

document.querySelectorAll('.sPR').forEach(button => {
    button.addEventListener('click', () => {
        let playerChoice = button.value;
        scissorsPaperRock(playerChoice);
    });
});

// let lesTwoButton = document.querySelector('.lesTwoButton');

// lesTwoButton.addEventListener('click', () => {  
//     scissorsPaperRock()
//     console.log(`Player: ${playerWins} Draws: ${resultDraw} Computer: ${cpuWins}`);
// });