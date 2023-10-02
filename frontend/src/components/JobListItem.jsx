import { NavLink } from "react-router-dom";

function JobListItem({ job }) {
  return (
    <div className="border border-gray-200 px-2 py-3 shadow-sm rounded-sm my-5">
      <div className="flex items-center justify-between">
        {job.company_logo && (
          <img src={job.company_logo} alt={job.company_name} className="h-20 w-20 px-3 py-3"/>
        )}
        <NavLink to={`/job/${job.id}`} className="uppercase">
          <h3 className="text-2xl text-gray-800 font-semibold">{job.title}</h3>
        </NavLink>
        <div className="text-gray-800">{new Date(job.date_created).toDateString()}</div>
      </div>
      <p className="mt-1 text-lg font-bold text-gray-600">$ {job.salary}</p>
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
  );
}

export default JobListItem;
