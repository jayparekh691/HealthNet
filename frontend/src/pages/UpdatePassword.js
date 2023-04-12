import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { updatePassword } from "../services/loginService";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleAuthentication } from "../utils/authentication";

function UpdatePassword() {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [employeeId, setEmployeeId] = useState(null);
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  const [passwordObj, setPasswordObj] = useState({
    old_pass: "",
    new_pass: "",
  });

  useEffect(() => {
    setEmployeeId(state.employeeId);
  }, [state.employeeId]);

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "confirmNewPassword") {
      setconfirmNewPassword(value);
    } else {
      setPasswordObj((pv) => {
        return {
          ...pv,
          [name]: value,
        };
      });
    }
  }

  async function onUpdatePassword(event) {
    event.preventDefault();
    if (confirmNewPassword !== passwordObj.new_pass) {
      toast.error("New password and Confirm New Password don't match");
    } else {
      const responseData = await updatePassword(employeeId, passwordObj);
      const data = responseData.data;
      console.log(data);
      if (data === "Success") {
        toast.success("Password Successfully changed");
        navigate(-2);
      } else {
        toast.error(
          "Could not change password, check if you have given the correct old password"
        );
      }
    }
  }

  return (
    <div className="formPage">
      <div className="container">
        <div className="title">Update Password</div>
        <div
          className="content"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form onSubmit={onUpdatePassword}>
            <div className="user-details" style={{ display: "block" }}>
              <div className="input-box" style={{ width: "100%" }}>
                <InputField
                  title={"Old Password"}
                  name="old_pass"
                  type="password"
                  value={passwordObj.old_pass}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box" style={{ width: "100%" }}>
                <InputField
                  title={"New Password"}
                  name="new_pass"
                  type="password"
                  value={passwordObj.new_pass}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box" style={{ width: "100%" }}>
                <InputField
                  title={"Confirm New Password"}
                  name="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="button" style={{ width: "100%" }}>
              <input type="submit" value="Update Password" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdatePassword;
