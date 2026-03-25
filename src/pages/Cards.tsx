import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BankCard from "@/components/BankCard";
import CardDetailModal from "@/components/CardDetailModal";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, Snowflake, Ban } from "lucide-react";

const allCards = [
  { type: "debit" as const, number: "•••• •••• •••• 4289", name: "John Doe", expiry: "09/27", balance: "$12,450.00", cvv: "•••", status: "active" },
  { type: "credit" as const, number: "•••• •••• •••• 7651", name: "John Doe", expiry: "03/28", balance: "$2,340.00", cvv: "•••", creditLimit: "$15,000.00", status: "active" },
  { type: "debit" as const, number: "•••• •••• •••• 1023", name: "John Doe", expiry: "12/26", balance: "$5,780.00", cvv: "•••", status: "frozen" },
];

const CardsPage = () => {
  const [selectedCard, setSelectedCard] = useState<typeof allCards[0] | null>(null);

  return (
    <DashboardLayout title="Cards">
      <div className="flex justify-between items-center mb-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="font-heading text-2xl text-foreground">Your Cards</h2>
          <p className="text-sm text-muted-foreground font-body mt-1">Manage all your cards in one place</p>
        </motion.div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Card
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={card.status === "frozen" ? "opacity-60" : ""}>
              <BankCard {...card} onClick={() => setSelectedCard(card)} />
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="vintage" size="sm" className="flex-1 gap-1 text-xs">
                <Snowflake className="w-3 h-3" /> {card.status === "frozen" ? "Unfreeze" : "Freeze"}
              </Button>
              <Button variant="vintage" size="sm" className="flex-1 gap-1 text-xs">
                <Ban className="w-3 h-3" /> Block
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <CardDetailModal
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        card={selectedCard}
      />
    </DashboardLayout>
  );
};

export default CardsPage;
