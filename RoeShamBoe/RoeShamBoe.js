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
        winsPopUp.style.display = 'flex';
        playerSelectDisplay.style.display = 'flex';
        cpuSelectDisplay.style.display = 'flex';

        // Hide the popup after 1.5 seconds
        setTimeout(() => {
            winsPopUp.style.display = 'none';
            playerSelectDisplay.style.display = 'none';
            cpuSelectDisplay.style.display = 'none';
        }, 2500);
    }

    document.querySelectorAll('.sPR').forEach(button => {
        button.addEventListener('click', () => {
            scissorsPaperRock(button.value);
        });
    });
})();

    