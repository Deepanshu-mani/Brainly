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
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy explains how Brainly ("the App") handles your information. 
              We are committed to protecting your privacy and being transparent about our data practices. 
              This is a personal project that prioritizes user privacy by design.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Do NOT Collect</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-green-800 mb-3">✅ Zero Data Collection Policy</h3>
              <p className="text-green-700 leading-relaxed">
                We do not collect, store, transmit, or process any personal information on external servers. 
                Your privacy is completely protected.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">Specifically, we do NOT collect:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Personal identification information (name, email, phone number)</li>
              <li>Account credentials or login information</li>
              <li>Browsing history or usage analytics</li>
              <li>IP addresses or location data</li>
              <li>Device information or browser fingerprints</li>
              <li>Cookies for tracking purposes</li>
              <li>Any form of personal or behavioral data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Local Data Storage</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Browser Local Storage:</strong> All your bookmarks, preferences, and app data are stored exclusively 
              in your browser's local storage on your device. This data never leaves your device.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>What's Stored Locally:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>YouTube video URLs and titles you've bookmarked</li>
              <li>Twitter/X post URLs and titles you've saved</li>
              <li>Your content organization and filtering preferences</li>
              <li>App settings and display preferences</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Your Control:</strong> You have complete control over this data. You can clear it at any time 
              through your browser settings or by clearing the app's data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Embedded Content</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The app displays embedded content from third-party platforms:
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
            
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Important:</strong> We recommend reviewing the privacy policies of YouTube and Twitter/X 
              to understand how they handle embedded content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. No User Accounts or Registration</h2>
            <p className="text-gray-700 leading-relaxed">
              The app does not require user registration, account creation, or any form of authentication. 
              There are no usernames, passwords, or personal profiles. Your bookmarks are tied only to your specific browser and device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. No Analytics or Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not use any analytics services, tracking pixels, or monitoring tools. 
              There are no Google Analytics, Facebook Pixel, or similar tracking technologies implemented in this app.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Since all data is stored locally on your device:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Your data security depends on your device and browser security</li>
              <li>We recommend keeping your browser and device updated</li>
              <li>Consider using browser security features and extensions</li>
              <li>Be cautious when using the app on shared or public computers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Backup and Loss</h2>
            <p className="text-gray-700 leading-relaxed">
              Since data is stored locally, you are responsible for backing up your bookmarks if desired. 
              Data may be lost if you clear browser data, uninstall the browser, or experience device issues. 
              We cannot recover lost data as we do not have access to it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Since we do not collect any personal information, the app is safe for users of all ages. 
              However, parents should be aware that the app displays content from YouTube and Twitter/X, 
              which may have their own age restrictions and content policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Users</h2>
            <p className="text-gray-700 leading-relaxed">
              Since no data is transmitted or stored on external servers, there are no international data transfer concerns. 
              All data remains on your local device regardless of your location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. 
              Since we don't collect contact information, we cannot notify users directly of changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              This is a personal project. For questions about this Privacy Policy, 
              please refer to the project's documentation or repository.
            </p>
          </section>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-3">🔒 Privacy Summary</h3>
              <p className="text-blue-700 leading-relaxed">
                <strong>Your privacy is our priority.</strong> We don't collect, store, or transmit any personal data. 
                Everything stays on your device. You have complete control over your information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}