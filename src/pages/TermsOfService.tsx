import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../components/ui/icons/BrainIcon";

export function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg">
              <BrainIcon />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-purple-600 hover:text-purple-800 font-medium hover:underline"
          >
            ← Back
          </button>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Brainly ("the App"), you accept and agree to be bound by the terms and provision of this agreement. 
              This is a personal project created for educational and personal use purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Brainly is a personal dashboard web application that allows users to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Bookmark and organize YouTube videos and Twitter/X posts</li>
              <li>Create a personal content library for easy access</li>
              <li>Share collections of bookmarked content with others</li>
              <li>Filter and organize content by type</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Storage and Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Local Storage Only:</strong> All your data is stored locally in your browser's storage. We do not collect, 
              store, or transmit any personal information to external servers.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>No User Accounts:</strong> The app does not require user registration or account creation. 
              Your bookmarks and preferences are tied to your specific browser and device.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Third-Party Content:</strong> The app displays embedded content from YouTube and Twitter/X. 
              These embeds are subject to the respective platforms' terms of service and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You agree to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Use the app for personal, non-commercial purposes only</li>
              <li>Not attempt to reverse engineer or modify the application</li>
              <li>Respect the terms of service of YouTube and Twitter/X when using their embedded content</li>
              <li>Not use the app for any illegal or unauthorized purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The app integrates with third-party services including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>YouTube:</strong> For displaying embedded video content</li>
              <li><strong>Twitter/X:</strong> For displaying embedded tweet content</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Your use of these embedded services is subject to their respective terms of service and privacy policies. 
              We are not responsible for the practices or content of these third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              The app's source code and design are the intellectual property of the creator. 
              All bookmarked content remains the property of its original creators and platforms. 
              The app merely provides a way to organize and access publicly available content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-gray-700 leading-relaxed">
              This app is provided "as is" without any warranties, express or implied. 
              As a personal project, there are no guarantees of availability, reliability, or fitness for any particular purpose. 
              Use at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              The creator of this app shall not be liable for any direct, indirect, incidental, special, 
              or consequential damages resulting from the use or inability to use the app, 
              including but not limited to loss of data or interruption of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Data Backup</h2>
            <p className="text-gray-700 leading-relaxed">
              Since all data is stored locally in your browser, you are responsible for backing up your bookmarks and data. 
              Clearing your browser data, switching browsers, or device issues may result in loss of your saved content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms may be updated from time to time. Continued use of the app after any changes 
              constitutes acceptance of the new terms. Check this page periodically for updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              This is a personal project. For questions or concerns about these terms, 
              please refer to the project's documentation or repository.
            </p>
          </section>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <p className="text-sm text-gray-500 text-center">
              By using Brainly, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}