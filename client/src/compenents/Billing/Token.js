import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { movee } from "../../redux/actions/authAction";
import { BsFiles } from "react-icons/bs";

const Token = () => {
  const dispatch = useDispatch();
  const [copied, setCopied] = useState("");
  const { data } = useSelector((state) => state.his);
  const { data: code } = useSelector((state) => state.code);
  const tokengen = () => {
    dispatch(movee());
  };

  return (
    <>
      {data?.length === 0 ? (
        <div
          className=" noti-body"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            marginLeft: "10px",
            height: "80vh",
          }}
        >
          <h5 style={{ textAlign: "center", paddingTop: "20px" }}>
            You need to subcribe first
          </h5>
        </div>
      ) : (
        <div
          className=" noti-body"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            marginLeft: "10px",
            height: "80vh",
          }}
        >
          <div
            style={{
              width: "80%",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h5 style={{ marginLeft: "10px", marginTop: "5rem" }}>Token:</h5>
            <div className="d-flex flex-row align-content-center justify-content-center">
              <input
                style={{ width: "100%" }}
                type="text"
                value={code}
                disabled
              />
              <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
                <BsFiles
                  style={{
                    width: "25px",
                    height: "25px",
                    marginLeft: "5px",
                    cursor: "pointer",
                  }}
                />
              </CopyToClipboard>
              {copied ? <span style={{ color: "green" }}> Copied</span> : null}
            </div>
            <button
              style={{
                width: "30%",
                margin: "auto",
                marginTop: "1rem",
                height: "40px",
                backgroundColor: "#dee3f7",
              }}
              onClick={tokengen}
              className="btn btn-light"
            >
              Generate Token!!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Token;
