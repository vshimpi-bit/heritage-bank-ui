import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import TransactionRow from "@/components/TransactionRow";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const allTransactions = [
  { category: "coffee", description: "Morning Brew Coffee", date: "Mar 3, 2024", amount: "$4.50", type: "expense" as const },
  { category: "income", description: "Salary Deposit", date: "Mar 1, 2024", amount: "$5,200.00", type: "income" as const },
  { category: "shopping", description: "Amazon Purchase", date: "Feb 28, 2024", amount: "$89.99", type: "expense" as const },
  { category: "utility", description: "Electric Bill", date: "Feb 27, 2024", amount: "$124.00", type: "expense" as const },
  { category: "transport", description: "Uber Ride", date: "Feb 26, 2024", amount: "$18.50", type: "expense" as const },
  { category: "rent", description: "Monthly Rent", date: "Feb 25, 2024", amount: "$1,800.00", type: "expense" as const },
  { category: "income", description: "Freelance Payment", date: "Feb 24, 2024", amount: "$750.00", type: "income" as const },
  { category: "shopping", description: "Target", date: "Feb 23, 2024", amount: "$67.30", type: "expense" as const },
  { category: "coffee", description: "Starbucks", date: "Feb 22, 2024", amount: "$6.75", type: "expense" as const },
  { category: "transport", description: "Gas Station", date: "Feb 21, 2024", amount: "$45.00", type: "expense" as const },
];

const filters = ["All", "Income", "Expense"];

const Transactions = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allTransactions.filter((tx) => {
    if (activeFilter === "Income" && tx.type !== "income") return false;
    if (activeFilter === "Expense" && tx.type !== "expense") return false;
    if (search && !tx.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout title="Transactions">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="font-heading text-2xl text-foreground">Transactions</h2>
            <p className="text-sm text-muted-foreground font-body mt-1">Your complete transaction history</p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {filters.map((f) => (
            <Button
              key={f}
              variant={activeFilter === f ? "default" : "vintage"}
              size="sm"
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>

        {/* Transaction List */}
        <div className="parchment-card rounded-xl paper-texture overflow-hidden">
          <div className="divide-y divide-border/50">
            {filtered.length > 0 ? (
              filtered.map((tx, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <TransactionRow {...tx} />
                </motion.div>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground font-body">No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Transactions;
