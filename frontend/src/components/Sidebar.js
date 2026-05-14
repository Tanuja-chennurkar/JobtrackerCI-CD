import { Link, useLocation } from "react-router-dom";

function Sidebar({ darkMode, setDarkMode }) {

  const location = useLocation();

  const navItem = (path) => {

    return location.pathname === path
      ? "w-full text-left px-4 py-3 rounded-xl bg-indigo-500 text-white transition"
      : "w-full text-left px-4 py-3 rounded-xl hover:bg-slate-800 transition";
  };

  return (

    <div className="w-64 bg-slate-900 text-white min-h-screen p-6 fixed flex flex-col justify-between">

      <div>

        <h1 className="text-4xl font-bold text-indigo-400 mb-12">
          JobTracker
        </h1>

        <div className="space-y-4">

          <Link to="/dashboard">

            <button className={navItem("/dashboard")}>
              Dashboard
            </button>

          </Link>

          <Link to="/applications">

            <button className={navItem("/applications")}>
              Applications
            </button>

          </Link>

          <Link to="/analytics">

            <button className={navItem("/analytics")}>
              Analytics
            </button>

          </Link>

          <Link to="/profile">

  <button className={navItem("/profile")}>
    Profile
  </button>

</Link>

        </div>

      </div>
        
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition"
      >
        Logout
      </button>

    </div>

  );
}

export default Sidebar;