import { useNavigate } from "react-router-dom";

function ADashboard() {
  const navigate = useNavigate();

  function addEmployee() {
    navigate("/employee-registration");
  }

  return (
    <div className="paddingPage ">
      <button onClick={addEmployee}>Add Employee</button>
    </div>
  );
}

export default ADashboard;
