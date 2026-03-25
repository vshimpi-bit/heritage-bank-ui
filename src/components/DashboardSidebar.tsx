import { LayoutDashboard, CreditCard, ArrowRightLeft, Settings, LogOut, Gift } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Cards", icon: CreditCard, to: "/cards" },
  { label: "Transactions", icon: ArrowRightLeft, to: "/transactions" },
  { label: "Rewards", icon: Gift, to: "/rewards" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

const DashboardSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-sidebar text-sidebar-foreground h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="font-heading text-xl text-sidebar-primary">Heritage Bank</h1>
        <p className="text-xs text-sidebar-foreground/60 font-body mt-1">Est. 1892</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent transition-colors font-body text-sm"
            activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent transition-colors font-body text-sm w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
