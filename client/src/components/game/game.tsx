import React, { FC } from "react";
import { moveWholeBlocksToRight } from "../../logic/blocks-logic";
import styled from "styled-components";
type Props = {};

export const Game: FC<Props> = () => {
  const wholeGameGrid = [
    [{ value: 2 }, { value: 0 }, { value: 0 }, { value: 2 }],
    [{ value: 4 }, { value: 4 }, { value: 2 }, { value: 2 }],
    [{ value: 0 }, { value: 4 }, { value: 0 }, { value: 4 }],
    [{ value: 0 }, { value: 0 }, { value: 4 }, { value: 4 }],
  ];

  const movedWholeGrid = moveWholeBlocksToRight(wholeGameGrid);

  console.log(movedWholeGrid);

  const render = movedWholeGrid.map((row) => {
    return (
      <Row>
        {row.map((el) => {
          console.log(el);
          return <Block>{el.value}</Block>;
        })}
      </Row>
    );
  });

  return (
    <>
      <h1>Game Component</h1>
      <div style={{ border: "1px solid red", width: "500px", height: "500px" }}>
        {render}
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
`;
