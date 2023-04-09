import React, { useState } from "react";
import { login } from "../services/loginService";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginData((pv) => {
      return {
        ...pv,
        [name]: value,
      };
    });
  }

  function forgotPassword() {
    navigate("/forgot-password");
  }

  async function onSubmit(event) {
    event.preventDefault();
    const responseData = await login(loginData);
    console.log(responseData);
    console.log(loginData);
    const data = responseData.data;
    console.log(data);
    if (loginData.email === data.email) {
      toast.success("Welcome!");
      if (data.role === "Receptionist") {
        // show receptionist dashboard

        navigate("/receptionist-dashboard", {
          state: {
            r_id: data.e_id,
          },
        });
      } else if (data.role === "Doctor") {
        // show doctor dashboard
        navigate("/doctor-dashboard", {
          state: {
            d_id: data.e_id,
          },
        });
      } else if (data.role === "Admin") {
        navigate("/admin-dashboard", {
          state: {
            a_id: data.e_id,
          },
        });
      } else {
        // when role is not corretly selected
        toast.error("Incorrect role selected");
      }
    } else {
      // incorrect email or password
      toast.error("Incorrect email or password");
    }
  }

  return (
    <div className="formPage">
      <div className="container">
        <div className="title">LOGIN</div>
        <div className="content">
          <form onSubmit={onSubmit}>
            <div className="user-details">
              <div className="input-box">
                <InputField
                  title={"Email"}
                  name={"email"}
                  type={"email"}
                  value={loginData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <InputField
                  title={"Password"}
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="LOGIN" />
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                className="button2"
                style={{ color: "black", fontWeight: "300", fontSize: "16px" }}
                onClick={forgotPassword}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
