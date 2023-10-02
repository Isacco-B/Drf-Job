import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios"
import { API } from "../api";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate()

  function handleSubmit() {
    axios.post(API.auth.logout).then(()=> {
      logout();
      navigate("/login");
    })
  }
  return (
    <div>
      <nav className="max-w-4xl p-4 border-b border-gray-200 m-auto">
        <ul className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <li className="text-gray-600">
              <Link className="hover:text-blue-600" to="/jobs">
                Jobs
              </Link>
            </li>
            <li className="text-gray-600">
              <Link className="hover:text-blue-600" to="/create-job">
                Create
              </Link>
            </li>
          </div>
          <div className="flex items-center">
            {user ? (
              <li className="text-gray-600">
                <button className="hover:text-blue-600" onClick={handleSubmit}>
                  Logout
                </button>
              </li>
            ) : (
              <div className="flex items-center gap-4">
                <li className="text-gray-600">
                  <Link className="hover:text-blue-600" to="/login">
                    Login
                  </Link>
                </li>
                <li className="text-gray-600">
                  <Link className="hover:text-blue-600" to="/signup">
                    Signup
                  </Link>
                </li>
              </div>
            )}
          </div>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default NavBar;
