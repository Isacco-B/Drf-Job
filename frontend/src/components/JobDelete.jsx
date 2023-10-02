import axios from "axios";
import { API } from "../api";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

function JobDelete() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    user: { token },
  } = useContext(AuthContext);
  const { id } = useParams();

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true);
    axios
      .delete(API.jobs.delete(id), {
        headers: {
          "Authorization": `Token ${token}`,
        },
      })
      .then(navigate("/jobs"))
      .finally(setLoading(false))
  }

  return (
    <div>
      {loading && "Loading.."}
      <form onSubmit={handleSubmit}>
        <div className="border border-gray-200 rounded-md mt-5 p-10 text-center">
          <h1 className="mb-2">Are you sure to delete this job</h1>
          <button
            type="submit"
            className="bg-red-100 rounded-sm px-5 py-2 hover:bg-red-200 shadow-sm"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobDelete;
