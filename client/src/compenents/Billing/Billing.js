import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Billing.css";
import Details from "./Details";
import Payment from "./Payment";
import "./Billing.css";

const Billing = () => {
  const path = useLocation().pathname;
  let newpath = path.split("/");
  newpath = newpath.slice(-1);
  newpath = newpath.join();

  return (
    <div
      className=" noti-body"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        marginLeft: "10px",
        height: "80vh",
      }}
    >
      <nav aria-label="breadcrumb" style={{ marginLeft: "2rem" }}>
        <ol className="breadcrumb" style={{ paddingTop: "2rem" }}>
          <li
            className={
              newpath === "detail" || newpath === "billing"
                ? `breadcrumb-item active`
                : `breadcrumb-item`
            }
          >
            <Link to="/dashboard/billing/detail">Billing</Link>
          </li>
          <li
            className={
              newpath === "payment"
                ? `breadcrumb-item active`
                : `breadcrumb-item`
            }
            aria-current="page"
          >
            <Link to="/dashboard/billing/payment">Payment</Link>
          </li>
        </ol>
      </nav>
      {path === "/dashboard/billing/payment" ? <Payment /> : <Details />}
    </div>
  );
};

export default Billing;
