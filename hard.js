// Constants for game difficulty
const EASY = 6
const MEDIUM = 8
const HARD = 9
// Variable for game difficulty
var difficulty = HARD

// Generate a random number series according to difficulty.
function generateRandNumSeries(difficulty) {
    var numSeries = []
    for (var i = 0; i < difficulty * difficulty; i++) {
        // Create a candidate integer
        var temp = Math.ceil(Math.random() * difficulty * difficulty);
        // Check for repetition
        for (var j = 0; j <= i; j++) {
            // If repeat found, try again
            if (temp === numSeries[j]) {
                i--
                break
            // Succeeds if no repetition
            } else if (j == i) {
                numSeries[i] = temp
            }
        }
    }
    return numSeries
}

// Turn difficulty into numerical representation
function decodeDifficulty(difficulty) {
    switch (difficulty) {
        case "medium": return MEDIUM
        case "hard": return HARD
        default: return EASY
    }
}

var vm = new Vue({
    el: '#body',
    data: {
        difficulty: difficulty,
        numSeries: generateRandNumSeries(difficulty)
    }
})

// Variables
// I forgot to initialize it, that's why it didn't work!
var blocksDone = 0
var tds = document.querySelectorAll('td')

function addEventListenersForGrid() {
    tds = document.querySelectorAll('td')
    // Add event listeners for every block
    for (var i = 0; i < tds.length; i++) {
        tds[i].addEventListener('click', function() {
            // If the player is clicking in the right order, text turns green
            if (this.textContent == blocksDone + 1) {
                if (blocksDone === 0) {
                    startTime = new Date()
                }
                this.classList.add('done')
                blocksDone++
                if (blocksDone === tds.length) {
                    endTime = new Date()
                    var timeTaken = endTime - startTime
                    document.querySelector('#grid').innerHTML =
                        '<p id="message">' + 'You have finished in '
                        + '<span id="highlight">'
                        + Math.round(timeTaken / 1000)
                        + '</span> seconds!</p>'
                }
            }
        })
    }
}

addEventListenersForGrid()