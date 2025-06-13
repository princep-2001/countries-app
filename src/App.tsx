import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import type { RootState } from "./store/store";
import CountriesPage from "./views/CountriesPage";
import LoginPage from "./views/LoginPage";

function App() {
  const Inter = { className: "font-sans" };

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className={Inter.className}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/countries" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/countries"
          element={
            isAuthenticated ? <CountriesPage /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
