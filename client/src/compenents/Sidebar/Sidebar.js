import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "../../assets/images/dashboard.js";
import GroupIcon from "../../assets/images/groupIcon";
import Prescription from "../../assets/images/prescription";
import appointment from "../../assets/images/appointment";
import accountIcon from "../../assets/images/accountIcon";
import "./Sidebar.css";
import triage from "../../assets/images/triage.js";

// doctor component
function SideBar({ active, setHandleActive }) {
  const path = useLocation().pathname;
  let newpath = path.split("/");
  newpath = newpath.slice(0, 3);
  newpath = newpath.join("/");

  const itemsData = [
    {
      component: DashboardIcon,
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Billings",
      component: appointment,
      link: "/dashboard/billing",
    },
    {
      name: "Settings",
      component: GroupIcon,
      link: "/dashboard/setting",
    },
    {
      name: "Generate Token",
      component: triage,
      link: "/dashboard/token",
    },
    {
      name: "API Docs",
      component: Prescription,
      link: "https://docs.evplugs.uk",
    },
    {
      name: "Logout",
      component: accountIcon,
      link: "/dashboard/logout",
    },
  ];

  const [activeItem, setActiveItem] = useState(itemsData[0]);
  // make svg compoennt
  const makeSvgComponent = (Component, isActive) => {
    const activeColorOne = "#37ADEB";
    const activeColorTwo = "#FFF";
    const disableColorOne = "#FFFFFF";
    const disableColorTwo = "#37ADEB";
    return (
      <Component
        colorOne={isActive ? activeColorOne : disableColorOne}
        colorTwo={isActive ? activeColorTwo : disableColorTwo}
      />
    );
  };

  // getting active path

  // setting current active tab
  useEffect(() => {
    const currnetItem = itemsData.find((el) => el.link === newpath);

    if (currnetItem) setActiveItem(currnetItem);
    return () => {
      setActiveItem(itemsData[0]);
    };
  }, [path]);

  // main return

  return (
    <>
      <div className="sideBar sideBarDiv d-none d-md-block">
        <div className="centerDiv">
          <span style={{ color: "grey", fontWeight: "bolder", fontSize: "1.6rem" }}>MOVEE API</span>
        </div>

        <div className="itemsFlex">
          <div className="w-100">
            {itemsData.map((item, index) => {
              const isActive = activeItem.link === item.link;
              if (item.name === "API Docs") {
                return (
                  <a href={item.link}>
                    <div
                      onClick={() => setActiveItem(item)}
                      key={index}
                      className={
                        isActive
                          ? "DashboardSideBarItem sideBarItemActive"
                          : "DashboardSideBarItem"
                      }
                    >
                      <div style={{ width: "40px" }}>
                        {item.component &&
                          makeSvgComponent(item.component, isActive)}
                      </div>
                      <div className="title" style={{ color: "#5A5A5A" }}>
                        {item.name}
                      </div>
                    </div>
                  </a>
                );
              }
              return (
                <Link to={item.link}>
                  <div
                    onClick={() => setActiveItem(item)}
                    key={index}
                    className={
                      isActive
                        ? "DashboardSideBarItem sideBarItemActive"
                        : "DashboardSideBarItem"
                    }
                  >
                    <div style={{ width: "40px" }}>
                      {item.component &&
                        makeSvgComponent(item.component, isActive)}
                    </div>
                    <div className="title" style={{ color: "#5A5A5A" }}>
                      {item.name}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* mobile Side Bar */}
      <div className="d-block d-md-none">
        <div
          onClick={() => setHandleActive(false)}
          className={
            active ? "sideBarModal sideBarModalActive" : "sideBarModal"
          }
        ></div>
        <div
          className={
            active
              ? "sideBarM sideBarDiv sideBarMActive"
              : "sideBarM sideBarDiv"
          }
        >
          <div className="centerDiv">
            <span style={{ color: "grey", fontWeight: "bolder" }}>
              Movee API
            </span>
          </div>

          <div className="itemsFlex">
            <div className="w-100">
              {itemsData.map((item, index) => {
                const isActive = activeItem.link === item.link;
                if (item.name === "Api Docs") {
                  return (
                    <a href={item.link}>
                      <div
                        onClick={() => setActiveItem(item)}
                        key={index}
                        className={
                          isActive
                            ? "DashboardSideBarItem sideBarItemActive"
                            : "DashboardSideBarItem"
                        }
                      >
                        <div style={{ width: "40px" }}>
                          {item.component &&
                            makeSvgComponent(item.component, isActive)}
                        </div>
                        <div className="title" style={{ color: "#5A5A5A" }}>
                          {item.name}
                        </div>
                      </div>
                    </a>
                  );
                }
                return (
                  <Link to={item.link}>
                    <div
                      onClick={() => {
                        setActiveItem(item);
                        setHandleActive(false);
                      }}
                      key={index}
                      className={
                        isActive
                          ? "DashboardSideBarItem sideBarItemActive"
                          : "DashboardSideBarItem"
                      }
                    >
                      <div style={{ width: "40px" }}>
                        {item.component &&
                          makeSvgComponent(item.component, isActive)}
                      </div>
                      <div className="title">{item.name}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SideBar;
