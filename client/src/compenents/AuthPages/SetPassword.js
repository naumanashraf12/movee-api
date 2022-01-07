import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import validator from "validator";
import Swal from "sweetalert2";
import { clearErrors, resetpassword } from "../../redux/actions/authAction";

const SetPassword = ({ history }) => {
  const { reseted, loading, message, error } = useSelector(
    (state) => state.reset
  );
  const { email } = useSelector((state) => state.ottp);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetpassword({ ...formData, email }));
  };
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("");
    } else {
      setErrorMessage(
        "  Password must contain 15 characters, 1 uppercase, 1 lowercase 1 number and 1 special csae character"
      );
    }
  };
  useEffect(() => {
    if (!email) {
      history.push("/");
    }
    if (reseted) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: true,
        timer: 4000,
      });
      window.location.pathname = "/";
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
  }, [dispatch, reseted, history, error]);
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
              }}
            >
              Reset password
            </h1>

            <div
              className="d-flex justify-content-center align-items-center"
              style={{ marginTop: "10px" }}
            >
              <form
                action=""
                className="w-75"
                onChange={({ target: { name, value } }) =>
                  setFormData({ ...formData, [name]: value })
                }
                onSubmit={handleSubmit}
              >
                <div className="form-group mb-3">
                  <div className="mb-3">
                    <label
                      for="exampleInputEmail1 w-100"
                      style={{ color: "#696969", fontWeight: "bolder" }}
                    >
                      New Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Password"
                      name="newPassword"
                      onChange={(e) => validate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      for="exampleInputEmail1 w-100"
                      style={{ color: "#696969", fontWeight: "bolder" }}
                    >
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="confirm password"
                      name="confirmPassword"
                    />
                  </div>
                </div>
                <p style={{ color: "red" }}>{error}</p>
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    type="submit"
                    style={{
                      width: "50%",
                      marginTop: "1rem",
                      height: "40px",
                      color: "#FFFFFF",
                      backgroundColor: "#37ADEB",
                    }}
                    className="btn btn-light"
                  >
                    save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
