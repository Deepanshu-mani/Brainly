import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../ui/icons/BrainIcon";

export function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-dark-background dark:via-dark-surface dark:to-dark-surface-alt">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg dark:from-dark-primary dark:to-dark-primary-hover">
              <BrainIcon />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-4 dark:from-dark-primary dark:to-dark-primary-hover">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-sm sm:text-base dark:text-dark-text-muted">Last updated: {new Date().toLocaleDateString()}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-purple-600 hover:text-purple-800 font-medium hover:underline text-sm sm:text-base dark:text-dark-primary dark:hover:text-dark-primary-hover transition-colors"
          >
            ← Back
          </button>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 sm:p-8 space-y-6 sm:space-y-8 dark:bg-dark-surface dark:border-dark-border">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 dark:bg-amber-900 dark:border-amber-800/50">
            <h3 className="font-semibold text-amber-800 mb-3 text-sm sm:text-base dark:text-amber-200">⚠️ Demo Project Notice</h3>
            <p className="text-amber-700 leading-relaxed text-sm sm:text-base dark:text-amber-200">
              <strong>This is a demonstration project for educational and portfolio purposes only.</strong> 
              While we take privacy seriously, please use test data only and avoid entering real personal information. 
              Data may be reset or cleared as part of the demo environment.
            </p>
          </div>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-dark-text mb-3 sm:mb-4">1. Introduction</h2>
            <p className="text-gray-800 dark:text-dark-text-muted leading-relaxed text-sm sm:text-base">
              This Privacy Policy explains how Brainly ("the App") handles your information. 
              This is a personal demonstration project created for educational and portfolio purposes. 
              We are committed to being transparent about our data practices in this demo environment.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-dark-text mb-3 sm:mb-4">2. Information We Collect</h2>
            <p className="text-gray-800 dark:text-dark-text-muted leading-relaxed mb-4 text-sm sm:text-base">
              For demonstration purposes, this app collects and stores the following information in our MongoDB database:
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="border border-gray-200 rounded-lg p-3 sm:p-4 dark:border-dark-border">
                <h3 className="font-semibold text-gray-900 dark:text-dark-text mb-2 text-sm sm:text-base">👤 Account Information</h3>
                <ul className="list-disc list-inside text-gray-800 dark:text-dark-text-muted space-y-1 text-sm sm:text-base">
                  <li>Username (for display and identification)</li>
                  <li>Email address (for account creation and authentication)</li>
                  <li>Password (encrypted/hashed for security)</li>
                  <li>Account creation date</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3 sm:p-4 dark:border-dark-border">
                <h3 className="font-semibold text-gray-900 dark:text-dark-text mb-2 text-sm sm:text-base">📚 Content Data</h3>
                <ul className="list-disc list-inside text-gray-800 dark:text-dark-text-muted space-y-1 text-sm sm:text-base">
                  <li>Bookmarked YouTube video URLs and titles</li>
                  <li>Saved Twitter/X post URLs and titles</li>
                  <li>Content organization and tags</li>
                  <li>Timestamps of when content was added</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 sm:p-4 dark:border-dark-border">
                <h3 className="font-semibold text-gray-900 dark:text-dark-text mb-2 text-sm sm:text-base">⚙️ Usage Data</h3>
                <ul className="list-disc list-inside text-gray-800 dark:text-dark-text-muted space-y-1 text-sm sm:text-base">
                  <li>User preferences and settings</li>
                  <li>Content filtering preferences</li>
                  <li>Share link generation data</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-200 pt-6 sm:pt-8 mt-6 sm:mt-8 dark:border-dark-border">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 sm:p-6 dark:bg-dark-surface dark:border-dark-border">
              <h3 className="font-semibold text-purple-800 mb-3 text-sm sm:text-base">🔒 Privacy Summary for Demo Project</h3>
              <p className="text-purple-700 leading-relaxed text-sm sm:text-base">
                <strong>Demo Environment:</strong> This is a demonstration project. We collect basic account and content data 
                to showcase app functionality. Please use test data only. Data may be reset periodically. 
                We do not use your data for commercial purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}