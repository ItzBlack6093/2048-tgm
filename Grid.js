const GRID_SIZE = 4
const CELL_SIZE = 15
const CELL_GAP = 0


export default class Grid {
  #cells

  constructor(gridElement) {
    gridElement.style.setProperty("--grid-size", GRID_SIZE)
    gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`)
    gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`)
    this.#cells = createCellElements(gridElement).map((cellElement, index) => {
      return new Cell(
        cellElement,
        index % GRID_SIZE,
        Math.floor(index / GRID_SIZE)
      )
    })
  }

  get cells() {
    return this.#cells
  }

  get cellsByRow() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || []
      cellGrid[cell.y][cell.x] = cell
      return cellGrid
    }, [])
  }

  get cellsByColumn() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || []
      cellGrid[cell.x][cell.y] = cell
      return cellGrid
    }, [])
  }

  get #emptyCells() {
    return this.#cells.filter(cell => cell.tile == null)
  }

  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length)
    return this.#emptyCells[randomIndex]
  }
}

class Cell {
  #cellElement
  #x
  #y
  #tile
  #mergeTile

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement
    this.#x = x
    this.#y = y
  }

  get x() {
    return this.#x
  }

  get y() {
    return this.#y
  }

  get tile() {
    return this.#tile
  }

  set tile(value) {
    this.#tile = value
    if (value == null) return
    this.#tile.x = this.#x
    this.#tile.y = this.#y
  }

  get mergeTile() {
    return this.#mergeTile
  }

  set mergeTile(value) {
    this.#mergeTile = value
    if (value == null) return
    this.#mergeTile.x = this.#x
    this.#mergeTile.y = this.#y
  }

  canAccept(tile) {
    return (
      this.tile == null ||
      (this.mergeTile == null && this.tile.value === tile.value)
    )
  }

  mergeTiles() {
    var score = 0
    var grade = parseInt(document.getElementById("grade").textContent)
    var scoreAdd = parseInt(document.getElementById("score").textContent)
    if (this.tile == null || this.mergeTile == null) return
    this.tile.value = this.tile.value + this.mergeTile.value
    score += this.tile.value
    this.mergeTile.remove()
    this.mergeTile = null
    document.getElementById("score").innerHTML = score + scoreAdd
    
    //grade
    var mflag
    // Get the stopwatch element
    var stopwatchElement = document.getElementById('stopwatch');

// Get the text content of the element
    var stopwatchText = stopwatchElement.textContent;

// Extract the first two zeros
    var firstTwoZeros = stopwatchText.substring(0, 2);


    const tiles = document.querySelectorAll('.tile');
    let gradeUpdated = false;
    tiles.forEach(tile => {
        if (gradeUpdated) return;
        const tileNumber = parseInt(tile.innerText);
        const currentScore = parseInt(document.getElementById("score").textContent);

      // Rank Checking
      // Grand Master

        if (tileNumber === 2048 && grade === 1 && currentScore >= 20000 ) {
          if( mflag || firstTwoZeros < 11) {
            console.log(`Advance to grade M`);
            document.getElementById("grade").innerHTML = "M";  
        }
          else if (mflag && firstTwoZeros < 11) {
              
            console.log(`Advance to grade GM`);
            document.getElementById("grade").innerHTML = "GM";  
        }       
          startSound("gm.wav")
          document.getElementById("grade").className = "gradeup";
          setTimeout(function(){
            document.getElementById("grade").className = "grade";
          },1001) 
          gradeUpdated = true;
          stopStopwatch() 
        }
        // 1

        else if (tileNumber === 1024 && grade === 2 && currentScore >= 10000 ) {
          startSound("rank.wav")
          console.log(`Advance to grade 1`);
          document.getElementById("grade").innerHTML = 1;  
          document.getElementById("grade").className = "gradeup";
          setTimeout(function(){
            document.getElementById("grade").className = "grade";
          },1001) 
         gradeUpdated = true;
      }
              // 2
       else if (tileNumber === 512 && grade === 3 && currentScore >= 5000 ) {
        startSound("rank.wav")
          console.log(`Advance to grade 2`);
          document.getElementById("grade").innerHTML = 2;  
          document.getElementById("grade").className = "gradeup";
          setTimeout(function(){
            document.getElementById("grade").className = "grade";
          },1001) 
          gradeUpdated = true;
      }
              // 3

      else if (tileNumber === 256 && grade === 4 && currentScore >= 2000 ) {
          let mflag = firstTwoZeros < 2 ? true : false; // Master Flag   
          if (mflag) {
            console.log(`M-Flag Togggle`)
          }    
            startSound("rank.wav");
            console.log(`Advance to grade 3`);
            document.getElementById("grade").innerHTML = 3; 
            document.getElementById("grade").className = "gradeup"; 
            setTimeout(function(){
                document.getElementById("grade").className = "grade";
            }, 1001);
            gradeUpdated = true;
          
      }
        // 4

        else if (tileNumber === 128 && grade === 5 && currentScore >= 900 ) {
          startSound("rank.wav")
          console.log(`Advance to grade 4`);
          document.getElementById("grade").innerHTML = 4;  
          document.getElementById("grade").className = "gradeup";
          setTimeout(function(){
            document.getElementById("grade").className = "grade";
          },1001) 
          gradeUpdated = true;
      }
        // 5

        else if (tileNumber === 64 && grade === 6 && currentScore >= 340 ) {
          startSound("rank.wav")
          console.log(`Advance to grade 5`);
          document.getElementById("grade").innerHTML = 5; 
          document.getElementById("grade").className = "gradeup"; 
          setTimeout(function(){
            document.getElementById("grade").className = "grade";
          },1001) 
          gradeUpdated = true;
      }
      // 6
        else if (tileNumber === 32 && grade === 7 && currentScore >= 160 ) {
          startSound("rank.wav")
          console.log(`Advance to grade 6`);
          document.getElementById("grade").innerHTML = 6; 
          document.getElementById("grade").className = "gradeup";
          setTimeout(function(){
            document.getElementById("grade").className = "grade";
          },1001) 
          gradeUpdated = true;
      }
      // 7
        else if (tileNumber === 16 && grade === 8 && currentScore >= 80 ) {
          startSound("rank.wav")
          console.log(`Advance to grade 7`);
          document.getElementById("grade").innerHTML = 7;  
          document.getElementById("grade").className = "gradeup";
          setTimeout(function(){
            document.getElementById("grade").className = "grade";
          },1001) 
         gradeUpdated = true;
        }
        // 8
        else if (tileNumber === 8 && grade === 9 && currentScore >= 25 ) {
            startSound("rank.wav")
            console.log(`Advance to grade 8`);
            document.getElementById("grade").innerHTML = 8;    
            document.getElementById("grade").className = "gradeup";
            setTimeout(function(){
              document.getElementById("grade").className = "grade";
            },1001)
          gradeUpdated = true;
        }
    });
}

}


function createCellElements(gridElement) {
  const cells = []
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cells.push(cell)
    gridElement.append(cell)
  }
  return cells
}

var sound

function stopSound(){
  
	try{
		sound.pause();
	}
	catch(e){
		console.log(e);
	}
}

function startSound(filename){
	try{
		stopSound();
		sound = new Audio(filename);
		sound.play();
	}
	catch(e){
		console.log(e);
	}
}
