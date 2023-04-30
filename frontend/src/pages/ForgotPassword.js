import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/loginService";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import { LoadingIndicator } from "../components/LoadingIndicator";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { value } = event.target;
    setEmail(value);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const responseData = await forgotPassword(email);
    setLoading(false);
    console.log(responseData);
    const data = responseData.data;
    console.log(data);
    if (data) {
      toast.success(
        "New Password has been sent to your email, Please use it to reset your password"
      );
      navigate("/update-password", {
        state: {
          employeeId: data.e_id,
        },
      });
    } else {
      toast.error(
        "This email is not registered! Please enter your registered email"
      );
    }
  }

  function login() {
    navigate("/login");
  }

  return (
    <div className="formPage">
      <div className="container" style={{ width: "500px" }}>
        <div className="title">Forgot Password</div>
        <div
          className="content"
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <form onSubmit={onSubmit} style={{ flex: 1 }}>
            <div className="user-details">
              <div className="input-box" style={{ width: "100%" }}>
                <InputField
                  title={"Email"}
                  name={"email"}
                  type={"email"}
                  value={email}
                  onChange={handleChange}
                  placeholder={"Email"}
                  required
                />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Reset Password" />
            </div>
            <div style={{ textAlign: "right" }}>
              <button
                className="button2"
                style={{ color: "black", fontWeight: "300", fontSize: "16px" }}
                onClick={login}
              >
                Back to Login?
              </button>
            </div>
          </form>
        </div>
        {loading && <LoadingIndicator />}
      </div>
    </div>
  );
}
export default ForgotPassword;
