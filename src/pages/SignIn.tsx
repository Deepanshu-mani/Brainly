import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../components/ui/icons/BrainIcon";

export function SignIn() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function signin() {
    setLoading(true);
    try {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        email,
        password,
      });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate('/dashboard');
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex justify-center items-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-40 sm:w-60 h-40 sm:h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      </div>

      <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8 w-full max-w-md space-y-6 mx-auto transition-all duration-300">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg">
              <BrainIcon />
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Sign in to your Brainly account</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Email</label>
            <Input placeholder="Enter your email" reference={emailRef} />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Password</label>
            <Input placeholder="Enter your password" reference={passwordRef} />
          </div>

          <div className="pt-4">
            <Button
              variant="primary"
              text={loading ? "Signing In..." : "Sign In"}
              fullWidth={true} 
              loading={loading}
              onClick={signin}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">New to Brainly?</span>
            </div>
          </div>
          
          <button
            className="text-purple-600 hover:text-purple-800 font-medium text-sm hover:underline transition-colors duration-200"
            onClick={() => navigate('/signup')}
          >
            Create your account →
          </button>

          {/* Terms and Privacy */}
          <div className="text-xs text-gray-500 space-y-2">
            <p className="leading-relaxed">
              By signing in, you agree to our{' '}
              <button 
                className="text-purple-600 hover:underline"
                onClick={() => navigate('/terms')}
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button 
                className="text-purple-600 hover:underline"
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