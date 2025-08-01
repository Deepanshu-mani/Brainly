import { useEffect, useState , type JSX } from "react";
import { useNavigate, BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Share } from "./pages/Share";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { TermsOfService } from "./pages/TermsOfService";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Layout } from "./components/Layout";

// Wrapper component to apply layout to specific routes
const WithLayout = ({ children }: { children: JSX.Element }) => (
  <Layout>
    {children}
  </Layout>
);

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate(); 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [navigate]);

  if (isAuthenticated === null) return null; // or loading spinner

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes with header */}
          <Route path="/signin" element={<WithLayout><SignIn /></WithLayout>} />
          <Route path="/signup" element={<WithLayout><SignUp /></WithLayout>} />
          <Route path="/" element={<Navigate to="/signin" replace />} />
          
          {/* Dashboard (has its own layout) */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          {/* Other routes with header */}
          <Route path="/share/:shareId" element={<WithLayout><Share /></WithLayout>} />
          <Route path="/terms" element={<WithLayout><TermsOfService /></WithLayout>} />
          <Route path="/privacy" element={<WithLayout><PrivacyPolicy /></WithLayout>} />
          
          {/* Redirect any unknown routes to signin */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;