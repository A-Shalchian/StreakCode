"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  isEmailJSConfigured,
} from "@/utils/email_config";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    try {
      if (EMAILJS_PUBLIC_KEY) {
        emailjs.init({
          publicKey: String(EMAILJS_PUBLIC_KEY),
          blockHeadless: false, // Allow testing in headless browsers
          limitRate: {
            // Rate limiting
            throttle: 10000, // 10s
          },
        });
        console.log("EmailJS initialized successfully");
      } else {
        console.warn("EmailJS public key is missing");
      }
    } catch (error) {
      console.error("Error initializing EmailJS:", error);
    }
  }, []);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate EmailJS configuration
    if (!isEmailJSConfigured()) {
      setSubmitStatus({
        success: false,
        message:
          "EmailJS configuration is missing. Please check the setup instructions.",
      });
      setIsSubmitting(false);
      return;
    }

    if (!formRef.current) return;

    try {
      // EmailJS send form
      console.log("EmailJS Config:", {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY ? "Present" : "Missing",
      });

      // Using sendForm can be problematic sometimes - let's use send instead
      const templateParams = {
        user_name: name,
        user_email: email,
        subject: subject,
        message: message,
      };

      const result = await emailjs.send(
        String(EMAILJS_SERVICE_ID),
        String(EMAILJS_TEMPLATE_ID),
        templateParams,
        String(EMAILJS_PUBLIC_KEY)
      );

      console.log("EmailJS result:", result);

      if (result.status === 200) {
        setSubmitStatus({
          success: true,
          message: "Your message has been sent. We'll get back to you soon!",
        });
        toast.success("Message sent successfully!");

        // Reset form fields
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error: unknown) {
      console.error("Error sending email:", error);

      // More detailed error logging
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      } else if (typeof error === "object" && error !== null) {
        console.error("Error details:", JSON.stringify(error));
      } else {
        console.error("Error details:", String(error));
      }

      // Specific error message for the user
      let errorMessage =
        "There was an error sending your message. Please try again.";

      // Check for common EmailJS errors
      if (error instanceof Error) {
        if (
          error.message.includes("invalid template") ||
          error.message.includes("template_id")
        ) {
          errorMessage =
            "Email template configuration error. Please contact support.";
        } else if (error.message.includes("service_id")) {
          errorMessage =
            "Email service configuration error. Please contact support.";
        } else if (
          error.message.includes("NetworkError") ||
          error.message.includes("Failed to fetch")
        ) {
          errorMessage =
            "Network error. Please check your internet connection and try again.";
        }
      }

      setSubmitStatus({
        success: false,
        message: errorMessage,
      });

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 pt-20">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="rounded-full bg-indigo-100 dark:bg-indigo-900 p-4 w-16 h-16 flex items-center justify-center mb-4">
              <FaEnvelope className="text-indigo-600 dark:text-indigo-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-700 dark:text-gray-300">
              contact@streakcode.com
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              We&apos;ll respond within 24 hours
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="rounded-full bg-emerald-100 dark:bg-emerald-900 p-4 w-16 h-16 flex items-center justify-center mb-4">
              <FaPhone className="text-emerald-600 dark:text-emerald-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-700 dark:text-gray-300">
              +1 (555) 123-4567
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Mon-Fri, 9am-5pm PST
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-4 w-16 h-16 flex items-center justify-center mb-4">
              <FaMapMarkerAlt className="text-purple-600 dark:text-purple-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-700 dark:text-gray-300">
              123 Developer Way
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              San Francisco, CA 94107
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Send Us a Message
          </h2>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="user_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="user_email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white h-32"
                required
              ></textarea>
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-600 h-12 px-8 py-3 text-lg disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus && (
                <div
                  className={`mt-4 p-3 rounded-md ${
                    submitStatus.success
                      ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
                      : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="bg-indigo-500 text-white rounded-lg shadow-md overflow-hidden mt-12">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Why Contact Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Support</h3>
                <p className="text-indigo-100">
                  Get help with any technical issues or questions about
                  StreakCode
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold mb-2">Feedback</h3>
                <p className="text-indigo-100">
                  Share your thoughts and suggestions to help us improve
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold mb-2">Partnerships</h3>
                <p className="text-indigo-100">
                  Explore opportunities to collaborate with our team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
