import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { API } from "../api";
import { useParams, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function JobDetail() {
  const [job, setJob] = useState(null);
  const { id } = useParams();
    const {
      user: { token },
    } = useContext(AuthContext);

  useEffect(() => {
    function fetchJobs() {
      axios
        .get(API.jobs.retrieve(id), {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          setJob(res.data);
        });
    }
    fetchJobs();
  }, [id,token]);
  return (
    <div className="mt-5">
      {!job && "Loading..."}
      {job && (
        <div>
          <div className="border border-gray-200 px-2 py-3 shadow-sm rounded-sm">
            <div className="flex items-center justify-between">
              <NavLink to={`/job/${job.id}`} className="uppercase">
                <h3 className="text-2xl text-gray-800 font-semibold">
                  {job.title}
                </h3>
              </NavLink>
              <div className="text-gray-800">
                {new Date(job.date_created).toDateString()}
              </div>
            </div>
            <p className="mt-1 text-lg font-bold text-gray-600">
              $ {job.salary}
            </p>
            <p className="italic text-sm text-gray-500 mt-1">
              {job.company_name}{" "}
              <a
                href={job.company_website}
                target="blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-gray-600 text-sm ml-3"
              >
                Visit Website
              </a>
            </p>
            <p className="mt-2">
              {job.remote && <p className="text-gray-500">Remote</p>}{" "}
              {job.location && <p className="text-gray-500">{job.location}</p>}
            </p>
            <p className="mt-3 text-gray-500">{job.description}</p>
          </div>
          {job.is_owner && (
            <div className="mt-4 flex justify-end items-center gap-3">
              <NavLink
                to={`/job/${id}/update`}
                className="bg-blue-100 rounded-sm px-5 py-2 hover:bg-blue-200 shadow-sm"
              >
                Update
              </NavLink>
              <NavLink
                to={`/job/${id}/delete`}
                className="bg-red-100 rounded-sm px-5 py-2 hover:bg-red-200 shadow-sm"
              >
                Delete
              </NavLink>
              {!job.sponsored && (
                <NavLink
                  to={`/job/${id}/sponsor`}
                  className="bg-yellow-100 rounded-sm px-5 py-2 hover:bg-yellow-200 shadow-sm"
                >
                  Sponsor
                </NavLink>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default JobDetail;
