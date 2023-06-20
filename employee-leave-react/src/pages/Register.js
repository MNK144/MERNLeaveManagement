import React from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useState } from "react";

const Register = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("employee");

  const handleRegister = () => {
    AuthService.register({});
  };
  return (
    <div id="auth">
      <div class="container">
        <div class="row">
          <div class="col-md-5 col-sm-12 mx-auto">
            <div class="card pt-4">
              <div class="card-body">
                <div class="text-center mb-5">
                  <h3>Register</h3>
                </div>
                <form action="employee.html">
                  <div class="form-group position-relative">
                    <label for="username">Name</label>
                    <div class="position-relative">
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="form-group position-relative">
                    <label for="username">Email</label>
                    <div class="position-relative">
                      <input
                        type="text"
                        class="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="form-group position-relative">
                    <div class="clearfix">
                      <label for="password">Password</label>
                    </div>
                    <div class="position-relative">
                      <input
                        type="password"
                        class="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="form-group position-relative">
                    <label for="username">Role</label>
                    <div class="position-relative">
                      <select
                        class="form-control"
                        onSelect={(e) => {
                          console.log("e", e.target.value);
                        }}
                      >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>
                  </div>
                  <div class="clearfix">
                    <button
                      class="btn btn-primary float-end"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                    <button
                      class="btn btn-primary"
                      onClick={() => history.push("/auth/login")}
                    >
                      Login
                    </button>
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

export default Register;
