// SOLVE THE TRAIN STARTS ________________________________________________________________________
const numberInputs = document.querySelectorAll(".numberInput");
let toSolveButton = document.querySelector(".toSolve");
let reRandomiseButton = document.querySelector(".reRandomise");
let howToSolve = document.querySelector(".howToSolve");
let howManyGregs = document.querySelector(".howManyGregs");
let leftTrig = document.querySelector("#leftTrig");
let rightTrig = document.querySelector("#rightTrig");
let bigGreg;

// (crckfx) keep track of:
let globalGregs = [];   // 1. a global variable to hold the greggories
let globalGrindex = 0;  // 2. a global "position" in the greg array (each time we solve we set it back to '0')

// (crckfx) store:
const solutionsContainer = document.querySelector('.solutions');
const slotsContainer = document.querySelector('.slots_container');  // new slots' parent
const slots = slotsContainer.querySelectorAll('.digit-container');  // new slots


function getNumbersFromInputs() {
    // (old)
    // const array = Array.from(numberInputs).map(input => Number(input.value));

    // (new)
    // const array = getDigitsFromSet(slotsContainer);
    const array = [];
    slots.forEach((slot) => {
        const value = parseInt(slot.dataset.value, 10) || 0;
        array.push(value);
    });
    // console.log(array);
    return array;
}

function resetInputs() {
    // (new)
    slotsContainer.querySelectorAll('.digit-container').forEach(slot => {
        slot.dataset.value = "";
        slot.textContent = "";
    });
    numberInputs.forEach(input => input.value = ""); // (old)
    //
    howToSolve.innerHTML = "";
    howManyGregs.innerHTML = ""
    howToSolve.classList.remove("correct");
    leftTrig.classList.add('hidden');
    rightTrig.classList.add('hidden');
}

function permute(array) {
    if (array.length === 1) return [array];
    const permutations = [];
    for (let i = 0; i < array.length; i++) {
        const currentNum = array[i];
        const remainingNums = array.slice(0, i).concat(array.slice(i + 1));
        const remainingPerms = permute(remainingNums);
        for (const perm of remainingPerms) {
            permutations.push([currentNum, ...perm]);
        }
    }
    return permutations;
}

function trainToEqualTen(numbers) {
    const operators = ['+', '-', '*', '/'];
    const permutations = permute(numbers);
    const gregory = []
    globalGrindex = 0;

    for (const perm of permutations) {
        for (let op1 of operators) {
            for (let op2 of operators) {
                for (let op3 of operators) {
                    const formula = `${perm[0]} ${op1} ${perm[1]} ${op2} ${perm[2]} ${op3} ${perm[3]}`;
                    try {
                        const result = eval(formula);
                        if (result === 10) {
                            gregory.push(formula)
                        }
                    } catch (e) {
                        continue;
                    }
                }
            }
        }
    }


    let uniqueGregory = [];
    let gregyLongLegs = uniqueGregory.length;
    let gregyRando = Math.random() * gregyLongLegs;
    bigGreg = Math.round(gregyRando);

    // loop on the greggories and make sure they're unique
    for (let i = 0; i < gregory.length; i++) {
        if (!uniqueGregory.includes(gregory[i])) {
            uniqueGregory.push(gregory[i]);
        }
    }
    // now we want to be able to cycle through them
    if (uniqueGregory[0]) {
        return {
            outcome: uniqueGregory[0],
            gregs: uniqueGregory
        }
    } else {
        // return "Couldn't Solve";
        return {
            outcome: "Couldn't Solve",
            gregs: null
        }
    }
}

function toSolveThisProblem() {
    const numbersArray = getNumbersFromInputs();
    const solution = trainToEqualTen(numbersArray);
    const outcome = solution.outcome;
    globalGregs = solution.gregs;

    if (outcome !== "Couldn't Solve") {
        howToSolve.classList.add("correct");
        leftTrig.classList.remove("hidden");
        rightTrig.classList.remove("hidden");

        howToSolve.innerHTML = outcome;
        howManyGregs.innerHTML = `${globalGrindex + 1}/${globalGregs.length}`
    } else {
        howToSolve.classList.remove("correct");
        leftTrig.classList.add("hidden");
        rightTrig.classList.add("hidden");
        howToSolve.innerHTML = "Couldn't solve!";
        howManyGregs.innerHTML = ``;
    }
}

toSolveButton.addEventListener("click", () => {
    toSolveThisProblem();
});

reRandomiseButton.addEventListener("click", () => {
    resetInputs();
});

function inputNext(currentInput) {
    if (currentInput.value.length === 1) {
        let nextInput = currentInput.nextElementSibling
        if (nextInput && nextInput.tagName == "INPUT") {
            nextInput.focus()
        } else {
            toSolveThisProblem()
        }
    }
}
// SOLVE THE TRAIN ENDS ________________________________________________________________________


// *******************************************************
// ********** cycling through available answers **********
// *******************************************************
// function that moves along the greggories
function cycleGregory(i) {
    // 'i' is a positive or negative number of steps to take from our current 'grindex'
    let targetGrindex = globalGrindex + i;
    // loop to end if step backwards from start
    if (targetGrindex < 0) { targetGrindex += globalGregs.length; }
    // loop to start if step forwards from end
    if (targetGrindex > globalGregs.length - 1) { targetGrindex -= globalGregs.length; }
    // check that the target number exists as an index in globalGregs
    if (globalGregs[targetGrindex]) {
        // now we know our target is valid, approve the new position
        globalGrindex = targetGrindex;
        // update the displays
        howToSolve.innerHTML = globalGregs[globalGrindex];
        howManyGregs.innerHTML = `${globalGrindex + 1}/${globalGregs.length}`
    } else {
        console.log("unknown error cycling through gregs");
    }
}
// set onclicks for the triggers to bump the grindex up or down
leftTrig.addEventListener('click', () => { cycleGregory(-1); });
rightTrig.addEventListener('click', () => { cycleGregory(1); });
// *******************************************************

function inputNext(currentInput) {
    currentInput.value = currentInput.value.replace(/[^0-9]/g, ''); // Allow only digits
    if (currentInput.value.length === 1) {
        let nextInput = currentInput.nextElementSibling;
        if (nextInput && nextInput.tagName === "INPUT") {
            nextInput.focus();
        } else {
            toSolveThisProblem();
        }
    }
}

// *******************************************************
function getDigitsFromSet(set) {
    const array = [];
    if (typeof set !== null) {
        const slots = set.querySelectorAll('.digit-container');
        slots.forEach((slot) => {
            const value = parseInt(slot.dataset.value, 10) || 0;
            array.push(value);
        });
    }

    // console.log(array);
    return array;
}

function logDigitsFromSet(set) {
    console.log(getDigitsFromSet(set));
}