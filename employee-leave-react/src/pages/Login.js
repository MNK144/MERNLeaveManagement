import React from "react";
import { useState } from "react";
import AuthService from "../services/AuthService";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const res = await AuthService.login({email, password});
      console.log("res",res);
      localStorage.setItem("email",res.data.email);
      localStorage.setItem("accessToken",res.data.accessToken);
      localStorage.setItem("refreshToken",res.data.refreshToken);
      history.push("/app/home");
    }
    catch(e) {
      console.log("err",e);
    }
  }

  return (
    <div id="auth">
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-sm-12 mx-auto">
            <div className="card pt-4">
              <div className="card-body">
                <div className="text-center mb-5">
                  <h3>Login</h3>
                </div>
                <form onSubmit={(e)=>e.preventDefault()}>
                  <div className="form-group position-relative">
                    <label for="username">Email</label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group position-relative">
                    <div className="clearfix">
                      <label for="password">Password</label>
                    </div>
                    <div className="position-relative">
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="clearfix">
                    <button className="btn btn-primary float-end" onClick={handleLogin}>Login</button>
                    <button className="btn btn-primary" onClick={()=>history.push("/auth/register")}>Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
