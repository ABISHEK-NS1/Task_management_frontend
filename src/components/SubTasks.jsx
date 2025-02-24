import React, { useRef, useState, useEffect } from "react";
import "./SubTaskScrollerStyles.css";

function SubTasks({
  id,
  title,
  due,
  description,
  descriptionSub,
  displayAddNew,
  deleteTsk,
  handleDeleteSubTask,
  updateSubTasks,
}) {
  /*const [descriptionOfSub, setDescriptionOfSub] = useState({});
  const [individualSubTasks, setIndividualSubTasks] = useState();*/
  const inputTask = useRef();
  const [remainingHeight, setRemainingHeight] = useState();

  /*function handleTaskInput(event) {
    setIndividualSubTasks(inputTask.current.value);
  }*/
  function handleTaskUpdate() {
    if (inputTask.current.value.trim() === "") return;
    /*setDescriptionOfSub((prev) => ({
      ...prev,
      [title]: prev[title]
        ? [...prev[title], individualSubTasks]
        : [individualSubTasks],
    }));
    inputTask.current.value = "";
    setIndividualSubTasks("");*/
    updateSubTasks(inputTask.current.value);
    inputTask.current.value = "";
  }
  function deleteIt() {
    deleteTsk(id);
  }
  const projectInfoRef = useRef();

  useEffect(() => {
    if (projectInfoRef.current) {
      let height = projectInfoRef.current.offsetHeight;
      const innerHeight = window.innerHeight;
      let addTaskHeight = 300;
      setRemainingHeight(innerHeight - height - addTaskHeight);
    }
  }, []); 

  const formattedDate = new Date(due).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <>
      <div style={{ transform: "translateX(20px)" }} className="pt-28 w-2/3">
        <div ref={projectInfoRef} id="ProjectInfo">
          <div className="flex flex-row justify-between">
            <h1 className="text-stone-900 text-4xl font-bold">{title}</h1>
            <button className="hover:text-red-500" onClick={deleteIt}>
              Delete
            </button>
          </div>
          <p className="pt-2">{formattedDate}</p>
          <br></br>
          <p className="text-stone-600 font-medium text-lg whitespace-pre-wrap">
            {description}
          </p>
          <div className="border-2 border-gray-400 mt-4"></div>
        </div>
        <div>
          <h1 className="text-stone-900 text-3xl font-bold pt-3 tracking-wide pb-2">
            Tasks
          </h1>
          <input
            type="text"
            className="w-2/5 pt-1 border-b-2 focus:border-stone-600 focus:outline-none pl-1 pb-1 bg-stone-200 text-stone-600 mr-3"
            ref={inputTask}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleTaskUpdate();
              }
            }}
          ></input>{" "}
          <button
            className="text-stone-700 font-semibold"
            onClick={handleTaskUpdate}
          >
            Add task
          </button>
          <div
            className="bg-stone-100 mt-16 rounded-md relative overflow-y-auto custom-scrollbar"
            style={{ maxHeight: remainingHeight }}
          >
            {descriptionSub[id]?.length > 0 &&
              descriptionSub[id].map((task, index) => {
                return (
                  <div className="flex flex-row pt-3 justify-between pr-2 pb-3 pl-3 flex-wrap">
                    <p
                      key={index}
                      className="text-stone-700 font-semibold max-w-[70%] break-words"
                    >
                      {task}
                    </p>
                    <button
                      className="text-stone-500 font-medium hover:text-red-400 pr-3"
                      onClick={() => handleDeleteSubTask(index)}
                    >
                      Clear
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SubTasks;
