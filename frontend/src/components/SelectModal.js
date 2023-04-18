import React from "react";

const SelectModal = ({
  list,
  submitButton,
  closeModal,
  data,
  handleOptionChange,
  heading,
  buttonName,
}) => {
  console.log(list);
  return (
    <div className="modal-wrapper" style={{ padding: 10 }}>
      <div className="modal-container">
        <label className="popup-heading">{heading}</label>
        <div className="popup-select-box">
          <select onChange={handleOptionChange}>
            <option hidden>Select</option>
            {list.map((l, i) => {
              return (
                <option value={l.e_id} key={l.e_id}>
                  {l.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <span style={{ marginRight: "10px" }}>
            <button
              className="button"
              value={data.pid}
              onClick={() => submitButton(data.pid)}
            >
              {buttonName}
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

export default SelectModal;
