import React, { useState } from "react";
import { login } from "../services/loginService";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  //FIXME: on back button pressed, the login screen is showing for few mili
  window.history.forward();
  window.onunload = async function () {
    return;
  };

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
    // try {
    const responseData = await login(loginData);
    console.log(responseData);
    console.log(loginData);
    const data = responseData.data;
    console.log(data);
    console.log(data.email);
    if (loginData.email === data.email) {
      if (data.roles === "Receptionist") {
        // show receptionist dashboard
        toast.success("Welcome!");

        navigate("/receptionist-dashboard", {
          state: {
            r_id: data.e_id,
          },
        });
      } else if (data.roles === "Doctor") {
        toast.success("Welcome!");
        // show doctor dashboard
        navigate("/doctor-dashboard", {
          state: {
            d_id: data.e_id,
          },
        });
      } else if (data.roles === "Admin") {
        toast.success("Welcome!");
        navigate("/admin-dashboard", {
          state: {
            a_id: data.e_id,
          },
        });
      } else {
      }
    } else {
      // incorrect email or password
      toast.error("Incorrect email or password");
    }
    // } catch (error) {
    //   toast.error("Incorrect email or password");
    //   handleAuthentication(error.response, navigate, "/login");
    // }
  }

  return (
    <div className="formPage">
      <div className="container" style={{ width: "500px" }}>
        <div className="title">LOGIN</div>
        <div className="content">
          <form onSubmit={onSubmit}>
            <div className="user-details">
              <div className="input-box" style={{ width: "100%" }}>
                <InputField
                  title={"Email"}
                  name={"email"}
                  type={"email"}
                  value={loginData.email}
                  placeholder={"Email"}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box" style={{ width: "100%" }}>
                <InputField
                  title={"Password"}
                  name="password"
                  type="password"
                  value={loginData.password}
                  placeholder={"Password"}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="LOGIN" />
            </div>
            <div style={{ textAlign: "right" }}>
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
