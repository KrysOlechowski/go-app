import React, { FC, useCallback, useEffect, useState } from "react";
import { combineBlocks, addRandomBlocks } from "../../logic/blocks-logic";
import styled from "styled-components/macro";
import * as _ from "lodash";
import { v4 as uuidv4 } from "uuid";
type Props = {};

export const Game: FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);
  //todo: nie działa bez konkretnych wartości dla new position.
  const [gameGrid, setGameGrid] = useState([
    [
      {
        value: 2,
        active: "old",
        position: {
          x: 0,
          y: 0,
        },
        newPosition: {
          x: 0,
          y: 0,
        },
      },
      {
        value: 2,
        active: "old",
        position: {
          x: 0,
          y: 1,
        },
        newPosition: {
          x: 0,
          y: 1,
        },
      },
      {
        value: 0,
        active: "old",
        position: {
          x: 0,
          y: 2,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
      {
        value: 0,
        active: "old",
        position: {
          x: 0,
          y: 3,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
    ],
    [
      {
        value: 0,
        active: "old",
        position: {
          x: 1,
          y: 0,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
      {
        value: 0,
        active: "old",
        position: {
          x: 1,
          y: 1,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
      {
        value: 0,
        active: "old",
        position: {
          x: 1,
          y: 2,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
      {
        value: 0,
        active: "old",
        position: {
          x: 1,
          y: 3,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
    ],
    [
      {
        value: 0,
        active: "old",
        position: {
          x: 2,
          y: 0,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
      {
        value: 0,
        active: "old",
        position: {
          x: 2,
          y: 1,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
      {
        value: 0,
        active: "old",
        position: {
          x: 2,
          y: 2,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
      {
        value: 0,
        active: "old",
        position: {
          x: 2,
          y: 3,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
    ],
    [
      {
        value: 0,
        active: "old",
        position: {
          x: 3,
          y: 0,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
      {
        value: 0,
        active: "old",
        position: {
          x: 3,
          y: 1,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
      {
        value: 0,
        active: "old",
        position: {
          x: 3,
          y: 2,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
      {
        value: 0,
        active: "old",
        position: {
          x: 3,
          y: 3,
        },
        newPosition: {
          x: null,
          y: null,
        },
      },
    ],
  ]);

  const onKeyPressed = useCallback(
    (e) => {
      if (!isLoading) {
        const newGrid = combineBlocks(e.key, gameGrid)
          .then((grid: any) => {
            console.log("we have a move + grid :");
            console.log(grid);
            // const withRandom = addRandomBlocks(grid);
            const withRandom = grid;
            setGameGrid(withRandom);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log("we dont have a move :" + err);
            setIsLoading(false);
          });
      }
      setIsLoading(true);
    },
    [gameGrid, combineBlocks, isLoading, addRandomBlocks]
  );

  useEffect(() => {
    const copiedGrid = _.cloneDeep(gameGrid);
    const withRandom = copiedGrid;
    // const withRandom = addRandomBlocks(copiedGrid);
    setGameGrid(withRandom);
  }, []);

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
                    <div className="value">{el.value}</div>
                    <div className="position">
                      <div style={{ fontSize: "11px" }}>prev position :</div>X :{" "}
                      {el.position?.x}, Y : {el.position?.y}
                    </div>
                    <div className="position">
                      <div style={{ fontSize: "11px" }}>new position :</div>X :{" "}
                      {el.newPosition?.x}, Y : {el.newPosition?.y}
                    </div>
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
  display: flex;
  flex-direction: column;
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

  .value {
    font-size: 36px;
  }

  .position {
    font-size: 16px;
  }
`;
