import { ArrowDownLeft, ArrowUpRight, Coffee, ShoppingBag, Wifi, Home, Car } from "lucide-react";

const iconMap: Record<string, any> = {
  income: ArrowDownLeft,
  expense: ArrowUpRight,
  coffee: Coffee,
  shopping: ShoppingBag,
  utility: Wifi,
  rent: Home,
  transport: Car,
};

interface TransactionRowProps {
  category: string;
  description: string;
  date: string;
  amount: string;
  type: "income" | "expense";
}

const TransactionRow = ({ category, description, date, amount, type }: TransactionRowProps) => {
  const Icon = iconMap[category] || (type === "income" ? ArrowDownLeft : ArrowUpRight);

  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-muted/50 rounded-lg transition-colors group cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div>
          <p className="text-sm font-medium font-body text-foreground">{description}</p>
          <p className="text-xs text-muted-foreground font-body">{date}</p>
        </div>
      </div>
      <span className={`text-sm font-medium font-body ${type === "income" ? "text-green-700" : "text-foreground"}`}>
        {type === "income" ? "+" : "-"}{amount}
      </span>
    </div>
  );
};

export default TransactionRow;
