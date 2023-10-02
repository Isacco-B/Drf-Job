import axios from "axios";
import { Form, Field, Formik } from "formik";
import { API } from "../api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

function JobUpdate() {
  const [loading, setLoading] = useState(false);
  const [Jobloading, setJobLoading] = useState(false);
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const {
    user: { token },
  } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    function fetchJobs() {
      setJobLoading(true);
      axios
        .get(API.jobs.retrive(id))
        .then((res) => {
          setJob(res.data);
        })
        .finally(setJobLoading(false));
    }
    fetchJobs();
    return () => null
  }, [id]);

  function handleSubmit(values) {
    setLoading(true);
    console.log(values);
    axios
      .patch(API.jobs.update(id), values, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => navigate(`/job/${id}`))
      .finally(setLoading(false));
  }

  return (
    <div className="mt-5">
      {loading && "Submitting..."}
      {Jobloading && "Fetching job detail..."}
      {job && (
        <Formik
          initialValues={{
            title: job.title,
            company_name: job.company_name,
            company_website: job.company_website,
            location: job.location,
            salary: job.salary,
          }}
          onSubmit={handleSubmit}
        >
          <Form className="mt-5">
            <Field name="title">
              {({ field, form }) => (
                <label className="block">
                  <span className="text-gray-700">Title</span>
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Software developer"
                    style={
                      form.touched.title && form.errors.title
                        ? { border: "2px solid var(--primary-red)" }
                        : null
                    }
                  />
                </label>
              )}
            </Field>

            <Field name="company_name">
              {({ field, form }) => (
                <label className="block">
                  <span className="text-gray-700">Company Name</span>
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Google"
                    style={
                      form.touched.company_name && form.errors.company_name
                        ? { border: "2px solid var(--primary-red)" }
                        : null
                    }
                  />
                </label>
              )}
            </Field>

            <Field name="company_website">
              {({ field, form }) => (
                <label className="block">
                  <span className="text-gray-700">Company Website URL</span>
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Google"
                    style={
                      form.touched.company_website &&
                      form.errors.company_website
                        ? { border: "2px solid var(--primary-red)" }
                        : null
                    }
                  />
                </label>
              )}
            </Field>

            <Field name="location">
              {({ field, form }) => (
                <label className="block">
                  <span className="text-gray-700">Location</span>
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="USA"
                    style={
                      form.touched.location && form.errors.location
                        ? { border: "2px solid var(--primary-red)" }
                        : null
                    }
                  />
                </label>
              )}
            </Field>

            <Field name="salary">
              {({ field, form }) => (
                <label className="block">
                  <span className="text-gray-700">Salary</span>
                  <input
                    {...field}
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder=""
                    style={
                      form.touched.salary && form.errors.salary
                        ? { border: "2px solid var(--primary-red)" }
                        : null
                    }
                  />
                </label>
              )}
            </Field>

            <button
              type="submit"
              className="bg-blue-200 px-3 py-2 shadow-sm rounded-sm hover:bg-blue-300 mt-2"
            >
              Submit
            </button>
          </Form>
        </Formik>
      )}
    </div>
  );
}

export default JobUpdate;
