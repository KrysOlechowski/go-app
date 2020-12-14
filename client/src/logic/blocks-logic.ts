import * as _ from "lodash";


export const combineBlocks=(key:string,gameGrid:any)=>{

      const prevGrid = _.cloneDeep(gameGrid);
      const currGrid = _.cloneDeep(gameGrid);
      let grid: any[][]=[]
    return new Promise((resolve,reject)=>{

setTimeout(() => {
  if(key==="ArrowRight"){
    grid = moveWholeBlocksToRight(currGrid)
    console.log(grid)
}


const isBlocksMoved = checkIfBlockMoved(prevGrid,grid)
console.log(isBlocksMoved)


if(isBlocksMoved){
  return resolve(grid)
}else{
  return reject("noMove")
}
}, 5000);
  

    })

}


export const moveWholeBlocksToRight=(row:any)=>{
   const newWholeArray=[]
for(let k=0;k<4;k++){

   for (let i = row.length - 1; i >= 0; i--) {
    row[k][i].active="old"
      for (let j = i - 1; j >= 0; j--) {
        
        if (row[k][i].value !== 0) {
          
          if (row[k][j].value > 0 && row[k][j].value !== row[k][i].value) {
            break;
          } else if (row[k][i].value === row[k][j].value) {
            row[k][i].value = row[k][i].value + row[k][j].value;
            row[k][i].active="combined"
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
      newWholeArray.push(newArray)
}

  return newWholeArray
}




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
}
