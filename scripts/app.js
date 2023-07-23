function init() {
  const startPage = document.querySelector('.start-page')
  const hero = document.querySelector('.hero')
  const gameContainer = document.querySelector('.container')
  const grid = document.querySelector('.grid')
  
  const restartButton = document.querySelector('#restart')
  const scoreDisplay = document.querySelector('#current-score')
  const highScoreDisplay = document.querySelector('#high-score')
  const heartsDisplay = document.querySelector('#hearts')
  const currentLevelDisplay = document.querySelector('#current-level')

  // Width
  const width = 10

  // Total cells
  const cellCount = width * width

  // Starting position of the player
  const startingPosition = 94
  let currentPosition = startingPosition
  const cells = []

  function enterGame() {
    // Hide startPage and unhide gameContainer
    startPage.classList.add('hidden')
    gameContainer.classList.remove('hidden')


  }

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

  hero.addEventListener('click', enterGame)
  createGrid()
}

window.addEventListener('DOMContentLoaded', init)