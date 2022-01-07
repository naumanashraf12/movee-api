import React, { useEffect, useState } from "react";
import "./loginpage.css";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { forgotPassword } from "../../redux/actions/authAction";
import Loading from "../Loading";

function ForgotPassword({ history }) {
  const { loading, message, sent } = useSelector((state) => state.ottp);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email: email }));
  };

  useEffect(() => {
    if (sent) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: true,
        timer: 4000,
      });
      history.push("/verifyopt");
    }
  }, [dispatch, sent, history]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
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
                    Forget Your Password?
                  </h1>
                  <span className="mb-4 w-75" style={{ textAlign: "center" }}>
                    Enter your email address to receive the code to verify your
                    email
                  </span>

                  <form onSubmit={handleSubmit} className="w-75">
                    <div className="form-group mb-3">
                      <label
                        for="exampleInputEmail1 w-100"
                        style={{ color: "#696969", fontWeight: "bolder" }}
                      >
                        Email
                      </label>

                      <input
                        type="text"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email Address"
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
                      Submit
                    </button>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                      <Link
                        to="/"
                        style={{ color: "#077fb0", fontWeight: "bolder" }}
                      >
                        Return to log in
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ForgotPassword;
