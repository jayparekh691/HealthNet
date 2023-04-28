import React from "react";

const ConfirmModal = ({ submitText, onSubmit, closeModal, param1, param2 }) => {
  return (
    <div className="modal-wrapper" style={{ padding: 10 }}>
      <div className="confirmmodal-container">
        <label className="popup-heading">Confirm</label>

        <h3 style={{ textAlign: "center", padding: "20px 0px" }}>
          Are you sure ?
        </h3>

        <div style={{ textAlign: "center" }}>
          <span style={{ marginRight: "10px" }}>
            <button
              className="button3"
              onClick={() => onSubmit(param1, param2)}
            >
              {submitText}
            </button>
          </span>
          <span style={{ marginRight: "10px" }}>
            <button className="button3" onClick={closeModal}>
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
