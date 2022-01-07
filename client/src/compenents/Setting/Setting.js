import React, { useEffect, useState } from "react";
import Select from "react-select";
import validator from "validator";
import { useSelector, useDispatch } from "react-redux";

import {
  updateUserPassword,
  updateOrginization,
} from "../../redux/actions/authAction";
import Swal from "sweetalert2";

const Setting = () => {
  const dispatch = useDispatch();
  const [Organization, setOrganization] = useState("");
  const [organizationData, setOrganizationData] = useState({});
  const [formData, setFormData] = useState({});
  const OrganizationOptions = [
    { label: "film", value: "film" },
    { label: "finance", value: "finance" },
    { label: "startup", value: "startup" },
    { label: "television", value: "television" },
  ];
  const changeOrganization = (value) => {
    setOrganization(value);
    setOrganizationData({
      ...organizationData,
      organizationSector: value.label,
    });
  };
  const { updated, message } = useSelector((state) => state.password);

  const { messageOrg, updateOrg } = useSelector((state) => state.orginization);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(updateUserPassword(formData));
    setFormData({});
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
        "  Password must contain 15 characters, 1 uppercase, 1 lowercase, 1number and 1 special csae character"
      );
    }
  };

  useEffect(() => {
    if (updated) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Updated Password Successfully!!!",
        showConfirmButton: true,
        timer: 2000,
      });
    }
    if (updated === false && typeof updated === "boolean") {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: message,
        showConfirmButton: true,
        timer: 2000,
      });
    }
  }, [updated, message]);
  useEffect(() => {
    if (updateOrg) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Updated Orginization Successfully!!!",
        showConfirmButton: true,
        timer: 2000,
      });
    }
    if (updateOrg === false && typeof updateOrg === "boolean") {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: messageOrg || "Unhandled error",
        showConfirmButton: true,
        timer: 2000,
      });
    }
  }, [updateOrg, messageOrg]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateOrginization(organizationData));
    setOrganizationData("");
  };
  return (
    <div
      className=" noti-body"
      style={{ backgroundColor: "white", borderRadius: "10px" }}
    >
      <div className="row">
        <div className="col-md-6">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h5 style={{ margin: "10px" }}>Authentication</h5>
            <p style={{ color: "grey", margin: "10px" }}>
              Manage general account Authentication Settings
            </p>
          </div>
        </div>
        <div className="col-md-6">
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
                    Current Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="exampleEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Password"
                    name="currentPassword"
                  />
                </div>
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
                    id="password"
                    aria-describedby="emailHelp"
                    placeholder="Password"
                    name="newPassword"
                    onChange={(e) => {
                      validate(e.target.value);
                    }}
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
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
                    placeholder="confirm password"
                    name="confirmPassword"
                  />
                </div>
              </div>
              <p style={{ color: "red" }}>{errorMessage || ""}</p>
              <div className="d-flex justify-content-center align-items-center">
                <button
                  type="submit"
                  style={{
                    width: "50%",
                    marginTop: "1rem",
                    height: "40px",
                    backgroundColor: "#dee3f7",
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
      <div className="row">
        <div className="col-md-6">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h5 style={{ margin: "10px" }}>Organization</h5>
            <p style={{ color: "grey", margin: "10px" }}>
              Manage general arganization settings
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <form
              action=""
              className="w-75"
              onChange={({ target: { name, value } }) => {
                setOrganizationData({ ...organizationData, [name]: value });
              }}
              onSubmit={handleUpdate}
            >
              <div className="form-group mb-3">
                <div className="mb-3">
                  <label
                    for="exampleInputEmail1 w-100"
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
                    id="org"
                    aria-describedby="emailHelp"
                    placeholder="Organization name"
                    name="organizationName"
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <div className="mb-3">
                  <label
                    for="exampleInputEmail1 w-100"
                    style={{ color: "#696969", fontWeight: "bolder" }}
                  >
                    Organization search
                  </label>
                  <Select
                    options={OrganizationOptions}
                    value={Organization}
                    onChange={changeOrganization}
                    placeholder="organizations"
                    name="organizationSearch"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <button
                  type="submit"
                  style={{
                    width: "50%",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    height: "40px",
                    backgroundColor: "#dee3f7",
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
  );
};

export default Setting;
