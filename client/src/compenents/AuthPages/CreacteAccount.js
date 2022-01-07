import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./loginpage.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import {
  clearErrors,
  registeredUser,
  signUp,
} from "../../redux/actions/authAction";
import Loading from "../Loading";

const CreacteAccount = ({ history }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [organization, setOrganization] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState({});
  const options = useMemo(() => countryList().getData(), []);
  const OrganizationOptions = [
    { label: "film", value: "film" },
    { label: "finance", value: "finance" },
    { label: "startup", value: "startup" },
    { label: "television", value: "television" },
  ];
  console.log(organization);

  const changeHandler = (value) => {
    setCountry(value);
    setFormData({ ...formData, country: value.label });
  };

  const changeOrganization = (value) => {
    setOrganization(value);
    setFormData({ ...formData, organization: value.label });
  };
  const { loading, error, registered } = useSelector((state) => state.auth);

  useEffect(() => {
    if (registered) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Registered Successfully!!!",
        showConfirmButton: true,
        timer: 2000,
      });
      dispatch(registeredUser());
      history.push("/");
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
  }, [dispatch, history, error, registered]);

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
    if (errors.confirmPassword) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: errors.confirmPassword,
        timer: 2000,
        showConfirmButton: true,
      });
    }
  }, [errors]);
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
        " Password must contain 15 characters, 1 uppercase, 1 lowercase 1 number and 1 special csae character"
      );
    }
  };

  const validation = () => {
    let errors = {};
    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.country) errors.country = "Country is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.organization)
      errors.organization = "Organization is required";
    if (!formData.confirmPassword)
      errors.confirmPassword = "Confirm Password is required";
    if (!formData.email) errors.email = "Email is required";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Password is not matched";

    setErrors(errors);
    return Object.keys(errors).length;
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();

    const valid = validation();
    if (valid > 0) return;

    dispatch(signUp(formData));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container-fluid">
            <div className="row align-items-center min-vh-100 Background">
              <div
                className="offset-md-4 col-md-4 offset-md-3 h-100 d-flex align-items-center justify-content-center"
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
                    marginBottom: "50px",
                  }}
                >
                  Create An Account
                </h1>
                <form
                  onSubmit={handleSubmit}
                  onChange={({ target: { name, value } }) => {
                    setFormData({ ...formData, [name]: value });
                  }}
                  action=""
                  className="w-75"
                >
                  <div className="form-group mb-3">
                    <div className="d-md-flex mb-3">
                      <div className="seperate">
                        <label
                          for="exampleInputEmail1 w-100"
                          style={{
                            color: "#696969",
                            fontWeight: "bolder",
                          }}
                        >
                          First Name
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          aria-describedby="emailHelp"
                          placeholder="First Name"
                          name="firstName"
                        />
                      </div>
                      <div className="seperate margin">
                        <label
                          for="exampleInputEmail1 w-100"
                          style={{ color: "#696969", fontWeight: "bolder" }}
                        >
                          Last Name
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          id="lastname"
                          aria-describedby="emailHelp"
                          placeholder="Last Name"
                          name="lastName"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1 w-100"
                        style={{ color: "#696969", fontWeight: "bolder" }}
                      >
                        User Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        aria-describedby="emailHelp"
                        placeholder="Username"
                        name="username"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1 w-100"
                        style={{ color: "#696969", fontWeight: "bolder" }}
                      >
                        Email address
                      </label>

                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Email Address"
                        name="email"
                      />
                    </div>
                    <label
                      htmlfor="country"
                      style={{ color: "#696969", fontWeight: "bolder" }}
                    >
                      Country
                    </label>
                    <Select
                      options={options}
                      value={country}
                      onChange={changeHandler}
                      placeholder="Select Country"
                      name="country"
                    />
                    <div className="d-md-flex mb-3 mt-3">
                      <div className="seperate">
                        <label
                          htmlfor="orginization w-100"
                          style={{
                            color: "#696969",
                            fontWeight: "bolder",
                          }}
                        >
                          Organization Name
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          id="orginizationname"
                          aria-describedby="emailHelp"
                          placeholder="Organization name"
                          name="organizationName"
                        />
                      </div>
                      <div className="seperate margin">
                        <label
                          for="exampleInputEmail1 w-100"
                          style={{ color: "#696969", fontWeight: "bolder" }}
                        >
                          Organization search
                        </label>
                        <Select
                          options={OrganizationOptions}
                          value={organization}
                          onChange={changeOrganization}
                          placeholder="organizations"
                          name="organization"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1 w-100"
                        style={{ color: "#696969", fontWeight: "bolder" }}
                      >
                        Password
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        aria-describedby="emailHelp"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => validate(e.target.value)}
                      />
                    </div>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      {errorMessage}
                    </span>
                    <div className="mb-3">
                      <label
                        htmlfor="exampleInputEmail1 w-100"
                        style={{ color: "#696969", fontWeight: "bolder" }}
                      >
                        Confirm Password
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        id="confirmpassword"
                        aria-describedby="emailHelp"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                      />
                    </div>
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
                      Return to Log In
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreacteAccount;
