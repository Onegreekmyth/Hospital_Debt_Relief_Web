import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare mailto link
    const mailtoLink = `mailto:support@hospitaldebtrelief.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 md:px-6 pt-32 md:pt-40 pb-16 md:pb-24 min-h-[60vh] md:min-h-[70vh] bg-white overflow-hidden">
        {/* Soft gradient background behind the banner content */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at center, rgba(86,49,211,0.22) 0, rgba(86,49,211,0.04) 45%, rgba(86,49,211,0) 70%)",
          }}
        />
        <div className="relative max-w-3xl text-gray-900">
          <h1 className="text-[24px] md:text-[32px] lg:text-[40px] leading-tight font-bold">
            Get in Touch
          </h1>
          <p className="mt-4 text-black text-[13px] md:text-[15px] lg:text-[18px] leading-relaxed px-2">
            Have questions about our services or need assistance? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {/* Info Card 1 - Email */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 text-center hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-4">
                <svg
                  className="h-7 w-7 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
              <a
                href="mailto:support@hospitaldebtrelief.com"
                className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
              >
                support@hospitaldebtrelief.com
              </a>
            </div>

            {/* Info Card 2 - Hours */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 text-center hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-4">
                <svg
                  className="h-7 w-7 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-900">Mon - Fri: <span className="text-purple-600">9:00 AM - 5:00 PM EST</span></p>
                <p className="font-medium text-gray-900">Sat - Sun: <span className="text-gray-500">Closed</span></p>
              </div>
            </div>

            {/* Info Card 3 - Response Time */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 text-center hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-4">
                <svg
                  className="h-7 w-7 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Response Time</h3>
              <p className="text-sm font-semibold text-purple-600">Within 24 business hours</p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold text-gray-900 tracking-[0.64px] leading-tight">
                Send us a Message
              </h2>
              <p className="mt-3 text-[13px] md:text-[15px] text-gray-700">
                Fill out the form below and our team will get back to you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_16px_40px_rgba(79,40,232,0.08)] border border-purple-100 space-y-6">
              <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm md:text-base font-medium text-gray-900">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`h-14 w-full rounded-full border-2 bg-white px-6 text-sm md:text-base transition focus:outline-none ${
                      errors.name
                        ? "border-red-400 focus:border-red-500 text-red-600"
                        : "border-purple-200 text-gray-700 focus:border-purple-500"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm md:text-base font-medium text-gray-900">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`h-14 w-full rounded-full border-2 bg-white px-6 text-sm md:text-base transition focus:outline-none ${
                      errors.email
                        ? "border-red-400 focus:border-red-500 text-red-600"
                        : "border-purple-200 text-gray-700 focus:border-purple-500"
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm md:text-base font-medium text-gray-900">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`h-14 w-full rounded-full border-2 bg-white px-6 text-sm md:text-base transition focus:outline-none ${
                    errors.subject
                      ? "border-red-400 focus:border-red-500 text-red-600"
                      : "border-purple-200 text-gray-700 focus:border-purple-500"
                  }`}
                  placeholder="What is this about?"
                />
                {errors.subject && (
                  <p className="text-xs text-red-600 mt-1">{errors.subject}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm md:text-base font-medium text-gray-900">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className={`w-full rounded-3xl border-2 bg-white px-6 py-4 text-sm md:text-base transition focus:outline-none resize-none ${
                    errors.message
                      ? "border-red-400 focus:border-red-500 text-red-600"
                      : "border-purple-200 text-gray-700 focus:border-purple-500"
                  }`}
                  placeholder="Tell us more about your inquiry..."
                />
                {errors.message && (
                  <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                )}
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-purple-700 bg-transparent px-10 py-3 text-sm md:text-base font-semibold text-purple-800 hover:bg-purple-50 transition"
                >
                  Send Message <span className="text-purple-800">→</span>
                </button>
              </div>

              {submitted && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm font-medium">
                    ✓ Thank you! Your message is being sent to our support team.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
