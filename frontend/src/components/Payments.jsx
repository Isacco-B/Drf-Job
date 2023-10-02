import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { API } from "../api";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NvfidGXBDR1x0mmABl6v8YZM4jTeiGDUOqISOoajRIcbmj7c5v2G9ICSYnQFKqVpbcO9UUrLTfzmAL55dJHT9IA00wrTvis9S"
);

export default function Payments() {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();
  const {
    user: { token },
  } = useContext(AuthContext);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios
      .post(
        API.payment.createPayment,
        {
          job_id: id,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [token, id]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="mt-5">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
