import React, { useState } from "react";
import { login } from "../services/loginService";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleAuthentication } from "../utils/authentication";

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
    try {
      const responseData = await login(loginData);
      console.log(responseData);
      console.log(loginData);
      const data = responseData.data;
      console.log(data);
      if (loginData.email === data.email) {
        if (data.roles === "Receptionist") {
          // show receptionist dashboard
          toast.success("Welcome!");
          navigate("/receptionist-dashboard", {
            state: {
              r_id: data.e_id,
            },
            replace: true,
          });
        } else if (data.roles === "Doctor") {
          toast.success("Welcome!");
          // show doctor dashboard
          navigate("/doctor-dashboard", {
            state: {
              d_id: data.e_id,
            },
            replace: true,
          });
        } else if (data.roles === "Admin") {
          toast.success("Welcome!");
          navigate("/admin-dashboard", {
            state: {
              a_id: data.e_id,
            },
            replace: true,
          });
        } else {
        }
      } else {
        // incorrect email or password
      }
    } catch (error) {
      toast.error("Incorrect email or password");
      handleAuthentication(error.response, navigate, "/login");
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
