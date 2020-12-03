import React, { FC, useCallback, useEffect, useState } from "react";
import {
  moveWholeBlocksToRight,
  checkIfBlockMoved,
} from "../../logic/blocks-logic";
import styled from "styled-components/macro";
import * as _ from "lodash";
import { v4 as uuidv4 } from "uuid";
type Props = {};

export const Game: FC<Props> = () => {
  const [gameGrid, setGameGrid] = useState([
    [
      { value: 0, active: "old" },
      { value: 0, active: "old" },
      { value: 0, active: "old" },
      { value: 0, active: "old" },
    ],
    [
      { value: 2, active: "old" },
      { value: 2, active: "old" },
      { value: 2, active: "old" },
      { value: 2, active: "old" },
    ],
    [
      { value: 2, active: "old" },
      { value: 0, active: "old" },
      { value: 4, active: "old" },
      { value: 0, active: "old" },
    ],
    [
      { value: 2, active: "old" },
      { value: 2, active: "old" },
      { value: 2, active: "old" },
      { value: 2, active: "old" },
    ],
  ]);

  const onKeyPressed = useCallback(
    (e) => {
      const oldGrid = _.cloneDeep(gameGrid);

      const grid = moveWholeBlocksToRight(gameGrid, e.key);
      const checkIfMoved = checkIfBlockMoved(oldGrid, grid);
      const withRandom = addRandomBlocks(grid);
      console.log(withRandom);
      console.log(checkIfMoved);
      checkIfMoved && setGameGrid(withRandom);
    },
    [gameGrid]
  );

  useEffect(() => {
    const copiedGrid = _.cloneDeep(gameGrid);
    const withRandom = addRandomBlocks(copiedGrid);
    setGameGrid(withRandom);
  }, []);

  const addRandomBlocks = (grid: any) => {
    console.log("%c%s", "color: #aa00ff", "addRandom :");
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
    const randomNumber = Math.floor(Math.random() * numberOfEmptyBlocks);
    const randomEmptyBlock = arrayOfEmptyBlocks[randomNumber];
    grid[randomEmptyBlock.row][randomEmptyBlock.index] = {
      value: 2,
      active: "new",
    };

    console.log(randomEmptyBlock);
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
