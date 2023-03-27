import React, { useState } from "react";
import loginService from "../services/loginService";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "receptionist",
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

  async function onSubmit(event) {
    event.preventDefault();
    console.log("clicked");
    const responseData = await loginService(loginData);
    console.log(responseData);
    console.log(loginData);
    const data = responseData.data;
    console.log(data);
    if (loginData.email === data.email) {
      if (loginData.role === "receptionist") {
        // show receptionist dashboard
        navigate("/receptionist-dashboard");
      } else if (loginData.role === "doctor") {
        // show doctor dashboard
        navigate("/doctor-dashboard", {
          state: {
            d_id: data.e_id,
          },
        });
      } else if (loginData.role === "admin") {
        navigate("/admin-dashboard");
      }
    } else {
      // incorrect email or password
      console.log("incorrect email or password or role");
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
              <div className="select-box">
                <select
                  value={loginData.role}
                  name="role"
                  onChange={handleChange}
                >
                  <option value="receptionist">Receptionist</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="button">
              <input type="submit" value="LOGIN" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
