import axios from "axios";
import { Form, Field, Formik } from "formik";
import { API } from "../api";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ImagePreview from "./ImagePreview";


function JobCreate() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const {
    user: { token },
  } = useContext(AuthContext);

  function handleSubmit(values) {
    setLoading(true);
    console.log(values);
    const data = new FormData()
    data.append("company_logo", file)
    data.append("title", values.title)
    data.append("company_name", values.company_name);
    data.append("company_website", values.company_website);
    data.append("location", values.location);
    data.append("salary", values.salary);
    axios
      .post(API.jobs.create, {...values, data}, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .finally(setLoading(false));
  }

  return (
    <div className="mt-5">
      {loading && "Loading..."}
      <Formik
        initialValues={{
          title: "",
          company_name: "",
          company_logo: "",
          company_website: "",
          location: "",
          salary: "",
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

          <Field name="company_logo">
            {({ field, form }) => (
              <label className="block">
                <span className="text-gray-700">Company Logo</span>
                <input
                  {...field}
                  onChange={e => setFile(e.target.files[0])}
                  type="file"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  style={
                    form.touched.company_logo && form.errors.company_logo
                      ? { border: "2px solid var(--primary-red)" }
                      : null
                  }
                />
                {file && (
                  <ImagePreview file={file}/>
                )}
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
                    form.touched.company_website && form.errors.company_website
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
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
    </div>
  );
}

export default JobCreate;
