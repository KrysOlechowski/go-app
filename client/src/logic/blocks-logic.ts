


export const moveWholeBlocksToRight=(row:any)=>{
   const newWholeArray=[]
for(let k=0;k<4;k++){
   for (let i = row.length - 1; i >= 0; i--) {
      for (let j = i - 1; j >= 0; j--) {
  
        if (row[k][i].value !== 0) {
          if (row[k][j].value > 0 && row[k][j].value !== row[k][i].value) {
            console.log("%c%s", "color: #ff0000", "mamy przeszkode");
            break;
          } else if (row[k][i].value === row[k][j].value) {
            console.log("%c%s", "color: #ff0000", "mamy pare");
            row[k][i].value = row[k][i].value + row[k][j].value;
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
