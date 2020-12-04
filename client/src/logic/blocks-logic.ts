


export const moveWholeBlocksToRight=(row:any,key:string)=>{
  let lol=0
   const newWholeArray=[]
for(let k=0;k<4;k++){

   for (let i = row.length - 1; i >= 0; i--) {
    row[k][i].active="old"
      for (let j = i - 1; j >= 0; j--) {
        
        console.log("k :"+k+"i :"+i)
        lol++
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
