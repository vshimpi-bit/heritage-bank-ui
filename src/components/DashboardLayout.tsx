import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import BottomNav from "./BottomNav";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";

const DashboardLayout = ({ children, title }: { children: ReactNode; title?: string }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between h-14 px-4 md:px-8">
            <div className="flex items-center gap-3">
              <button className="md:hidden text-foreground" onClick={() => navigate("/dashboard")}>
                <Menu className="w-5 h-5" />
              </button>
              {title && <h2 className="font-heading text-lg text-foreground">{title}</h2>}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-heading text-primary">JD</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>

      <BottomNav />
      <Chatbot />
    </div>
  );
};

export default DashboardLayout;
