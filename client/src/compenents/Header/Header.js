import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BsBoxArrowInRight } from "react-icons/bs";
import { useSelector } from "react-redux";
export default function Header({ active, setHandleActive }) {
  const { profile } = useSelector((state) => state.auth);
  const path = useLocation().pathname;

  const [title, setTitle] = useState("Dashboard");
  useEffect(() => {
    switch (path) {
      case "/dashboard/setting":
        setTitle("Settings");
        break;
      case "/dashboard/billing":
        setTitle("Billings");
        break;
      case "/dashboard/token":
        setTitle("Billings");
        break;

      case "/dashboard":
        setTitle("Dashboard");
        break;
      default:
        setTitle("Billings");
        break;
    }
  }, [path]);

  // main return
  return (
    <div>
      <nav className="flexBetweenCenter dashboardNavBar ">
        {/* SideBarButton */}
        <div className="d-inline d-md-none">
          <div
            onClick={() => setHandleActive(!active)}
            className={
              active
                ? " dashboardNavaBarButton activeSideBar "
                : "dashboardNavaBarButton"
            }
          >
            <div className="dashboardNavBarLine dashboardNavBarLine1"></div>
            <div className="dashboardNavBarLine dashboardNavBarLine2"></div>
            <div className="dashboardNavBarLine dashboardNavBarLine3"></div>
          </div>
        </div>
        <a class="navBrand">{title}</a>

        <div className="flexCenter navIcons">
          <h6
            style={{
              color: "grey",
              marginTop: "7px",
              marginRight: "10px",
              textTransform: 'capitalize',
            }}
          >Welcome, {`${profile?.firstName}`}</h6>
          <div
            className="flexCenter navIcons"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            <span style={{ color: "grey", fontWeight: "bolder", textTransform: "capitalize", fontSize: "1rem" }}> logout</span>
            <BsBoxArrowInRight
              style={{ width: "3rem", height: "2rem", color: "grey" }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
