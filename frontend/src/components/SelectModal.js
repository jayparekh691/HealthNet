import React from "react";

const SelectModal = ({
  doctorList,
  addAppointment,
  closeModal,
  data,
  handleOptionChange,
}) => {
  console.log(doctorList);
  return (
    <div className="modal-wrapper" style={{ padding: 10 }}>
      <div className="modal-container">
        <label className="popup-heading">Select Doctor</label>
        <div className="popup-select-box">
          <select onChange={handleOptionChange}>
            <option hidden>Select</option>
            {doctorList.map((d, i) => {
              return (
                <option value={d.e_id} key={d.e_id}>
                  {d.name}
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
              onClick={() => addAppointment(data.pid)}
            >
              CONFIRM
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
