import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../components/ui/icons/BrainIcon";

export function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function signup() {
    setLoading(true);
    try {
      const username = usernameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        email,
        password,
      });
      navigate('/signin');
      alert("Account created successfully! Please sign in.");
    } catch (error) {
      console.error("Sign up failed:", error);
      alert("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex justify-center items-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      </div>

      <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8 w-full max-w-md space-y-6 mx-auto transition-all duration-300">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <BrainIcon />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">
              Join Brainly
            </h1>
            <p className="text-gray-600 mt-2">Create your account to get started</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Username</label>
            <Input placeholder="Choose a username" reference={usernameRef} />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Email</label>
            <Input placeholder="Enter your email" reference={emailRef} />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Password</label>
            <Input placeholder="Create a password" reference={passwordRef} />
          </div>

          <div className="pt-4">
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
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>
          
          <button
            className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline transition-colors duration-200"
            onClick={() => navigate('/signin')}
          >
            Sign in instead →
          </button>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          By creating an account, you agree to our{' '}
          <button className="text-blue-600 hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-blue-600 hover:underline">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
}