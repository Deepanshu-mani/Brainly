import { useRef, useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../ui/icons/BrainIcon";
import { useTheme } from "../contexts/ThemeContext";
import { showToast } from "../utils/toast";

export function SignUp() {
  const { theme } = useTheme();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function signup() {
    const creatingAccountToast = showToast.loading('Creating account...');
    setLoading(true);
    try {
      const username = usernameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      
      if (!username || !email || !password) {
        showToast.dismiss(creatingAccountToast);
        showToast.error('Please fill in all fields');
        return;
      }

      await axios.post(BACKEND_URL + "/user/signup", {
        username,
        email,
        password,
      });
      
      showToast.dismiss(creatingAccountToast);
      showToast.success('Account created successfully! Please sign in.');
      navigate('/signin');
    } catch (error) {
      console.error("Sign up failed:", error);
      showToast.dismiss(creatingAccountToast);
      showToast.error('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div 
      className={`min-h-screen w-full relative transition-colors duration-300 flex justify-center items-center p-4 ${
        theme === 'light' ? 'bg-white' : 'bg-black'
      }`}
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#000000'
      }}
    >
      {/* Theme-based Background Pattern */}
      {theme === 'light' ? (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
      ) : (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#000000",
            backgroundImage: `
              radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "30px 30px",
            backgroundPosition: "0 0",
          }}
        />
      )}

      <div className={`relative backdrop-blur-xl rounded-3xl border shadow-2xl p-8 w-full max-w-md space-y-8 mx-auto transition-all duration-300 z-10 ${
        theme === 'light'
          ? 'bg-white/90 border-black/10 shadow-black/10'
          : 'bg-black/90 border-white/10 shadow-white/10'
      }`}>
        {/* Logo and Title */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <BrainIcon />
            <span className={`text-2xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Brainly</span>
          </div>
          <div>
            <h1 className={`text-3xl font-bold mb-2 tracking-tight ${
              theme === 'light'
                ? 'bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent'
            }`}>
              Join Brainly
            </h1>
            <p className={`text-lg ${
              theme === 'light' ? 'text-black/60' : 'text-white/60'
            }`}>Create your second brain</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className={`text-sm font-semibold block ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}>Username</label>
            <Input placeholder="Choose a username" reference={usernameRef} />
          </div>
          
          <div className="space-y-3">
            <label className={`text-sm font-semibold block ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}>Email</label>
            <Input placeholder="Enter your email" reference={emailRef} />
          </div>
          
          <div className="space-y-3">
            <label className={`text-sm font-semibold block ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}>Password</label>
            <Input placeholder="Create a password" reference={passwordRef} />
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              text={loading ? "Creating Account..." : "Create Account"}
              fullWidth={true}
              loading={loading}
              onClick={signup}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${
                theme === 'light' ? 'border-black/10' : 'border-white/10'
              }`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4 backdrop-blur-sm ${
                theme === 'light' 
                  ? 'bg-white/90 text-black/60' 
                  : 'bg-black/90 text-white/60'
              }`}>Already have an account?</span>
            </div>
          </div>
          
          <button
            className={`font-semibold text-sm hover:underline transition-colors duration-200 ${
              theme === 'light'
                ? 'text-black hover:text-black/80'
                : 'text-white hover:text-white/80'
            }`}
            onClick={() => navigate('/signin')}
          >
            Sign in instead →
          </button>

          {/* Terms */}
          <div className={`text-xs space-y-2 ${
            theme === 'light' ? 'text-black/50' : 'text-white/50'
          }`}>
            <p className="leading-relaxed">
              By creating an account, you agree to our{' '}
              <button 
                className={`hover:underline ${
                  theme === 'light' ? 'text-black/70' : 'text-white/70'
                }`}
                onClick={() => navigate('/terms')}
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button 
                className={`hover:underline ${
                  theme === 'light' ? 'text-black/70' : 'text-white/70'
                }`}
                onClick={() => navigate('/privacy')}
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}