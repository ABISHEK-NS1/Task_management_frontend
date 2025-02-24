import React from "react";
import utils from "../utils/utils";

function CreateNew({ display }) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <img src={utils("no-projects.png")} alt="no projects" className="w-28" />
      <h2 className="text-stone-900 font-bold text-2xl">No Project Selected</h2>
      <ul>
        <li className="text-stone-600 text-center text-lg">
          Select a project or get started to new one
        </li>
      </ul>
      <button
        className="px-5 py-3 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
        onClick={display}
      >
        Create new project
      </button>
    </div>
  );
}

export default CreateNew;
