const choiceImages = {
    Rock: '<img src="../Images/image_processing20210530-3563-17l4x59.png" alt="Rock" width="50px" height="50px">',
    Scissors: '<img src="../Images/680ce8a9cf105b860fb74c8690d9f1bc.png" alt="Scissors" width="50px" height="50px">',
    Paper: '<img src="../Images/white-ripped-piece-of-paper-isolated-on-transparent-background-file-png.webp" alt="Paper" width="50px" height="50px">'
};


(() => {
    const gameOptions = ['Scissors', 'Paper', 'Rock'];
    let playerWins = 0, cpuWins = 0, resultDraw = 0;
    let whoWon = null;

    function scissorsPaperRock(playerChoice) {
        const cpuChoice = gameOptions[Math.floor(Math.random() * gameOptions.length)];
        let result;

        const playerSelectDisplay = document.querySelector(".playerSelectDisplay")
        const cpuSelectDisplay = document.querySelector(".cpuSelectDisplay")

        if (cpuChoice === "Rock") {
            cpuSelectDisplay.innerHTML = `${choiceImages.Rock}`
        }   else if (cpuChoice === "Scissors") {
            cpuSelectDisplay.innerHTML = `${choiceImages.Scissors}`
        } else {
            cpuSelectDisplay.innerHTML = `${choiceImages.Paper}`
        }
        
        if (playerChoice === "Rock") {
            playerSelectDisplay.innerHTML = `${choiceImages.Rock}`
        }   else if (playerChoice === "Scissors") {
            playerSelectDisplay.innerHTML = `${choiceImages.Scissors}`
        } else {
            playerSelectDisplay.innerHTML = `${choiceImages.Paper}`
        }

        if (playerChoice === cpuChoice) {
            resultDraw++;
            result = 'Tie';
            whoWon = "It's a Tie!";
        } else if (
            (playerChoice === 'Scissors' && cpuChoice === 'Paper') ||
            (playerChoice === 'Paper' && cpuChoice === 'Rock') ||
            (playerChoice === 'Rock' && cpuChoice === 'Scissors')
        ) {
            playerWins++;
            result = 'Player Wins';
            whoWon = "Player Wins!";
        } else {
            cpuWins++;
            result = 'CPU Wins';
            whoWon = "Computer Wins!";
        }

        document.querySelector(".playerPoints").innerText = playerWins;
        document.querySelector(".cpuPoints").innerText = cpuWins;
        document.querySelector(".drawPoints").innerText = resultDraw;
        document.querySelector(".playerSelection").innerText = playerChoice;
        document.querySelector(".cpuSelection").innerText = cpuChoice;

        // Display winner in the popup
        const winsPopUp = document.getElementById('winsPopUp');
        winsPopUp.innerText = whoWon;
        playerSelectDisplay.style.display = 'flex';
        cpuSelectDisplay.style.display = 'flex';
        
        // Step 1: Keep player and CPU selections visible for 1.5 seconds
        setTimeout(() => {
            // Step 2: Show the winsPopUp while keeping player and CPU selections visible
            winsPopUp.style.display = 'flex';
        
            // Step 3: Hide all three together after 1 second
            setTimeout(() => {
                playerSelectDisplay.style.display = 'none';
                cpuSelectDisplay.style.display = 'none';
                winsPopUp.style.display = 'none';
            }, 1000); // Delay for keeping all three visible
        
        }, 1500); // Initial delay for player and CPU selections
        
}


    document.querySelectorAll('.sPR').forEach(button => {
        button.addEventListener('click', () => {
            scissorsPaperRock(button.value);
        });
    });
})();

    