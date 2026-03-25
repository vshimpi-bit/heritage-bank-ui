import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background paper-texture flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl text-primary mb-1">Heritage Bank</h1>
          <p className="text-sm text-muted-foreground font-body">Welcome back</p>
        </div>

        {/* Card */}
        <div className="parchment-card rounded-2xl p-8 paper-texture">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-body text-muted-foreground mb-2 block">Email Address</label>
              <input
                type="email"
                defaultValue="john@heritage.com"
                className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none py-2.5 text-foreground font-body transition-colors"
              />
            </div>

            <div>
              <label className="text-sm font-body text-muted-foreground mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  defaultValue="password123"
                  className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none py-2.5 text-foreground font-body transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 font-body text-muted-foreground cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                Remember me
              </label>
              <button type="button" className="text-primary hover:underline font-body">
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground font-body">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button variant="vintage" className="w-full" onClick={() => navigate("/dashboard")}>
            Continue as Guest
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground font-body mt-6">
          Don't have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-primary hover:underline">
            Open one today
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
