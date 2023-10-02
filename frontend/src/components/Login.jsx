import axios from "axios";
import { Form, Field, Formik } from "formik";
import { API } from "../api";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  function handleSubmit(values) {
    setLoading(true);
    console.log(values);
    axios
      .post(API.auth.login, values)
      .then((res) => login(res.data.key))
      .then(navigate("/jobs"))
      .finally(setLoading(false));
  }

  return (
    <div className="mt-5">
      {loading && "Loading..."}
      <Formik
        initialValues={{
          email: "",
          password: "",
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
                  type="text"
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

          <Field name="password">
            {({ field, form }) => (
              <label className="block">
                <span className="text-gray-700">Password</span>
                <input
                  {...field}
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Your password"
                  style={
                    form.touched.password && form.errors.password
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

export default Login;
