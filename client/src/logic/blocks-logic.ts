import * as _ from "lodash";

export const combineBlocks = (key: string, gameGrid: any) => {
  const prevGrid = _.cloneDeep(gameGrid);
  const currGrid = _.cloneDeep(gameGrid);
  let grid: any[][] = [];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
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
  console.log("rotateGridToLeft");
  console.log(grid);
  grid = moveWholeBlocksToRight(grid);
  console.log("moveWholeBlocksToRight");
  console.log(grid);

  grid = rotateGridToRight(grid);
  console.log("rotateGridToRight");
  console.log(grid);

  return grid;
};

export const moveWholeBlocksToRight = (row: any) => {
  const newWholeArray = [];
  for (let k = 0; k < 4; k++) {
    for (let i = row.length - 1; i >= 0; i--) {
      row[k][i].active = "old";
      for (let j = i - 1; j >= 0; j--) {
        if (row[k][i].value !== 0) {
          if (row[k][j].value > 0 && row[k][j].value !== row[k][i].value) {
            break;
          } else if (row[k][i].value === row[k][j].value) {
            row[k][i].value = row[k][i].value + row[k][j].value;
            row[k][i].active = "combined";
            row[k][j].value = 0;
            break;
          }
        }
      }
    }
    const blockWithValues: any[] = [];
    const blocksWithoutValues: any[] = [];
    for (let i = 0; i < row.length; i++) {
      if (row[k][i].value > 0) {
        blockWithValues.push(row[k][i]);
      } else {
        blocksWithoutValues.push(row[k][i]);
      }
    }
    const newArray = [];
    newArray.push(...blocksWithoutValues, ...blockWithValues);
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
