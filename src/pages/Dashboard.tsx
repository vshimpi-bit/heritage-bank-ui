import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import BankCard from "@/components/BankCard";
import CardDetailModal from "@/components/CardDetailModal";
import TransactionRow from "@/components/TransactionRow";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, Send, Smartphone, Zap, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
  { type: "debit" as const, number: "•••• •••• •••• 4289", name: "John Doe", expiry: "09/27", balance: "$12,450.00", cvv: "•••" },
  { type: "credit" as const, number: "•••• •••• •••• 7651", name: "John Doe", expiry: "03/28", balance: "$2,340.00", cvv: "•••", creditLimit: "$15,000.00" },
  { type: "debit" as const, number: "•••• •••• •••• 1023", name: "John Doe", expiry: "12/26", balance: "$5,780.00", cvv: "•••" },
];

const transactions = [
  { category: "coffee", description: "Morning Brew Coffee", date: "Today, 8:30 AM", amount: "$4.50", type: "expense" as const },
  { category: "income", description: "Salary Deposit", date: "Mar 1, 2024", amount: "$5,200.00", type: "income" as const },
  { category: "shopping", description: "Amazon Purchase", date: "Feb 28, 2024", amount: "$89.99", type: "expense" as const },
  { category: "utility", description: "Electric Bill", date: "Feb 27, 2024", amount: "$124.00", type: "expense" as const },
  { category: "transport", description: "Uber Ride", date: "Feb 26, 2024", amount: "$18.50", type: "expense" as const },
];

const quickActions = [
  { icon: Send, label: "Send" },
  { icon: ArrowUpRight, label: "Pay" },
  { icon: Smartphone, label: "Recharge" },
  { icon: Zap, label: "Quick Pay" },
];

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState<typeof cards[0] | null>(null);
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Dashboard">
      {/* Greeting - mobile */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="font-heading text-2xl md:text-3xl text-foreground">Good morning, John</h2>
        <p className="text-muted-foreground font-body text-sm mt-1">Here's your financial overview</p>
      </motion.div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="parchment-card rounded-xl p-6 mb-6 paper-texture"
      >
        <p className="text-sm text-muted-foreground font-body">Total Balance</p>
        <p className="font-heading text-3xl md:text-4xl text-foreground mt-1">$20,570.00</p>
        <div className="flex items-center gap-2 mt-2">
          <TrendingUp className="w-4 h-4 text-green-700" />
          <span className="text-sm text-green-700 font-body">+12.5% this month</span>
        </div>
      </motion.div>

      {/* Rewards Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        onClick={() => navigate("/rewards")}
        className="parchment-card rounded-xl p-4 mb-6 paper-texture flex items-center justify-between cursor-pointer hover:-translate-y-1 transition-transform group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-sidebar flex items-center justify-center shadow-sm border border-border">
            <Award className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-0.5">Reward Points</p>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-xl text-[#D4AF37]">3,750</span>
              <span className="text-[10px] text-muted-foreground font-body hidden sm:inline">Silver Tier</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <div className="w-20 h-1 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: '75%' }} />
          </div>
        </div>
      </motion.div>

      {/* Your Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h3 className="font-heading text-lg text-foreground mb-4">Your Cards</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {cards.map((card, i) => (
            <div key={i} className="snap-start">
              <BankCard {...card} onClick={() => setSelectedCard(card)} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions - mobile prominent */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-4 gap-3 mb-6 md:hidden"
      >
        {quickActions.map((action) => (
          <button
            key={action.label}
            className="parchment-card rounded-xl p-3 flex flex-col items-center gap-2 paper-texture hover:shadow-card-hover transition-shadow"
          >
            <action.icon className="w-5 h-5 text-primary" />
            <span className="text-xs font-body text-foreground">{action.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Analytics + Transactions grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Simple Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="parchment-card rounded-xl p-6 paper-texture"
        >
          <h3 className="font-heading text-lg text-foreground mb-4">Monthly Spending</h3>
          <div className="space-y-3">
            {[
              { label: "Food & Drink", pct: 35, amount: "$420" },
              { label: "Shopping", pct: 25, amount: "$300" },
              { label: "Transport", pct: 15, amount: "$180" },
              { label: "Bills", pct: 20, amount: "$240" },
              { label: "Other", pct: 5, amount: "$60" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm font-body mb-1">
                  <span className="text-foreground">{item.label}</span>
                  <span className="text-muted-foreground">{item.amount}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-primary/70"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="parchment-card rounded-xl p-6 paper-texture"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading text-lg text-foreground">Recent Transactions</h3>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              View All
            </Button>
          </div>
          <div className="space-y-1">
            {transactions.map((tx, i) => (
              <TransactionRow key={i} {...tx} />
            ))}
          </div>
        </motion.div>
      </div>

      <CardDetailModal
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        card={selectedCard}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
