import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Wallet, TrendingUp, ArrowRight } from "lucide-react";

const features = [
  { icon: Shield, title: "Secure & Private", desc: "Bank-grade encryption for all your transactions" },
  { icon: Wallet, title: "Smart Savings", desc: "Automated saving tools that grow your wealth" },
  { icon: TrendingUp, title: "Live Analytics", desc: "Track spending patterns with elegant reports" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background paper-texture">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-border/50">
        <h1 className="font-heading text-xl md:text-2xl text-primary font-semibold">Heritage Bank</h1>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
            Sign In
          </Button>
          <Button size="sm" onClick={() => navigate("/login")}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-body mb-6">Est. 1892</p>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6">
            Banking, Reimagined<br />
            <span className="text-primary">with Simplicity</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            Where tradition meets innovation. Experience banking crafted with care,
            designed for those who appreciate the finer things.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-border" />
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="h-px w-16 bg-border" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/login")} className="gap-2">
              Open an Account <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="vintage" size="lg" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              className="parchment-card rounded-xl p-6 paper-texture"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 text-center">
        <p className="text-xs text-muted-foreground font-body">© 2024 Heritage Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
