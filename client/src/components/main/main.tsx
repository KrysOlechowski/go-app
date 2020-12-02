import React, { FC } from "react";
// import ReactResizeDetector from 'react-resize-detector';

type Props = {};

export const Main: FC<Props> = () => {
  const tasks = fetch("http://localhost:5000/test")
    .then((response) => response.json())
    .then((data) => null);
  return (
    <>
      <h1>Main Component</h1>
    </>
  );
};
