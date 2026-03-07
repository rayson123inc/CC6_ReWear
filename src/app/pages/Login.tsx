import { useState } from "react";
import { useNavigate } from "react-router";
import { Sprout, Mail, Lock, User } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignup) {
      // Mock signup - in real app would create account
      login(formData.name || formData.email.split("@")[0]);
    } else {
      // Mock login - in real app would verify credentials
      login(formData.email.split("@")[0]);
    }
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0f1419] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl text-white font-medium">Better Dressed Movement</span>
            <Sprout className="w-8 h-8 text-[#bef264]" />
          </div>
          <p className="text-gray-400">
            Track your sustainable fashion journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-8 border border-gray-800">
          <h2 className="text-3xl text-white mb-6">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="w-full bg-[#0f172a] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#bef264]"
                    required={isSignup}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="w-full bg-[#0f172a] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#bef264]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full bg-[#0f172a] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#bef264]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#bef264] text-black py-4 rounded-full hover:bg-[#a8d957] transition-colors text-lg mt-6"
            >
              {isSignup ? "Sign Up" : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-gray-400 hover:text-[#bef264] transition-colors"
            >
              {isSignup
                ? "Already have an account? Log in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-[#1e293b]/50 rounded-xl border border-gray-800">
          <p className="text-sm text-gray-400 text-center">
            🎮 Demo Mode: Use any email/password to log in
          </p>
        </div>
      </div>
    </div>
  );
}
