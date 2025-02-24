import React, { useState } from "react";
import SideBar from "./SideBar";
import { ref, useRef } from "react";
import Modal from "./modal";

function AddProjects({ handleUpdate, cancel }) {
  const modalShow = useRef();
  const dateModal = useRef();
  const titleT = useRef();
  const descriptionT = useRef();
  const dueDateT = useRef();
  function CurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const date = String(today.getDate()).padStart(2, "0"); //padStart (denotes length of string, string need to be padded at first)
    const month = String(today.getMonth() + 1).padStart(2, "0"); //Note: month start at zero
    return `${year}-${month}-${date}`;
  }

  const valDate = CurrentDate();

  function handleSubmit() {
    if (
      titleT.current.value === "" ||
      descriptionT.current.value === "" ||
      dueDateT.current.value === ""
    ) {
      modalShow.current.open();
      return;
    }
    if (new Date(valDate) > new Date(dueDateT.current.value)) {
      dateModal.current.open();
      return;
    }
    handleUpdate(
      titleT.current.value,
      descriptionT.current.value,
      dueDateT.current.value
    );
    titleT.current.value = "";
    descriptionT.current.value = "";
    dueDateT.current.value = "";
  }
  return (
    <>
      <Modal ref={modalShow}>
        <p className="text-stone-900 font-semibold text-xl m-1">
          All fields are required
        </p>
      </Modal>
      <Modal ref={dateModal}>
        <p className="text-stone-900 font-semibold text-xl m-1">
          The date should not be in the past. Please choose a future date.
        </p>
      </Modal>
      <div
        style={{
          transform: "translateX(20px)",
          boxSizing: "border-box",
          padding: "45px",
        }}
        className="w-2/3"
      >
        <div className="flex" style={{ justifyContent: "flex-end" }}>
          <button
            className="text-stone-900 font-semibold"
            onClick={() => cancel()}
          >
            Cancel
          </button>{" "}
          <button
            className="bg-stone-900 text-stone-200 relative left-3 w-20 h-10 rounded-md font-semibold"
            onClick={() => handleSubmit(event)}
          >
            Save
          </button>
        </div>
        <form>
          <label>TITLE</label>
          <br></br>
          <input
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            type="text"
            ref={titleT}
          />
          <br></br>
          <label>DESCRIPTION</label>
          <br></br>
          <textarea
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            rows={6}
            ref={descriptionT}
          ></textarea>
          <br></br>
          <label>DUE DATE</label>
          <br></br>
          <input
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            type="date"
            ref={dueDateT}
            min={valDate}
          />
        </form>
      </div>
    </>
  );
}

export default AddProjects;
