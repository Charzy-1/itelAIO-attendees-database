import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Contact, Intro, Navbar, StarsCanvas } from "./components";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar stays visible on all pages */}
      <Navbar />

      {/* Define your routes */}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="relative z-0 bg-primary">
              <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Intro />
                {/* Link to Admin */}
                <div className="p-4">
                  <Link
                    to="/admin"
                    className="text-white underline hover:text-yellow-300"
                  >
                    Go to Admin
                  </Link>
                </div>
              </div>
              <div className="relative z-0">
                <Contact />
                <StarsCanvas />
              </div>
            </div>
          }
        />

        {/* Admin Page */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
