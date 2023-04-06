import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/loginService";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function handleChange(event) {
    const { value } = event.target;
    setEmail(value);
  }

  async function onSubmit(event) {
    event.preventDefault();
    const responseData = await forgotPassword(email);
    console.log(responseData);
    const data = responseData.data;
    console.log(data);
    if (data) {
      toast.success(
        "New Password has been sent to your email, Please use it to reset your password"
      );
      navigate(-1);
    } else {
      toast.error("Incorrect email");
    }
  }

  return (
    <div className="formPage">
      <div className="container">
        <div className="title">Forgot Password</div>
        <div className="content">
          <form>
            <div className="user-details">
              <div className="input-box">
                <InputField
                  title={"Email"}
                  name={"email"}
                  type={"email"}
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="button">
              <input type="button" value="Reset Password" onClick={onSubmit} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
