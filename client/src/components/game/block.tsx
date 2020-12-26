import React, { FC, useEffect, useState } from "react";
import styled from "styled-components/macro";

type Props = {
  status?: any;
  position?: number;
  prevPosition?: number;
  value?: number;
  top?: number;
  left?: number;
};

export const Block: FC<Props> = ({ position, value, top, left }) => {
  const [prevPosition, setPrevPosition] = useState<null | number>(null);
  const [newPosition, setNewPosition] = useState<null | number>(null);

  useEffect(() => {
    position && !newPosition && setNewPosition(position);
  }, [position, newPosition]);

  useEffect(() => {
    if (position) {
      setPrevPosition(newPosition);
      setNewPosition(position);
    }
  }, [position, newPosition]);

  return (
    <>
      <BlockDiv top={top} left={left}>
        <div style={{ fontSize: "43px" }}> {value}</div>
        <div style={{ fontSize: "20px" }}>pos: {newPosition}</div>
        <div style={{ fontSize: "20px" }}>prev: {prevPosition}</div>
      </BlockDiv>
    </>
  );
};

interface BlockInterface {
  top?: number;
  left?: number;
}

const BlockDiv = styled.div<BlockInterface>`
  box-sizing: border-box;
  position: absolute;
  width: 125px;
  height: 125px;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  transition: all 1s ease;
`;
