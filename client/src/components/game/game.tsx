import React, { FC, useEffect, useState } from "react";
import { moveWholeBlocksToRight } from "../../logic/blocks-logic";
import styled from "styled-components/macro";

type Props = {};

export const Game: FC<Props> = () => {
  const [gameGrid, setGameGrid] = useState([
    [
      { value: 2, active: false },
      { value: 2, active: false },
      { value: 2, active: false },
      { value: 2, active: false },
    ],
    [
      { value: 4, active: false },
      { value: 4, active: false },
      { value: 2, active: false },
      { value: 2, active: false },
    ],
    [
      { value: 0, active: false },
      { value: 4, active: false },
      { value: 0, active: false },
      { value: 4, active: false },
    ],
    [
      { value: 0, active: false },
      { value: 0, active: false },
      { value: 4, active: false },
      { value: 4, active: false },
    ],
  ]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      onKeyPressed(e.key);
    });
    return () => {
      console.log("unmount");
    };
  }, []);

  const onKeyPressed = (key: string) => {
    console.log(key);

    const grid = moveWholeBlocksToRight(gameGrid, key);
    setGameGrid(grid);
  };

  return (
    <>
      <h1>Game Component</h1>
      <div style={{ border: "1px solid red", width: "500px", height: "500px" }}>
        {gameGrid.map((row) => {
          return (
            <Row>
              {row.map((el) => {
                console.log(el);
                return <Block>{el.value}</Block>;
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

const Block = styled.div`
  box-sizing: border-box;
  width: 125px;
  height: 125px;
  border: 1px solid green;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 45px;
`;
