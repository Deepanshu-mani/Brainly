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
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-amber-800 mb-3">⚠️ Demo Project Notice</h3>
            <p className="text-amber-700 leading-relaxed">
              <strong>This is a demonstration project for educational and portfolio purposes only.</strong> 
              This is not a commercial service and is provided for testing and showcase purposes. 
              Use at your own discretion and do not store sensitive or important information.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Brainly ("the App"), you accept and agree to be bound by the terms and provision of this agreement. 
              This is a personal demonstration project created for educational, portfolio, and testing purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Brainly is a demonstration web application that allows users to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Create user accounts for testing purposes</li>
              <li>Bookmark and organize YouTube videos and Twitter/X posts</li>
              <li>Create a personal content library for demonstration</li>
              <li>Share collections of bookmarked content with others</li>
              <li>Filter and organize content by type</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Demo Project Status</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-blue-800 mb-3">📋 Important Disclaimers</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-2">
                <li><strong>Not a Commercial Service:</strong> This app is a personal project for demonstration purposes</li>
                <li><strong>No Service Guarantees:</strong> No uptime, availability, or data persistence guarantees</li>
                <li><strong>Educational Purpose:</strong> Created to showcase web development skills and technologies</li>
                <li><strong>Testing Environment:</strong> May be reset, modified, or discontinued at any time</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Storage and Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Database Storage:</strong> User data including accounts, bookmarks, and preferences are stored in a MongoDB database 
              for demonstration purposes. This data is used solely to showcase the application's functionality.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>User Accounts:</strong> The app requires user registration to demonstrate authentication features. 
              Please use test data only and avoid using real personal information.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Data Retention:</strong> As this is a demo project, data may be periodically cleared or the database may be reset 
              without notice for maintenance or demonstration purposes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Third-Party Content:</strong> The app displays embedded content from YouTube and Twitter/X. 
              These embeds are subject to the respective platforms' terms of service and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You agree to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Use the app for testing and demonstration purposes only</li>
              <li>Not store sensitive, personal, or important information</li>
              <li>Use test data when creating accounts (avoid real personal details)</li>
              <li>Understand this is a demo environment with no data guarantees</li>
              <li>Not attempt to reverse engineer or exploit the application</li>
              <li>Respect the terms of service of YouTube and Twitter/X when using their embedded content</li>
              <li>Not use the app for any illegal or unauthorized purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The app integrates with third-party services including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>YouTube:</strong> For displaying embedded video content</li>
              <li><strong>Twitter/X:</strong> For displaying embedded tweet content</li>
              <li><strong>MongoDB:</strong> For database storage and user management</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Your use of these embedded services is subject to their respective terms of service and privacy policies. 
              We are not responsible for the practices or content of these third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              The app's source code and design are the intellectual property of the creator and are part of a personal portfolio project. 
              All bookmarked content remains the property of its original creators and platforms. 
              The app merely provides a way to organize and access publicly available content for demonstration purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-gray-700 leading-relaxed">
              This app is provided "as is" without any warranties, express or implied. 
              As a demonstration project, there are no guarantees of availability, reliability, data persistence, or fitness for any particular purpose. 
              <strong>Use at your own risk and for testing purposes only.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              The creator of this demonstration app shall not be liable for any direct, indirect, incidental, special, 
              or consequential damages resulting from the use or inability to use the app, 
              including but not limited to loss of data, interruption of service, or any issues arising from the demo nature of the project.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Data Backup and Loss</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>No Data Guarantees:</strong> As this is a demonstration project, your data may be lost, corrupted, or deleted at any time. 
              The database may be reset for maintenance, updates, or demonstration purposes without prior notice. 
              Do not rely on this service for storing important information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Service Availability</h2>
            <p className="text-gray-700 leading-relaxed">
              This demonstration service may be unavailable, modified, or discontinued at any time without notice. 
              There are no service level agreements or uptime guarantees for this demo project.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms may be updated from time to time as the demo project evolves. 
              Continued use of the app after any changes constitutes acceptance of the new terms. 
              Check this page periodically for updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              This is a personal demonstration project. For questions or concerns about these terms, 
              please refer to the project's documentation or repository.
            </p>
          </section>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <p className="text-sm text-gray-500 text-center">
              By using Brainly, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, 
              and that you understand this is a demonstration project for educational and portfolio purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}