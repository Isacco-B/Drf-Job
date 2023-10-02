import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { useContext } from "react";

import JobsList from "./components/JobsList";
import JobDetail from "./components/JobDetail";
import JobCreate from "./components/JobCreate";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import JobUpdate from "./components/JobUpdate";
import JobDelete from "./components/JobDelete";
import Signup from "./components/Signup";
import ConfirmEmail from "./components/ConfirmEmail";
import Payments from "./components/Payments";
import SuccessPage from "./components/SuccessPage";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate replace to="/login" />;
}

export default function App() {
  return (
    <AuthContextProvider>
      <div className="max-w-4xl p-4 m-auto">
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<JobsList />} />
            <Route path="/jobs" element={<JobsList />} exact />
            <Route
              path="/job/:id"
              element={
                <PrivateRoute>
                  <JobDetail />
                </PrivateRoute>
              }
              exact
            />
            <Route
              path="/job/:id/update"
              element={
                <PrivateRoute>
                  <JobUpdate />
                </PrivateRoute>
              }
              exact
            />
            <Route
              path="/job/:id/delete"
              element={
                <PrivateRoute>
                  <JobDelete />
                </PrivateRoute>
              }
              exact
            />
            <Route
              path="/create-job"
              element={
                <PrivateRoute>
                  <JobCreate />
                </PrivateRoute>
              }
              exact
            />
            <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<Signup />} exact />
            <Route
              path="/accounts/confirm-email/:key"
              element={<ConfirmEmail />}
              exact
            />
            <Route
              path="/job/:id/sponsor"
              element={
                <PrivateRoute>
                  <Payments />
                </PrivateRoute>
              }
              exact
            />
            <Route
              path="/payment/success"
              element={
                <PrivateRoute>
                  <SuccessPage />
                </PrivateRoute>
              }
              exact
            />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
