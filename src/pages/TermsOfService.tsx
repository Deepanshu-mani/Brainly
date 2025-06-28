import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../components/ui/icons/BrainIcon";

export function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg">
              <BrainIcon />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Last updated: {new Date().toLocaleDateString()}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-purple-600 hover:text-purple-800 font-medium hover:underline text-sm sm:text-base"
          >
            ← Back
          </button>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 sm:p-8 space-y-6 sm:space-y-8">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="font-semibold text-amber-800 mb-3 text-sm sm:text-base">⚠️ Demo Project Notice</h3>
            <p className="text-amber-700 leading-relaxed text-sm sm:text-base">
              <strong>This is a demonstration project for educational and portfolio purposes only.</strong> 
              This is not a commercial service and is provided for testing and showcase purposes. 
              Use at your own discretion and do not store sensitive or important information.
            </p>
          </div>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              By accessing and using Brainly ("the App"), you accept and agree to be bound by the terms and provision of this agreement. 
              This is a personal demonstration project created for educational, portfolio, and testing purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
              Brainly is a demonstration web application that allows users to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-sm sm:text-base">
              <li>Create user accounts for testing purposes</li>
              <li>Bookmark and organize YouTube videos and Twitter/X posts</li>
              <li>Create a personal content library for demonstration</li>
              <li>Share collections of bookmarked content with others</li>
              <li>Filter and organize content by type</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">3. Demo Project Status</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-4">
              <h3 className="font-semibold text-blue-800 mb-3 text-sm sm:text-base">📋 Important Disclaimers</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-2 text-sm sm:text-base">
                <li><strong>Not a Commercial Service:</strong> This app is a personal project for demonstration purposes</li>
                <li><strong>No Service Guarantees:</strong> No uptime, availability, or data persistence guarantees</li>
                <li><strong>Educational Purpose:</strong> Created to showcase web development skills and technologies</li>
                <li><strong>Testing Environment:</strong> May be reset, modified, or discontinued at any time</li>
              </ul>
            </div>
          </section>

          {/* Continue with remaining sections... */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">4. Data Storage and Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
              <strong>Database Storage:</strong> User data including accounts, bookmarks, and preferences are stored in a MongoDB database 
              for demonstration purposes. This data is used solely to showcase the application's functionality.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
              <strong>User Accounts:</strong> The app requires user registration to demonstrate authentication features. 
              Please use test data only and avoid using real personal information.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
              <strong>Data Retention:</strong> As this is a demo project, data may be periodically cleared or the database may be reset 
              without notice for maintenance or demonstration purposes.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              <strong>Third-Party Content:</strong> The app displays embedded content from YouTube and Twitter/X. 
              These embeds are subject to the respective platforms' terms of service and privacy policies.
            </p>
          </section>

          <div className="border-t border-gray-200 pt-6 sm:pt-8 mt-6 sm:mt-8">
            <p className="text-xs sm:text-sm text-gray-500 text-center leading-relaxed">
              By using Brainly, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, 
              and that you understand this is a demonstration project for educational and portfolio purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}