import React, { forwardRef, useImperativeHandle, useRef } from "react";

const Modal = forwardRef(function Modal({ children }, ref) {
  const modelHandle = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        modelHandle.current.showModal();
      },
    };
  });
  return (
    <dialog
      ref={modelHandle}
      className="p-6 rounded-md relative backdrop:bg-stone-900/90"
    >
      <form method="dialog">
        <button className="absolute top-2 right-3 text-lg" aria-label="Close">
          x
        </button>
      </form>
      {children}
    </dialog>
  );
});

export default Modal;
