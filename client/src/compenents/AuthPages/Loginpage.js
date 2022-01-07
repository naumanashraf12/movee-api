import React, { useEffect, useState } from "react";
import "./loginpage.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../redux/actions/authAction";
function Loginpage({ history }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  const { user, isAuthenticated, error, registered } = useSelector(
    (state) => state.auth
  );
  const { reseted } = useSelector((state) => state.reset);
  console.log(user);
  useEffect(() => {
    if (isAuthenticated && !token) {
      localStorage.setItem("token", user?.Document);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Sign In Successfully!!!",
        showConfirmButton: true,
        timer: 2000,
      });
      history.push("/dashboard");
      window.location.pathname = "/dashboard";
    }

    if (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error,
        showConfirmButton: true,
        timer: 2000,
      });
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, history, error]);

  useEffect(() => {
    if (localStorage.getItem("token") || isAuthenticated) {
      history.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please fill all fields",
        timer: 2000,
        showConfirmButton: true,
      });
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("loggingin");
    const valid = validation();
    if (valid > 0) return;

    dispatch(login(formData));
  };

  const validation = () => {
    let errors = {};
    if (!formData.password) errors.password = "Password is required";
    if (!formData.username) errors.username = "User Name is required";

    setErrors(errors);
    return Object.keys(errors).length;
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row align-items-center min-vh-100 Background">
          <div
            className="offset-md-4 col-md-4 offset-md-3 h-100  d-flex   align-items-center justify-content-center"
            style={{ flexDirection: "column" }}
          >
            <h1
              style={{
                textAlign: "center",
                fontSize: "25px",
                color: "#5A5A5A",
                fontFamily: "Ubuntu",
                fontStyle: "normal",
                fontWeight: "900",
                marginBottom: "3rem",
              }}
            >
              Login to your account
            </h1>

            <form
              onSubmit={handleSubmit}
              onChange={({ target: { name, value } }) => {
                setFormData({ ...formData, [name]: value });
              }}
              className="w-75"
            >
              <div className="form-group mb-3">
                <label
                  for="exampleInputEmail1 w-100"
                  style={{ color: "#696969", fontWeight: "bolder" }}
                >
                  User Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="User Name"
                  name="username"
                />
              </div>
              <div className="form-group mb-3">
                <label
                  for="exampleInputPassword1"
                  style={{ color: "#696969", fontWeight: "bolder" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  name="password"
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  height: "40px",
                  color: "#FFFFFF",
                  backgroundColor: "#37ADEB",
                }}
                className="btn btn-light"
              >
                Log in
              </button>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <span>Forget Your Password? </span>
                <Link
                  to="/forgetpassword"
                  style={{ color: "#077fb0", fontWeight: "bolder" }}
                >
                  Reset
                </Link>
              </div>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <span>Do Not Have An Account </span>
                <Link
                  className="d-sm-inline d-block"
                  to="/createaccount"
                  style={{ color: "#077fb0", fontWeight: "bolder" }}
                >
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
