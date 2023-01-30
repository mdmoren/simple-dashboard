import Tasks from "./Tasks";
import Weather from "./Weather";
import Quote from "./Quote";
import DateCard from "./DateCard";
import { useState, useRef } from "react";

const Dashboard = () => {
  const [cards, setCards] = useState([
    { component: <Tasks /> },
    { component: <Weather /> },
    { component: <Quote /> },
    { component: <DateCard /> },
  ]);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    let _cards = [...cards];

    const draggedItemContent = _cards.splice(dragItem.current, 1)[0];

    _cards.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setCards(_cards);
  };

  return (
    <div className="flex flex-col w-full lg:h-screen bg-gradient-to-tl from-[#c0392b] via-[#27ae60] to-[#2980b9]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full h-full p-10">
        {cards.map(({ component }, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            className="flex h-[400px] lg:h-full justify-center items-center 
            overflow-y-auto bg-[#00000030] rounded-lg"
          >
            {component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
