import axios from "axios";
import { API } from "../api";
import { useContext, useEffect, useState } from "react";
import JobListItem from "./JobListItem";
import { AuthContext } from "../context/AuthContext";


function JobsList() {
  const [jobs, setJobs] = useState(null);
    const {
      user: { token },
    } = useContext(AuthContext);

  useEffect(() => {
    function fetchJobs() {
      axios
        .get(
          API.jobs.list,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setJobs(res.data);
        });
    }
    fetchJobs();
  }, [token]);
  return (
    <div>
      {!jobs && "Loading..."}
      {jobs &&
        jobs.map((job) => {
          return (
            <JobListItem key={job.id} job={job}/>
          );
        })}
    </div>
  );
}

export default JobsList;
