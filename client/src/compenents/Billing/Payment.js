import React, { useEffect, useState } from "react";

import Select from "react-select";
import CardInput from "./CardInput";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clearErrors, plan, subcription } from "../../redux/actions/authAction";
import Loading from "../Loading";

const Payment = () => {
  const { loading, message, error } = useSelector((state) => state.sub);

  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  const elements = useElements();
  const stripe = useStripe();

  const { plans: OrganizationOptions } = useSelector((state) => state.plan);

  const [orginization, setorginization] = useState("");
  const handleSubmit = async (event) => {
    if (!elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      dispatch(
        subcription({
          payment_method: result.paymentMethod.id,
          email: profile?.email,
          price: orginization.id,
          plan: orginization.label,
        })
      );
    }
  };

  const changeOrganization = (value) => {
    setorginization(value);
  };
  useEffect(() => {
    dispatch(plan());
    if (message) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: true,
        timer: 4000,
      });
      dispatch(clearErrors());
    }
    if (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: message,
        showConfirmButton: true,
        timer: 4000,
      });
      dispatch(clearErrors());
    }
  }, [dispatch, message]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="row m-5">
          <div className="col-md-6 mb-5 ">
            <h5 style={{ color: "#37ADEB", fontWeight: "bolder" }}>
              Payment Details
            </h5>
            <p style={{ color: "grey" }}>
              Your payment will be pound Sterling(GBP)
            </p>

            <div className="seperate">
              <label
                for="exampleInputEmail1 w-100"
                style={{ color: "#696969", fontWeight: "bolder" }}
              >
                Billing Type
              </label>
              <Select
                options={OrganizationOptions}
                value={orginization}
                onChange={changeOrganization}
                placeholder="organizations"
                name="organization"
              />
            </div>
            <div className="seperate mt-2">
              <label
                for="exampleInputEmail1 w-100"
                style={{ color: "#696969", fontWeight: "bolder" }}
              >
                Amount
              </label>

              <input
                disabled
                type="text"
                className="form-control"
                name="amount"
                value={orginization ? `$ ${orginization.price}` : "0$"}
              />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <CardInput />
            </div>

            <div className="seperate mt-2">
              <button
                type="submit"
                onClick={handleSubmit}
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  height: "40px",
                  backgroundColor: "#dee3f7",
                }}
                className="btn btn-light"
              >
                Subcribe Now
              </button>
            </div>
          </div>
          <div className=" col-md-4">
            <h5 style={{ color: "#37ADEB", fontWeight: "bolder" }}>
              Payment Instruction
            </h5>
            <p style={{ color: "grey" }}>
              We'll use Stripe Checkout to redirect you,our customer,to a
              secure, Stripe-hosted payment page as partof frictionless checkout
              experience when you click the Subcription Now button
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
