import React from "react";
import SignUpForm from "./SignUpForm";
const UserModal = () => {
  return (
    <div className="">
      <button
        type="button"
        class="btn btn-lg fs-3 rounded-3"
        style={{ backgroundColor: "#6f5de7", color: "white" }}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Añadir Usuario
      </button>
      {/* Live demo of modal */}
      <div
        class="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg fs-4">
          <div class="modal-content ">
            <div class="modal-header">
              <h1 class="modal-title" id="exampleModalLabel">
                Añadir Usuario
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body ">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
