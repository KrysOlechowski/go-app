import * as _ from "lodash";

export const combineBlocks = (key: string, gameGrid: any) => {
  const prevGrid = _.cloneDeep(gameGrid);
  let currGrid = _.cloneDeep(gameGrid);
  let grid: any[][] = [];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      currGrid = setPrevPositions(currGrid);
      if (key === "ArrowRight") {
        grid = moveWholeBlocksToRight(currGrid);
        console.log("right");
      } else if (key === "ArrowLeft") {
        grid = moveBlocksToLeft(currGrid);
        console.log("left");
      } else if (key === "ArrowDown") {
        grid = moveBlocksDown(currGrid);
        console.log("down");
      } else if (key === "ArrowUp") {
        grid = moveBlocksUp(currGrid);
        console.log("up");
      }

      const isBlocksMoved = checkIfBlockMoved(prevGrid, grid);
      console.log(isBlocksMoved);

      if (isBlocksMoved) {
        grid = setNewPositions(grid);
        return resolve(grid);
      } else {
        return reject("noMove");
      }
    }, 100);
  });
};

const moveBlocksUp = (gameGrid: any) => {
  let copiedGrid = _.cloneDeep(gameGrid);
  let grid: any = [[], [], [], []];

  grid = rotateGridToLeft(copiedGrid);

  grid = reverseGrid(grid);

  grid = moveWholeBlocksToRight(grid);

  grid = reverseGrid(grid);
  grid = rotateGridToRight(grid);

  return grid;
};

const moveBlocksToLeft = (grid: any) => {
  let copiedGrid = _.cloneDeep(grid);
  copiedGrid = reverseGrid(copiedGrid);
  copiedGrid = moveWholeBlocksToRight(copiedGrid);
  copiedGrid = reverseGrid(copiedGrid);
  return copiedGrid;
};

const moveBlocksDown = (gameGrid: any) => {
  let copiedGrid = _.cloneDeep(gameGrid);
  let grid: any = [[], [], [], []];

  grid = rotateGridToLeft(copiedGrid);

  grid = moveWholeBlocksToRight(grid);

  grid = rotateGridToRight(grid);

  return grid;
};

const setPrevPositions = (gameGrid: any) => {
  const copiedGrid: any = _.cloneDeep(gameGrid);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (copiedGrid[i][j].value > 0) {
        copiedGrid[i][j].position.x = copiedGrid[i][j].newPosition.x;
        copiedGrid[i][j].position.y = copiedGrid[i][j].newPosition.y;
      }
    }
  }
  return copiedGrid;
};

const setNewPositions = (grid: any) => {
  const copiedGrid: any = _.cloneDeep(grid);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (copiedGrid[i][j].value > 0) {
        copiedGrid[i][j].newPosition.x = i;
        copiedGrid[i][j].newPosition.y = j;
      }
    }
  }

  return copiedGrid;
};
//left here ->newPosition and old position is kind of working but be careful about the addRandomFunc:
export const moveWholeBlocksToRight = (grid: any) => {
  const copiedGrid: any = _.cloneDeep(grid);
  let newWholeArray = [];
  for (let k = 0; k < 4; k++) {
    for (let i = copiedGrid.length - 1; i >= 0; i--) {
      copiedGrid[k][i].active = "old";
      for (let j = i - 1; j >= 0; j--) {
        // console.log("k : " + k + ", i : " + i + ", j : " + j);
        if (copiedGrid[k][i].value !== 0) {
          if (
            copiedGrid[k][j].value > 0 &&
            copiedGrid[k][j].value !== copiedGrid[k][i].value
          ) {
            break;
          } else if (copiedGrid[k][i].value === copiedGrid[k][j].value) {
            copiedGrid[k][i].value =
              copiedGrid[k][i].value + copiedGrid[k][j].value;
            copiedGrid[k][i].active = "combined";
            copiedGrid[k][j].value = 0;

            copiedGrid[k][i].position.x = k;
            copiedGrid[k][i].position.y = i;
            break;
          }
        }
      }
    }
    const blocksWithValues: any[] = [];
    const blocksWithoutValues: any[] = [];
    for (let i = 0; i < copiedGrid.length; i++) {
      if (copiedGrid[k][i].value > 0) {
        blocksWithValues.push(copiedGrid[k][i]);
      } else {
        // copiedGrid[k][i].newPosition.x = k;
        // copiedGrid[k][i].newPosition.y = i;
        blocksWithoutValues.push(copiedGrid[k][i]);
      }
    }
    const newArray = [];
    // console.log("blocksWithValues");
    // console.log(blocksWithValues);

    // console.log("blocksWithoutValues");

    // console.log(blocksWithoutValues);

    newArray.push(...blocksWithoutValues, ...blocksWithValues);
    newWholeArray.push(newArray);
  }

  return newWholeArray;
};

const reverseGrid = (grid: any) => {
  let copiedGrid = _.cloneDeep(grid);
  for (let i = 0; i < 4; i++) {
    copiedGrid[i] = copiedGrid[i].reverse();
  }
  return copiedGrid;
};

const rotateGridToLeft = (grid: any) => {
  let copiedGrid = _.cloneDeep(grid);
  let newGrid: any = [[], [], [], []];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newGrid[i][j] = copiedGrid[j][i];
    }
  }
  return newGrid;
};

const rotateGridToRight = (grid: any) => {
  let copiedGrid = _.cloneDeep(grid);
  let newGrid: any = [[], [], [], []];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newGrid[j][i] = copiedGrid[i][j];
    }
  }
  return newGrid;
};

export const checkIfBlockMoved = (oldGrid: any, newGrid: any) => {
  let moved = false;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (oldGrid[i][j].value !== newGrid[i][j].value) {
        moved = true;
      }
    }
  }
  return moved;
};

export const addRandomBlocks = (grid: any) => {
  const arrayOfEmptyBlocks = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j].value === 0) {
        arrayOfEmptyBlocks.push({
          row: i,
          index: j,
        });
      }
    }
  }
  const numberOfEmptyBlocks = arrayOfEmptyBlocks.length;
  if (numberOfEmptyBlocks === 0) {
    return grid;
  }
  const randomNumber = Math.floor(Math.random() * numberOfEmptyBlocks);
  const randomEmptyBlock = arrayOfEmptyBlocks[randomNumber];
  grid[randomEmptyBlock.row][randomEmptyBlock.index] = {
    value: 2,
    active: "new",
  };

  return grid;
};
