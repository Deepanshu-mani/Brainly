import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../ui/icons/BrainIcon";
import { Search, Zap, Shield, Globe } from "lucide-react";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#101010] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        --
        <div className="flex items-center space-x-2">
          <BrainIcon />
          <div className="text-2xl font-extrabold tracking-tight text-white select-none">
            Brainly
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="px-5 py-2 rounded-md border border-white/20 text-white hover:bg-white/10 transition font-medium"
            style={{ backgroundColor: "#101010" }}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-md bg-white/10 text-white border border-white/20 font-semibold hover:bg-white/20 transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section with Video on Right */}
      <section className="flex-1 w-full items-center justify-center text-left px-4 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto py-16">
        {/* Hero Content */}
        <div className="flex flex-col justify-center text-left md:text-left">
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 text-white">
            Save, Organize,
            <br className="hidden sm:block" /> Remember Everything.
          </h1>
          <p className="text-lg sm:text-2xl text-white/80 mb-10 max-w-2xl">
            Your AI-powered second brain for capturing, organizing, and
            instantly finding any content. Never lose important information
            again with intelligent search and smart summaries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 rounded-md bg-white/10 text-white border border-white/20 font-semibold text-lg hover:bg-white/20 transition"
            >
              Get Started
            </button>
            <a
              href="#features"
              className="px-8 py-3 rounded-md border border-white/20 text-white font-medium text-lg hover:bg-white/10 transition inline-block"
              style={{ backgroundColor: "#101010" }}
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Video */}
        <div className="flex justify-center items-center">
          <video
            className="w-full object-cover  h-80 md:h-[500px]"
            src="/video.mp4"
            autoPlay
            muted
            preload="auto"
            playsInline
            onLoadedMetadata={(e) => {
              // Skip the first 1 second
              const video = e.currentTarget;

              video.currentTime = 2.5;
            }}
            onTimeUpdate={(e) => {
              const video = e.currentTarget;
              // Loop from 1 second to end
              if (video.currentTime >= video.duration) {
                video.currentTime = 2.5;
                video.play();
              }
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="text-white py-16 px-6"
        style={{ backgroundColor: "#101010" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Brainly
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI-Powered Search */}
            <div className="relative overflow-hidden flex flex-col items-start gap-3 p-6 rounded-2xl bg-[#111111] text-white shadow-md hover:shadow-lg transition-all cursor-pointer border border-white/10 border-b-4 border-b-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
              <Search className="w-10 h-10 text-white/80" />
              <h3 className="text-lg font-semibold">AI-Powered Search</h3>
              <p className="text-sm text-white/70">
                Find any content instantly with semantic search powered by
                advanced AI embeddings. Search by meaning, not just keywords.
              </p>
            </div>

            {/* Smart Summaries */}
            <div className="relative overflow-hidden flex flex-col items-start gap-3 p-6 rounded-2xl bg-white text-gray-900 shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200 border-b-4 border-b-gray-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
              <Zap className="w-10 h-10 text-gray-700" />
              <h3 className="text-lg font-semibold">Smart Summaries</h3>
              <p className="text-sm text-gray-600">
                Get automatic summaries and keyword extraction for all your
                saved content. Understand everything at a glance.
              </p>
            </div>

            {/* Private & Secure */}
            <div className="relative overflow-hidden flex flex-col items-start gap-3 p-6 rounded-2xl bg-white text-gray-900 shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200 border-b-4 border-b-gray-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
              <Shield className="w-10 h-10 text-gray-700" />
              <h3 className="text-lg font-semibold">Private & Secure</h3>
              <p className="text-sm text-gray-600">
                Your data stays private. All content is processed securely and
                never shared. Your second brain, your control.
              </p>
            </div>

            {/* Universal Content */}
            <div
              className="relative overflow-hidden flex flex-col items-start gap-3 p-6 rounded-2xl text-white shadow-md hover:shadow-lg transition-all cursor-pointer border border-white/10 border-b-4 border-b-white/20"
              style={{ backgroundColor: "#111111" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
              <Globe className="w-10 h-10 text-white/80" />
              <h3 className="text-lg font-semibold">Universal Content</h3>
              <p className="text-sm text-white/70">
                Save YouTube videos, Twitter posts, websites, and notes.
                Everything in one place, searchable and organized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-white/10 text-white/60 text-sm">
        &copy; {new Date().getFullYear()} Brainly. Your AI-powered second brain.
      </footer>
    </div>
  );
}
