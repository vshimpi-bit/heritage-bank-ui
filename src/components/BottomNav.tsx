import { LayoutDashboard, CreditCard, ArrowRightLeft, Settings, Gift } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const items = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Cards", icon: CreditCard, to: "/cards" },
  { label: "Transactions", icon: ArrowRightLeft, to: "/transactions" },
  { label: "Rewards", icon: Gift, to: "/rewards" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

const BottomNav = () => (
  <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-card">
    <div className="flex justify-around items-center h-16">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors py-2 px-3"
          activeClassName="text-primary"
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] font-body">{item.label}</span>
        </NavLink>
      ))}
    </div>
  </nav>
);

export default BottomNav;
