import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Snowflake, Ban, ArrowRightLeft } from "lucide-react";

interface CardDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: {
    type: "debit" | "credit";
    number: string;
    name: string;
    expiry: string;
    balance: string;
    cvv: string;
    creditLimit?: string;
  } | null;
}

const CardDetailModal = ({ isOpen, onClose, card }: CardDetailModalProps) => {
  if (!card) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="parchment-card rounded-2xl p-6 md:p-8 max-w-md w-full paper-texture relative">
              <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>

              {/* Card Preview */}
              <div className="wood-gradient rounded-xl p-5 text-primary-foreground mb-6 relative overflow-hidden">
                <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-widest opacity-70 font-body mb-1">
                    {card.type === "debit" ? "Debit Card" : "Credit Card"}
                  </p>
                  <p className="font-mono text-xl tracking-[0.2em] mt-4 mb-4">{card.number}</p>
                  <div className="flex justify-between">
                    <p className="text-sm font-body">{card.name}</p>
                    <p className="text-xs opacity-70">{card.expiry}</p>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-3 mb-6">
                <DetailRow label="Card Type" value={card.type === "debit" ? "Debit" : "Credit"} />
                <DetailRow label="Card Number" value={card.number} />
                <DetailRow label="Expiry Date" value={card.expiry} />
                <DetailRow label="CVV" value={card.cvv} />
                <DetailRow label={card.type === "credit" ? "Credit Limit" : "Balance"} value={card.type === "credit" ? card.creditLimit || "" : card.balance} />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="vintage" size="sm" className="flex-1 gap-2">
                  <Snowflake className="w-4 h-4" /> Freeze
                </Button>
                <Button variant="vintage" size="sm" className="flex-1 gap-2">
                  <Ban className="w-4 h-4" /> Block
                </Button>
                <Button variant="vintage" size="sm" className="flex-1 gap-2">
                  <ArrowRightLeft className="w-4 h-4" /> Transactions
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-border/50">
    <span className="text-sm text-muted-foreground font-body">{label}</span>
    <span className="text-sm font-medium font-body text-foreground">{value}</span>
  </div>
);

export default CardDetailModal;
