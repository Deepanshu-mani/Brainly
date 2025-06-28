import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../components/ui/icons/BrainIcon";

export function PrivacyPolicy() {
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
            Privacy Policy
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
              While we take privacy seriously, please use test data only and avoid entering real personal information. 
              Data may be reset or cleared as part of the demo environment.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy explains how Brainly ("the App") handles your information. 
              This is a personal demonstration project created for educational and portfolio purposes. 
              We are committed to being transparent about our data practices in this demo environment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For demonstration purposes, this app collects and stores the following information in our MongoDB database:
            </p>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">👤 Account Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>Username (for display and identification)</li>
                  <li>Email address (for account creation and authentication)</li>
                  <li>Password (encrypted/hashed for security)</li>
                  <li>Account creation date</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">📚 Content Data</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>Bookmarked YouTube video URLs and titles</li>
                  <li>Saved Twitter/X post URLs and titles</li>
                  <li>Content organization and tags</li>
                  <li>Timestamps of when content was added</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">⚙️ Usage Data</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>User preferences and settings</li>
                  <li>Content filtering preferences</li>
                  <li>Share link generation data</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this demonstration environment, we use your information to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide user authentication and account management features</li>
              <li>Store and organize your bookmarked content</li>
              <li>Enable content sharing functionality</li>
              <li>Demonstrate the app's features and capabilities</li>
              <li>Maintain the functionality of the demo application</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>We do NOT:</strong> Sell, share, or use your data for commercial purposes, advertising, or marketing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Storage and Security</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-blue-800 mb-3">🗄️ Database Storage</h3>
              <p className="text-blue-700 leading-relaxed">
                Your data is stored in a MongoDB database hosted for demonstration purposes. 
                We implement basic security measures including password encryption and secure connections.
              </p>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Security Measures:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Passwords are hashed and encrypted before storage</li>
              <li>Database connections use secure protocols</li>
              <li>Access to the database is restricted</li>
              <li>Regular security updates and monitoring</li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Demo Environment Limitations:</strong> As this is a demonstration project, 
              security measures may not be at enterprise level. Please use test data only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Retention and Deletion</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-yellow-800 mb-3">⏰ Demo Data Policy</h3>
              <p className="text-yellow-700 leading-relaxed">
                As this is a demonstration project, data may be periodically cleared or reset without notice 
                for maintenance, updates, or demonstration purposes. Do not rely on long-term data persistence.
              </p>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              You can delete your account and associated data at any time through the app interface. 
              However, due to the demo nature of this project, we may also reset the entire database periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Services and Embeds</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The app integrates with third-party services that may collect their own data:
            </p>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🎥 YouTube Embeds</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  When you view YouTube videos through the app, YouTube may collect data according to their privacy policy. 
                  We do not have access to or control over this data collection.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🐦 Twitter/X Embeds</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  When you view Twitter/X posts through the app, Twitter/X may collect data according to their privacy policy. 
                  We do not have access to or control over this data collection.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Sharing Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or share your personal information with third parties, except:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>When you explicitly choose to share content collections through the app's sharing feature</li>
              <li>If required by law or legal process</li>
              <li>To protect the rights, property, or safety of the demo project</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this demo environment, you have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Access your stored data through the app interface</li>
              <li>Update or modify your account information</li>
              <li>Delete your bookmarked content</li>
              <li>Delete your account and associated data</li>
              <li>Request information about your stored data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              This demo app is not intended for children under 13. We do not knowingly collect personal information from children under 13. 
              If you are a parent or guardian and believe your child has provided us with personal information, 
              please contact us to have the information removed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Users</h2>
            <p className="text-gray-700 leading-relaxed">
              This is a demonstration project and may not comply with all international data protection regulations. 
              If you are accessing this demo from outside the United States, please be aware that your information 
              may be transferred to and stored in the United States.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time as the demo project evolves. 
              Any changes will be posted on this page with an updated date. 
              Continued use of the app after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              This is a personal demonstration project. For questions about this Privacy Policy or your data, 
              please refer to the project's documentation or repository.
            </p>
          </section>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-purple-800 mb-3">🔒 Privacy Summary for Demo Project</h3>
              <p className="text-purple-700 leading-relaxed">
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