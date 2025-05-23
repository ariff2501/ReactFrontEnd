import react from "react";
import { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState("");
  return (
    <div className=" col sm">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <h2>Register</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary mt-3 mx-3">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
