import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
function App() {
    const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>

    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard 
          darkMode={darkMode}
      setDarkMode={setDarkMode}/>}
        />

        <Route
          path="/applications"
          element={<Applications 
          darkMode={darkMode}
      setDarkMode={setDarkMode}/>}
        />

        <Route
          path="/analytics"
          element={<Analytics
            darkMode={darkMode}
      setDarkMode={setDarkMode} />}
        />
        <Route
  path="/profile"
  element={<Profile />}
/>

      </Routes>

    </BrowserRouter>
    </div>

  );
}

export default App;