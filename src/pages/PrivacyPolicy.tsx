import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../ui/icons/BrainIcon";
import { useTheme } from "../contexts/ThemeContext";

export function PrivacyPolicy() {
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
            Privacy Policy
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
              While we take privacy seriously, please use test data only and
              avoid entering real personal information. Data may be reset or
              cleared as part of the demo environment.
            </p>
          </div>

          <section>
            <h2
              className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              1. Introduction
            </h2>
            <p
              className={`leading-relaxed text-sm sm:text-base ${
                theme === "light" ? "text-black/70" : "text-white/70"
              }`}
            >
              This Privacy Policy explains how Brainly ("the App") handles your
              information. This is a personal demonstration project created for
              educational and portfolio purposes. We are committed to being
              transparent about our data practices in this demo environment.
            </p>
          </section>

          <section>
            <h2
              className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              2. Information We Collect
            </h2>
            <p
              className={`leading-relaxed mb-4 text-sm sm:text-base ${
                theme === "light" ? "text-black/70" : "text-white/70"
              }`}
            >
              For demonstration purposes, this app collects and stores the
              following information in our MongoDB database:
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div
                className={`border rounded-lg p-3 sm:p-4 ${
                  theme === "light" ? "border-black/20" : "border-white/20"
                }`}
              >
                <h3
                  className={`font-semibold mb-2 text-sm sm:text-base ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  👤 Account Information
                </h3>
                <ul
                  className={`list-disc list-inside space-y-1 text-sm sm:text-base ${
                    theme === "light" ? "text-black/70" : "text-white/70"
                  }`}
                >
                  <li>Username (for display and identification)</li>
                  <li>
                    Email address (for account creation and authentication)
                  </li>
                  <li>Password (encrypted/hashed for security)</li>
                  <li>Account creation date</li>
                </ul>
              </div>

              <div
                className={`border rounded-lg p-3 sm:p-4 ${
                  theme === "light" ? "border-black/20" : "border-white/20"
                }`}
              >
                <h3
                  className={`font-semibold mb-2 text-sm sm:text-base ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  📚 Content Data
                </h3>
                <ul
                  className={`list-disc list-inside space-y-1 text-sm sm:text-base ${
                    theme === "light" ? "text-black/70" : "text-white/70"
                  }`}
                >
                  <li>Bookmarked YouTube video URLs and titles</li>
                  <li>Saved Twitter/X post URLs and titles</li>
                  <li>Content organization and tags</li>
                  <li>Timestamps of when content was added</li>
                </ul>
              </div>

              <div
                className={`border rounded-lg p-3 sm:p-4 ${
                  theme === "light" ? "border-black/20" : "border-white/20"
                }`}
              >
                <h3
                  className={`font-semibold mb-2 text-sm sm:text-base ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  ⚙️ Usage Data
                </h3>
                <ul
                  className={`list-disc list-inside space-y-1 text-sm sm:text-base ${
                    theme === "light" ? "text-black/70" : "text-white/70"
                  }`}
                >
                  <li>User preferences and settings</li>
                  <li>Content filtering preferences</li>
                  <li>Share link generation data</li>
                </ul>
              </div>
            </div>
          </section>

          <div
            className={`border-t pt-6 sm:pt-8 mt-6 sm:mt-8 ${
              theme === "light" ? "border-black/20" : "border-white/20"
            }`}
          >
            <div
              className={`border rounded-lg p-4 sm:p-6 ${
                theme === "light"
                  ? "bg-purple-50 border-purple-200"
                  : "bg-purple-900/20 border-purple-800/50"
              }`}
            >
              <h3
                className={`font-semibold mb-3 text-sm sm:text-base ${
                  theme === "light" ? "text-purple-800" : "text-purple-200"
                }`}
              >
                🔒 Privacy Summary for Demo Project
              </h3>
              <p
                className={`leading-relaxed text-sm sm:text-base ${
                  theme === "light" ? "text-purple-700" : "text-purple-200"
                }`}
              >
                <strong>Demo Environment:</strong> This is a demonstration
                project. We collect basic account and content data to showcase
                app functionality. Please use test data only. Data may be reset
                periodically. We do not use your data for commercial purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
