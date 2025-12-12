import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../ui/icons/BrainIcon";
import { useTheme } from "../contexts/ThemeContext";

export function TermsOfService() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div
      className={`transition-colors duration-300 ${
        theme === "light" ? "text-black" : "text-white"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div
              className={`p-2 sm:p-3 rounded-2xl shadow-lg ${
                theme === "light"
                  ? "bg-gradient-to-r from-purple-500 to-purple-600"
                  : "bg-gradient-to-r from-purple-400 to-purple-500"
              }`}
            >
              <BrainIcon />
            </div>
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-bold mb-4 tracking-tight ${
              theme === "light"
                ? "bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent"
            }`}
          >
            Terms of Service
          </h1>
          <p
            className={`text-sm sm:text-base ${
              theme === "light" ? "text-black/60" : "text-white/60"
            }`}
          >
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <button
            onClick={() => navigate(-1)}
            className={`mt-4 font-medium hover:underline text-sm sm:text-base transition-colors ${
              theme === "light"
                ? "text-purple-600 hover:text-purple-800"
                : "text-purple-300 hover:text-purple-100"
            }`}
          >
            ← Back
          </button>
        </div>

        {/* Content */}
        <div
          className={`backdrop-blur-sm rounded-2xl border shadow-lg p-6 sm:p-8 space-y-6 sm:space-y-8 ${
            theme === "light"
              ? "bg-white/80 border-black/10 shadow-black/10"
              : "bg-black/80 border-white/10 shadow-white/10"
          }`}
        >
          <div
            className={`border rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 ${
              theme === "light"
                ? "bg-amber-50 border-amber-200"
                : "bg-amber-900/20 border-amber-800/50"
            }`}
          >
            <h3
              className={`font-semibold mb-3 text-sm sm:text-base ${
                theme === "light" ? "text-amber-800" : "text-amber-200"
              }`}
            >
              ⚠️ Demo Project Notice
            </h3>
            <p
              className={`leading-relaxed text-sm sm:text-base ${
                theme === "light" ? "text-amber-700" : "text-amber-200"
              }`}
            >
              <strong>
                This is a demonstration project for educational and portfolio
                purposes only.
              </strong>
              This is not a commercial service and is provided for testing and
              showcase purposes. Use at your own discretion and do not store
              sensitive or important information.
            </p>
          </div>

          <section>
            <h2
              className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              1. Acceptance of Terms
            </h2>
            <p
              className={`leading-relaxed text-sm sm:text-base ${
                theme === "light" ? "text-black/70" : "text-white/70"
              }`}
            >
              By accessing and using Brainly ("the App"), you accept and agree
              to be bound by the terms and provision of this agreement. This is
              a personal demonstration project created for educational,
              portfolio, and testing purposes only.
            </p>
          </section>

          <section>
            <h2
              className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              2. Description of Service
            </h2>
            <p
              className={`leading-relaxed mb-4 text-sm sm:text-base ${
                theme === "light" ? "text-black/70" : "text-white/70"
              }`}
            >
              Brainly is a demonstration web application that allows users to:
            </p>
            <ul
              className={`list-disc list-inside space-y-2 ml-4 text-sm sm:text-base ${
                theme === "light" ? "text-black/70" : "text-white/70"
              }`}
            >
              <li>Create user accounts for testing purposes</li>
              <li>Bookmark and organize YouTube videos and Twitter/X posts</li>
              <li>Create a personal content library for demonstration</li>
              <li>Share collections of bookmarked content with others</li>
              <li>Filter and organize content by type</li>
            </ul>
          </section>

          <section>
            <h2
              className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              3. Demo Project Status
            </h2>
            <div
              className={`border rounded-lg p-4 sm:p-6 mb-4 ${
                theme === "light"
                  ? "bg-blue-50 border-blue-200"
                  : "bg-blue-900/10 border-blue-800/30"
              }`}
            >
              <h3
                className={`font-semibold mb-3 text-sm sm:text-base ${
                  theme === "light" ? "text-blue-800" : "text-blue-300"
                }`}
              >
                📋 Important Disclaimers
              </h3>
              <ul
                className={`list-disc list-inside space-y-2 text-sm sm:text-base ${
                  theme === "light" ? "text-blue-700" : "text-blue-200"
                }`}
              >
                <li>
                  <strong>Not a Commercial Service:</strong> This app is a
                  personal project for demonstration purposes
                </li>
                <li>
                  <strong>No Service Guarantees:</strong> No uptime,
                  availability, or data persistence guarantees
                </li>
                <li>
                  <strong>Educational Purpose:</strong> Created to showcase web
                  development skills and technologies
                </li>
                <li>
                  <strong>Testing Environment:</strong> May be reset, modified,
                  or discontinued at any time
                </li>
              </ul>
            </div>
          </section>

          {/* Continue with remaining sections... */}
          <section>
            <h2
              className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              4. Data Storage and Privacy
            </h2>
            <p
              className={`leading-relaxed mb-4 text-sm sm:text-base ${
                theme === "light" ? "text-black/70" : "text-white/70"
              }`}
            >
              <strong
                className={theme === "light" ? "text-black" : "text-white"}
              >
                Database Storage:
              </strong>{" "}
              User data including accounts, bookmarks, and preferences are
              stored in a MongoDB database for demonstration purposes. This data
              is used solely to showcase the application's functionality.
            </p>
            <p
              className={`leading-relaxed mb-4 text-sm sm:text-base ${
                theme === "light" ? "text-black/70" : "text-white/70"
              }`}
            >
              <strong
                className={theme === "light" ? "text-black" : "text-white"}
              >
                User Accounts:
              </strong>{" "}
              The app requires user registration to demonstrate authentication
              features. Please use test data only and avoid using real personal
              information.
            </p>
            <p
              className={`leading-relaxed mb-4 text-sm sm:text-base ${
                theme === "light" ? "text-black/70" : "text-white/70"
              }`}
            >
              <strong
                className={theme === "light" ? "text-black" : "text-white"}
              >
                Data Retention:
              </strong>{" "}
              As this is a demo project, data may be periodically cleared or the
              database may be reset without notice for maintenance or
              demonstration purposes.
            </p>
            <p
              className={`leading-relaxed text-sm sm:text-base ${
                theme === "light" ? "text-black/70" : "text-white/70"
              }`}
            >
              <strong
                className={theme === "light" ? "text-black" : "text-white"}
              >
                Third-Party Content:
              </strong>{" "}
              The app displays embedded content from YouTube and Twitter/X.
              These embeds are subject to the respective platforms' terms of
              service and privacy policies.
            </p>
          </section>

          <div
            className={`border-t pt-6 sm:pt-8 mt-6 sm:mt-8 ${
              theme === "light" ? "border-black/20" : "border-white/20"
            }`}
          >
            <p
              className={`text-xs sm:text-sm text-center leading-relaxed ${
                theme === "light" ? "text-black/50" : "text-white/50"
              }`}
            >
              By using Brainly, you acknowledge that you have read, understood,
              and agree to be bound by these Terms of Service, and that you
              understand this is a demonstration project for educational and
              portfolio purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
