import React from "react";
import SubTasks from "./SubTasks";

function SideBar({ display, displayTasks, subTaskDisplay }) {
  return (
    <div className="pt-11">
      <aside
        className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl"
        style={{ height: "calc(100vh - 44px)" }} //Note: in calc if there is no space between 100vh-50px it won't get calculated
      >
        <h1 className="font-medium tracking-wider text-2xl">YOUR PROJECTS</h1>
        <br></br>
        <button
          className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
          onClick={display}
        >
          + Add Projects
        </button>
        <div className="pt-5">
          {displayTasks?.map((task, index) => (
            <button
              key={index}
              className="w-full pb-2 text-stone-200 text-base hover:bg-stone-800 hover:rounded-sm pt-2"
              onClick={() => subTaskDisplay(task.id)}
              style={{ cursor: "pointer" }}
            >
              {task.title}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
