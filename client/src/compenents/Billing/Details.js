import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { clearErrors, history } from "../../redux/actions/authAction";
import Loading from "../Loading";
import "./Billing.css";

const Details = () => {
  const his = useHistory();

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.his);
  const { plans: OrganizationOptions } = useSelector((state) => state.plan);

  const check = (id) => {
    const plan = OrganizationOptions?.filter((e) => e.id === id);
    return plan[0]?.label;
  };

  useEffect(() => {
    dispatch(history());
    if (error) {
      dispatch(clearErrors);
    }
  }, []);
  return (
    <>
      {data?.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              width: "30%",
              marginTop: "1rem",
              height: "40px",
              backgroundColor: "#dee3f7",
            }}
            onClick={() => {
              his.push("/dashboard/billing/payment");
            }}
            className="btn btn-light"
          >
            Add payment first
          </button>
        </div>
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div className="col-md-12">
              <table
                className="table table-borderless table-striped"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th className="event-title">Start Date</th>
                    <th className="event-title">End Date</th>
                    <th className="event-title">Plan Category</th>
                    <th className="event-title">Amount</th>
                    <th className="event-title">Transaction ID</th>
                  </tr>
                </thead>

                <tbody className="event-table-body">
                  {data?.map((er) => {
                    return (
                      <tr>
                        <td className="table-data">
                          {new Date(er.created * 1000).toUTCString()}
                        </td>
                        <td className="table-data">
                          {new Date(er.current_period_end * 1000).toUTCString()}
                        </td>
                        <td className="table-data">{check(er.plan.id)}</td>
                        <td className="table-data"> {er.plan.amount / 100}</td>
                        <td className="table-data">{er.id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Details;
