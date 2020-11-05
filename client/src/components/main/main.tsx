import React, { FC } from "react";
// import ReactResizeDetector from 'react-resize-detector';

type Props = {};

export const Main: FC<Props> = () => {
  const tasks = fetch("http://localhost:3000/test")
    .then((response) => response.json())
    .then((data) => console.log(data));
  return (
    <>
      <h1>Main Component</h1>
    </>
  );
};
