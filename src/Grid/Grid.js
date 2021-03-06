import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Node from "./Node";
import { generate, dijkstra } from "../redux/actions";
import { numCols } from "../Constants";
import { useSelector } from "react-redux";

const Grid = (props) => {
  const grid = useSelector((state) => state.grid);
  const [pressed, setPressed] = useState(false);
  console.log(grid);
  useEffect(() => {}, [grid]);

  const handleMouseDown = () => {
    setPressed(true);
  };

  const handleMouseUp = () => {
    setPressed(false);
  };

  return (
    grid && (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 1.8vw)`,
        }}
        className="grid"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => {
            return <Node pressed={pressed} row={i} col={k} key={`${i}-${k}`} />;
          })
        )}
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  grid: state.grid.grid,
});

const mapDispatchToProps = (dispatch) => ({
  generate: () => dispatch(generate()),
  dijkstra: (grid) => dispatch(dijkstra(grid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
