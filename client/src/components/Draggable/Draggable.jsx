import React, { useEffect } from "react";
import { useState } from "react";
import "./draggable.scss";
import { useRef } from "react";
function Draggable({
  children,
  slots = 4,
  speed = 1.3,
  num,
  quantity,
  setNum,
}) {
  const dragItem = useRef();
  const [isDown, setIsDown] = useState(false);
  const [locateX, setLocateX] = useState();
  const [tslX, setTslX] = useState(0);
  useEffect(() => {
    setTslX(-num * dragItem.current.offsetWidth);
  }, [num]);
  function handleMouseMove(e) {
    if (!isDown) {
      return;
    }

    const n_tslX = (e.pageX - locateX) * speed;
    dragItem.current.style.cssText = `
        transform:translate(${tslX}px,0);
        transition: 0;
    `;
    setTslX(tslX + n_tslX);
    setLocateX(e.pageX);
  }
  function handleMouseDown(e) {
    setLocateX(e.pageX);
    setIsDown(true);
  }
  function handleMouseLeave() {
    dragEnd();
  }
  function handleMouseUp() {
    dragEnd();
  }
  function dragEnd() {
    setIsDown(false);
    const percent = tslX / dragItem.current.offsetWidth;
    let slide = Math.round(percent * slots);
    const max = quantity - slots;

    if (slide > 0) {
      slide = 0;
    }
    if (-slide > max) {
      slide = -max;
    }
    setNum(-slide / slots);
    dragItem.current.style.cssText = `
        transform:translate(${(slide / slots) * 100}%,0);
        transition: all 0.5s;
    `;
    console.log((slide / slots) * dragItem.current.offsetWidth);
    setTslX((slide / slots) * dragItem.current.offsetWidth);
  }

  return (
    <div
      className={`draggable ${isDown && "active"}`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {children && children(dragItem)}
    </div>
  );
}

export default Draggable;
