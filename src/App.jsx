import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import HomePage from "./pages/Home";
import Signup from "./pages/Signup";
import OTPVerification from "./pages/OTPVerification";
import Dashboard from "./pages/Dashboard";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import MonthlyPlansPage from "./pages/MonthlyPlans";
import Login from "./pages/Login";
import BillHistory from "./pages/BillHistory";
import BillDetails from "./pages/BillDetails";
import FAQPage from "./pages/Faq";
import CharityCarePage from "./pages/CharityCare";
import CommittedSolutionPage from "./pages/CommittedSolution";
import StateLawsPage from "./pages/StateLaws";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import TermsAndConditionsPage from "./pages/TermsAndConditions";

const ProtectedRoute = () => {
  const isAuthenticated =
    localStorage.getItem("token") ||
    localStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/resources/charity-care" element={<CharityCarePage />} />
      <Route path="/resources/committed-solution" element={<CommittedSolutionPage />} />
      <Route path="/resources/state-laws" element={<StateLawsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route
        path="/terms-and-conditions"
        element={<TermsAndConditionsPage />}
      />
      <Route path="/plans" element={<MonthlyPlansPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bill-history" element={<BillHistory />} />
        <Route path="/bill-history/:id" element={<BillDetails />} />
      </Route>
    </Routes>
  );
}

export default App;