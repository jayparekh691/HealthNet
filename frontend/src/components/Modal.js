import React from "react";

const Modal = ({
  fieldWorkerList,
  reassign,
  closeModal,
  data,
  patientID,
  handleOptionChange,
}) => {
  return (
    <div className="modal-wrapper" style={{ padding: 10 }}>
      <div className="modal-container">
        <label className="popup-heading">Select Field Worker</label>
        <div className="popup-select-box">
          <select onChange={handleOptionChange}>
            <option hidden>Select</option>
            {fieldWorkerList
              .filter((f) => {
                return f.e_id !== data.e_id;
              })
              .map((f, i) => {
                return (
                  <option value={f.e_id} key={f.e_id}>
                    {f.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <span style={{ marginRight: "10px" }}>
            <button
              className="button"
              value={data.e_id}
              onClick={() => reassign(data.e_id, patientID)}
            >
              Reassign
            </button>
          </span>
          <span style={{ marginRight: "10px" }}>
            <button className="button" onClick={closeModal}>
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
