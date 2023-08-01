function init() {
  const startPage = document.querySelector('.start-page')
  const hero = document.querySelector('.hero')
  const gameContainer = document.querySelector('.container')
  const lostGame = document.querySelector('.lost-game')

  //Select Fighter
  const selectFighterDisplay = document.querySelector('.select-fighter')
  const fighterContainer = document.querySelectorAll('.fighter-container')
  const asterix = document.querySelector('.asterix')
  const obelix = document.querySelector('.obelix')

  // Player selection display arrays 
  const fighterSelection = [asterix, obelix]
  const fighterSelectionString = ['asterix', 'obelix']

  // Timeout for entering the game
  let enteringGame

  // Asterix boolean
  let selectedAsterix = false
  let level = 1
  let score = 0
  // Obelix boolean
  let selectedObelix = false
  let intervalTime = 1000
  const decreaseInterval = 150
  let selectedFighterBoolean = [selectedAsterix, selectedObelix]

  // Entering the grid
  const enterLevelOne = document.querySelector('.enter-level-one')
  const grid = document.querySelector('.grid')


  // Right container display
  const restartButton = document.querySelector('#restart')
  const scoreDisplay = document.querySelector('#current-score')
  const highScoreDisplay = document.querySelector('#high-score')
  const heartsDisplay = document.querySelector('#hearts')
  const currentLevelDisplay = document.querySelector('#current-level')
  const levelOneComplete = document.querySelector('.won-level-one')
  const levelTwoComplete = document.querySelector('.won-level-two')
  const toLevelTwoButton = document.querySelector('#to-level-two')
  const toLevelThreeButton = document.querySelector('#to-level-three')

  const fighterClassArray = ['asterixFighter', 'obelixFighter']

  function enterGame() {
    // Hide startPage and unhide gameContainer
    startPage.classList.add('hidden')
    gameContainer.classList.remove('hidden')
  }

  //*GRID */
  // Width
  const width = 10

  // Total cells
  const cellCount = width * width
  const cells = []
  function createGrid() {
    // Using the total cell count we've saved to a variable we're going to use a for loop to iterate that many times
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

  function addPlayer(position) {
    for (let i = 0; i < selectedFighterBoolean.length; i++) {
      if (selectedFighterBoolean[i] === true) {
        cells[position].classList.add(fighterClassArray[i])
      }
    }
  }
  function removePlayer() {
    // The class of the player that is selected is removed
    for (let i = 0; i < selectedFighterBoolean.length; i++) {
      if (selectedFighterBoolean[i] === true) {
        cells[currentPosition].classList.remove(fighterClassArray[i])
      }
    }
  }

  function movePlayer(e) {
    removePlayer()
    // Only move the player within the grids 90-99 and when there is the game grid in on display
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

  function selectFighter(e) {
    // Selecting player class to add
    for (let i = 0; i < fighterSelection.length; i++) {
      if (e.target.classList.contains(fighterSelectionString[i])) {
        selectedFighterBoolean[i] = true
        fighterSelection[i].classList.add('clicked')
        selectFighterDisplay.classList.add('hidden')
      }
    }
    startGame()
  }

  let romanOne = [2, 3, 4]
  let romanTwo = [10, 11, 12, 13, 14, 15, 16]
  let romanThree = [20, 21, 22, 23, 24, 25, 26]
  let romanFour = [31, 32, 33, 34, 35]
  // Total array of romans that will be used later to prevent errors when the roman move out of the grid and to check if all of the roman were removed 
  let totalRomanArray = romanOne.concat(romanTwo.concat(romanThree.concat(romanFour)))


  function addRomans() {
      romanOne.forEach(opponents => cells[opponents].classList.add('roman1'))
      romanTwo.forEach(opponents => cells[opponents].classList.add('roman2'))
      romanThree.forEach(opponents => cells[opponents].classList.add('roman3'))
      romanFour.forEach(opponents => cells[opponents].classList.add('roman4'))
  }

  function moveRomans() {
    // A function that uses add and remove player functions to automatically move the romans within the cells using interval times
    // Variables that track the movement of the romans
    let romansMoved = 0
    let movesRight = true
    let movesLeft = false
    const movementLength = width - romanTwo.length
    romanMovements = setInterval(() => {
      // Set conditionals to check whether the movement is left or right. After the romans group (each array of positions) moves movementLength(number), then move down. 
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
        // When any of the opponents reaches the bottom of the grid, endGameLost.
        if (totalRomanArray.some(roman => roman >= cellCount - width)) {
          endGameLost()
        }
      }
      addRomans()
    }, intervalTime)
  }

  function removeRomans() {
    // Remove roman images based on their position
      romanOne.forEach(opponents => cells[opponents].classList.remove('roman1'))
      romanTwo.forEach(opponents => cells[opponents].classList.remove('roman2'))
      romanThree.forEach(opponents => cells[opponents].classList.remove('roman3'))
      romanFour.forEach(opponents => cells[opponents].classList.remove('roman4'))
      // Update totalRomanArray by filtering out the positions of the removed Romans
  }

  // Player Shooting

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

  function romanRemover(roman, index, romanArray) {
    // Remove fist and the  image
    removeFist(index)
    cells[index].classList.remove(roman)
    // Add the pow and remove it when the timeout ends
    cells[index].classList.add('pow')
    setTimeout(() => {
      cells[index].classList.remove('pow')
    }, 300)
    // Remove the index of the opponent that was hit in the opponent arrays
    const romanIndex = romanArray.indexOf(index)
    romanArray.splice(romanIndex, 1)
    const totalRomanIndex = totalRomanArray.indexOf(index)
    totalRomanArray.splice(totalRomanIndex, 1)
    cells[index].classList.remove('roman')
    // Increment the score
    score += 10
    scoreDisplay.innerHTML = score
    if (totalRomanArray.length === 0) {
      gameCheck()
    }
  }

  // My player shoots the ball function
  function myShot(e) {
    if (e.keyCode === space && !grid.classList.contains('hidden')) {
      // Prevent the default shift key to work
      e.preventDefault()
      // Fist position at start (right above cell of the player image)
      let shotIndex = currentPosition - width
      addFist(shotIndex)
      // Shot remover function that will be used for each opponent character
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



  function startGame() {
    // Hide the select player class
    selectFighterDisplay.classList.add('hidden')
    // Hide the container that contains fighter selection
    enterLevelOne.classList.remove('hidden')
    // Unhide enter-level-one class and give a timeout of 3 seconds and hide enter-level-one and unhide grid class
    enteringGame = setTimeout(() => {

      // Enter the grid
      enterLevelOne.classList.add('hidden')
      grid.classList.remove('hidden')
      document.body.classList.add('grid-visible')
      addPlayer(startingPosition)
      addRomans()
      moveRomans()
      // Update variable name here from fighterContainerContainer to fighterContainer
      fighterContainer.forEach(fighter => fighter.addEventListener('click', selectFighter))

    }, 3000)
  }

  function endGameLost() {
    // Clear the opponent movement interval
    clearInterval(romanMovements)
    // Show the lostGame display
    grid.classList.add('hidden')
    lostGame.classList.remove('hidden')
    // Remove all the elements in the grid
    removeEverything()
  }

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

    }
  }

  const gridLevelOne = new restartDisplay(grid)

  function restartGame() {
    // Return to select player for each display
    if (!selectFighterDisplay.classList.contains('hidden')) {
      selectFighterDisplay.classList.remove('hidden')
    } else if (!enterLevelOne.classList.contains('hidden')) {
      // Clear enter game timeout
      clearTimeout(enteringGame)
      enteringGame = null
      enterLevelOne.classList.add('hidden')
      selectFighterDisplay.classList.remove('hidden')
    } else if (!grid.classList.contains('hidden') && level === 1) {
      gridLevelOne.restart()
    } 
    // Remove clicked class from the select player containers using a for loop around the player selection array
    for (let i = 0; i < fighterSelection.length; i++) {
      fighterSelection[i].classList.remove('clicked')
    }
    // Remove all the classes in the grid
    removeEverything()
    // Reset individual selectedPlayer boolean
    selectedAsterix = false
    selectedObelix = false
    // Reset the selectedPlayer boolean array
    selectedFighterBoolean= [selectedAsterix, selectedObelix ]
    // Clear opponents and their movement/shot interval
    clearInterval(romanMovements)
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

  function gameCheck() {
    // Clear the interval and set the intervals back to null
    clearInterval(romanMovements)
    romanMovements = null
    // Reset the arrays
    romanOne = [2, 3, 4]
    romanTwo = [10, 11, 12, 13, 14, 15, 16]
    romanThree = [20, 21, 22, 23, 24, 25, 26]
    romanFour = [31, 32, 33, 34, 35]
    totalRomanArray = romanOne.concat(romanTwo.concat(romanThree.concat(romanFour)))
    // Remove every classes is added within the cells
    removeEverything()
    // Reset starting position
    currentPosition = startingPosition
    // Conditionals to check to proceed to the wonLevel/wonGame classes
    if (level === 1) {
      // Show won level one
      grid.classList.add('hidden')
      levelOneComplete.classList.remove('hidden')
    } 
    if (level === 2) {
      // Show won level two
      grid.classList.add('hidden')
      levelTwoComplete.classList.remove('hidden')
    } 
  }

  function levelTwo() {
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
    // Opponents shoot the football in a shorter interval now
  }

  function levelThree() {
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
  }

  createGrid()

  hero.addEventListener('click', enterGame)
  document.addEventListener('keydown', movePlayer)
  document.addEventListener('keydown', myShot)
  fighterContainer.forEach(fighter => fighter.addEventListener('click', selectFighter))
  restartButton.addEventListener('click', restartGame)
  toLevelTwoButton.addEventListener('click', levelTwo)
  toLevelThreeButton.addEventListener('click', levelThree)
}

window.addEventListener('DOMContentLoaded', init)