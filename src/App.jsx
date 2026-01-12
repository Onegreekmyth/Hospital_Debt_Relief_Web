import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/plans" element={<MonthlyPlansPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bill-history" element={<BillHistory />} />
      <Route path="/bill-history/:id" element={<BillDetails />} />
    </Routes>
  );
}

export default App;
