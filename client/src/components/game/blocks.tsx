import React, { FC, useCallback, useEffect, useState } from "react";
import { Block } from "./block";
import styled from "styled-components/macro";
import { moveBlocksToLeft } from "./logic";
import * as _ from "lodash";

type Props = {};

export const Blocks: FC<Props> = () => {
  const [grid, setGrid] = useState([
    { position: 1, value: 0 },
    { position: 2, value: 0 },
    { position: 3, value: 0 },
    { position: 4, value: 2 },
    { position: 5, value: 0 },
    { position: 6, value: 0 },
    { position: 7, value: 0 },
    { position: 8, value: 0 },
    { position: 9, value: 0 },
    { position: 10, value: 0 },
    { position: 11, value: 0 },
    { position: 12, value: 0 },
    { position: 13, value: 0 },
    { position: 14, value: 0 },
    { position: 15, value: 0 },
    { position: 16, value: 0 },
  ]);

  const rootGrid = {
    ArrowUp: [1, 2, 3, 4],
    ArrowRight: [4, 8, 12, 16],
    ArrowDown: [13, 14, 15, 16],
    ArrowLeft: [1, 5, 9, 13],
  };

  const onKeyPressed = useCallback(
    (e: any) => {
      const direction = e.key;
      if (direction === "ArrowLeft") {
        const newGrid = moveBlocksToLeft(grid);
        console.log(newGrid);
      }
    },
    [grid]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyPressed);
    return () => {
      document.removeEventListener("keydown", onKeyPressed);
    };
  }, [onKeyPressed]);

  const handleMove = useCallback(
    (e) => {
      const direction = e.target.innerText;
      if (direction === "Right") {
        const newGrid = moveBlocksToLeft(grid);
        console.log(newGrid);
      }
    },
    [grid]
  );

  return (
    <>
      <div>
        <BlocksWrapper>
          <Block value={0} top={0} left={0} position={1} />
          <Block value={0} top={0} left={125} position={2} />
          <Block value={3} top={0} left={250} position={3} />
          <Block value={4} top={0} left={375} position={4} />
          <Block value={5} top={125} left={0} position={5} />
          <Block value={6} top={125} left={125} position={6} />
          <Block value={7} top={125} left={250} position={7} />
          <Block value={8} top={125} left={375} position={8} />
          <Block value={9} top={250} left={0} position={9} />
          <Block value={10} top={250} left={125} position={10} />
          <Block value={11} top={250} left={250} position={11} />
          <Block value={12} top={250} left={375} position={12} />
          <Block value={13} top={375} left={0} position={13} />
          <Block value={14} top={375} left={125} position={14} />
          <Block value={15} top={375} left={250} position={15} />
          <Block value={16} top={375} left={375} position={16} />
        </BlocksWrapper>
      </div>
      <div>
        <button onClick={handleMove}>Right</button>
      </div>
    </>
  );
};

const BlocksWrapper = styled.div`
  position: relative;
  border: 1px solid blue;
  width: 500px;
  height: 500px;
`;
