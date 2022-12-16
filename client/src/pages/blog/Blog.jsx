import "./blog.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useRef } from "react";
import { useFetcher } from "react-router-dom";
const data = [
  {
    id: "a1",
    name: "asdsad",
    age: 0,
  },
  {
    id: "a2",
    name: "1asd2",
    age: 1,
  },
  {
    id: "a3",
    name: "haas",
    age: 2,
  },
  {
    id: "a4",
    name: "msdi",
    age: 3,
  },
  { id: "a5", name: "zod", age: 4 },
  {
    id: "a6",
    name: "em",
    age: 5,
  },
];
function Blog() {
  const [users, setUsers] = useState("asd");
  const stain = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [locate, setLocate] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [initX, setInitX] = useState(0);
  function handleMove(e) {
    const stainDOM = stain.current;
    if (!isDown) {
      return;
    }

    let newStartX = e.pageX - stainDOM.offsetLeft;
    let newLocate = locate + newStartX - startX;
    setLocate(newLocate);

    setStartX(newStartX);
  }
  function handleMouseDown(e) {
    const stainDOM = stain.current;
    e.persist();
    setStartX(e.pageX - stainDOM.offsetLeft);
    setIsDown(true);
  }
  useEffect(() => {
    const stainDOM = stain.current;
    stainDOM.style.cssText = `transform: translate(${locate}px,0px)`;
    setCurrentX(initX + locate);
  }, [locate]);
  useEffect(() => {
    console.log(currentX);
  }, [currentX]);
  useEffect(() => {
    const stainDOM = stain.current;
    setInitX(stainDOM.offsetLeft);
  }, []);
  function handleMouseLeave() {
    handleSnap();
  }
  function handleMouseUp() {
    handleSnap();
  }
  function handleSnap() {
    const stainDOM = stain.current;
    const newLocate = -(initX - 100);
    setIsDown(false);
    stainDOM.style.cssText = `transform: translate(${newLocate}px,0px)`;
    setLocate(newLocate);
    setStartX(0);
  }
  return (
    <div className="blog_page">
      <Header></Header>

      <div className="drag_zone">
        <div
          ref={stain}
          className={`stain ${isDown && "active"}`}
          onMouseMove={handleMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        ></div>
        <div className="list">
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
      </div>
    </div>
  );
}
export default Blog;
