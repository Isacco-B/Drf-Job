import axios from "axios";
import { API } from "../api";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ConfirmEmail() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { key } = useParams();

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true);
    axios
      .post(API.auth.verifyEmail, {key})
      .then(setSuccess(true))
      .finally(setLoading(false));
  }

  return (
    <div className="mt-5">
      {success && "Your email has been verified! You can now Login"}
      {loading && "Loading..."}
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="bg-blue-200 px-3 py-2 shadow-sm rounded-sm hover:bg-blue-300 mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ConfirmEmail;
