function init() {
  const startPage = document.querySelector('.start-page')
  const hero = document.querySelector('.hero')
  const gameContainer = document.querySelector('.container')

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
  // Obelix boolean
  let selectedObelix = false
  let intervalTime = 1000
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




  const fighterClassArray = ['asterixFighter', 'obelixFighter']

  function enterGame() {
    // Hide startPage and unhide gameContainer
    startPage.classList.add('hidden')
    gameContainer.classList.remove('hidden')
  }

  //***GRID */
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






  //***PLAYER MOVEMENT */

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
  // Total array of opponents that will be used later to prevent errors when the opponents move out of the grid and to check if all of the opponents were removed (then proceed to the next level)
  let totalRomanArray = romanOne.concat(romanTwo.concat(romanThree.concat(romanFour)))


  function addRomans() {
    // Add four different types of opponent player images based on their position, in three different levels
    if (level === 1) {
      romanOne.forEach(opponents => cells[opponents].classList.add('roman'))
      romanTwo.forEach(opponents => cells[opponents].classList.add('roman'))
      romanThree.forEach(opponents => cells[opponents].classList.add('roman'))
      romanFour.forEach(opponents => cells[opponents].classList.add('roman'))
    } 
  }
  
  function moveRomans() {
    // A function that uses add and remove player functions to automatically move the opponents within the cells using interval times
    // Variables that track the movement of the opponents
    let romansMoved = 0
    let movesRight = true
    let movesLeft = false
    const movementLength = width - romanTwo.length
    romanMovements = setInterval(() => {
      // Set conditionals to check whether the movement is left or right. After the opponent group (each array of positions) moves movementLength(number), then move down. 
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
        // if (totalOpponentArray.some(opponent => opponent >= cellCount - width)) {
        //   endGameLost()
        // }
      } 
      addRomans()    
    }, intervalTime)
  }

  function removeRomans() {
    // Remove four different types of opponent images based on their position, in three different levels
    if (level === 1) {
      romanOne.forEach(opponents => cells[opponents].classList.remove('roman'))
      romanTwo.forEach(opponents => cells[opponents].classList.remove('roman'))
      romanThree.forEach(opponents => cells[opponents].classList.remove('roman'))
      romanFour.forEach(opponents => cells[opponents].classList.remove('roman'))
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


  createGrid()

  hero.addEventListener('click', enterGame)
  document.addEventListener('keydown', movePlayer)
  fighterContainer.forEach(fighter => fighter.addEventListener('click', selectFighter))
}

window.addEventListener('DOMContentLoaded', init)