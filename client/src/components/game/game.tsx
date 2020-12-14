import React, { FC, useCallback, useEffect, useState } from "react";
import {
  moveWholeBlocksToRight,
  checkIfBlockMoved,
  combineBlocks,
} from "../../logic/blocks-logic";
import styled from "styled-components/macro";
import * as _ from "lodash";
import { v4 as uuidv4 } from "uuid";
type Props = {};

//? [TODO] separate functions for each key press?

export const Game: FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gameGrid, setGameGrid] = useState([
    [
      { value: 1, active: "old" },
      { value: 1, active: "old" },
      { value: 3, active: "old" },
      { value: 4, active: "old" },
    ],
    [
      { value: 1, active: "old" },
      { value: 2, active: "old" },
      { value: 3, active: "old" },
      { value: 4, active: "old" },
    ],
    [
      { value: 1, active: "old" },
      { value: 2, active: "old" },
      { value: 3, active: "old" },
      { value: 4, active: "old" },
    ],
    [
      { value: 0, active: "old" },
      { value: 0, active: "old" },
      { value: 0, active: "old" },
      { value: 0, active: "old" },
    ],
  ]);

  // const moveBlocksToRight = (e: any) => {
  // return new Promise((resolve, reject) => {
  // const oldGrid = _.cloneDeep(gameGrid);
  // const copiedGrid = _.cloneDeep(gameGrid);
  // const grid = moveWholeBlocksToRight(copiedGrid, e.key);
  // const checkIfMoved = checkIfBlockMoved(oldGrid, grid);
  // const withRandom = checkIfMoved && addRandomBlocks(grid);

  // if (checkIfMoved) {
  // resolve(withRandom);
  // } else {
  // reject("no move");
  // }
  // });
  // };

  const moveBlocksUp = () => {
    return new Promise((resolve, reject) => {
      let oldGrid = _.cloneDeep(gameGrid);
      let copiedGrid = _.cloneDeep(gameGrid);

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          console.log(oldGrid[j][i]);
          oldGrid[i][j] = oldGrid[j][i];
          copiedGrid[i][j] = copiedGrid[j][i];
        }
      }
      // console.log(copiedGrid);
      const grid = moveWholeBlocksToRight(copiedGrid);
      // console.log(grid);
      const checkIfMoved = checkIfBlockMoved(oldGrid, grid);
      let withRandom = [];

      if (checkIfMoved) {
        withRandom = addRandomBlocks(grid);
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            // console.log(oldGrid[j][i]);
            withRandom[j][i] = withRandom[i][j];
          }
        }
      }

      if (checkIfMoved) {
        resolve(withRandom);
      } else {
        reject("no move");
      }
    });
  };

  const moveBlocksToLeft = (e: any) => {
    return new Promise((resolve, reject) => {
      const oldGrid = _.cloneDeep(gameGrid);
      const copiedGrid = _.cloneDeep(gameGrid);
      for (let i = 0; i < 4; i++) {
        oldGrid[i] = oldGrid[i].reverse();
        copiedGrid[i] = copiedGrid[i].reverse();
      }
      const grid = moveWholeBlocksToRight(copiedGrid);
      const checkIfMoved = checkIfBlockMoved(oldGrid, grid);

      let withRandom = [];
      if (checkIfMoved) {
        withRandom = addRandomBlocks(grid);
        for (let i = 0; i < 4; i++) {
          withRandom[i] = withRandom[i].reverse();
        }
      }

      if (checkIfMoved) {
        resolve(withRandom);
      } else {
        reject("no move");
      }
    });
  };

  const onKeyPressed = useCallback(
    (e) => {
      setIsLoading(true);

      if (!isLoading) {
        const newGrid = combineBlocks(e.key, gameGrid)
          .then((grid: any) => {
            console.log("we have a move + grid :");
            console.log(grid);
            const withRandom = addRandomBlocks(grid);
            setGameGrid(withRandom);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log("we dont have a move :" + err);
            setIsLoading(false);
          });
      }

      // if (e.key === "ArrowRight") {
      //   moveBlocksToRight(e)
      //     .then((grid: any) => {
      //       setGameGrid(grid);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // } else if (e.key === "ArrowLeft") {
      //   moveBlocksToLeft(e)
      //     .then((grid: any) => {
      //       setGameGrid(grid);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // } else if (e.key === "ArrowUp") {
      //   moveBlocksUp()
      //     .then((grid: any) => {
      //       setGameGrid(grid);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }
    },
    [gameGrid, combineBlocks, isLoading]
  );

  useEffect(() => {
    const copiedGrid = _.cloneDeep(gameGrid);
    const withRandom = addRandomBlocks(copiedGrid);
    setGameGrid(withRandom);
  }, []);

  const addRandomBlocks = (grid: any) => {
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

  useEffect(() => {
    document.addEventListener("keydown", onKeyPressed);
    return () => {
      document.removeEventListener("keydown", onKeyPressed);
    };
  }, [onKeyPressed]);

  return (
    <>
      <h1 onClick={() => console.log(gameGrid)}>Game Component</h1>
      <div style={{ height: "100px" }}>
        <h1>{isLoading ? "Loading..." : ""}</h1>
      </div>
      <div style={{ border: "1px solid red", width: "500px", height: "500px" }}>
        {gameGrid.map((row, i) => {
          return (
            <Row key={uuidv4()}>
              {row.map((el, i) => {
                return (
                  <Block key={uuidv4()} active={el.active}>
                    {el.value}
                  </Block>
                );
              })}
            </Row>
          );
        })}
      </div>
    </>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

interface BlockInterface {
  active: string;
}

const Block = styled.div<BlockInterface>`
  color: black;
  box-sizing: border-box;
  width: 125px;
  height: 125px;
  border: 1px solid green;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 45px;

  ${({ active }) =>
    active === "combined" &&
    `
    background-color:green;
  `}
  ${({ active }) =>
    active === "new" &&
    `
    background-color:blue;
  `}
`;
