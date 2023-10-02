import axios from "axios";
import { Form, Field, Formik } from "formik";
import { API } from "../api";
import { useState } from "react";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit(values, {resetForm}) {
    setLoading(true);
    console.log(values);
    axios
      .post(API.auth.signup, values)
      .then(()=> {
        resetForm()
        setSuccess(true)
      })
      .finally(setLoading(false));
  }

  return (
    <div className="mt-5">
      {success && "You will recive a verification email."}
      {loading && "Loading..."}
      <Formik
        initialValues={{
          email: "",
          password1: "",
          password2: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="email">
            {({ field, form }) => (
              <label className="block">
                <span className="text-gray-700">Email</span>
                <input
                  {...field}
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Your email"
                  style={
                    form.touched.email && form.errors.email
                      ? { border: "2px solid var(--primary-red)" }
                      : null
                  }
                />
              </label>
            )}
          </Field>

          <Field name="password1">
            {({ field, form }) => (
              <label className="block">
                <span className="text-gray-700">Password</span>
                <input
                  {...field}
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Password"
                  style={
                    form.touched.password1 && form.errors.password1
                      ? { border: "2px solid var(--primary-red)" }
                      : null
                  }
                />
              </label>
            )}
          </Field>

          <Field name="password2">
            {({ field, form }) => (
              <label className="block">
                <span className="text-gray-700">Confirm password</span>
                <input
                  {...field}
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Confirm password"
                  style={
                    form.touched.password2 && form.errors.password2
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

export default Signup;
