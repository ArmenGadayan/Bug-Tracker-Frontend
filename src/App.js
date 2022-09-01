import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Context
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import BugListPage from "./components/BugListPage";
import BugPage from "./components/BugPage";
import UserTickets from "./components/UserTickets.jsx";
import PrivateRoute from "./utils/PrivateRoute";

import Project from "./components/Project";
import AdminPage from "./components/AdminPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <Router>
      <AuthProvider>
      <ToastContainer />
        <div className="App">
          <NavBar />
          <div className="app-box">
            <Routes>
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/project/:id"
                element={
                  <PrivateRoute>
                    <Project />
                  </PrivateRoute>
                }
              />
              <Route
                path="/project/:id/bugs"
                element={
                  <PrivateRoute>
                    <BugListPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/project/:id/bug/:bugId"
                element={
                  <PrivateRoute>
                    <BugPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tickets"
                element={
                  <PrivateRoute>
                    <UserTickets />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminPage />
                  </PrivateRoute>
                }
              />

              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
