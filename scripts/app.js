function init() {

  // ! Elements

  // Start game
  const startPage = document.querySelector('.start-page')
  const hero = document.querySelector('.hero')
  const gameContainer = document.querySelector('.container')
  const lostGame = document.querySelector('.lost-game')

  // Select Fighter
  const selectFighterDisplay = document.querySelector('.select-fighter')
  const fighterContainer = document.querySelectorAll('.fighter-container')
  const asterix = document.querySelector('.asterix')
  const obelix = document.querySelector('.obelix')

  // Timeout for entering the game
  let enteringGame

  // Asterix boolean
  let selectedAsterix = false
  
  // Obelix boolean
  let selectedObelix = false

  // Right container display
  const restartButton = document.querySelector('#restart')
  const scoreDisplay = document.querySelector('#current-score')
  const highScoreDisplay = document.querySelector('#high-score')
  const heartsDisplay = document.querySelector('#hearts')
  const currentLevelDisplay = document.querySelector('#current-level')
  const levelOneComplete = document.querySelector('.won-level-one')
  const levelTwoComplete = document.querySelector('.won-level-two')
  const levelThreeComplete = document.querySelector('.won-game')
  const toLevelTwoButton = document.querySelector('#to-level-two')
  const toLevelThreeButton = document.querySelector('#to-level-three')
  const menuMusic = document.querySelector('.menu')
  const levelMusic = document.querySelector('.level-music')
  const loseLife = document.querySelector('.lose-life')
  const levelStart = document.querySelector('.level-start')
  const gameWon = document.querySelector('.game-won')
  const gameOverMusic = document.querySelector('.game-over-music')
  const soundButton = document.querySelector('.sound')

  const soundEffects = [menuMusic, levelMusic, loseLife, levelStart, gameWon, gameOverMusic]

  function muteAudio() {
    soundEffects.forEach(soundEffect => {
      soundEffect.muted = !soundEffect.muted
    })
  
    const soundButtonText = soundButton.querySelector('.sound-button-text')
    if (soundEffects[0].muted) {
      soundButtonText.textContent = 'UNMUTE'
    } else {
      soundButtonText.textContent = 'MUTE'
    }
  }

  const highScore = localStorage.getItem('highscore')
  if (highScore !== null) {
    highScoreDisplay.innerHTML = highScore
  } else {
    highScoreDisplay.innerHTML = 0
  }
  
  
  function highScoreChecker() {
    // Save the final score if it is the highest score
    if (highScore !== null) {
      if (score >= parseInt(highScore)) {
        localStorage.setItem('highscore', score)
        highScoreDisplay.innerHTML = score
      }
    } else {
      localStorage.setItem('highscore', score)
    }
  }
  
  // Variables
  let level = 1
  let lives = 3
  let score = 0
  let intervalTime = 1000
  let romanBoulderInterval

  // Timings
  const decreaseInterval = 150
  const boulderMovementTime = 300


  // Function to enter grid screen
  function enterGame() {
    // Hide startPage and unhide gameContainer
    startPage.classList.add('hidden')
    gameContainer.classList.remove('hidden')
    menuMusic.currentTime = 0 // Rewind the audio to the beginning
    menuMusic.play()
    menuMusic.volume = 0.5

    // Listen for the 'ended' event and replay menuMusic when it ends
    menuMusic.addEventListener('ended', function () {
      menuMusic.currentTime = 0
      menuMusic.play()
    })
  }



  //*GRID */

  // Entering the grid
  const enterLevelOne = document.querySelector('.enter-level-one')
  const grid = document.querySelector('.grid')

  // Width
  const width = 10

  // Total cells
  const cellCount = width * width
  const cells = []
  function createGrid() {
    // Using the total cell count
    for (let i = 0; i < cellCount; i++) {
      // Create div
      const cell = document.createElement('div')
      // Data attribute represeting the index
      cell.setAttribute('data-index', i)
      // Append to grid
      grid.appendChild(cell)
      // Push cell into cells array
      cells.push(cell)
    }
  }
  

  //*PLAYER MOVEMENT */

  // Keyboard controls
  const right = 39
  const left = 37
  const space = 32

  // Starting position of the player
  const startingPosition = 94
  let currentPosition = startingPosition


  // Fighter selection display arrays 
  const fighterSelection = [asterix, obelix]
  const fighterSelectionString = ['asterix', 'obelix']
  const fighterClassArray = ['asterixFighter', 'obelixFighter']
  let selectedFighterBoolean = [selectedAsterix, selectedObelix]

  function selectFighter(e) {
    // Selecting fighter class to add
    for (let i = 0; i < fighterSelection.length; i++) {
      if (e.target.classList.contains(fighterSelectionString[i])) {
        selectedFighterBoolean[i] = true
        fighterSelection[i].classList.add('clicked')
        selectFighterDisplay.classList.add('hidden')
      }
    }
    startGame()
  }

  // Function to add fighter
  function addPlayer(position) {
    for (let i = 0; i < selectedFighterBoolean.length; i++) {
      if (selectedFighterBoolean[i] === true) {
        cells[position].classList.add(fighterClassArray[i])
      }
    }
  }

  // Function to remove fighter
  function removePlayer() {
    // The class of the fighter that is selected is removed
    for (let i = 0; i < selectedFighterBoolean.length; i++) {
      if (selectedFighterBoolean[i] === true) {
        cells[currentPosition].classList.remove(fighterClassArray[i])
      }
    }
  }

  // Move fighter function
  function movePlayer(e) {
    removePlayer()
    // Only move the player within the grid cells 90-99 and the game grid in displayed
    if (e.keyCode === right && currentPosition % width !== width - 1 && !grid.classList.contains('hidden')) {
      // Prevent the default arrow keys to work
      e.preventDefault()
      currentPosition++
    } else if (e.keyCode === left && currentPosition % width !== 0 && !grid.classList.contains('hidden')) {
      // Prevent the default arrow keys to work
      e.preventDefault()
      currentPosition--
    }
    addPlayer(currentPosition)
  }


  // Starting Roman position arrays 
  
  let romanOne = [2, 3, 4]
  let romanTwo = [10, 11, 12, 13, 14, 15, 16]
  let romanThree = [20, 21, 22, 23, 24, 25, 26]
  let romanFour = [31, 32, 33, 34, 35]
  // Total array of Romans for when the Romans move out of the grid and to check if all Romans were hit 
  let totalRomanArray = romanOne.concat(romanTwo.concat(romanThree.concat(romanFour)))


  // Add Romans function
  function addRomans() {
      romanOne.forEach(romans => cells[romans].classList.add('roman1'))
      romanTwo.forEach(romans => cells[romans].classList.add('roman2'))
      romanThree.forEach(romans => cells[romans].classList.add('roman3'))
      romanFour.forEach(romans => cells[romans].classList.add('roman4'))
  }

  // Remove Romans function
  function removeRomans() {
    // Remove Roman image class based on position
      romanOne.forEach(romans=> cells[romans].classList.remove('roman1'))
      romanTwo.forEach(romans => cells[romans].classList.remove('roman2'))
      romanThree.forEach(romans => cells[romans].classList.remove('roman3'))
      romanFour.forEach(romans => cells[romans].classList.remove('roman4'))
      // Update totalRomanArray by filtering out the positions of the removed Romans
  }

  function moveRomans() {
    // A function that uses add and remove Romans functions to move Romans within the cells using interval times
    // Variables to track the movement of the Romans
    let romansMoved = 0
    let movesRight = true
    let movesLeft = false
    const movementLength = width - romanTwo.length
    romanMovements = setInterval(() => {
      // Set condition to check whether the movement is left or right. When Romans (each array) have moved the movementLength they move down and move in the opposite direction. 
      removeRomans()
      if (romansMoved < movementLength && movesRight) {
        romanOne = romanOne.map(roman => roman + 1)
        romanTwo = romanTwo.map(roman => roman + 1)
        romanThree = romanThree.map(roman => roman + 1)
        romanFour = romanFour.map(roman => roman + 1)
        totalRomanArray = totalRomanArray.map(roman => roman + 1)
        romansMoved += 1
      } else if (romansMoved === movementLength && movesRight) {
        romanOne = romanOne.map(roman => roman + width)
        romanTwo = romanTwo.map(roman => roman + width)
        romanThree = romanThree.map(roman => roman + width)
        romanFour = romanFour.map(roman => roman + width)
        totalRomanArray = totalRomanArray.map(roman => roman + width)
        romansMoved = 0
        movesRight = false
        movesLeft = true
      } else if (romansMoved < movementLength && movesLeft) {
        romanOne = romanOne.map(roman => roman - 1)
        romanTwo = romanTwo.map(roman => roman - 1)
        romanThree = romanThree.map(roman => roman - 1)
        romanFour = romanFour.map(roman => roman - 1)
        totalRomanArray = totalRomanArray.map(roman => roman - 1)
        romansMoved += 1
      } else if (romansMoved === movementLength && movesLeft) {
        romanOne = romanOne.map(roman => roman + width)
        romanTwo = romanTwo.map(roman => roman + width)
        romanThree = romanThree.map(roman => roman + width)
        romanFour = romanFour.map(roman => roman + width)
        totalRomanArray = totalRomanArray.map(roman => roman + width)
        romansMoved = 0
        movesRight = true
        movesLeft = false
        // When Romans reach the bottom of the grid, end the game.
        if (totalRomanArray.some(roman => roman >= cellCount - width)) {
          endGameLost()
        }
      }
      addRomans()
    }, intervalTime)
  }



  // ! Asterix/Obelix shooting

  // Add fist function
  function addFist(position) {
    if (position >= 0) {
      cells[position].classList.add('fist')
    }
  }

  // Remove fist function
  function removeFist(position) {
    if (position >= 0) {
      cells[position].classList.remove('fist')
    }
  }

  // Function to remove Romans if hit by a shot
  function romanRemover(roman, index, romanArray) {
    // Remove fist and the Roman hit from the grid
    removeFist(index)
    cells[index].classList.remove(roman)
    // Add the 'Pow' class and remove it when the timeout ends
    cells[index].classList.add('pow')
    setTimeout(() => {
      cells[index].classList.remove('pow')
    }, 300)
    // Remove the index of the Roman that was hit in the Roman arrays
    const romanIndex = romanArray.indexOf(index)
    romanArray.splice(romanIndex, 1)
    const totalRomanIndex = totalRomanArray.indexOf(index)
    totalRomanArray.splice(totalRomanIndex, 1)
    cells[index].classList.remove('roman')
    // Increment the score
    score += 10
    scoreDisplay.innerHTML = score
    // To check if all Romans are defeated
    if (totalRomanArray.length === 0) {
      gameCheck()
    }
  }

  // Asterix/Obelix shoot fist function
  function myShot(e) {
    if (e.keyCode === space && !grid.classList.contains('hidden')) {
      // Prevent the default shift key to work
      e.preventDefault()
      // Fist position at start (right above cell of Asterix/Obelx image)
      let shotIndex = currentPosition - width
      addFist(shotIndex)
      // First remover function that will be used for each opponent character
      // Rather than declaring a global variable, the interval variable is declared locally.
      const shotMovement = setInterval(() => {
        // When the opponent grid cell is equal to the cell of the fist I shot, remove the specific opponent player, the football, the shotIndex value within the four opponents array and add 10 points to the score
        // Remove football when reached the top row
        // Interval needs to be cleared when restart button was clicked or the grid is hidden
        if (shotIndex < width) {
          removeFist(shotIndex)
        } else if (cells[shotIndex].classList.contains('roman1')) {
          romanRemover('roman1', shotIndex, romanOne)
          clearInterval(shotMovement)
        } else if (cells[shotIndex].classList.contains('roman2')) {
          romanRemover('roman2', shotIndex, romanTwo)
          clearInterval(shotMovement)
        }
        else if (cells[shotIndex].classList.contains('roman3')) {
          romanRemover('roman3', shotIndex, romanThree)
          clearInterval(shotMovement)
        }
        else if (cells[shotIndex].classList.contains('roman4')) {
          romanRemover('roman4', shotIndex, romanFour)
          clearInterval(shotMovement)
        } else if (restartButton.addEventListener('click', restartGame) || grid.classList.contains('hidden')) {
          clearInterval(shotMovement)
        } else {
          removeFist(shotIndex)
          shotIndex -= width
          addFist(shotIndex)
        }
      }, 300)
    }
  }

  // ! Romans shooting

  // Function to add boulder
  function addRomanBoulder(position) {
    if (position < cellCount) {
      cells[position].classList.add('boulder')
    }
  }

  // Function to remove boulder
  function removeRomanBoulder(position) {
    if (position < cellCount) {
      cells[position].classList.remove('boulder')
    }
  }

    // Function for Romans to shoot boulders
    function romanBoulders() {
      // Set a random variable that starts from a position + width of any one of the Romans
      let randomShotIndex = totalRomanArray[Math.floor(Math.random() * totalRomanArray.length)] + width
      // If cell of the boulder class contains Asterix/Obelix, the image is changed using setTimeout, the boulder is removed and -1 a heart
      // If not continue to move the boulder until ut reaches the bottom row of the grid
      // This interval is the interval where the shot flies across the grid
      const romanBoulderMovement = setInterval(() => {
        // Remove the football when reached the bottom row or when the grid is hid
        if (randomShotIndex >= cellCount) {
          removeRomanBoulder(randomShotIndex)
          clearInterval(romanBoulderMovement)
        } else if (cells[randomShotIndex].classList.contains('asterixFighter') || cells[randomShotIndex].classList.contains('obelixFighter')) {
          fighterRemover(randomShotIndex, romanBoulderMovement)
        } else if (restartButton.addEventListener('click', restartGame) || grid.classList.contains('hidden')) {
          clearInterval(romanBoulderMovement)
        } else {
          removeRomanBoulder(randomShotIndex)
          randomShotIndex += width
          addRomanBoulder(randomShotIndex)
        }
      }, boulderMovementTime)
    }

    // Function to change class of Asterix/Obelix when hit to show life lost
    function fighterRemover(index, interval) {
      removeRomanBoulder(index)
      // Show 'Oh no!' when hit with a boulder
      cells[index].classList.add('oh-no')
      loseLife.play()
      loseLife.volume = 0.6
      ohNo = setTimeout(() => {
        cells[index].classList.remove('oh-no')
      }, 200)
      // Remove a life
      lives--
      heartsDisplay.innerHTML = '❤️'.repeat(lives)
      // Remove 50 points
      score -= 50
      // Update score
      scoreDisplay.innerHTML = score
      // Clear the interval set within the Roman shots function (romanBoulderMovement), so that player doesn't repeatedly die
      clearInterval(interval)
      // If there are no lives left, clear the romanBoulderIntervl (the interval that makes the Romans shoot), display "game over" in heartsDisplay, and move to the endGameLost function
      if (lives === 0) {
        clearInterval(romanBoulderInterval)
        heartsDisplay.innerHTML = 'GAME OVER'
        endGameLost()
      } 
    }

  // Functon to start the game
  function startGame() {
    menuMusic.pause()
    levelStart.play()
    levelStart.volume = 0.4
    // Hide the select fighter class
    selectFighterDisplay.classList.add('hidden')
    // Hide the container that contains fighter selection
    enterLevelOne.classList.remove('hidden')
    
    // Unhide enter-level-one class (cutscene) and give a timeout of 3 seconds. Then hide enter-level-one (cutscene) and unhide grid class so game begins
    enteringGame = setTimeout(() => {
      // Enter the grid
      levelMusic.currentTime = 0 // Rewind the audio to the beginning

      // Listen for the 'ended' event and replay menuMusic when it ends
      levelMusic.addEventListener('ended', function () {
        levelMusic.currentTime = 0
        levelMusic.play()
      })
      levelMusic.play()
      
      enterLevelOne.classList.add('hidden')
      grid.classList.remove('hidden')
      document.body.classList.add('grid-visible')
      addPlayer(startingPosition)
      addRomans()
      moveRomans()
      romanBoulderInterval = setInterval(() => {
        romanBoulders()
      }, 2000)
    }, 3000)
  }

  // Function for when the game is lost
  function endGameLost() {
    highScoreChecker()
    // Clear the Roman movement interval
    levelMusic.pause()
    loseLife.pause()
    gameOverMusic.play()
    gameOverMusic.volume = 0.2
    clearInterval(romanMovements)
    // Show the lostGame display
    grid.classList.add('hidden')
    lostGame.classList.remove('hidden')
    // Remove all the elements in the grid
    removeEverything()
    highScoreChecker()
  }

  // Remove the grid
  function removeEverything() {
    cells.forEach(cell => {
      cell.className = ''
    })
  }

  class restartDisplay {
    constructor(displayType) {
      this.displayType = displayType
    }
    restart() {
      this.displayType.classList.add('hidden')
      selectFighterDisplay.classList.remove('hidden')
      lostGame.classList.add('hidden')
      levelOneComplete.classList.add('hidden')
      levelTwoComplete.classList.add('hidden')
      levelThreeComplete.classList.add('hidden')

    }
  }

  const gridLevelOne = new restartDisplay(grid)

  function restartGame() {
    //Clear intervals
    levelMusic.pause()
    gameWon.pause()
    menuMusic.play()
    clearInterval(romanMovements)
    clearInterval(romanBoulderInterval)
    // Return to select fighter for each display
    if (!selectFighterDisplay.classList.contains('hidden')) {
      selectFighterDisplay.classList.remove('hidden')
    } else if (!enterLevelOne.classList.contains('hidden')) {
      // Clear enter game timeout
      clearTimeout(enteringGame)
      enteringGame = null
      enterLevelOne.classList.add('hidden')
      // Show select figher display
      selectFighterDisplay.classList.remove('hidden')
    } else if (!grid.classList.contains('hidden')) {
      gridLevelOne.restart()
    } 
    // Remove clicked class from the select player containers using a for loop around the player selection array
    for (let i = 0; i < fighterSelection.length; i++) {
      fighterSelection[i].classList.remove('clicked')
    }
    // Remove all the classes in the grid
    removeEverything()
    // Reset individual selectedFighter boolean
    selectedAsterix = false
    selectedObelix = false
    // Reset the selectedPlayer boolean array
    selectedFighterBoolean= [selectedAsterix, selectedObelix ]
    // Clear Romans and their movement/boulder interval
    romanBoulderInterval = null
    romanMovements = null
    // Reset the arrays
    romanOne = [2, 3, 4]
    romanTwo = [10, 11, 12, 13, 14, 15, 16]
    romanThree = [20, 21, 22, 23, 24, 25, 26]
    romanFour = [31, 32, 33, 34, 35]
    totalRomanArray = romanOne.concat(romanTwo.concat(romanThree.concat(romanFour)))
    // Reset the score
    score = 0
    scoreDisplay.innerHTML = score
    // Reset lives
    lives = 3
    // Reset the hearts display
    heartsDisplay.innerHTML = '❤️'.repeat(lives)
    // Reset current level
    level = 1
    currentLevelDisplay.innerHTML = level
    // Reset interval time
    intervalTime = 1000
    // Reset starting position
    currentPosition = startingPosition
    gridLevelOne.restart()
  }  

  // Function that occurs every time the player's fist hits the Romans to check if there are any Romans left
  function gameCheck() {
    // Clear the interval and set the intervals back to null
    clearInterval(romanMovements)
    romanMovements = null
    clearInterval(romanBoulderInterval)
    romanBoulderInterval = null
    // Reset the arrays
    romanOne = [2, 3, 4]
    romanTwo = [10, 11, 12, 13, 14, 15, 16]
    romanThree = [20, 21, 22, 23, 24, 25, 26]
    romanFour = [31, 32, 33, 34, 35]
    totalRomanArray = romanOne.concat(romanTwo.concat(romanThree.concat(romanFour)))
    // Remove all the classes added to the grid
    removeEverything()
    // Reset starting position
    currentPosition = startingPosition
    highScoreChecker()
    // Conditionals that check whether to proceed to the next level or show the win game class
    if (level === 1) {
      // Show level one won cut scene
      levelMusic.pause()
      levelStart.play()
      levelStart.volume = 0.4
      grid.classList.add('hidden')
      levelOneComplete.classList.remove('hidden')
    } 
    else if (level === 2) {
      levelMusic.pause()
      levelStart.play()
      // Show won level two
      levelStart.volume = 0.4
      grid.classList.add('hidden')
      levelTwoComplete.classList.remove('hidden')
    } else if (level === 3) {
      levelMusic.pause()
      grid.classList.add('hidden')
      levelThreeComplete.classList.remove('hidden')
      gameWon.play()
      gameWon.volume = 0.3
    }
  }

  function levelTwo() {
    levelMusic.currentTime = 0 // Rewind the audio to the beginning

    // Listen for the 'ended' event and replay menuMusic when it ends
    levelMusic.addEventListener('ended', function () {
      levelMusic.currentTime = 0
      levelMusic.play()
    })
    levelMusic.play()
    level = 2
    currentLevelDisplay.innerHTML = level
    // Interval is shortened
    intervalTime -= decreaseInterval
    // Enter the game grid
    levelOneComplete.classList.add('hidden')
    grid.classList.remove('hidden')
    // Add player
    addPlayer(currentPosition)
    // Add opponents the total array of opponents
    addRomans()
    // Apply move opponent function with the new decreased interval
    moveRomans()
    // Opponents shoot the football in a shorter interval 
    romanBoulderInterval = setInterval(() => {
      romanBoulders()
    }, 1300)
  }

  function levelThree() {
    levelMusic.currentTime = 0 // Rewind the audio to the beginning

    // Listen for the 'ended' event and replay menuMusic when it ends
    levelMusic.addEventListener('ended', function () {
      levelMusic.currentTime = 0
      levelMusic.play()
    })
    levelMusic.play()
    level = 3
    currentLevelDisplay.innerHTML = level
    // Interval is shortened
    intervalTime -= decreaseInterval * 2
    // Enter the game grid
    levelTwoComplete.classList.add('hidden')
    grid.classList.remove('hidden')
    // Add player
    addPlayer(currentPosition)
    // Add opponents the total array of opponents
    addRomans()
    // Apply move opponent function with the new decreased interval
    moveRomans()
    // Opponents shoot the football in a shorter interval now
    romanBoulderInterval = setInterval(() => {
      romanBoulders()
    }, 1000)
  }

  createGrid()
  
  
  hero.addEventListener('click', enterGame)
  document.addEventListener('keydown', movePlayer)
  document.addEventListener('keyup', myShot)
  fighterContainer.forEach(fighter => fighter.addEventListener('click', selectFighter))
  restartButton.addEventListener('click', restartGame)
  toLevelTwoButton.addEventListener('click', levelTwo)
  toLevelThreeButton.addEventListener('click', levelThree)
  soundButton.addEventListener('click', muteAudio)

}

window.addEventListener('DOMContentLoaded', init)